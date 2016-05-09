
var frampton = require('../frampton/dist/web-frampton');
var mediaConfig = require('./shapes_config.json');
var finder = new frampton.MediaFinder(mediaConfig);

var drumline1 = require('./drumline1.json').tracks[0];
var drumline2 = require('./drumline2.json').tracks[0];

var initialDelay = 2000;
var accumulatedDelay = initialDelay;
//var delayBetweenTracks = track[track.length - 1].time + track[track.length - 1].duration;

var renderer = new frampton.WebRenderer({
  mediaConfig: mediaConfig
});

var tracks = [drumline1, drumline2];
var startTimes;

tracks.forEach(function(track, trackIndex) {
  track.forEach(function(el, elIndex) {
    if (!startTimes || elIndex % 100 === 0) {
      startTimes = [generateStartTime(), generateStartTime(), generateStartTime()];
    }

    var video = getVideo(el, trackIndex);
    var segment = new frampton.VideoSegment(video);
    segment
      .setWidth('33%')
      .setTop('15%')
      .setDuration(el.duration / 1000);

    switch (el.noteNumber) {
      case 38:
        segment.setLeft('0%').setStartTime(startTimes[0]);
        break;

      case 36:
        segment.setLeft('33%').setStartTime(startTimes[1]);
        break;

      case 42:
        segment.setLeft('67%').setStartTime(startTimes[2]);
        break;
    }

    renderer.scheduleSegmentRender(segment, accumulatedDelay + el.time);
  });
});

function getVideo(el, trackIndex) {
  switch (el.noteNumber) {
    case 38:
      return trackIndex === 0 ? finder.findVideoWithPatern('-circle') : finder.findVideoWithPatern('-revcircle');
    case 36:
      return trackIndex === 0 ? finder.findVideoWithPatern('-square') : finder.findVideoWithPatern('-revsquare');
    case 42:
      return trackIndex === 0 ? finder.findVideoWithPatern('-triangle') : finder.findVideoWithPatern('-revtriangle');
  }
}

function generateStartTime() {
  return Math.random();
}
