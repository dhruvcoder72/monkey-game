var PLAY = 1;
var END = 0;
var gameState = PLAY;
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 
}



function setup() {
  
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(400,350,900,10);
  ground.velocityX = -4;
  ground.x = ground.width/2;
  
  FoodGroup = new Group();
  obstacleGroup = new Group();

  
}


function draw() {
  background("white");
  monkey.collide(ground);

  ground.x = ground.width/2;
  if(gameState === PLAY){

      if(keyDown("space") && monkey.y >= 300){
         monkey.velocityY = -15;
      }
      monkey.velocityY = monkey.velocityY + 0.8;

      var survivalTime = 0;
      stroke("white");
      textSize(20);
      fill("white");
      text("score: "+score,500,50);

      stroke("black");
      textSize(20);
      fill("black");
      survivalTime = Math.ceil(frameCount/frameRate());
      text("survival time "+survivalTime,100,50);

      bananas()
      obstacles();

      if(monkey.isTouching(obstacleGroup)){
        gameState = END;
      }
  }else if(gameState === END){
    stop();
  }
  drawSprites();
}

function obstacles(){
  
  if(World.frameCount%300 === 0){
    obstacle = createSprite(400,325,20,20);
    obstacle.addImage("obstaclecoming", obstaceImage);
    obstacle.scale = 0.15;
    obstacle.velocityX = -3;
    obstacle.lifetime = 150;
    obstacleGroup.add(obstacle);
  }
  
 // obstacleGroup.add(obstacle);
  
}

function bananas(){
  
  if(World.frameCount%80 === 0){
    banana = createSprite(400,350,10,10);
    banana.y = Math.round(random(120,200));
    banana.addImage("bananacoming", bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;
    banana.lifetime = 150;
      FoodGroup.add(banana);
  }

}

function stop(){
  ground.velocityX = 0;
  FoodGroup.setVelocityXEach(0);
  obstacleGroup.setVelocityXEach(0);
}




