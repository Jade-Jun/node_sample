/**
 * events 모듈과 EventEmitter클래스를 이용하여 이벤트와 이벤트핸들러를 연동(bind) 시킬수 있다.
 */
var events = require("events");
var eventsEmitter = new events.EventEmitter();

/**
 * handler function create
 */
var eventHandler = function connected( ) {
    console.log("connected successful");
    eventsEmitter.emit("data_received");
}

// handler와 event를 연동
eventsEmitter.on("connection",  eventHandler);

/**
 * data received event 관련 함수 구현
 * 함수를 변수안에 담는 대신,  .on() 메소드의 인자를 직접 함수를 전달
 */
eventsEmitter.on("data_received", function(){
    console.log('data received');
});

// connection event 발생
eventsEmitter.emit("connection");

console.log('program has ended');