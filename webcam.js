var video = document.querySelector('video');
var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');
var img = document.querySelector('img');
var link = document.createElement('a');
var hasUserMedia = function() {
    if (!navigator.getUserMedia) {
        navigator.getUserMedia = navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia || navigator.msGetUserMedia;
    }
    if (!window.URL) {
        window.URL = window.webkitURL || window.mozURL;
    }
    return !!(navigator.getUserMedia);
}

if (hasUserMedia()) {
    var failure = function(e) {
        console.log("Faaaaaaaail", e);
    };

    var success = function(stream) {
        video.src = window.URL.createObjectURL(stream);

        // Note: onloadedmetadata doesn't fire in Chrome when using it with getUserMedia.
        // See crbug.com/110938.
        video.onloadedmetadata = function(e) {
            console.log("metadata loaded");
        }
    }

    navigator.getUserMedia({video:true}, success, failure);

    video.addEventListener('click', function() {
        var width = this.videoWidth;
        var height = this.videoHeight;
        canvas.width = width;
        canvas.height = height;
        // draw webcam picture in canvas
        ctx.drawImage(video, 0, 0);
        // create data URL and insert into <img/>
        img.src = canvas.toDataURL('image/png');
        // download picture when clicking on it
        img.onclick = function() {
            // set filename
            link.setAttribute('download', 'webcam-'+location.hostname+'-'+Date.now()+'.png');
            link.href = canvas.toDataURL('image/png');
            link.click();
        };
    }, false);
}
else {
    alert("your browser seems to be out of date and does not support the use of navigator.getUserMedia()");
}
