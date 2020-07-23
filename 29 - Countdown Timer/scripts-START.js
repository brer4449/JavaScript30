// need to put interval in this variable so we can clear interval later
let countdown;
const timerDisplay = document.querySelector(".display__time-left");
const endTime = document.querySelector(".display__end-time");
const buttons = document.querySelectorAll("[data-time]");

/************* Add animation or interaction or add some features with hours or something! ************/

function timer(seconds) {
  // clear any existing timers
  clearInterval(countdown);
  // setInterval is a bit wonky when you tab out, it pauses and on IOS when you're scrolling it will pause all intervals that are running
  // find out when the timer started
  const now = Date.now();
  // now is going to be in milliseconds so need to convert seconds to milliseconds
  // then is the end time
  const then = now + seconds * 1000;
  // running displayTimeLeft here since our interval takes a second to actually run, so displaying it right off the bat so it shows the second we're starting with
  displayTimeLeft(seconds);
  displayEndTime(then);
  // okay to user interval here since we're not worried about it running every single second if something happens, ie. if it were to skip two seconds it would update two seconds later
  countdown = setInterval(() => {
    // need to figure out how much time is left on the clock
    // can't plug in our variable now since that was when we started the function, need to convert from milliseconds
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    // check if we should stop it!
    if (secondsLeft < 0) {
      clearInterval(countdown);
      return;
    }
    //display it
    displayTimeLeft(secondsLeft);
  }, 1000);
}

function displayTimeLeft(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainderSeconds = seconds % 60;
  // display time
  const display = `${minutes}:${
    remainderSeconds < 10 ? "0" : ""
  }${remainderSeconds}`;
  timerDisplay.textContent = display;
  document.title = display;
}

// timestamp is when we want to finish, our "then" time
function displayEndTime(timestamp) {
  // need to turn timestamp into a date
  const end = new Date(timestamp);
  const hour = end.getHours();
  const minutes = end.getMinutes();
  // const adjustedHour = hour > 12 ? hour - 12 : hour; // can put this in the curly brackets below
  endTime.textContent = `Be back at ${hour > 12 ? hour - 12 : hour}:${
    minutes < 10 ? "0" : ""
  }${minutes}`;
}

function startTimer() {
  const seconds = parseInt(this.dataset.time);
  timer(seconds);
}

buttons.forEach((button) => button.addEventListener("click", startTimer));
document.customForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const mins = this.minutes.value;
  console.log(mins);
  timer(mins * 60);
  this.reset();
});

// can use document.nameHere to grab that element!!!! so cool!
// ie. document.customForm
// and you can even nest them this way!!!
// ie. document.customForm.minutes
