const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path'); 

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  const filePath = path.join(__dirname, pathname); 

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/html' });
      res.end("404 Not Found");
    } else {
      const contentType = getContentType(pathname);
      res.writeHead(200, { 'Content-Type': contentType });
      res.write(data);
      res.end();
    }
  });
});

function getContentType(filePath) {
  const extname = path.extname(filePath);
  switch (extname) {
    case '.html':
      return 'text/html';
    case '.css':
      return 'text/css';
    case '.js':
      return 'text/javascript';
    default:
      return 'application/octet-stream';
  }
}

server.listen(8080, () => {
  console.log("Server is running at http://localhost:8080/index.html");
});