var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play";
var score;

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
 spookySound.loop();

  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 4;


  ghost = createSprite(300,532,60,50);
  ghost.addImage("standing",ghostImg);
  ghost.scale=0.4;


  invisibleBlockGroup=createGroup();
  //invisibleBlock.add(invisibleBlockGroup);

  climbersGroup=createGroup();
  //climber.add(climbersGroup);
  
  doorsGroup=new Group();
  //door.add(doorsGroup);
  
  score = 0;
}

function draw() {
  background(200);

  if(gameState==="play"){
   
  if(tower.y > 400){
      tower.y = 300
    }

   

   

    if(keyDown("Left_arrow")){
      ghost.x-=7
    }

    if(keyDown("right_arrow")){
      ghost.x+=7
    }
   


    spawnDoors();


    if(climbersGroup.isTouching(ghost)){
    ghost.velocityY=0;
   
    }
    if(invisibleBlockGroup.isTouching(ghost) || ghost.y > 600){
     gameState="end";
      ghost.destroy();
      
      }
      
  }
 


    

    drawSprites();
    if(gameState==="end"){
      stroke("yellow");
      fill("yellow");
      textSize(30);
     text("GAME OVER",200,300);
     tower.velocityY=0;
     invisibleBlock.velocityY=0;
    }
}
function spawnDoors(){
  if(frameCount%167===0){
    var door = createSprite(200, -50);
    var climber = createSprite(200,10);
    var invisibleBlock = createSprite(200,15);
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;


     door.x=Math.round(random(200,400));
     climber.x = door.x;
     invisibleBlock.x = door.x;

     door.addImage(doorImg);
     climber.addImage(climberImg);

     door.velocityY=4;
     climber.velocityY = 4;
     invisibleBlock.velocityY = 4;

     ghost.depth = door.depth;
     ghost.depth +=1;

      //assign lifetime to the variable
      door.lifetime=600;
      climber.lifetime = 600;
    invisibleBlock.lifetime = 600;

    doorsGroup.add(door);
    invisibleBlock.debug = true;
    climbersGroup.add(climber);
    invisibleBlockGroup.add(invisibleBlock);
 
  }

}







  