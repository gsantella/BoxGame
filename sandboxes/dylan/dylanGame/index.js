var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var colorArray = ['red', 'blue', 'green', 'orange', 'yellow'];

app.get('/', function(req, res){
res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){



  // Emits the color to the player
  socket.on('join message', function() {
    // Gives user the color
    var myColor = colorArray.pop();
    socket.emit('color message', myColor);

  });

  socket.on('show players', function(playerColor) {
    io.emit('show players', playerColor);
  });


  /*
  socket.on('box message', function(msg,color){
    io.emit('box message', msg, color);
  });*/

  socket.on('box message', function(msg, myColor){
    // Emits the bos click to all other sockets
    io.emit('box message', msg, myColor);

  });
  ///////////////////////////////////////////////

  socket.on('startButton', function(){
    io.emit('startButton');
  });

  socket.on('stopButton', function(){
    colorArray = ['red', 'blue', 'green', 'orange', 'yellow'];
    io.emit('stopButton');
  });

});

http.listen(80, function(){
  console.log('listening on *:80');
});
