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
  } else if (req.url === '/style.css') {
    // CSS 파일에 대한 요청 처리 (CSS 파일을 제공)
    res.writeHead(200, { 'Content-Type': 'text/css' });
    fs.readFile('./static/style.css', function(err, data) {
      if (err) {
        console.error('CSS 파일을 읽지 못했습니다.');
      } else {
        res.end(data);
      }
    });
  } else {
    // 알 수 없는 요청에 대한 응답 처리
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
}).listen(`${8080}`, (err) => {
  console.log(`서버 가동중 확인 -> http://localhost:${8080}/`);
});