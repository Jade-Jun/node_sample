var fs = require("fs");

/**
 * 동기식 코드
 */
// var data = fs.readdirSync('main/input.txt');
// console.log(data.toString());
// console.log("program has end")

/**
 * 비동기식 코드
 * readfile 함수는 비동기식으로 파일을 읽는 함수
 * 첫번째 값으로는 error 두번째 값으로는 data를 받음
 */
fs.readFile('main/input.txt', function(err, data) {
    if (err) return console.error(err);
    console.log(data.toString());
});

console.log('program has end');