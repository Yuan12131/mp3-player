const http = require('http');
const fs = require('fs');
const path = require('path'); //Node.js에서 파일 및 디렉토리 경로를 처리하는 데 사용되는 내장 모듈인 "path"

http.createServer(function(req, res){

  if (req.method === 'GET'&& req.url === '/'){
    res.writeHead(200, {'Content-Type' : 'text-html'})
    fs.readFile("./static/index.html", function(err, data){
      if(err){
        console.error("파일을 읽지 못했습니다.")
      } else {
        res.end(data)
      }
    })
  } else if (req.url === '/style.css') {
    // CSS 파일에 대한 요청 처리
    res.writeHead(200, { 'Content-Type': 'text/css' });
    fs.readFile('./static/style.css', function(err, data) {
      if (err) {
        console.error('CSS 파일을 읽지 못했습니다.');
      } else {
        res.end(data);
      }
    });
  } else if (req.url === '/songOne.mp3' || req.url === '/songTwo.mp3' || req.url === '/songThree.mp3') {
    // MP3 파일에 대한 요청 처리

    // 디렉토리 경로와 파일 이름을 조합하여 최종 파일의 경로를 만듦 -> 실제로 서버에서 찾아야 하는 MP3 파일의 경로
    const filePath = path.join(__dirname, req.url.slice(1)); 

    // statSync : Node.js에서 파일 또는 디렉토리의 정보(메타데이터)를 동기적으로 읽어오는 메서드
    const stat = fs.statSync(filePath);
    res.writeHead(200, {
      'Content-Type': 'audio/mpeg',
      'Content-Length': stat.size,
    });
    
    // 파일을 조각조각 읽어오고, 응답으로 전송하는 과정을 처리

    // Node.js의 파일 시스템 모듈인 fs를 사용하여 파일을 읽는 스트림을 생성
    const readStream = fs.createReadStream(filePath);

    // 데이터를 처리한 후, 이를 원하는 곳으로 보내고 싶을 때 스트림을 pipe → 파일 스트림의 데이터를 응답 스트림(res)으로 보내는 것
    readStream.pipe(res);
  } else {
    // 알 수 없는 요청에 대한 응답 처리
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
}).listen(`${8019}`, (err) => {
  console.log(`서버 가동중 -> http://localhost:${8019}/`)
});
