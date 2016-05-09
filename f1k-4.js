
var frampton = require('../frampton/dist/web-frampton');
var mediaConfig = require('./shapes_config.json');
var finder = new frampton.MediaFinder(mediaConfig);

var drumline1 = require('./drumline1.json').tracks[0];
var drumline2 = require('./drumline2.json').tracks[0];

var initialDelay = 2000;
var accumulatedDelay = initialDelay;

var renderer = new frampton.WebRenderer({
  mediaConfig: mediaConfig
});

var tracks = [drumline1, drumline2];
var colors;

tracks.forEach(function(track, trackIndex) {
  track.forEach(function(el, elIndex) {
    if (!colors || elIndex % 100 === 0) {
      colors = [generateBackgroundColor(), generateBackgroundColor(), generateBackgroundColor()];
    }

    var video = getVideo(el, trackIndex);

    var div = document.createElement('div');
    div.style.position = 'fixed';
    div.style.width = '33%';
    div.style.height = '50%'; div.style.top = '25%';

    switch (el.noteNumber) {
      case 38:
        div.style.left = '0';
        div.style.background = colors[0];
        break;

      case 36:
        div.style.left = '33%';
        div.style.background = colors[1];
        break;

      case 42:
        div.style.left = '66.7%';
        div.style.background = colors[2];
        break;
    }

    setTimeout(function() {
      document.body.appendChild(div);
      setTimeout(function() {
        document.body.removeChild(div);
      }, el.duration);
    }, accumulatedDelay + el.time);
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

function generateBackgroundColor() {
  return randomBrightColor();
}

function randomBrightColor() {
  var key = Math.floor(Math.random() * 6);

  if (key === 0)
    return "rgb(" + "0,255," + v() + ")";
  else if (key === 1)
    return "rgb(" + "0," + v() + ",255)";
  else if (key === 2)
    return "rgb(" + "255, 0," + v() + ")";
  else if (key === 3)
    return "rgb(" + "255," + v() + ",0)";
  else if (key === 4)
    return "rgb(" + v() + ",255,0)";
  else
    return "rgb(" + v() + ",0,255)";

  function v() {
    return Math.floor(Math.random() * 256);
  }
}
