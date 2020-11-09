const ANGLES_PER_SECOND = 360 / 60
const ANGLES_PER_MINUTE = 360 / 60
const ANGLES_PER_HOUR = 360 / 12
const secondsHand = document.querySelector('.clock .seconds-hand')
const minutesHand = document.querySelector('.clock .minutes-hand')
const hoursHand = document.querySelector('.clock .hours-hand')
const clockFace = document.querySelector('.clock .face')

let tickId = 0
let secondsElapsed = 0
let minutesElapsed = 0
let hoursElapsed = 1
let secondsHandAngle = 90 + secondsElapsed * ANGLES_PER_SECOND
let minutesHandAngle = 90 + minutesElapsed * ANGLES_PER_MINUTE
let hoursHandAngle = 90 + hoursElapsed * ANGLES_PER_HOUR

let lastTimestamp = 0

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

const tick = (timestamp) => {
    if (!lastTimestamp || timestamp - lastTimestamp >= 1000) {
        lastTimestamp = timestamp
        secondsHandAngle += ANGLES_PER_SECOND
        secondsElapsed += 1
        console.log(`${secondsElapsed}s`)
        secondsHand.style.transform = `rotate(${secondsHandAngle}deg)`

        if (secondsElapsed === 60) {
            secondsElapsed = 0
            minutesHandAngle += ANGLES_PER_MINUTE
            minutesElapsed += 1
            console.log(`${minutesElapsed}m`)
            minutesHand.style.transform = `rotate(${minutesHandAngle}deg)`

            if (minutesElapsed === 60) {
                minutesElapsed = 0
                hoursHandAngle += ANGLES_PER_HOUR
                hoursElapsed += 1
                console.log(`${hoursElapsed}m`)
                hoursHand.style.transform = `rotate(${hoursHandAngle}deg)`

                if (hoursElapsed === 12) {
                    hoursElapsed = 0
                    hoursHandAngle = 90
                    console.log(`reseting clock`)
                }
            }
        }
    }

    tickId = requestAnimationFrame(tick)
}

setupClockFace()
placeClockHands()

tickId = requestAnimationFrame(tick)