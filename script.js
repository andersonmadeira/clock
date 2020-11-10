const ANGLES_PER_SECOND = 360 / 60
const ANGLES_PER_MINUTE = 360 / 60
const ANGLES_PER_HOUR = 360 / 12
const secondsHand = document.querySelector('.clock .seconds-hand')
const minutesHand = document.querySelector('.clock .minutes-hand')
const hoursHand = document.querySelector('.clock .hours-hand')
const clockFace = document.querySelector('.clock .face')
const timeLabel = document.querySelector('.clock .face .time-label')

let tickId = 0
let secondsElapsed = 0
let minutesElapsed = 0
let hoursElapsed = 0
let secondsHandAngle = 90
let minutesHandAngle = 90
let hoursHandAngle = 90

let lastTimestamp = 0

const setTime = () => {
    const now = new Date()

    secondsElapsed = now.getSeconds()
    minutesElapsed = now.getMinutes()
    hoursElapsed = now.getHours() 

    if (hoursElapsed >= 12) {
        hoursElapsed -= 12
    }

    secondsHandAngle = 90 + secondsElapsed * ANGLES_PER_SECOND
    minutesHandAngle = 90 + minutesElapsed * ANGLES_PER_MINUTE
    hoursHandAngle = 90 + hoursElapsed * ANGLES_PER_HOUR
}

const placeClockHands = () => {
    secondsHand.style.transform = `rotate(${secondsHandAngle}deg)`
    minutesHand.style.transform = `rotate(${minutesHandAngle}deg)`
    hoursHand.style.transform = `rotate(${hoursHandAngle}deg)`
}

const setupClockFace = () => {
    let angle = 90

    for (let pos = 0; pos <= 60; pos++) {
        const bar = document.createElement('div')
        
        bar.classList.add('face-bar')

        if (pos % 5 === 0) {
            bar.classList.add('face-bar--big')
        }

        bar.style.transform = `rotate(${angle + 90}deg)`
        clockFace.append(bar)

        angle += ANGLES_PER_SECOND
    }
}

const getCurrentTimeFormatted = () => 
    `${hoursElapsed}:${String(minutesElapsed).padStart(2, '0')}:${String(secondsElapsed).padStart(2, '0')}`

const tick = (timestamp) => {
    if (!lastTimestamp || timestamp - lastTimestamp >= 1000) {
        lastTimestamp = timestamp
        secondsHandAngle += ANGLES_PER_SECOND
        secondsElapsed += 1

        secondsHand.style.transform = `rotate(${secondsHandAngle}deg)`

        if (secondsElapsed === 60) {
            secondsElapsed = 0
            minutesHandAngle += ANGLES_PER_MINUTE
            minutesElapsed += 1
            
            minutesHand.style.transform = `rotate(${minutesHandAngle}deg)`

            if (minutesElapsed === 60) {
                minutesElapsed = 0
                hoursHandAngle += ANGLES_PER_HOUR
                hoursElapsed += 1

                hoursHand.style.transform = `rotate(${hoursHandAngle}deg)`

                if (hoursElapsed === 12) {
                    hoursElapsed = 0
                    hoursHandAngle = 90
                    console.log(`reseting clock`)
                }
            }
        }

        timeLabel.textContent = getCurrentTimeFormatted()
    }

    tickId = requestAnimationFrame(tick)
}

const updateClock = () => {
    setTime()
}


const init = () => {
    updateClock()
    setupClockFace()
    placeClockHands()

    window.addEventListener('focus', () => updateClock())

    tickId = requestAnimationFrame(tick)
}

init()
