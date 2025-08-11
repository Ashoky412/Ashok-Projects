const http = require('http'); const port = 9090;
http.createServer((req,res)=>{res.end('Ashok Projects '+new Date().toISOString())})
.listen(port, ()=>console.log('Listening on', port));
