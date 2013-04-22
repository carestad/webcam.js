var webcam = function(conf) {
  var video = conf.video || false;
  var canvas = document.createElement('canvas');
  var c2d = canvas.getContext('2d') || false;
  var callback = conf.callback || false;
  var failure = conf.failure || function(){};

  navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia || navigator.msGetUserMedia || false;
  window.URL = window.URL || window.webkitURL || window.mozURL || window.msURL || false;

  if (video && callback) {
    var failure = function(e) {
      failure(e);
    };

    var success = function(stream) {
      if (video.mozSrcObject !== undefined) {
        video.mozSrcObject = stream;
      }
      else {
        video.src = (window.URL && window.URL.createObjectURL(stream)) || stream;
      }

      callback(video, canvas, stream);
    }

    navigator.getUserMedia({'video':true}, success, failure);
  }
}
