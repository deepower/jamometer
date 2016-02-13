var Max4Node = require('max4node');

var max = new Max4Node();
max.bind();

var clipsLength = undefined;
var clipNames = [];
var clipPlayingPosition;

// Get clip name in track 1
// Let's call this function getClipName
max.get({
  path: 'live_set tracks 1 clip_slots 0 clip',
  property: 'name'
})
.once('value', function(val) {
  console.log('Clip name: ' + val);
});

// Count clips
max.count({
  path: 'live_set tracks 1',
  property: 'clip_slots'
})
.once('value', function(count) {
  console.log(count + ' clips');
  clipsLength = count;
  for (var i = 0; i < clipsLength; i++) {
    // getClipName call should go here
    clipNames.push();
  }
});

// Fire the callback with the updated position of the clip (if it's playing).
max.observe({
  path: 'live_set tracks 1 clip_slots 0 clip',
  property: 'playing_position'
})
.on('value', function(val) {
  console.log('Playing position: ' + val);
  clipPlayingPosition = val;
});

// Load the http module to create an http server.
var http = require('http');

// Configure our HTTP server to respond with Hello World to all requests.
var server = http.createServer(function (request, response) {
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.end('Playing position: ' + clipPlayingPosition + '\n');
});

// Listen on port 8000, IP defaults to 127.0.0.1
server.listen(8000);

// Put a friendly message on the terminal
console.log("Server started at http://127.0.0.1:8000/");
