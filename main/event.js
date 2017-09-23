/**
 * events 모듈과 EventEmitter클래스를 이용하여 이벤트와 이벤트핸들러를 연동(bind) 시킬수 있다.
 */
var events = require("events");

var eventsEmitter = new events.EventEmitter();