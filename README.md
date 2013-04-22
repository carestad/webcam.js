webcam.js
---------

navigator.getUserMedia() userfriendly.

# Usage

```
 var success = function(video, canvas, stream) {
   video.play();
 }
 var failure = function(evt) {
   console.log("Stream failed", evt);
 }
 var notsupported = function(e) {
   console.log("Browser not supported", e);
 }
 webcam.js(success, failure, notsupported);
```

Check out webcam.html for a simple example.
