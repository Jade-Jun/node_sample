var express = require('express');
var app = express();
var bodyParser = require('body-parser');

// session module을 이용하여 쿠키 접근 
var session = require('express-session');

// file read
var fs = require('fs');

/**
server가 읽을 수 있도록 html 위치 지정
 __dirname : 현재 모듈의 위치*/
app.set('views', __dirname + '/views');

// ejs엔진을 사용하도록 설정
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
var server = app.listen(3000, function() {
    console.log("express server has started on port 3000");
});

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded( {
    extended: true
}));

/**
 * secret : 쿠키를 임의로 변조하는것을 방지하기 위한 sign (원하는 값을 넣으면 됨)
 * resave : 세션을 언제나 저장할지 정하는 값 express-session documentation에서는 이 값을 false로 하는 것을 권장하고 필요에 따라 true함
 * saveUninitialized : uninitialized 세션이란 새로 생겼지만 변경되지 않은 세션을 의미 Documentation에서 이 값을 true로 설정하는 것을 권장.
 */
app.use(session({
    secret: '@#@$MYSIGN#@$#$',
    resave: false,
    saveUninitialized: true
}));

/**
 * 정적파일 사용 (html에서 사용되는 js 파일,  css파일, img파일)
 */
var router = require('./routes/main')(app, fs);