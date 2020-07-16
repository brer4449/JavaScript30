const video = document.querySelector(".player");
const canvas = document.querySelector(".photo");
const ctx = canvas.getContext("2d");
const strip = document.querySelector(".strip");
const snap = document.querySelector(".snap");

function getVideo() {
  // this is how we access users' webcam
  // this returns a promise!
  navigator.mediaDevices
    .getUserMedia({ video: true, audio: false })
    .then((localMediaStream) => {
      // localMediaStream is returned by the promise
      // set the source of the video to localMediaStream
      // need to run localMediaStream as a URL, since it's currently an object
      // this line of code converts the mediaStream into something that this video player can understand
      video.srcObject = localMediaStream;
      video.play();
    })
    .catch((err) =>
      console.error(
        `Hey bozo! Try allowing your webcam, then you won't get this ${err} error`
      )
    );
}

function paintToCanvas() {
  // videoWidth & videoHeight both undefined.....
  const width = video.videoWidth;
  const height = video.videoHeight;

  console.log(width, height);
}

getVideo();
paintToCanvas();
