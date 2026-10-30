import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import {
    authenticateUser,
    createSession,
    getSessionUser,
    deleteSession,
    listAllUsers,
    createUser,
    updateUser,
    deleteUser
} from './auth-db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = parseInt(process.env.PORT || '8080', 10);
const PUBLIC_DIR = path.resolve(__dirname);

const BLOCKED_FILES = new Set([
    'server.js',
    'auth-db.js',
    'users.db',
    'package.json',
    'package-lock.json',
    '_headers'
]);

// Simple in-memory login rate limiter (per IP)
const loginAttempts = new Map();
const LOGIN_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_LOGIN_ATTEMPTS = 10;

function isRateLimited(ip) {
    const now = Date.now();
    const record = loginAttempts.get(ip);
    if (!record) return false;
    if (now - record.firstAttempt > LOGIN_WINDOW_MS) {
        loginAttempts.delete(ip);
        return false;
    }
    return record.count >= MAX_LOGIN_ATTEMPTS;
}

function recordFailedLogin(ip) {
    const now = Date.now();
    const record = loginAttempts.get(ip);
    if (!record || (now - record.firstAttempt > LOGIN_WINDOW_MS)) {
        loginAttempts.set(ip, { count: 1, firstAttempt: now });
    } else {
        record.count += 1;
    }
}

function clearLoginAttempts(ip) {
    loginAttempts.delete(ip);
}

const MIME_TYPES = {
    '.html': 'text/html; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8',
    '.mjs': 'application/javascript; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.pdf': 'application/pdf',
    '.txt': 'text/plain; charset=utf-8'
};

function parseJsonBody(req) {
    return new Promise((resolve, reject) => {
        let body = '';
        req.on('data', chunk => {
            body += chunk;
            if (body.length > 1e6) {
                req.destroy();
                reject(new Error('Carga útil demasiado grande'));
            }
        });
        req.on('end', () => {
            if (!body || body.trim() === '') return resolve({});
            try {
                resolve(JSON.parse(body));
            } catch (err) {
                reject(new Error('Formato JSON inválido'));
            }
        });
        req.on('error', reject);
    });
}

function sendJson(res, statusCode, data) {
    res.writeHead(statusCode, {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'no-store',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
    });
    res.end(JSON.stringify(data));
}

function getBearerToken(req) {
    const authHeader = req.headers['authorization'];
    if (authHeader && authHeader.startsWith('Bearer ')) {
        return authHeader.substring(7).trim();
    }
    return null;
}

function requireAuthenticatedUser(req, res) {
    const token = getBearerToken(req);
    const user = getSessionUser(token);
    if (!user) {
        sendJson(res, 401, { error: 'Sesión no válida o expirada. Por favor, inicia sesión.' });
        return null;
    }
    return user;
}

function requireSuperuser(req, res) {
    const user = requireAuthenticatedUser(req, res);
    if (!user) return null;
    if (!user.is_superuser) {
        sendJson(res, 403, { error: 'Acceso denegado: Se requieren permisos de superusuario.' });
        return null;
    }
    return user;
}

const server = http.createServer(async (req, res) => {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');

    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        return res.end();
    }

    let reqUrl;
    try {
        reqUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
    } catch {
        res.writeHead(400);
        return res.end('Bad Request');
    }

    const pathname = reqUrl.pathname;

    // ─────────────────────────────────────────────────────────────────────────────
    // API: Authentication Routes
    // ─────────────────────────────────────────────────────────────────────────────

    // POST /api/auth/login
    if (req.method === 'POST' && pathname === '/api/auth/login') {
        const clientIp = req.socket.remoteAddress || 'unknown';
        if (isRateLimited(clientIp)) {
            return sendJson(res, 429, { error: 'Demasiados intentos de inicio de sesión. Inténtalo más tarde.' });
        }

        try {
            const { username, password } = await parseJsonBody(req);
            if (!username || !password) {
                return sendJson(res, 400, { error: 'Debes proporcionar usuario y contraseña.' });
            }

            const user = authenticateUser(username, password);
            if (!user) {
                recordFailedLogin(clientIp);
                return sendJson(res, 401, { error: 'Usuario o contraseña incorrectos.' });
            }

            clearLoginAttempts(clientIp);
            const session = createSession(user.id);
            return sendJson(res, 200, {
                token: session.token,
                expiresAt: session.expiresAt,
                user: {
                    id: user.id,
                    username: user.username,
                    is_superuser: Boolean(user.is_superuser)
                }
            });
        } catch (err) {
            return sendJson(res, 500, { error: err.message || 'Error en el servidor.' });
        }
    }

    // GET /api/auth/me
    if (req.method === 'GET' && pathname === '/api/auth/me') {
        const user = requireAuthenticatedUser(req, res);
        if (!user) return;
        return sendJson(res, 200, { user });
    }

    // POST /api/auth/logout
    if (req.method === 'POST' && pathname === '/api/auth/logout') {
        const token = getBearerToken(req);
        if (token) {
            deleteSession(token);
        }
        return sendJson(res, 200, { success: true });
    }

    // ─────────────────────────────────────────────────────────────────────────────
    // API: Superuser Administration Routes (/api/admin/users)
    // ─────────────────────────────────────────────────────────────────────────────

    // GET /api/admin/users - List all users
    if (req.method === 'GET' && pathname === '/api/admin/users') {
        const superuser = requireSuperuser(req, res);
        if (!superuser) return;
        const users = listAllUsers();
        return sendJson(res, 200, { users });
    }

    // POST /api/admin/users - Create a new user
    if (req.method === 'POST' && pathname === '/api/admin/users') {
        const superuser = requireSuperuser(req, res);
        if (!superuser) return;
        try {
            const { username, password, is_superuser } = await parseJsonBody(req);
            const newUser = createUser({
                username,
                password,
                is_superuser: Boolean(is_superuser)
            });
            return sendJson(res, 201, {
                message: `Usuario "${newUser.username}" creado con éxito.`,
                user: newUser
            });
        } catch (err) {
            return sendJson(res, 400, { error: err.message });
        }
    }

    // Matches /api/admin/users/:id
    const userMatch = pathname.match(/^\/api\/admin\/users\/(\d+)$/);

    // PUT /api/admin/users/:id - Modify user
    if (req.method === 'PUT' && userMatch) {
        const superuser = requireSuperuser(req, res);
        if (!superuser) return;
        const userId = parseInt(userMatch[1], 10);
        try {
            const body = await parseJsonBody(req);
            const updated = updateUser(userId, body);
            return sendJson(res, 200, {
                message: `Usuario "${updated.username}" actualizado con éxito.`,
                user: updated
            });
        } catch (err) {
            return sendJson(res, 400, { error: err.message });
        }
    }

    // DELETE /api/admin/users/:id - Delete user
    if (req.method === 'DELETE' && userMatch) {
        const superuser = requireSuperuser(req, res);
        if (!superuser) return;
        const userId = parseInt(userMatch[1], 10);
        try {
            deleteUser(userId);
            return sendJson(res, 200, { message: 'Usuario eliminado correctamente.' });
        } catch (err) {
            return sendJson(res, 400, { error: err.message });
        }
    }

    // ─────────────────────────────────────────────────────────────────────────────
    // Static Files Serving
    // ─────────────────────────────────────────────────────────────────────────────

    let filePath = path.resolve(PUBLIC_DIR, '.' + decodeURIComponent(pathname));

    // Prevent directory traversal
    if (!filePath.startsWith(PUBLIC_DIR)) {
        res.writeHead(403);
        return res.end('Forbidden');
    }

    // Block sensitive backend files, databases, and hidden files/directories
    const relativePath = path.relative(PUBLIC_DIR, filePath);
    const pathSegments = relativePath.split(path.sep);
    const baseName = path.basename(filePath);
    if (
        pathSegments.some(seg => seg.startsWith('.')) ||
        BLOCKED_FILES.has(relativePath) ||
        BLOCKED_FILES.has(baseName) ||
        /\.db(-journal|-wal|-shm)?$/i.test(baseName)
    ) {
        res.writeHead(403);
        return res.end('Forbidden');
    }

    fs.stat(filePath, (err, stats) => {
        if (!err && stats.isDirectory()) {
            filePath = path.join(filePath, 'index.html');
        }

        fs.readFile(filePath, (readErr, content) => {
            if (readErr) {
                if (readErr.code === 'ENOENT') {
                    res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
                    res.end('<h1>404 - No Encontrado</h1><p><a href="/">Volver a Grimheim</a></p>');
                } else {
                    res.writeHead(500);
                    res.end(`Server Error: ${readErr.code}`);
                }
                return;
            }

            const ext = path.extname(filePath).toLowerCase();
            const contentType = MIME_TYPES[ext] || 'application/octet-stream';
            const isNoStoreTarget = ext === '.html' || path.basename(filePath) === 'version.json';

            const headers = {
                'Content-Type': contentType,
                'Cache-Control': isNoStoreTarget
                    ? 'no-store, no-cache, must-revalidate, proxy-revalidate'
                    : 'no-cache'
            };
            if (isNoStoreTarget) {
                headers['Pragma'] = 'no-cache';
                headers['Expires'] = '0';
            }

            res.writeHead(200, headers);
            res.end(content);
        });
    });
});

server.listen(PORT, '0.0.0.0', () => {
    console.log(`=======================================================`);
    console.log(`    GRIMHEIM (LOCAL EN CASTELLANO) SERVIDOR ACTIVO    `);
    console.log(`=======================================================`);
    console.log(`  > Local:   http://localhost:${PORT}`);
    console.log(`  > IP:      http://127.0.0.1:${PORT}`);
    console.log(`  > Auth:    Base de datos SQLite activa (users.db)`);
    console.log(`=======================================================`);
});
