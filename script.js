const ANGLES_PER_SECOND = 360 / 60
const ANGLES_PER_MINUTE = 360 / 60
const secondsHand = document.querySelector('.clock .seconds-hand')
const minutesHand = document.querySelector('.clock .minutes-hand')
const clockFace = document.querySelector('.clock .face')

let tickId = 0
let secondsHandAngle = 90
let minutesHandAngle = 90
let secondsElapsed = 0
let minutesElapsed = 0
let lastTimestamp = 0

const setupClockFace = () => {
    let angle = 90

    for (let pos = 0; pos <= 60; pos++) {
        const bar = document.createElement('div')
        bar.classList.add('face-bar')

        if (pos % 5 === 0) {
            bar.classList.add('face-bar--rounded')
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
        }
    }

    tickId = requestAnimationFrame(tick)
}

setupClockFace()

tickId = requestAnimationFrame(tick)