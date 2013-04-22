var webcam = function(cbs, cbf, cbns) {
  var video = document.createElement('video');
  var canvas = document.createElement('canvas');
  var c2d = canvas.getContext('2d') || false;
  var cbf = (typeof failure == 'function') && cbf || function(){};
  var cbns = (typeof notsupported == 'function') && cbns || function(){};

  navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia || navigator.msGetUserMedia || false;
  window.URL = window.URL || window.webkitURL || window.mozURL || window.msURL || false;

  if (typeof cbs == 'function' && navigator.getUserMedia && window.URL) {
    var failure = function(e) {
      cbf(e);
    };

    var success = function(stream) {
      if (video.mozSrcObject !== undefined) {
        video.mozSrcObject = stream;
      }
      else {
        video.src = (window.URL && window.URL.createObjectURL(stream)) || stream;
      }

      cbs(video, canvas, stream);
    }

    navigator.getUserMedia({'video':true}, success, failure);
  }
  else {
    cbns();
  }
}
