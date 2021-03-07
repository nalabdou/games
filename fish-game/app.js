// canvas setup
const canvas = document.getElementById('canvas1')
const ctx = canvas.getContext('2d')
canvas.width = 800
canvas.height = 500

const mouse = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    click: false
}
const bubbles = []
const replayImage = createImage('assets/images/replay.png')
const bubbleImage = createImage('assets/images/bubbles/one/frame_01.png')
const bubblePop1 = createSound('assets/sounds/bubblePop1.wav')
const bubblePop2 = createSound('assets/sounds/bubblePop2.ogg')
const background = createImage('assets/images/backgrounds/background01.png')
const enemyImage = createImage('assets/images/enemies/orange12.png')
const npcImage = createImage('assets/images/npc/diver.png')
const playerLeft = createImage('assets/images/players/green16left.png')
const playerRight = createImage('assets/images/players/green16right.png')
const gameOverSound = createSound('assets/sounds/GAMEOVER.wav')


let canvasPos = canvas.getBoundingClientRect()
let score = 0
let gameFrame = 0
let gameSpeed = 1
let gameOver = false
ctx.font = '40px Georgia'

function createImage(src) {
    let imageElm = new Image()
    imageElm.src = src
    return imageElm
}

function createSound(src) {
    let soundElm = document.createElement('audio')
    soundElm.src = src
    return soundElm
}

function createReplay() {
    let replayImage = document.createElement('img')
    replayImage.src = 'assets/images/replay.png'
    replayImage.className = 'replay'
    document.querySelector('body').appendChild(replayImage)
    replayImage.addEventListener('click', (e) => {
        window.location.href = window.location.href
    })
}

// mouse actions 

canvas.addEventListener('mousedown', (event) => {
    mouse.click = true
    mouse.x = event.x - canvasPos.left
    mouse.y = event.y - canvasPos.top
})

canvas.addEventListener('mouseup', () => {
    mouse.click = false
})

// Player setup

class Player {
    constructor() {
        this.x = canvas.width
        this.y = canvas.height / 2
        this.radius = 50
        this.angle = 0
        this.frameX = 0
        this.frameY = 0
        this.frame = 0
        this.spriteWidth = 498
        this.spriteHeight = 327
    }
    update() {
        const dx = this.x - mouse.x
        const dy = this.y - mouse.y
        let theta = Math.atan2(dy, dx)
        this.angle = theta
        if (mouse.x != this.x) {
            this.x -= dx / 20
        }
        if (mouse.x != this.y) {
            this.y -= dy / 20
        }
        this.frameAnimate()
    }
    draw() {
        if (mouse.click) {
            ctx.lineWidth = 0.2
            ctx.beginPath()
            ctx.moveTo(this.x, this.y)
            ctx.lineTo(mouse.x, mouse.y)
            ctx.stroke()
        }
        ctx.fillRect(this.x, this.y, this.radius, 10)

        ctx.save()

        ctx.translate(this.x, this.y)
        ctx.rotate(this.angle)

        if (this.x >= mouse.x) {
            ctx.drawImage(
                playerLeft,
                (this.frameX * this.spriteWidth),
                (this.frameY * this.spriteHeight),
                this.spriteWidth,
                this.spriteHeight,
                0 - 60,
                0 - 45,
                (this.spriteWidth / 4),
                (this.spriteHeight / 4)
            )
        } else {
            ctx.drawImage(
                playerRight,
                (this.frameX * this.spriteWidth),
                (this.frameY * this.spriteHeight),
                this.spriteWidth,
                this.spriteHeight,
                0 - 60,
                0 - 45,
                (this.spriteWidth / 4),
                (this.spriteHeight / 4)
            )
        }
        ctx.restore()


    }
    frameAnimate() {
        if (gameFrame % 5 == 0) {
            this.frame++
            if (this.frame >= 12) this.frame = 0
            if (this.frame % 2 == 1) {
                this.frameX = 0
            } else {
                this.frameX++
            }
            if (this.frame < 3) this.frameY = 0
            else if (this.frame < 7) this.frameY = 1
            else if (this.frame < 11) this.frameY = 2
            else this.frameY = 0
        }
    }

}
const player = new Player()


// bubbles 
class Bubble {
    constructor() {
        this.x = Math.random() * canvas.width
        this.y = canvas.height + 100
        this.radius = 50
        this.speed = Math.random() * 5 + 1
        this.distance
        this.counted = false
        this.sound = Math.random() <= 0.5 ? 'sound1' : 'sound2'
    }

    update() {
        this.y -= this.speed
        const dx = this.x - player.x
        const dy = this.y - player.y
        this.distance = Math.sqrt(dx * dx + dy * dy)
    }
    draw() {
        ctx.drawImage(bubbleImage, this.x - 65, this.y - 65, this.radius * 2.6, this.radius * 2.6)
    }
}



function handleBubbles() {
    if (gameFrame % 50 == 0) {
        bubbles.push(new Bubble())
    }
    for (let index = 0; index < bubbles.length; index++) {
        bubbles[index].update()
        bubbles[index].draw()
        if (bubbles[index].y < 0 - bubbles[index].radius * 2) {
            bubbles.splice(index, 1)
            index--
        } else if (bubbles[index].distance < bubbles[index].radius + player.radius) {
            if (!bubbles[index].counted) {
                if (bubbles[index].sound == 'sound2') {
                    bubblePop2.play()
                } else {
                    bubblePop1.play()
                }
                score++
                bubbles[index].counted = true
                bubbles.splice(index, 1)
                index--
            }
            handleHightScore()
        }

    }
}

// background



const BG = {
    x1: 0,
    x2: canvas.width,
    y: 0,
    width: canvas.width,
    height: canvas.height
}
function handleBackground() {
    BG.x1 -= gameSpeed
    if (BG.x1 < -BG.width) BG.x1 = BG.width
    BG.x2 -= gameSpeed
    if (BG.x2 < -BG.width) BG.x2 = BG.width
    ctx.drawImage(background, BG.x1, BG.y, BG.width, BG.height)
    ctx.drawImage(background, BG.x2, BG.y, BG.width, BG.height)
}


// enemies 

class Enemy {
    constructor() {
        this.x = canvas.width - 200
        this.y = Math.random() * 145
        this.radius = 60
        this.speed = Math.random() * 2 + 2
        this.frame = 0
        this.frameX = 0
        this.frameY = 0
        this.spriteWidth = 418
        this.spriteHeight = 397
    }
    update() {
        this.x -= this.speed
        if (this.x < 0 - this.radius * 2) {
            this.x = canvas.width + 200
            this.y = Math.random() * (canvas.height - 150) + 90
            this.speed = Math.random() * 2 + 2
        }
        this.frameAnimate()
        const dx = this.x - player.x
        const dy = this.y - player.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        if (distance < this.radius + player.radius) {
            handleGameOver()
        }
    }
    draw() {
        ctx.drawImage(
            enemyImage,
            this.frameX * this.spriteWidth,
            this.frameY * this.spriteHeight,
            this.spriteWidth,
            this.spriteHeight,
            this.x - 60,
            this.y - 70,
            this.spriteWidth / 3,
            this.spriteHeight / 3
        )
    }
    frameAnimate() {
        if (gameFrame % 5 == 0) {
            this.frame++
            if (this.frame >= 12) this.frame = 0
            if (this.frame == 3 || this.frame == 7 || this.frame == 11) {
                this.frameX = 0
            } else {
                this.frameX++
            }
            if (this.frame < 3) this.frameY = 0
            else if (this.frame < 7) this.frameY = 1
            else if (this.frame < 11) this.frameY = 2
            else this.frameY = 0
        }
    }
}

const enemy = new Enemy()

function handleEnemies() {
    enemy.update()
    enemy.draw()
}

function handleGameOver() {
    ctx.fillStyle = 'white'
    ctx.fillText(`GAME OVER`, 285, 250)
    gameOver = true
    gameOverSound.play()
    createReplay()
}

function handleHightScore() {
    let hightScore = localStorage.getItem('hightScore')
    if (!hightScore) {
        localStorage.setItem('hightScore', score)
    } else {
        if (score > hightScore) {
            localStorage.setItem('hightScore', score)
        }
    }
}

// animatons 

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    handleBackground()
    handleBubbles()
    player.update()
    player.draw()
    handleEnemies()
    ctx.fillStyle = 'black'
    ctx.fillText(`Score : ${score}`, 10, 50)
    ctx.fillText(`Hight Score: ${localStorage.getItem('hightScore')}`, 10, 90)
    gameFrame++
    if (!gameOver) {
        requestAnimationFrame(animate)
    }
}
animate()

window.addEventListener('resize', (event) => {
    canvasPos = canvas.getBoundingClientRect()
})
