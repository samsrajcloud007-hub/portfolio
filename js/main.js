/*============================================================
    DEVOPS PORTFOLIO
    MAIN JAVASCRIPT
=============================================================*/

document.addEventListener("DOMContentLoaded", () => {

    initCursorLight();
    initScrollReveal();
    initCounters();
    initSmoothScrolling();
    initMagneticButtons();
    initProjectTilt();
    initNavbar();

});

/*============================================================
    CURSOR LIGHT
=============================================================*/

function initCursorLight(){

    const light = document.getElementById("cursor-light");

    if(!light) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    let currentX = mouseX;
    let currentY = mouseY;

    document.addEventListener("mousemove",(e)=>{

        mouseX = e.clientX;
        mouseY = e.clientY;

    });

    function animate(){

        currentX += (mouseX-currentX)*0.12;
        currentY += (mouseY-currentY)*0.12;

        light.style.left=currentX+"px";
        light.style.top=currentY+"px";

        requestAnimationFrame(animate);

    }

    animate();

}

/*============================================================
    SCROLL REVEAL
=============================================================*/

function initScrollReveal(){

    const observer=new IntersectionObserver(entries=>{

        entries.forEach(entry=>{

            if(entry.isIntersecting){

                entry.target.classList.add("active");

            }

        });

    },{

        threshold:0.15

    });

    document.querySelectorAll(".reveal").forEach(el=>{

        observer.observe(el);

    });

}

/*============================================================
    COUNTERS
=============================================================*/

function initCounters(){

    const counters=document.querySelectorAll("[data-counter]");

    counters.forEach(counter=>{

        let started=false;

        const observer=new IntersectionObserver(entries=>{

            entries.forEach(entry=>{

                if(entry.isIntersecting && !started){

                    started=true;

                    animateCounter(counter);

                }

            });

        });

        observer.observe(counter);

    });

}

function animateCounter(el){

    const target=parseInt(el.dataset.counter);

    let current=0;

    const increment=Math.ceil(target/100);

    const timer=setInterval(()=>{

        current+=increment;

        if(current>=target){

            current=target;
            clearInterval(timer);

        }

        el.textContent=current;

    },18);

}

/*============================================================
    SMOOTH SCROLL
=============================================================*/

function initSmoothScrolling(){

    document.querySelectorAll('a[href^="#"]').forEach(anchor=>{

        anchor.addEventListener("click",function(e){

            const target=document.querySelector(this.getAttribute("href"));

            if(!target) return;

            e.preventDefault();

            target.scrollIntoView({

                behavior:"smooth"

            });

        });

    });

}

/*============================================================
    MAGNETIC BUTTONS
=============================================================*/

function initMagneticButtons(){

    document.querySelectorAll(".primary-btn,.glass-btn,.secondary-btn")
    .forEach(button=>{

        button.addEventListener("mousemove",e=>{

            const rect=button.getBoundingClientRect();

            const x=e.clientX-rect.left-rect.width/2;
            const y=e.clientY-rect.top-rect.height/2;

            button.style.transform=
                `translate(${x*0.15}px,${y*0.15}px)`;

        });

        button.addEventListener("mouseleave",()=>{

            button.style.transform="translate(0,0)";

        });

    });

}

/*============================================================
    PROJECT CARD TILT
=============================================================*/

function initProjectTilt(){

    document.querySelectorAll(".project-card")
    .forEach(card=>{

        card.addEventListener("mousemove",e=>{

            const rect=card.getBoundingClientRect();

            const x=e.clientX-rect.left;
            const y=e.clientY-rect.top;

            const rotateX=((y/rect.height)-0.5)*-12;
            const rotateY=((x/rect.width)-0.5)*12;

            card.style.transform=

            `
            perspective(1200px)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
            translateY(-12px)
            `;

        });

        card.addEventListener("mouseleave",()=>{

            card.style.transform="";

        });

    });

}

/*============================================================
    NAVBAR EFFECT
=============================================================*/

function initNavbar(){

    const navbar=document.querySelector(".navbar");

    window.addEventListener("scroll",()=>{

        if(window.scrollY>40){

            navbar.style.background=
                "rgba(8,15,30,.72)";

            navbar.style.backdropFilter=
                "blur(30px)";

        }

        else{

            navbar.style.background=
                "rgba(255,255,255,.08)";

        }

    });

}

/*============================================================
    OPTIONAL PARALLAX
=============================================================*/

const orb=document.querySelector(".glass-orb");

if(orb){

document.addEventListener("mousemove",(e)=>{

    const x=(e.clientX/window.innerWidth)-0.5;
    const y=(e.clientY/window.innerHeight)-0.5;

    orb.style.transform=
    `
    rotateY(${x*12}deg)
    rotateX(${-y*12}deg)
    `;

});

}
