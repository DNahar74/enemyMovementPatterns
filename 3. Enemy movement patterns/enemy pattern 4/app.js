/** @type {HTMLCanvasElement} */

const canvas = document.querySelector("#canvas1");
const ctx = canvas.getContext('2d');

const canvasWidth = canvas.width = 1400;
const canvasHeight = canvas.height = 700;

const enemyImage = new Image();
enemyImage.src = '../enemies/enemy4.png';

let numberOfEnemies = 10;
let enemies = [];


class Enemy {
    constructor() {
        this.image = enemyImage;
        this.speed = Math.floor(Math.random()*50+150);
        this.sX = 0;
        this.sY = 0;
        this.spriteWidth = 213;
        this.spriteHeight = 213;
        this.frames = 9;
        this.staggerFrames = 5; 
        this.gameFrame = Math.floor(Math.random()*this.staggerFrames)*this.frames;
        this.width = this.spriteWidth/2;
        this.height = this.spriteHeight/2;
        this.dX = Math.random()*(canvasWidth-this.width);
        this.dY = Math.random()*(canvasHeight-this.height);
        this.newX = Math.random()*(canvasWidth-this.width);
        this.newY = Math.random()*(canvasHeight-this.height);
    }
    update() {
        if (this.gameFrame%this.speed===0) {
            this.newX = Math.random()*(canvasWidth-this.width);
            this.newY = Math.random()*(canvasHeight-this.height);  
        }
        this.dX -= (this.dX-this.newX)/this.speed;
        this.dY -= (this.dY-this.newY)/this.speed;
        this.sX = (Math.floor(this.gameFrame/this.staggerFrames)%this.frames)*this.spriteWidth;
        this.gameFrame+=1;
    }
    draw() {
        ctx.drawImage(this.image,this.sX,this.sY,this.spriteWidth,this.spriteHeight,this.dX,this.dY,this.width,this.height);
    }
}

for (let i = 0; i < numberOfEnemies; i++) {
    enemies.push(new Enemy());
}

function animate() {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    enemies.forEach((enemy)=>{
        enemy.update();
        enemy.draw();
    })
    requestAnimationFrame(animate);
}

animate();