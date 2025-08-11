const http = require('http');
const fs = require('fs');
const path = require('path');
const port = 9090;

http.createServer((req,res)=>{
  let p = req.url === '/' ? '/index.html' : req.url;
  let filePath = path.join(__dirname, p);
  fs.readFile(filePath, (err, data) => {
    res.writeHead(err ? 404 : 200, {'Content-Type': 'text/html'});
    res.end(err ? 'Not found' : data);
  });
}).listen(port, ()=>console.log('Listening on', port));
