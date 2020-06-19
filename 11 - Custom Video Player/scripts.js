/******************** ADD FULLSCREEN BUTTON **********************/

/* Get our elements*/
const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress__filled");
const toggle = player.querySelector(".toggle");
const skipButtons = player.querySelectorAll("[data-skip]");
const ranges = player.querySelectorAll(".player__slider");

/* Build our functions*/
// My way!
// let paused = true;
// function togglePlay() {
//   paused = !paused;
//   if (paused === false) {
//     video.play();
//   } else if (paused === true) {
//     video.pause();
//   }
// }
// apparently there's a paused property on videos.... so... but my way still works!! =D
function togglePlay() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
  // // can also use a ternary operator:
  // const method = video.paused ? "play" : "paused";
  // // in brackets we're accessing the method name, and since it's a string can just tack on () to have it called!
  // video[method]();
}

function updateButton() {
  // this is bound to video itself
  const icon = video.paused ? "▶" : "❚❚";
  toggle.textContent = icon;
}

function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
  // My way!
  // if (this.name === "playbackRate") {
  //   video.playbackRate = this.value;
  // } else if (this.name === "volume") {
  //   video.volume = this.value;
  // }
  video[this.name] = this.value;
}

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
  // offset width is width of whole thing
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
  console.log(e);
}

/* Hook up our event listeners */
video.addEventListener("click", togglePlay);
video.addEventListener("play", updateButton);
video.addEventListener("pause", updateButton);
// listen for time update event
video.addEventListener("timeupdate", handleProgress);
toggle.addEventListener("click", togglePlay);
skipButtons.forEach((button) => button.addEventListener("click", skip));
ranges.forEach((range) => range.addEventListener("change", handleRangeUpdate));
progress.addEventListener("click", scrub);
let mousedown = false;
// first checks mousedown var, if it's true, it moves on to next thing ie scrub(e)
progress.addEventListener("mousemove", (e) => mousedown && scrub(e));
progress.addEventListener("mousedown", () => (mousedown = true));
progress.addEventListener("mouseup", () => (mousedown = false));
