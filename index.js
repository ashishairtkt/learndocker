const http = require("http");

const port = process.env.port || 3000;

const server = http.createServer((req, res) => {
  res.writeHead(200, { "content-type": "text/html; charset=utf-8" });
  res.end(`<h1>hello from node inside docker!</h1>
        
        <p>Path:${req.url}</p>`);
});

server.listen(port, () => {
  console.log(`server running on port ${port}`);
});
