var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  // This is what happens when server hears someone clicks a box.
  socket.on('box message', function(msg,color){
    io.emit('box message', msg, color);
  });

  // This is what happens when servers hears that someone started the game.
  socket.on('start message', function() {
    // emit start message to everyone
    io.emit('start message');
    // start the timer
    var timerElment = document.getElementById('timer')
    // when timer runs out sent stop message to everyone
    io.emit('stop message');
  });
});

http.listen(80, function(){
  console.log('listening on *:80');
});
