var http = require('http');

/**
 * http request option setting
 */
var options = {
    host : 'localhost',
    port : 8081,
    path : "/main/view/index.html"
}

// callback 함수로 response를 받아옴
var callback = function(response) {
    var body = '';
    /**
     * response 이벤트가 감지되면 데이터를 body로 받아옴
     */
    response.on('data', function(data){
        body += data;
    });

    /**
     * end 이벤트가 감지되면 데이터 수신을 종료하고 내용을 출력함.
     */
    response.on('end', function() {
        console.log(body);
    });
}

/**
 * 서버에 http request를 날린다.
 */
var req = http.request(options, callback);
req.end();