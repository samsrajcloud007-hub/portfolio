/*==========================================================
    PARTICLE ENGINE
==========================================================*/

const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

let particles = [];

let mouse = {
    x: null,
    y: null,
    radius: 160
};

function resizeCanvas(){

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

}

window.addEventListener("resize", resizeCanvas);

resizeCanvas();

document.addEventListener("mousemove",(e)=>{

    mouse.x = e.clientX;
    mouse.y = e.clientY;

});

/*==========================================================
PARTICLE
==========================================================*/

class Particle{

    constructor(){

        this.reset();

    }

    reset(){

        this.x = Math.random()*canvas.width;
        this.y = Math.random()*canvas.height;

        this.radius = Math.random()*2 + 1;

        this.speedX = (Math.random()-0.5)*0.5;
        this.speedY = (Math.random()-0.5)*0.5;

        this.alpha = Math.random()*0.5 + 0.2;

    }

    update(){

        this.x += this.speedX;
        this.y += this.speedY;

        if(this.x<0 || this.x>canvas.width)
            this.speedX *= -1;

        if(this.y<0 || this.y>canvas.height)
            this.speedY *= -1;

        if(mouse.x){

            let dx = mouse.x - this.x;
            let dy = mouse.y - this.y;

            let distance = Math.sqrt(dx*dx+dy*dy);

            if(distance < mouse.radius){

                this.x -= dx * 0.0025;
                this.y -= dy * 0.0025;

            }

        }

    }

    draw(){

        ctx.beginPath();

        ctx.fillStyle =
            `rgba(94,235,255,${this.alpha})`;

        ctx.arc(
            this.x,
            this.y,
            this.radius,
            0,
            Math.PI*2
        );

        ctx.fill();

    }

}

/*==========================================================
CREATE
==========================================================*/

function createParticles(){

    particles=[];

    let count =
        Math.min(
            Math.floor(window.innerWidth/12),
            140
        );

    for(let i=0;i<count;i++){

        particles.push(new Particle());

    }

}

createParticles();

/*==========================================================
LINES
==========================================================*/

function connectParticles(){

    for(let a=0;a<particles.length;a++){

        for(let b=a+1;b<particles.length;b++){

            let dx =
                particles[a].x -
                particles[b].x;

            let dy =
                particles[a].y -
                particles[b].y;

            let distance =
                Math.sqrt(dx*dx+dy*dy);

            if(distance < 130){

                ctx.beginPath();

                ctx.strokeStyle =
                    `rgba(94,235,255,${
                        0.12-distance/1300
                    })`;

                ctx.lineWidth=1;

                ctx.moveTo(
                    particles[a].x,
                    particles[a].y
                );

                ctx.lineTo(
                    particles[b].x,
                    particles[b].y
                );

                ctx.stroke();

            }

        }

    }

}

/*==========================================================
SHOOTING STAR
==========================================================*/

let stars=[];

class ShootingStar{

    constructor(){

        this.reset();

    }

    reset(){

        this.x = Math.random()*canvas.width;

        this.y = -50;

        this.length =
            120+Math.random()*120;

        this.speed =
            8+Math.random()*4;

        this.active=true;

    }

    update(){

        this.x += this.speed;

        this.y += this.speed;

        if(this.y>canvas.height+200){

            this.active=false;

        }

    }

    draw(){

        let gradient =
            ctx.createLinearGradient(
                this.x,
                this.y,
                this.x-this.length,
                this.y-this.length
            );

        gradient.addColorStop(
            0,
            "rgba(255,255,255,.9)"
        );

        gradient.addColorStop(
            1,
            "transparent"
        );

        ctx.strokeStyle=gradient;

        ctx.lineWidth=2;

        ctx.beginPath();

        ctx.moveTo(this.x,this.y);

        ctx.lineTo(
            this.x-this.length,
            this.y-this.length
        );

        ctx.stroke();

    }

}

setInterval(()=>{

    if(stars.length<2){

        stars.push(new ShootingStar());

    }

},4500);

/*==========================================================
ANIMATION
==========================================================*/

function animate(){

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    particles.forEach(p=>{

        p.update();

        p.draw();

    });

    connectParticles();

    stars.forEach((star,index)=>{

        star.update();

        star.draw();

        if(!star.active){

            stars.splice(index,1);

        }

    });

    requestAnimationFrame(animate);

}

animate();
