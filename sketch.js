var canvas
var soldier,soldierAni
var scenery,sceneryImg
var bullet,bulletGroup
var robotGroup
var lives = 5;
var count = 0;
var firstAid_Img,firstAidGroup


function preload()
{
  soldierAni = loadAnimation("soldier-1.PNG","soldier-2.PNG","soldier-3.PNG","soldier-4.PNG","soldier-5.PNG")
  sceneryImg = loadImage("war_background.PNG")
  enemy_Ani = loadAnimation("enemy1.png","enemy2.png","enemy3.png","enemy4.png","enemy5.png")
  firstAid_Img = loadImage("first aid.PNG")
  bulletImg = loadImage("bullet.png")
  fallenImg = loadImage("fallen IMG.png")
}
  

function setup()
{
  createCanvas(1200,600);

  scenery = createSprite(600,300)
  scenery.addImage(sceneryImg);
  scenery.scale = 4
  scenery.velocityX = -6

  soldier = createSprite(100,550,50,50);
  soldier.addAnimation("soldier",soldierAni);
  soldier.debug = true;
  soldier.setCollider("rectangle",0,0,100,225)
  

  ground = createSprite(600,590,1200,20)

  robotGroup = new Group()
  bulletGroup = new Group()
  firstAidGroup = new Group()
  
}

function draw() {
  background(100);
  
  
  console.log(soldier.y)
  if(scenery.x <= 0)
  {
    scenery.x = 600;
  }

  
  if(keyDown("space") && soldier.y >= 467)
  {
    soldier.velocityY = -15
  }

  soldier.velocityY = soldier.velocityY + 0.5;
  soldier.collide(ground)
  

  if(keyWentDown(RIGHT_ARROW))
  {
    bullet = createSprite(soldier.x+60,soldier.y-40,20,20)
    bullet.addImage(bulletImg)
    bullet.scale =  0.2
    bullet.velocityX = 5
    bullet.shapeColor = "red"
    bulletGroup.add(bullet)
  }
  
  if(bulletGroup.isTouching(robotGroup))
  {
    robotGroup.destroyEach();
    bulletGroup.destroyEach();
  }

  if(robotGroup.isTouching(soldier))
  {
    lives -= 1
    robotGroup.destroyEach()
  }

  if(firstAidGroup.isTouching(soldier))
  {
    count += 1
    firstAidGroup.destroyEach()
  }

  if(count % 5 === 0 && count != 0)
  {
    lives += 1
  }

  spawnRobot()
  spawnFirstAid()

  drawSprites();

  textSize(30)
  fill(255)
  text("Lives: " + lives,1000,50)

  text("First Aid: " + count,100,50)
  
}

function spawnUfo()
{
 
}


function spawnRobot()
  {
    if(frameCount % 100 === 0)
    {
      var robot = createSprite(1200,500)
      robot.addAnimation("enemy",enemy_Ani)
     // robot.scale = 4
      robot.velocityX = -2

      robot.debug = true;
      robot.setCollider("rectangle",15,20,75,200)

      robot.lifetime = 600

      robotGroup.add(robot)
      
    }
  }

  function spawnFirstAid()
  {
    if(frameCount % 1000 === 0)
    {
      var firstAid = createSprite(1200,random(250,300))
      firstAid.addImage(firstAid_Img)
      firstAid.scale = 0.2

      firstAid.velocityX = -4;

      firstAid.lifetime = 300;

      firstAidGroup.add(firstAid);
    }
  }