# AR Web interfaces
[Demo](https://λ.name/track)

![GIF](http://csclub.uwaterloo.ca/~azvorygi/tracking.gif)

Embed web interfaces into a video using object tracking.

This is not currently packaged for use, I was just racing to a proof-of-concept.


### How this works

Once per video:

Object tracking in python -> output in some format -> `corners-to-corners.js` -> creates a `trackArr` variable, tuple of [portion of video completed, ...points]

Each time your website runs:

use `trackArr` in `setTrackPos` to set CSS3 `matrix3d` transform onto the element you want tracked onto the video. Do this more than 60 times a second. Voila, you got something.

