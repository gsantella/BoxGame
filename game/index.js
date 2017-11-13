var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var colorArray = ['red', 'blue', 'green', 'orange', 'yellow'];

app.get('/', function(req, res){
res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){

  // Gives user the color
  var myColor = colorArray.pop();

  // Emits the color to the player
  socket.emit('color message', myColor);
  
  /*
  socket.on('box message', function(msg,color){
    io.emit('box message', msg, color);
  });*/

  socket.on('box message', function(msg){
    // Emits the bos click to all other sockets
    io.emit('box message', msg, myColor);

  });
  ///////////////////////////////////////////////

  socket.on('startButton', function(){
    io.emit('startButton');
  });

  socket.on('stopButton', function(){
    io.emit('stopButton');
  });

});

http.listen(80, function(){
  console.log('listening on *:80');
});
