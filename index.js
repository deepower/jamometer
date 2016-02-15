'use strict';

var Max4Node = require('max4node');

var max = new Max4Node();
max.bind();

var liveTrackID;

// Where to look for clip names in Live
const jamometerTrack = 'Jamometer';

function getTrackName(trackId) {
  return max.promise().get({
    path: 'live_set tracks '+trackId,
    property: 'name'
  })
}

function getTracksCount() {
  return max.promise().count({
    path: 'live_set',
    property: 'tracks'
  })
}

getTracksCount()
  .then(tracksCount => {
    let trackNums = [];
    for (let i = 0; i < tracksCount; i++) {
      trackNums.push(i);
    }
    return Promise.all(trackNums.map(getTrackName));
  })
  .then(trackNames => {
    for (var i = 0; i < trackNames.length; i++) {
      if (trackNames[i] == jamometerTrack) {
        liveTrackID = i;
      }
    }
    return liveTrackID;
  })
  .then(getClipsCount)
  .then(clipsLength => {
    let clipNums = [];
    for (let i = 0; i < clipsLength; i++) {
      clipNums.push(i);
    }
    return Promise.all(clipNums.map(getClipName));
  })
  .then(clipNames => {
    console.log('clipNames='+clipNames);
    return clipNames;
  })
  .then(getPlayingClipIndex)
  .then(clipId => {
    console.log('playing clip number '+clipId);
  })

function getClipName(clipId) {
  return max.promise().get({
    path: 'live_set tracks '+liveTrackID+' clip_slots '+clipId+' clip',
    property: 'name'
  })
}

function getClipsCount(trackId) {
  return max.promise().count({
    path: 'live_set tracks '+liveTrackID,
    property: 'clip_slots'
  })
}

function getPlayingClipIndex() {
  return max.promise().get({
    path: 'live_set tracks '+liveTrackID,
    property: 'playing_slot_index'
  })
}

// Load the http module to create an http server.
var http = require('http');

// Configure our HTTP server to respond with Hello World to all requests.
var server = http.createServer(function (request, response) {
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.end('Hurray! '+ '\n');
});

// Listen on port 8000, IP defaults to 127.0.0.1
server.listen(8000);

// Put a friendly message on the terminal
console.log("Server started at http://127.0.0.1:8000/");
