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

  // Listening for click on box
  socket.on('box message', function(msg){
    // Emits the bos click to all other sockets
    io.emit('box message', msg, myColor);

  });

  // Test to add color back into array on player disconnect
  /*socket.on('color add message', function(color){
    console.log(color);
    //colorArray.push(color);
  });*/

  // Listening for tab/player disconnect
  socket.on('disconnect', function() {
    // Creates a version of the colorArray before players joined
    var colorArrayOriginal = ['red', 'blue', 'green', 'orange', 'yellow'];

    // Prints console message when user disconnects
    console.log('Disconneted');

    // Test //////////////////////////////////
    console.log(colorArray);

    for(var i = 0; i < colorArrayOriginal.length;i++) {
      if(!colorArray.includes(colorArrayOriginal[i])) {
        colorArray.push(colorArrayOriginal[i]);
        break;
      }
    }

    console.log(colorArray);


    // Test //////////////////////////////////

    /*// Loops through colorArrayOriginal
    colorArrayOriginal.forEach(function(element) {

      // Looks to see if element is missing from colorArray
      if(!colorArray.includes(element)) {
        // If element IS missing from color colorArray
        console.log(element);
        colorArray.push(element);
      }
      else { // If element is in the colorArray

      }

    });*/

  });

});


http.listen(80, function(){
  console.log('listening on *:80');
});
