const http = require('http');
const fs = require('fs');
const path = require('path');
const port = 8080;

const htmlPath = path.join(__dirname, 'index.html');
const cssPath = path.join(__dirname, 'style.css');

http.createServer((request, response) => {
    if (request.url === '/') {
        fs.readFile(htmlPath, 'utf8', (err, htmlContent) => {
            if (err) {
                console.error('Error reading index.html:', err);
                response.writeHead(500, { 'Content-Type': 'text/plain' });
                response.end('Internal Server Error');
                return;
            }

            fs.readFile(cssPath, 'utf8', (err, cssContent) => {
                if (err) {
                    console.error('Error reading style.css:', err);
                    response.writeHead(500, { 'Content-Type': 'text/plain' });
                    response.end('Internal Server Error');
                    return;
                }

                response.writeHead(200, { 'Content-Type': 'text/html' });
                response.write(`<html><head><style>${cssContent}</style></head><body>${htmlContent}</body></html>`);
                response.end();
            });
        });
    } else {
        response.writeHead(404, { 'Content-Type': 'text/plain' });
        response.end('404 Not Found');
    }
}).listen(port);

console.log(`Server running at http://localhost:${port}/`);
