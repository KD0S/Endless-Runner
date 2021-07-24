var canvas = document.getElementById('canvas');
var ctx = canvas.getContext("2d");
var score = document.querySelector('.Score');
var highscore = document.querySelector('.HighScore');
let scorecount = 0;


highscore.innerHTML = 'Highest Score - '+localStorage.getItem('Highscore')
const saveToLocalStorage = ()=>{
    if(scorecount>=localStorage.getItem('Highscore')){
    localStorage.setItem('Highscore',scorecount)
    }
}


function resetgame(){
    saveToLocalStorage();
    cancelAnimationFrame(animationId);
    scorecount = 0;
    startgame();
}


class player {
    constructor(){
      this.x = 0;
      this.y = 340;
      this.speedX = 0.5;
      this.shouldjump = false;
      this.jumpheight = 140;
      this.losestate = false;
    } 
    jump(){
        if(this.shouldjump){
          if(this.y==340){
              this.y-=this.jumpheight;
              this.shouldjump = false;
              
          }
          else if(this.y==200){
              this.y+=this.jumpheight;  
              this.shouldjump = false;
          }
        }
        }
       
    update(){
        this.x += this.speedX;
        if(this.x>canvas.width/3){
            this.speedX=0
        }
    }
    
   
    draw(){
        this.jump();
        ctx.fillStyle = 'rgba(37,136,212,255)';
        ctx.fillRect(this.x,this.y,60,60);
    }

    
}

class hole1{
    constructor(){
        this.x =  canvas.width+150;
        this.y = 400;
        this.speedX = 4;
      }
      update(){
           this.draw();
           this.x -= this.speedX;
           if(this.x<-150){
            this.x=canvas.width+80;
           }
          }
      
      draw(){
          ctx.fillStyle = 'rgba(54,54,54,255)';
          ctx.fillRect(this.x,this.y,150,200);
      }
 }
 class hole2{
    constructor(){
        this.x =  canvas.width+450;
        this.y = 0;
        this.speedX = 4;
      }
      update(){
           this.draw();
           this.x -= this.speedX;
           if(this.x<-150){
            this.x=canvas.width+80;
        }
          }
      
      draw(){
          ctx.fillStyle = 'rgba(54,54,54,255)';
          ctx.fillRect(this.x,this.y,150,200);
      }
 }
 
 



function loseCondition(){
    if((box.x+50>trap1.x)&&((box.x+50)<(trap1.x+150))&&box.y+80>trap1.y){
        box.losestate=true;
        resetgame()
    }
    else if(((box.x+50)>trap2.x)&&((box.x+50)<(trap2.x+150))&&box.y-260<trap2.y){
        box.losestate=true;
        resetgame()
       
    }
}

function drawBackground(){
ctx.fillStyle = 'rgba(22,22,22,255)';
ctx.fillRect(0,0,800,200);
ctx.fillStyle = 'rgba(22,22,22,255)';
ctx.fillRect(0,400,800,200);
}

var box = new player();
var trap1 = new hole1();
var trap2 = new hole2();
var obs = new obstacle();

function startgame(){
     highscore.innerHTML = 'Highest Score - '+localStorage.getItem('Highscore')
     box.x = 0;
     box.y = 340;
     box.speedX = 0.5;
     box.shouldjump = false;
     box.losestate = false;
     trap1.x =  canvas.width+150;
     trap1.y = 400;
     trap1.speedX = 4;
     trap2.x = canvas.width+450;
     trap2.y = 0;
     trap2.speedX = 4;
     obs.speedX = 4;
     obs.speedY = 4;
     obs.x = canvas.width+1000;
     obs.y = 300;
     animate();
    
}

let animationId = null;
function animate(){
    animationId =requestAnimationFrame(animate); 
    ctx.clearRect(0,0,canvas.width,canvas.height);
    drawBackground();
    loseCondition();
    box.draw();
    box.update()
    trap1.update();
    trap2.update();
}

function myFunction() {
   setInterval(scorefun,1000);
  }
myFunction()
  
  function scorefun() {
    scorecount++;
    score.innerHTML =' '+scorecount
    if(scorecount%5==0&&scorecount!=0){
        trap1.speedX+=1;
        trap2.speedX+=1;
    }
  }

animate()

addEventListener("keydown", e =>{
     if(e.code === "Space"){
         if(!box.shouldjump){
             box.shouldjump= true;
             
         }
     }
})
addEventListener("click", e =>{
        if(!box.shouldjump){
            box.shouldjump= true;
            
        }
    }
)
