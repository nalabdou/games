function animate() {
    ctx3.clearRect(0, 0, canvas1.width, canvas1.height)
    ctx3.clearRect(0, 0, canvas2.width, canvas2.height)
    ctx3.clearRect(0, 0, canvas3.width, canvas3.height)
    ctx3.clearRect(0, 0, canvas4.width, canvas4.height)
    ctx3.clearRect(0, 0, canvas5.width, canvas5.height)
    hadleRipples()
    ctx2.drawImage(background1, 0, 0, canvas1.width, canvas1.height)
    hadleParticles()
    handleObstacles()
    frogger.draw()
    frogger.update()
    handleScoreBoard()
    ctx4.drawImage(background2, 0, 0, canvas1.width, canvas1.height)
    frame++
    requestAnimationFrame(animate)

}
animate()


function scored() {
    if (soundTrue) {
        scoreSound.play()
    }
    score++
    gameSpeed += 0.3
    frogger.x = canvas1.width / 2 - frogger.width / 2
    frogger.y = canvas1.height - frogger.height - 40
}

function handleScoreBoard() {
    ctx4.fillStyle = 'black'
    ctx4.strokeStyle = 'black'
    ctx4.font = '15px verdana'
    ctx4.strokeText('Score', 265, 15)
    ctx4.font = '60px verdana'
    ctx4.fillText(score, 270, 65)
    ctx4.font = '15px verdana'
    ctx4.strokeText(`collisions : ${collisionsCount}`, 10, 175)
    ctx4.strokeText(`game speed : ${gameSpeed.toFixed(1)}`, 10, 195)
}


function collision(first, second) {
    return !(
        first.x > second.x + second.width ||
        first.x + first.width < second.x ||
        first.y > second.y + second.height ||
        first.y + first.height < second.y
    )
}

function resetGame() {
    frogger.x = canvas1.width / 2 - frogger.width / 2
    frogger.y = canvas1.height - frogger.height - 40
    score = 0
    collisionsCount++
    gameSpeed = 1
}

window.addEventListener('keydown', (event) => {
    keys = []
    keys[event.code] = true
    if (keys['ArrowLeft'] || keys['ArrowUp'] || keys['ArrowRight'] || keys['ArrowDown']) {
        frogger.jump()
    }
})

window.addEventListener('keyup', (event) => {
    delete keys[event.code]
    frogger.moving = false
    frogger.frameX = 0
})
soundController.addEventListener('click', (e) => {
    soundController.setAttribute('data-sound', !soundTrue)
    soundTrue = !soundTrue
})
