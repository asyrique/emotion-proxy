// if (process.env.NODE_ENV !== 'production'){
//   require('longjohn');
// }
var filternet = require('filternet-cust');
var EventEmitter = require("events").EventEmitter;
var myProxy = filternet.createProxyServer({
  port: process.env.PROXY_PORT || 5000
});
var io = require('socket.io')(process.env.BROADCAST_PORT || 5001);
var gsr = io.of("/gsr");
gsr.on('connection', function(socket){
  console.log("Someone connected GSR");
});
var heartrate = io.of("/heartrate");
heartrate.on('connection', function(socket){
  console.log("Someone connected Heartrate");
});
var temp = io.of("/temp");
temp.on('connection', function(socket){
  console.log("Someone connected Temp");
});
var uv = io.of("/uv");
uv.on('connection', function(socket){
  console.log("Someone connected UV");
});
var lux = io.of("/lux");
lux.on('connection', function(socket){
  console.log("Someone connected Lux");
});
var stepcount = io.of("/stepcount");
stepcount.on('connection', function(socket){
  console.log("Someone connected Stepcount");
});
var motion = io.of("/motion");
motion.on('connection', function(socket){
  console.log("Someone connected Motion");
});

var chunky = new EventEmitter();
chunky.on("chunk", function(chunk){
  eval(decodeURIComponent(chunk.toString()));
  switch(data.A[0].Sensor) {
    case 1: {
      //console.log("Heartrate: " + data.A[0].Value);
      heartrate.emit('data', {type: "heartrate", date:Date.now(),value: data.A[0].Value});
      }
    break;
    case 2: {
      //console.log("Temperature: " + data.A[0].Value);
      temp.emit('data', {type: "temp", date:Date.now(),value: data.A[0].Value});
    }
    break;
    case 3: {
      //console.log("GSR: " + data.A[0].Value);
      gsr.emit('data', {type: "gsr", date:Date.now(),value: data.A[0].Value});
    }
    break;
    case 4: {
      //console.log("UV: " + data.A[0].Value);
      uv.emit('data', {type: "uv", date:Date.now(),value: data.A[0].Value});
    }
    break;
    case 5: {
      //console.log("LUX: " + data.A[0].Value);
      lux.emit('data', {type: "lux", date:Date.now(),value: data.A[0].Value});
    }
    break;
    case 6: {
      //console.log("Step Count: " + data.A[0].Value);
      stepcount.emit('data', {type: "stepcount", date:Date.now(),value: data.A[0].Value});
    }
    break;
    case 8: {
      //console.log("Motion: " + data.A[0].Value);
      motion.emit('data', {type: "motion", date:Date.now(),value: data.A[0].Value});
    }
    break;
    case 9: {
      //console.log("Battery: " + data.A[0].Value);
    }
    break;
    default: pass();
  }
});
myProxy.on("shouldReject", function(request, callback){
  if (request.headers.host === "bandbroadcaster.azurewebsites.net"){
    callback(false);
  } else {
    callback(true);
  }
});
myProxy.on("interceptRequest", function (requestOptions, callback) {
  callback(requestOptions, chunky);
});
myProxy.on("error", function(error){
  console.log("\x1b[31mCaught error: " + error + "\x1b[0m");
});
myProxy.on("clientError", function(error){
  console.log("\x1b[31mCaught client error: " + error + "\x1b[0m");
});
