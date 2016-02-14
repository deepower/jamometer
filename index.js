'use strict';

var Max4Node = require('max4node');

var max = new Max4Node();
max.bind();

var liveTrackID = 1;

function getClipName(clipId) {
  let pathLive = 'live_set tracks '+liveTrackID+' clip_slots '+clipId+' clip';
  return max.promise().get({
    path: pathLive,
    property: 'name'
  })
}

// Count clips
max.promise().count({
  path: 'live_set tracks '+liveTrackID,
  property: 'clip_slots'
})
.then(function(clipsLength) {
  let clipNums = [];
  for (let i = 0; i < clipsLength; i++) {
    clipNums.push(i);
  }

  // Let's get all names of clips
  Promise.all(clipNums.map(getClipName))
    .then(clipNames => {
      console.log('clipNames='+clipNames);
    });
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
