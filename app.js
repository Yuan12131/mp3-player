const http = require('http');
const fs = require('fs');

http.createServer(function(request, require){

  if (req.method === 'GET'&& req.url === '/'){
    response.writeHead(200, {'Content-Type' : 'text-html'})
    fs.readFile("./static/mp3.html", function(err, data){
      if(err){
        console.error("파일을 읽지 못했습니다.")
      } else {
        response.end(data)
      }
    })
  }
}).listen(8019);