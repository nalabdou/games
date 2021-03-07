const canvas1 = document.getElementById('layer1')
const ctx1 = canvas1.getContext('2d')
canvas1.height = 600
canvas1.width = 600

const canvas2 = document.getElementById('layer2')
const ctx2 = canvas1.getContext('2d')
canvas2.height = 600
canvas2.width = 600

const canvas3 = document.getElementById('layer3')
const ctx3 = canvas1.getContext('2d')
canvas3.height = 600
canvas3.width = 600
const canvas4 = document.getElementById('layer4')
const ctx4 = canvas1.getContext('2d')
canvas4.height = 600
canvas4.width = 600

const canvas5 = document.getElementById('layer5')
const ctx5 = canvas1.getContext('2d')
canvas5.height = 600
canvas5.width = 600


// globale vars 
let grid = 80
let keys = []
let score = 0
let collisionsCount = 0
let frame = 0
let gameSpeed = 1
let safe = false

const particlesArray = []
const maxParticles = 300
const ripplesArray = []
const carsArray = []
const logsArray = []

const background1 = new Image()
background1.src = 'assets/images/backgrounds/background01.png'

const background2 = new Image()
background2.src = 'assets/images/backgrounds/background02.png'

const collisionImage = new Image()
collisionImage.src = 'assets/images/crash/collisions.png'

const turtleImage = new Image()
turtleImage.src = 'assets/images/npcs/turtles.png'

const logImage = new Image()
logImage.src = 'assets/images/npcs/log.png'

const carImage = new Image()
carImage.src = 'assets/images/cars/cars01.png'

numberOfcars = 3

const froggerImage = new Image()
froggerImage.src = 'assets/images/players/frog.png'

const froggerSound = document.createElement('audio')
froggerSound.src = 'assets/sounds/players/sound01.ogg'

const collisionSound = document.createElement('audio')
collisionSound.src = 'assets/sounds/collisions/crash.ogg'

const splashSound = document.createElement('audio')
splashSound.src = 'assets/sounds/collisions/splash.wav'

const scoreSound = document.createElement('audio')
scoreSound.src = 'assets/sounds/players/score.wav'