const ANGLES_PER_MINUTE = 360 / 60
const minutesBar = document.querySelector('.minutes-bar')

let timer = 0
let angleRad = 90
let seconds = 0
let lastTimestamp = 0

const tick = (timestamp) => {
    if (!lastTimestamp || timestamp - lastTimestamp >= 1000) {
        lastTimestamp = timestamp
        angleRad += ANGLES_PER_MINUTE
        seconds += 1
        console.log(`${seconds}s`)
        minutesBar.style.transform = `rotate(${angleRad}deg)`
    }

    requestAnimationFrame(tick)
}

requestAnimationFrame(tick)