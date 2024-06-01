/** @type {HTMLCanvasElement} */

const canvas = document.querySelector("#canvas1");
const ctx = canvas.getContext('2d');

const canvasWidth = canvas.width = 1400;
const canvasHeight = canvas.height = 700;

const enemyImage = new Image();
enemyImage.src = '../enemies/enemy2.png';

let numberOfEnemies = 10;
let enemies = [];


class Enemy {
    constructor() {
        this.image = enemyImage;
        this.speed = Math.random()*-4-1;
        this.sX = 0;
        this.sY = 0;
        this.spriteWidth = 266;
        this.spriteHeight = 188;
        this.frames = 6;
        this.angle = Math.random()*2;
        this.angleSpeed = Math.random()*0.2;
        this.staggerFrames = 5; //Math.floor(Math.random()*5)+5;
        this.gameFrame = Math.random()*this.staggerFrames*this.frames;
        this.width = this.spriteWidth/2;
        this.height = this.spriteHeight/2;
        this.dX = Math.random()*(canvasWidth-this.width);
        this.dY = Math.random()*(canvasHeight-this.height);
        this.curve = Math.random()*0.5+1;
    }
    update() {
        // if (this.gameFrame%this.staggerFrames==0) {
        this.dX<-this.width?this.dX=canvasWidth:this.dX+=this.speed;
            // this.dY+=this.speed;
        this.dY+=Math.sin(this.angle)*this.curve;
        this.angle+=this.angleSpeed;
        // }
        // This if statement didn't work because??
        //It works as it is because the increment to dY is very small
        this.sX = (Math.floor(this.gameFrame/this.staggerFrames)%this.frames)*this.spriteWidth;
        this.gameFrame++;
        
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
        enemy.draw();
        enemy.update();
    })
    requestAnimationFrame(animate);
}

animate();