
var trex ,trex_running,edges,ground,groundImage,invisibleGround,cloudImg,count,obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6, obstacleGroup, cloudGroup,trexCollided,gameOver,restart,gameOverImg,restartImg,checkpoint,die,jump

var PLAY=1
var END=0
var gameState=PLAY
var lives=3

function preload(){
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  
groundImage= loadImage("ground2.png")
  cloudImg= loadImage("cloud.png")
  obstacle1= loadImage("obstacle1.png")
  obstacle2= loadImage("obstacle2.png")
  obstacle3= loadImage("obstacle3.png")
  obstacle4= loadImage("obstacle4.png")
  obstacle5= loadImage("obstacle5.png")
  obstacle6= loadImage("obstacle6.png")
  trexCollided= loadAnimation("trex_collided.png")
  gameOver=loadImage("gameOver.png")
  restart=loadImage("restart.png")
  checkpoint=loadSound("checkPoint.mp3")
  die=loadSound("die.mp3")
  jump=loadSound("jump.mp3")
}


function setup(){
  createCanvas(600,200)
  
  //create a trex sprite
  trex = createSprite(50,160,20,50);
  //trex.debug=true
  
  trex.addAnimation("running", trex_running);
  trex.addAnimation("trexCollided",trexCollided)
  trex.scale=0.5
  //trex.setCollider("rectangle",0,0,400, trex.height)
  
  gameOverImg= createSprite(300,100)
  gameOverImg.visible=false
  restartImg= createSprite(300,130)
  restartImg.visible=false
  gameOverImg.addAnimation("gameOver",gameOver)
  restartImg.addAnimation("restart",restart)
  gameOverImg.scale=0.5
  restartImg.scale=0.5
  
  
  //leftEdge=0;rightEdge=1;topEdge=2;bottomEdge=3
  //edges= createEdgeSprites()
  
  ground= createSprite(300,180,600,20)
  ground.addImage(groundImage)
  
  invisibleGround= createSprite(300,185,600,5)
  invisibleGround.visible=false
  count=0
  
  obstacleGroup= new Group()
  cloudGroup= new Group()
}

function draw(){
  background(180)
  
  if(gameState===PLAY){
    
    //console.log(gameState)
    
    if(frameCount%5===0){
      count=count+1  
    }
    
    if(count>0 && count%100===0){
      checkpoint.play()
    }
    
  if(keyDown("space")&&trex.y>=159){
     trex.velocityY=-7
     jump.play()
  }  
    trex.velocityY=trex.velocityY+0.2
    ground.velocityX=-(3+count/100)
    
  
  if(ground.x<0){
    ground.x=ground.width/2
  }
   if(frameCount%150===0){
    //console.log(frameCount)
  spawnCloud()
    spawnObstacle()
  }
    /*if(obstacleGroup.isTouching(trex)){
      gameState=END
      die.play()
      //trex.velocityY=-6
    }*/
    if(obstacleGroup.isTouching(trex)){
      lives=lives-1
      obstacleGroup.destroyEach()
    }
    if(lives===0){
      gameState=END
    }
 
  }
  else if(gameState===END){
    ground.velocityX=0
    trex.changeAnimation("trexCollided",trexCollided)
    obstacleGroup.setVelocityXEach(0)
    cloudGroup.setVelocityXEach(0)
    obstacleGroup.setLifetimeEach(-1)
    cloudGroup.setLifetimeEach(-1)
    trex.VelocityY=0
    gameOverImg.visible=true
    restartImg.visible=true
    if(mousePressedOver(restartImg)){
      reset()
    }
  }
  
  text("SCORE:"+count,500,20)
  text("LIVES:"+lives,100,20)
  
  
  
    trex.collide(invisibleGround)
  
  //trex.bounceOff(edges[2])
  //trex.bounceOff(edges[3])
  
  //console.log(frameCount)
  
    
  
  drawSprites();

}

function spawnCloud(){
  
  var cloud= createSprite(600,random(50,100),10,10)
  cloud.velocityX=-2
  cloud.addImage("cloudImg",cloudImg)
  cloud.scale=0.7
  var rand= Math.round(random(50,100))
  //cloud.y=rand
  //console.log(rand)
  cloud.depth=trex.depth
  trex.depth=trex.depth+1
  cloud.lifetime=310
  cloudGroup.add(cloud)
}

function spawnObstacle(){
  var obstacle= createSprite(600,170,10,10)
  //obstacle.debug=true
  obstacle.velocityX=-(3+count/100)
  console.log(obstacle.velocityX)
  obstacle.lifetime=210
  var rand=Math.round(random(1,6))
  //console.log(rand)
  switch(rand){
    case 1:obstacle.addImage(obstacle1)
    break;
    case 2:obstacle.addImage(obstacle2)
    break;
    case 3:obstacle.addImage(obstacle3)
    break;
    case 4:obstacle.addImage(obstacle4)
    break;
    case 5:obstacle.addImage(obstacle5)
    break;
    case 6:obstacle.addImage(obstacle6)
    break;
  }
  obstacle.scale=0.5
  obstacleGroup.add(obstacle)
}

function reset(){
  //console.log("resetCalled")
  gameState=PLAY
  obstacleGroup.destroyEach()
  cloudGroup.destroyEach()
  //sprites are invisible here the sprites name are given opposite
  restartImg.visible=false
  gameOverImg.visible=false
  trex.changeAnimation("running", trex_running)
  count=0
  lives=3
}