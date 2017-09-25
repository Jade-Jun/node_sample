console.log("hello wolrd");

// 어플리케이션 모듈을 불러옴
var http = require("http");

http.createServer(function(request, response) {

    /**
     * http header 전송
     * http status : 200 (성공)
     * Content type : text / plain
     */
    response.writeHead(200, {'Content-Type' : 'text/plain'});

    /**
     * Response Body를 hellow world로 함
     */
    response.end("hellow world");
}).listen(8081);

console.log("server running at http://127.0.0.1:8081");