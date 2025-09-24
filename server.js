const http = require('http');
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'index.html');

const server = http.createServer((req, res) => {
    // Handle API request
  if (req.url === '/api/ping') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'pong' }));
    return;
  }
    // Serve the HTML file for root requests
  if (req.url === '/' || req.url === '/index.html') {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
        return;
      }
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(data);
    });
    return;
  }

  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end('404 Not Found');
});

server.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
