const ANGLES_PER_SECOND = 360 / 60
const ANGLES_PER_MINUTE = 360 / 60
const secondsHand = document.querySelector('.seconds-hand')
const minutesHand = document.querySelector('.minutes-hand')

let tickId = 0
let secondsHandAngle = 90
let minutesHandAngle = 90
let secondsElapsed = 0
let minutesElapsed = 0
let lastTimestamp = 0

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

tickId = requestAnimationFrame(tick)