import { DatabaseSync } from 'node:sqlite';
import crypto from 'node:crypto';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_PATH = path.join(__dirname, 'users.db');

const db = new DatabaseSync(DB_PATH);

// Initialize tables
db.exec(`
    PRAGMA foreign_keys = ON;

    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE COLLATE NOCASE NOT NULL,
        password_hash TEXT NOT NULL,
        is_superuser INTEGER DEFAULT 0,
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS sessions (
        token TEXT PRIMARY KEY,
        user_id INTEGER NOT NULL,
        expires_at INTEGER NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );
`);

/**
 * Hashes a password using crypto.scrypt with a random salt.
 */
export function hashPassword(password) {
    const salt = crypto.randomBytes(16).toString('hex');
    const derivedKey = crypto.scryptSync(password, salt, 64).toString('hex');
    return `${salt}:${derivedKey}`;
}

/**
 * Verifies a plaintext password against a stored salt:hash string.
 */
export function verifyPassword(password, storedHash) {
    if (!storedHash || typeof storedHash !== 'string') return false;
    const parts = storedHash.split(':');
    if (parts.length !== 2) return false;
    const [salt, expectedKey] = parts;

    try {
        const derivedKey = crypto.scryptSync(password, salt, 64).toString('hex');
        const keyBuffer = Buffer.from(derivedKey, 'hex');
        const expectedBuffer = Buffer.from(expectedKey, 'hex');
        if (keyBuffer.length !== expectedBuffer.length) return false;
        return crypto.timingSafeEqual(keyBuffer, expectedBuffer);
    } catch {
        return false;
    }
}

/**
 * Ensures at least one superuser exists on startup.
 */
function seedInitialSuperuser() {
    const checkStmt = db.prepare('SELECT COUNT(*) as count FROM users WHERE is_superuser = 1');
    const result = checkStmt.get();
    if (!result || result.count === 0) {
        const now = new Date().toISOString();
        const defaultUsername = 'admin';
        const defaultPassword = 'admin';
        const passwordHash = hashPassword(defaultPassword);

        const insertStmt = db.prepare(`
            INSERT INTO users (username, password_hash, is_superuser, created_at, updated_at)
            VALUES (?, ?, 1, ?, ?)
        `);
        insertStmt.run(defaultUsername, passwordHash, now, now);
        console.log(`[Auth DB] Superusuario inicial creado: "${defaultUsername}" / Contraseña: "${defaultPassword}"`);
    }
}

seedInitialSuperuser();

/**
 * Finds user by username.
 */
export function findUserByUsername(username) {
    if (!username) return null;
    const stmt = db.prepare('SELECT id, username, password_hash, is_superuser, created_at, updated_at FROM users WHERE username = ?');
    return stmt.get(username.trim());
}

/**
 * Finds user by id.
 */
export function findUserById(id) {
    if (!id) return null;
    const stmt = db.prepare('SELECT id, username, is_superuser, created_at, updated_at FROM users WHERE id = ?');
    const user = stmt.get(Number(id));
    if (!user) return null;
    return {
        ...user,
        is_superuser: Boolean(user.is_superuser)
    };
}

/**
 * Verifies credentials and returns user (without password_hash) if valid.
 */
export function authenticateUser(username, password) {
    const user = findUserByUsername(username);
    if (!user) return null;
    const isValid = verifyPassword(password, user.password_hash);
    if (!isValid) return null;

    const { password_hash, ...safeUser } = user;
    return {
        ...safeUser,
        is_superuser: Boolean(safeUser.is_superuser)
    };
}

/**
 * Creates a session token for a given user.
 */
export function createSession(userId, durationHours = 24 * 7) {
    const now = Date.now();
    // Purge expired sessions
    db.prepare('DELETE FROM sessions WHERE expires_at < ?').run(now);

    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = now + durationHours * 60 * 60 * 1000;

    const stmt = db.prepare('INSERT INTO sessions (token, user_id, expires_at) VALUES (?, ?, ?)');
    stmt.run(token, Number(userId), expiresAt);

    return { token, expiresAt };
}

/**
 * Validates a session token and returns associated user info.
 */
export function getSessionUser(token) {
    if (!token) return null;
    const now = Date.now();

    const stmt = db.prepare(`
        SELECT u.id, u.username, u.is_superuser, u.created_at, u.updated_at, s.expires_at
        FROM sessions s
        JOIN users u ON s.user_id = u.id
        WHERE s.token = ?
    `);
    const row = stmt.get(token);

    if (!row) return null;

    if (row.expires_at < now) {
        // Expired
        deleteSession(token);
        return null;
    }

    return {
        id: row.id,
        username: row.username,
        is_superuser: Boolean(row.is_superuser),
        created_at: row.created_at,
        updated_at: row.updated_at
    };
}

/**
 * Deletes a session token (logout).
 */
export function deleteSession(token) {
    if (!token) return;
    const stmt = db.prepare('DELETE FROM sessions WHERE token = ?');
    stmt.run(token);
}

/**
 * Lists all users (excluding password hashes).
 */
export function listAllUsers() {
    const stmt = db.prepare('SELECT id, username, is_superuser, created_at, updated_at FROM users ORDER BY id ASC');
    const users = stmt.all();
    return users.map(u => ({
        ...u,
        is_superuser: Boolean(u.is_superuser)
    }));
}

/**
 * Creates a new user.
 */
export function createUser({ username, password, is_superuser = false }) {
    const trimmedUsername = (username || '').trim();
    if (!trimmedUsername) {
        throw new Error('El nombre de usuario no puede estar vacío.');
    }
    if (!password || password.length < 3) {
        throw new Error('La contraseña debe tener al menos 3 caracteres.');
    }

    const existing = findUserByUsername(trimmedUsername);
    if (existing) {
        throw new Error(`El usuario "${trimmedUsername}" ya existe.`);
    }

    const passwordHash = hashPassword(password);
    const now = new Date().toISOString();

    const stmt = db.prepare(`
        INSERT INTO users (username, password_hash, is_superuser, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?)
    `);
    const result = stmt.run(trimmedUsername, passwordHash, is_superuser ? 1 : 0, now, now);

    return {
        id: Number(result.lastInsertRowid),
        username: trimmedUsername,
        is_superuser: Boolean(is_superuser),
        created_at: now,
        updated_at: now
    };
}

/**
 * Updates an existing user.
 */
export function updateUser(id, { username, password, is_superuser }) {
    const user = findUserById(id);
    if (!user) {
        throw new Error('Usuario no encontrado.');
    }

    const updates = [];
    const params = [];
    const now = new Date().toISOString();

    if (username !== undefined) {
        const trimmedUsername = username.trim();
        if (!trimmedUsername) {
            throw new Error('El nombre de usuario no puede estar vacío.');
        }
        const existing = findUserByUsername(trimmedUsername);
        if (existing && existing.id !== Number(id)) {
            throw new Error(`El nombre de usuario "${trimmedUsername}" ya está en uso.`);
        }
        updates.push('username = ?');
        params.push(trimmedUsername);
    }

    if (password !== undefined && password !== null && password !== '') {
        if (password.length < 3) {
            throw new Error('La nueva contraseña debe tener al menos 3 caracteres.');
        }
        updates.push('password_hash = ?');
        params.push(hashPassword(password));
    }

    if (is_superuser !== undefined) {
        // Prevent demoting the only superuser
        if (user.is_superuser && !is_superuser) {
            const superusersCount = db.prepare('SELECT COUNT(*) as count FROM users WHERE is_superuser = 1').get().count;
            if (superusersCount <= 1) {
                throw new Error('No puedes quitar el rol de superusuario al único superusuario del sistema.');
            }
        }
        updates.push('is_superuser = ?');
        params.push(is_superuser ? 1 : 0);
    }

    if (updates.length === 0) {
        return user;
    }

    updates.push('updated_at = ?');
    params.push(now);
    params.push(Number(id));

    const sql = `UPDATE users SET ${updates.join(', ')} WHERE id = ?`;
    db.prepare(sql).run(...params);

    return findUserById(id);
}

/**
 * Deletes a user by id.
 */
export function deleteUser(id) {
    const user = findUserById(id);
    if (!user) {
        throw new Error('Usuario no encontrado.');
    }

    if (user.is_superuser) {
        const superusersCount = db.prepare('SELECT COUNT(*) as count FROM users WHERE is_superuser = 1').get().count;
        if (superusersCount <= 1) {
            throw new Error('No puedes eliminar al único superusuario del sistema.');
        }
    }

    const stmt = db.prepare('DELETE FROM users WHERE id = ?');
    stmt.run(Number(id));
    return { success: true };
}
