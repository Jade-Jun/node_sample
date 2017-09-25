var http = require('http');
var fs = require('fs');
var url = require('url');

// server create
http.createServer( function (request, response){
    // url 뒤에 있는 디렉토리/파일이름 파싱
    var pathname = url.parse(request.url).pathname;

    console.log("request for " + pathname + " received");

    if ("/" == pathname){
        pathname = "/main/view/index.html";
    }

    // read file
    fs.readFile(pathname.substr(1), function(err, data) {
        if (err) {
            console.log(err);
            /**
             * 페이지를 못찾을 경우
             * http status : 404 : not found
             * Content type : text/html
             */
            response.writeHead(404, {'Content-Type': 'text/html'});
        } else {
            /**
             * 페이지 찾음
             * http status  : 200 ok
             * content type : text/html
             */
            response.writeHead(200, {'Content-Type': 'text/html'});

            // 파일을 읽어와서 responseBody에 파싱
            response.write(data.toString());
        }
        // responsebody 전송
        response.end();
    });
}).listen(8081);

console.log('server running at http://127.0.0.1:8081/');

// http://127.0.0.1:8081/ call로 테스트