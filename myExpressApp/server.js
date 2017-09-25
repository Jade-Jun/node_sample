var express = require('express');
var app = express();
var router = require('./routes/main')(app);

// server가 읽을 수 있도록 html 위치 지정
app.set('views', __dirname + '/views');

// ejs엔진을 사용하도록 설정
app.set('view engin', 'ejs');
app.engine('html', require('ejs').renderFile);
var server = app.listen(3000, function() {
    console.log("express server has started on port 3000");
});

app.use(express.static('public'));