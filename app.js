const http = require('http');
const fs = require('fs');
const path = require('path'); //Node.js에서 파일 및 디렉토리 경로를 처리하는 데 사용되는 내장 모듈인 "path" 모듈을 가져온 것

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
  } else if (req.url === '/songOne.mp3' || req.url === '/songTwo.mp3' || req.url === '/songThree.mp3') {
    // MP3 파일에 대한 요청 처리 (MP3 파일을 스트리밍으로 제공)
    const filePath = path.join(__dirname, req.url.slice(1)); // 파일 경로 생성
    const stat = fs.statSync(filePath);
    res.writeHead(200, {
      'Content-Type': 'audio/mpeg',
      'Content-Length': stat.size,
    });
    const readStream = fs.createReadStream(filePath);
    readStream.pipe(res);
  } else {
    // 알 수 없는 요청에 대한 응답 처리
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
}).listen(`${8019}`, (err) => {
  console.log(`서버 가동중 -> http://localhost:${8019}/`)
});
