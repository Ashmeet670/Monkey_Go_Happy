var monkey , monkey_running
var ground , groundImage
var banana ,bananaImage 
var obstacle, obstacleImage
var bananaGroup, obstacleGroup
var monkeyGameOverImage
var score  =  0
var survivalTime = 0
var monkeyblockingwall

var PLAY = 1, END = 0 , gameState = PLAY

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  
  bananaGroup = new Group()
  obstacleGroup = new Group()
}



function setup() {
  createCanvas(400, 400);
  
  monkeyblockingwall = createSprite(90,325,10,100)
  
  ground = createSprite(200,380,400,10)
  
  monkey = createSprite(50,300,10,10)
  monkey.addAnimation("Monkey_running",monkey_running)
  monkey.scale = 0.13

  
}


function draw() {
  background("lightblue")
  
  monkey.collide(ground)
  monkey.velocityY = monkey.velocityY + 0.8

  
  if (gameState === END){
    monkeyblockingwall.visible = true
    textSize(15)
    text("Game Over",160,200)
    text("The monkey is blocked by the wall",100,250)   
    
  }
  
  
  if (gameState === PLAY){
    
    monkeyblockingwall.visible = false
    ground.velocityX = -4
    
    
    if (monkey.isTouching(obstacleGroup)){
      obstacleGroup.destroyEach()
      bananaGroup.destroyEach()
      ground.velocityX = 0
      gameState = END
    }
    
      
    
    if (monkey.isTouching(bananaGroup)){
      score = score + 1
      bananaGroup.destroyEach()
    }
    
    if (ground.x < 200){
      ground.x = ground.width / 2
    }
    
    if (keyDown("space")&& monkey.y >=300 ){
      monkey.velocityY = -16
    }
    
    
    
    spawnBanana()
    spawnObstacles()
    
    survivalTime = Math.ceil(frameCount / frameRate())
  }
  
  if(gameState === END || gameState === PLAY){
    textSize(15)
    text("Score: " + score, 160 ,80)
    
    
    textSize(15)
    text("Survival Time: " + survivalTime, 160 ,50) 
  }
  
  
  drawSprites()
}

function spawnBanana(){
  

  
   if (World.frameCount % 100 === 0){
     banana = createSprite(400,100,10,10)
     banana.y = Math.round(random(200,300))
     banana.addImage(bananaImage)
     banana.scale = 0.1
     banana.velocityX = -4
     banana.lifetime = 110
     
     bananaGroup.add(banana)
   }
  
  
}

function spawnObstacles(){
  

  
   if (World.frameCount % 200 === 0){
     obstacle = createSprite(500,340,10,10)
     obstacle.addImage(obstacleImage)
     obstacle.scale = 0.2
     obstacle.velocityX = -6
     obstacle.lifetime = 150
     
  
     
     obstacleGroup.add(obstacle)
   }
  
  
}






