var bg,bgImg;
var player, shooterImg, shooter_shooting;
var zombie1,Zombie2,Zombie3,Zombie
var ZombieGroup
var Bullet,BulletGroup,BulletImg
var shootsound
var heart1,heart2,heart3,heart1IMG,heart2IMG,heart3IMG
var gameState="fight"
var score=0,life=3
var losesound,winsound
var bullets=70
var youwin, youlose
var win,lose
function preload(){
  
  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")
zombie1 = loadImage("assets/zombie1.png")
Zombie2 = loadImage("assets/Zombie2.png")
Zombie3 = loadImage("assets/Zombie3.png")
  bgImg = loadImage("assets/bg.jpeg")
BulletImg = loadImage("assets/bullet.png")
shootsound = loadSound("assets/shoot.mp3")
heart1IMG = loadImage("assets/heart_1.png")
heart2IMG = loadImage("assets/heart_2.png")
heart3IMG = loadImage("assets/heart_3.png")
winsound = loadSound("assets/win.mp3")
losesound = loadSound("assets/lose.mp3")
youlose = loadImage("assets/youlose.png")
youwin = loadImage("assets/youwin.png")
}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale = 1.1
  

//creating the player sprite
player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addImage(shooterImg)
   player.scale = 0.3
   player.debug = true
   player.setCollider("rectangle",0,0,300,300)
   

heart1= createSprite(displayWidth-200,40,20,20)
heart1.addImage(heart1IMG)
heart1.scale= 0.4
heart1.visible=false

heart2= createSprite(displayWidth-150,40,20,20)
heart2.addImage(heart2IMG)
heart2.scale= 0.4
heart2.visible=false

heart3= createSprite(displayWidth-200,40,20,20)
heart3.addImage(heart3IMG)
heart3.scale= 0.4
heart3.visible= true

win=createSprite(600,300)
win.scale=2
win.addImage(youwin)
win.visible=false

lose=createSprite(600,300)
lose.scale=2
lose.addImage(youlose)
lose.visible=false

ZombieGroup = new Group()
   BulletGroup = new Group()
}

function draw() {
  background(0); 
  if (gameState==="fight"){
    if (life===3){
      heart3.visible=true
      heart2.visible= false
      heart1.visible=false
    }
    if (life===2){
      heart3.visible= false
      heart2.visible= true
      heart1.visible=false
    }
    if (life===1){
      heart3.visible=false 
      heart2.visible= false
      heart1.visible= true
    }
    if (life===0){
      gameState ="lost"
    }
if(score===2000){
  gameState="won"
  winsound.play()
}

  
 



  //moving the player up and down and making the game mobile compatible using touches
if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-30
}
if(keyDown("DOWN_ARROW")||touches.length>0){
 player.y = player.y+30
}


//release bullets and change the image of shooter to shooting position when space is pressed
if(keyWentDown("space")){
 shootsound.play()
 
  player.addImage(shooter_shooting)
  createBullet()
  bullets-=1
 
}

//player goes back to original standing image once we stop pressing the space bar
else if(keyWentUp("space")){
  player.addImage(shooterImg)
}
if (bullets===0){
  gameState="bullets"
  losesound.play()
}
if (BulletGroup.isTouching(ZombieGroup)){
  BulletGroup.destroyEach()
  ZombieGroup[0].destroy()
  score=score+100
}
if (ZombieGroup.isTouching (player)){
  losesound.play()
  life=life-1
  ZombieGroup[0].destroy()
}

spawnZombie()
  }
drawSprites();
textSize(25)
fill ("white")
text("Score= "+score,displayWidth-260,displayHeight/2-260)
text("Lives= "+life,displayWidth-260,displayHeight/2-300)
text("Bullets= "+bullets,displayWidth-260,displayHeight/2-220)

if (gameState==="lost"){
  ZombieGroup.destroyEach()
  player.destroy()
  lose.visible=true
}
else if (gameState==="won"){
  ZombieGroup.destroyEach()
  player.destroy()
  win.visible=true
}
else if (gameState==="bullets"){
  ZombieGroup.destroyEach()
  player.destroy()
  textSize(50)
  fill("yellow")
  text("You Ran Out of Bullets!",470,410)
  lose.visible=true
}
  }


function spawnZombie(){
  if (frameCount % 150 === 0){
    var Zombie = createSprite(displayWidth,165,10,40);
    Zombie.velocityX = -(6);
    
     //generate random obstacles
     var rand = Math.round(random(1,3));
     switch(rand) {
       case 1: Zombie.addImage(zombie1);
               break;
       case 2: Zombie.addImage(Zombie2);
               break;
       case 3: Zombie.addImage(Zombie3);
               break;
      
       default: break;
     }
    Zombie.y=Math.round(random(100,600));
     //assign scale and lifetime to the obstacle           
     Zombie.scale = 0.3;
     Zombie.lifetime = 200;
    
    //add each obstacle to the group
     ZombieGroup.add(Zombie);
  }
 }
 function createBullet() {
  var Bullet= createSprite(100, 100, 60, 10);
  Bullet.addImage(BulletImg);
  Bullet.scale =0.1;
  Bullet.x = 360;
  Bullet.y=player.y;
  Bullet.velocityX = 9;
  Bullet.lifetime = 200;
  BulletGroup.add(Bullet);
}

 

