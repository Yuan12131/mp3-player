const http = require('http');

http.createServer(function(request, require){

  let writeHeadObject = {
    'Content-Type' : 'text-html'
  }

  response.writeHead(200, writeHeadObject)

  fs.readFile("./static/mp3.html", function(err, data){
    if(err){
      console.error("파일을 읽지 못했습니다.")
    } else {
      response.end(data)
    }
  })
}).listen(8019);