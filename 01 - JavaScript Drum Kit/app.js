function playSound(e) {
  const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`)
  const key = document.querySelector(`div[data-key="${e.keyCode}"]`)
  if (audio === null) {
    return
  } else {
    audio.currentTime = 0 // Rewind to start
    audio.play()
    key.classList.toggle("playing")
  }
}

function removeTransition(e) {
  if (e.propertyName !== "transform") return // Skip if it's not a transform
  this.classList.remove("playing")
}

const keys = document.querySelectorAll(".key")
keys.forEach(key => key.addEventListener("transitionend", removeTransition))

window.addEventListener("keydown", playSound);