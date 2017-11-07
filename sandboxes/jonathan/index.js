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
  socket.emit('color message', myColor);

  socket.on('box message', function(msg){
    io.emit('box message', msg, color);
  });

  socket.on('color add message', function(color){
    colorArray.push(color);
  });

  socket.on('disconnect', function() {
    var colorArrayOriginal = ['red', 'blue', 'green', 'orange', 'yellow'];

    socket.emit('test', colorArrayOriginal);
  });
});


http.listen(80, function(){
  console.log('listening on *:80');
});
