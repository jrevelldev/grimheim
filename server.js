const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = parseInt(process.env.PORT || '8080', 10);
const PUBLIC_DIR = __dirname;

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

const server = http.createServer((req, res) => {
    // Enable CORS for local testing if needed
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Decode URI path
    let reqUrl;
    try {
        reqUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
    } catch {
        res.writeHead(400);
        return res.end('Bad Request');
    }

    let filePath = path.join(PUBLIC_DIR, decodeURIComponent(reqUrl.pathname));

    // Prevent directory traversal
    if (!filePath.startsWith(PUBLIC_DIR)) {
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
                    res.end('<h1>404 - No Encontrado</h1><p><a href="/">Volver a Rosterheim</a></p>');
                } else {
                    res.writeHead(500);
                    res.end(`Server Error: ${readErr.code}`);
                }
                return;
            }

            const ext = path.extname(filePath).toLowerCase();
            const contentType = MIME_TYPES[ext] || 'application/octet-stream';

            res.writeHead(200, {
                'Content-Type': contentType,
                'Cache-Control': 'no-cache, no-store, must-revalidate'
            });
            res.end(content);
        });
    });
});

server.listen(PORT, '0.0.0.0', () => {
    console.log(`=======================================================`);
    console.log(`   ROSTERHEIM (LOCAL EN CASTELLANO) SERVIDOR ACTIVO   `);
    console.log(`=======================================================`);
    console.log(`  > Local:   http://localhost:${PORT}`);
    console.log(`  > IP:      http://127.0.0.1:${PORT}`);
    console.log(`=======================================================`);
});

server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.error(`El puerto ${PORT} ya está en uso. Probando puerto ${PORT + 1}...`);
        server.listen(PORT + 1, '0.0.0.0');
    } else {
        console.error('Error del servidor:', err);
    }
});
