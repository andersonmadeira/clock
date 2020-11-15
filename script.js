var ANGLES_PER_SECOND = 360 / 60;
var ANGLES_PER_MINUTE = 360 / 60;
var ANGLES_PER_HOUR = 360 / 12;
var secondsHand = document.querySelector('.clock .seconds-hand');
var minutesHand = document.querySelector('.clock .minutes-hand');
var hoursHand = document.querySelector('.clock .hours-hand');
var clockFace = document.querySelector('.clock .face');
var timeLabel = document.querySelector('.clock .face .time-label');
var tickId = 0;
var secondsElapsed = 0;
var minutesElapsed = 0;
var hoursElapsed = 0;
var secondsHandAngle = 90;
var minutesHandAngle = 90;
var hoursHandAngle = 90;
var lastTimestamp = 0;

var setTime = function setTime() {
  var now = new Date();
  secondsElapsed = now.getSeconds();
  minutesElapsed = now.getMinutes();
  hoursElapsed = now.getHours();

  if (hoursElapsed >= 12) {
    hoursElapsed -= 12;
  }

  secondsHandAngle = 90 + secondsElapsed * ANGLES_PER_SECOND;
  minutesHandAngle = 90 + minutesElapsed * ANGLES_PER_MINUTE;
  hoursHandAngle = 90 + hoursElapsed * ANGLES_PER_HOUR;
};

var placeClockHands = function placeClockHands() {
  secondsHand.style.transform = "rotate(".concat(secondsHandAngle, "deg)");
  minutesHand.style.transform = "rotate(".concat(minutesHandAngle, "deg)");
  hoursHand.style.transform = "rotate(".concat(hoursHandAngle, "deg)");
};

var setupClockFace = function setupClockFace() {
  var angle = 90;

  for (var pos = 0; pos <= 29; pos++) {
    var bar = document.createElement('div');
    bar.classList.add('face-bar');

    if (pos % 5 === 0) {
      bar.classList.add('face-bar--big');
    }

    bar.style.transform = "rotate(".concat(angle, "deg)");
    clockFace.append(bar);
    angle += ANGLES_PER_SECOND;
  }
};

var getCurrentTimeFormatted = function getCurrentTimeFormatted() {
  return new Date().toLocaleTimeString();
};

var tick = function tick(timestamp) {
  if (!lastTimestamp || timestamp - lastTimestamp >= 1000) {
    lastTimestamp = timestamp;
    secondsHandAngle += ANGLES_PER_SECOND;
    secondsElapsed += 1;
    secondsHand.style.transform = "rotate(".concat(secondsHandAngle, "deg)");

    if (secondsElapsed === 60) {
      secondsElapsed = 0;
      minutesHandAngle += ANGLES_PER_MINUTE;
      minutesElapsed += 1;
      minutesHand.style.transform = "rotate(".concat(minutesHandAngle, "deg)");

      if (minutesElapsed === 60) {
        minutesElapsed = 0;
        hoursHandAngle += ANGLES_PER_HOUR;
        hoursElapsed += 1;
        hoursHand.style.transform = "rotate(".concat(hoursHandAngle, "deg)");

        if (hoursElapsed === 12) {
          hoursElapsed = 0;
          hoursHandAngle = 90;
          console.log("reseting clock");
        }
      }
    }

    timeLabel.textContent = getCurrentTimeFormatted();
  }

  tickId = requestAnimationFrame(tick);
};

var updateClock = function updateClock() {
  setTime();
};

var init = function init() {
  updateClock();
  setupClockFace();
  placeClockHands();
  window.addEventListener('focus', function () {
    return updateClock();
  });
  tickId = requestAnimationFrame(tick);
};

init();