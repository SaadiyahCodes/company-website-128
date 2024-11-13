// NOTE: muste change later, THIS IS ONLY FOR SETUP PURPOSES

const http = require('http');
const fs = require('fs');
const path = require('path');

// Function to serve static files (like index.html)
function serveStaticFile(res, filepath, contentType, statusCode = 200) {
    fs.readFile(filepath, (err, content) => {
        if (err) {
            res.writeHead(500);
            res.end('Error: Could not read file');
        } else {
            res.writeHead(statusCode, { 'Content-Type': contentType });
            res.end(content);
        }
    });
}

// Create the server
const server = http.createServer((req, res) => {
    if (req.method === 'GET' && req.url === '/') {
        // Serve the HTML file
        serveStaticFile(res, path.join(__dirname, 'public', 'index.html'), 'text/html');
    } else if (req.method === 'GET' && req.url === '/api/data') {
        // Serve JSON data
        fs.readFile(path.join(__dirname, 'data.json'), 'utf8', (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Server error' }));
            } else {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(data);
            }
        });
    } else {
        // 404 for other routes
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>404 Not Found</h1>');
    }
});

// Start the server on port 3000
server.listen(3000, () => {
    console.log('Server is listening on http://localhost:3000');
});
