const http = require('http');
const fs = require('fs');

http.createServer(function(req, res){

  if (req.method === 'GET'&& req.url === '/'){
    res.writeHead(200, {'Content-Type' : 'text-html'})
    fs.readFile("./static/mp3.html", function(err, data){
      if(err){
        console.error("파일을 읽지 못했습니다.")
      } else {
        res.end(data)
      }
    })
  }
}).listen(`${8080}`, (err) => {
  console.log(`서버 가동중 확인 -> http://localhost:${8080}/`);
});