var back,backmoving;
var vechiles,vechile1,vechile2,vechile3,vechilesGroup;
var samosa,samosagoing,samosaGroup;
var motu,motupatlu;
var rand;
var score = 0;
var lifes = 3;
var gameState = "serve";

function preload(){
  backmoving = loadImage("back2.png");
  motupatlu = loadImage("motu.png");

  vechile1 = loadImage("car.png");
  vechile2 = loadImage("bus.png");
  vechile3 = loadImage("chingam.png");

  samosagoing = loadImage("samosa.png");
}

function setup() {
  createCanvas(1200,400);

  //ceating background
  back = createSprite(500,200);
  back.addImage(backmoving);
  back.scale = 4.8;

  //creating invisible ground;
  invisibleground = createSprite(600,320,1200,20);
  invisibleground.visible = false;

  //creating motu
  motu = createSprite(140,250);
  motu.addImage(motupatlu);
  motu.scale = 0.6;
  motu.setCollider("rectangle",0,0,300,200);

  //creating new Groups
  vechilesGroup = new Group();
  samosaGroup = new Group();

}

function draw() {
  background("black");

  //gameState = serve
  if(gameState === "serve"){
    background("orange");

    //creating all texts needed in gameState = serve    
    fill(0);
    textSize(50);
    text("Motu Runner",450,50);

    fill(0);
    textSize(30);
    text("Story : ",10,80);
    text("Motu is going to furfuri nagar. In the road, there are many vechiles so please help him",10,120);
    text("to go in his way.",10,160);
    text("Instructions : ",10,200);
    text("If you touch samosa you will get 1 life.",10,240);
    text("If you touch vehicle you will lose 1 life.",10,280);
    text("Wish you Better luck",450,350);
    text("Press space to play",700,250);
    
    //when pressing space gameState = play
    if(keyDown("space")){
      gameState = "play";
    }

  }

  if(gameState === "play"){

    //creating score
    score = score + Math.round(getFrameRate()/60);

    //motu is colliding invisibleground
    motu.collide(invisibleground);

    //when we click spae motu will jump
    if(keyDown("space") && motu.y >= 250){
      motu.velocityY = -20;
    }

    //creating gravity
    motu.velocityY = motu.velocityY + 0.8;

    //moving the background
    back.velocityX = -(10 + 1/2*score/100);

    //scrolling background
    if(back.x < 165 ){
      back.x = back.width/2;
    }

    //when touching vechiles life will be -1
    if(vechilesGroup.isTouching(motu)){
      vechilesGroup.destroyEach();
      lifes = lifes - 1;
    }

    //when touching samosa life will be +1
    if(samosaGroup.isTouching(motu)){
      samosaGroup.destroyEach();
      lifes = lifes +1;
    }

    //ending game when lifes = 0
    if(lifes === 0){
      gameState = "end";
    }

    //adding functions
    creatingvechiles();
    creatingsamosa();
    
    drawSprites();

    //displaying scores
    textSize(30);
    text("Distance : " + score,300,50);

    //displaying lifes
    textSize(30);
    text("Lifes : " + lifes,900,50);
    
  }

  if(gameState === "end"){

    //creating texts in gameState = end
    fill("yellow");

    textSize(100);
    text("Gameover",350,200);

    textSize(30);
    text("Lifes : 0",520,100);
    text("Press F5 to play again",470,310);
    text("Your Score : "+ score,490,260);

  }

}

//creating function creatingvechiles
function creatingvechiles(){
  if(frameCount % 300  === 0){
    var vechiles = createSprite(1300,270);
    vechiles.velocityX = -(10 + score/100);
    
    var rand = Math.round(random(1,3));

    switch(rand) {
      case 1 : vechiles.addImage(vechile1);
             break;
      case 2 : vechiles.addImage(vechile2);
             break;
      case 3 : vechiles.addImage(vechile3);
             break;   
      default : break;          
    }

    vechiles.scale = 0.7;
    vechilesGroup.add(vechiles);
    vechiles.lifetime = 300;

  }
}

function creatingsamosa(){
  if(frameCount % 1000 === 0){
    var samosa = createSprite(1300,100);
    samosa.addImage(samosagoing);
    samosa.velocityX = -20;
    samosa.scale = 0.4;
    samosa.lifetime = 200;

    samosaGroup.add(samosa);
  }
}