var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var colorArray = ["red", "blue", "green", "orange", "yellow"];
var myColor = colorArray[Math.floor(Math.random() * colorArray.length)];


app.get('/', function(req, res){
res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){

// Gives user the color
socket.emit('color message', myColor)
console.log(colorArray.pop(myColor));

  socket.on('box message', function(msg){



    io.emit('box message', msg, color);

  });
});

http.listen(80, function(){
  console.log('listening on *:80');
});
