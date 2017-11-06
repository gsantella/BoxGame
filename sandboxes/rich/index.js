var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  socket.on('box message', function(msg,color){
    io.emit('box message', msg, color);
  });
});

http.listen(80, function(){
  console.log('listening on *:80');
});
