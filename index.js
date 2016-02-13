var Max4Node = require('max4node');

var max = new Max4Node();
max.bind();

var clipsLength = undefined;
var clipNames = [];

// Get clip name in track 1
// Let's call this function getClipName
max.get({
  path: 'live_set tracks 1 clip_slots 0 clip',
  property: 'name'
})
.once('value', function(val) {
  console.log('Clip name: ' + val);
  process.exit();
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
