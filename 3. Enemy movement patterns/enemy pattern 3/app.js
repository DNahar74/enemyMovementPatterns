/** @type {HTMLCanvasElement} */

const canvas = document.querySelector("#canvas1");
const ctx = canvas.getContext('2d');

const canvasWidth = canvas.width = 1400;
const canvasHeight = canvas.height = 700;

const enemyImage = new Image();
enemyImage.src = '../enemies/enemy3.png';

let numberOfEnemies = 10;
let enemies = [];


class Enemy {
    constructor() {
        this.image = enemyImage;
        this.speed = Math.random()*4+1;
        this.sX = 0;
        this.sY = 0;
        this.spriteWidth = 218;
        this.spriteHeight = 177;
        this.frames = 6;
        this.angle = Math.random()*360;
        this.angleSpeed = Math.random()*0.2 + 0.5;
        this.staggerFrames = 5; 
        this.gameFrame = Math.random()*this.staggerFrames*this.frames;
        this.width = this.spriteWidth/2;
        this.height = this.spriteHeight/2;
        this.dX = Math.random()*(canvasWidth-this.width);
        this.dY = Math.random()*(canvasHeight-this.height);
        // this.curve = Math.random()*200 + 50;
        // this.curve was a multiplier for sin and cos
    }
    update() {
        this.dX = (Math.sin(this.angle*Math.PI/270) + 1)*(canvasWidth-this.width)/2; 
        this.dY = (Math.cos(this.angle*Math.PI/90) + 1)*(canvasHeight-this.height)/2;
        //Change the angle values in formula as needed
        //Also the sin and cos can be changed
        this.angle+=this.angleSpeed;
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