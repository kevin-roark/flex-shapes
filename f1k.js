
var frampton = require('./dist/web-frampton');
var mediaConfig = require('./shapes_config.json');
var jsonMidi = require('./f1k.json');
var finder = new frampton.MediaFinder(mediaConfig);

var renderer = new frampton.WebRenderer({
  mediaConfig: mediaConfig
});

var track = jsonMidi.tracks[0];
var noteToVideoMap = buildNoteToVideoMap(track);

var initialDelay = 2000;
var accumulatedDelay = initialDelay;
var delayBetweenTracks = track[track.length - 1].time + track[track.length - 1].duration;

for (var i = 0; i < 20; i++) {
  track.forEach(function(el) {
    var video = getVideoForMidiElement(el);

    var segment = new frampton.VideoSegment(video);
    segment
      .setStartTime(9)
      .setDuration(el.duration / 1000);

    renderer.scheduleSegmentRender(segment, accumulatedDelay + el.time);
  });

  accumulatedDelay += delayBetweenTracks;
}

function getVideoForMidiElement(el) {
  // method 1: use the noteToVideoMap
  return noteToVideoMap[el.noteNumber];
}

function buildNoteToVideoMap(track) {
  var map = {};

  var currentVideoIdx = 0;
  track.forEach(function(el) {
    if (!map[el.noteNumber]) {
      map[el.noteNumber] = mediaConfig.videos[currentVideoIdx];
      currentVideoIdx = (currentVideoIdx + 1) % mediaConfig.videos.length;
    }
  });

  return map;
}
