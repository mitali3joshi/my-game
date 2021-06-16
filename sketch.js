var score = 0;
var gameState = 1;
var food = 0;

function preload() {
  jumpingAnimation = loadAnimation(
    'https://la-wit.github.io/build-an-infinite-runner/build/images/sprites/adventureWoman/jump00.png',
    'https://la-wit.github.io/build-an-infinite-runner/build/images/sprites/adventureWoman/jump01.png',
    'https://la-wit.github.io/build-an-infinite-runner/build/images/sprites/adventureWoman/jump02.png',
    'https://la-wit.github.io/build-an-infinite-runner/build/images/sprites/adventureWoman/jump03.png',
    'https://la-wit.github.io/build-an-infinite-runner/build/images/sprites/adventureWoman/jump04.png',
    'https://la-wit.github.io/build-an-infinite-runner/build/images/sprites/adventureWoman/jump05.png',
    'https://la-wit.github.io/build-an-infinite-runner/build/images/sprites/adventureWoman/jump06.png',
    'https://la-wit.github.io/build-an-infinite-runner/build/images/sprites/adventureWoman/jump07.png',
    'https://la-wit.github.io/build-an-infinite-runner/build/images/sprites/adventureWoman/jump08.png',
    'https://la-wit.github.io/build-an-infinite-runner/build/images/sprites/adventureWoman/jump09.png'
  );
  runningAnimation = loadAnimation(
    'https://la-wit.github.io/build-an-infinite-runner/build/images/sprites/adventureWoman/run00.png',
    'https://la-wit.github.io/build-an-infinite-runner/build/images/sprites/adventureWoman/run01.png',
    'https://la-wit.github.io/build-an-infinite-runner/build/images/sprites/adventureWoman/run02.png',
    'https://la-wit.github.io/build-an-infinite-runner/build/images/sprites/adventureWoman/run03.png',
    'https://la-wit.github.io/build-an-infinite-runner/build/images/sprites/adventureWoman/run04.png',
    'https://la-wit.github.io/build-an-infinite-runner/build/images/sprites/adventureWoman/run05.png',
    'https://la-wit.github.io/build-an-infinite-runner/build/images/sprites/adventureWoman/run06.png',
    'https://la-wit.github.io/build-an-infinite-runner/build/images/sprites/adventureWoman/run07.png'
  );
  gameBackground = loadImage('https://la-wit.github.io/build-an-infinite-runner/build/images/environments/defaultBackground.png');
  platformBackground = loadImage('https://la-wit.github.io/build-an-infinite-runner/build/images/environments/defaultPlatform.png');
  gameBackground2 = loadImage('https://la-wit.github.io/build-an-infinite-runner/build/images/environments/industrialBackground.png');
  platformBackground2 = loadImage('https://la-wit.github.io/build-an-infinite-runner/build/images/environments/industrialPlatform.png');
  gameBackground3 = loadImage('https://la-wit.github.io/build-an-infinite-runner/build/images/environments/desertBackground.png');
  platformBackground3 = loadImage('https://la-wit.github.io/build-an-infinite-runner/build/images/environments/desertPlatform.png');
  fireBall = loadAnimation("Fire 1.gif", "Fire 2.gif", "Fire 3.gif", "Fire 4.gif");
  gameOver = loadImage("gameover.png");
  reset = loadImage("reset.png");

  coin1 = loadImage("coin.png");
  potion1 = loadImage("potion.png");
}

function setup() {
  createCanvas(800, 400);
  bg = createSprite(400, 200);
  bg.addImage('Background', gameBackground);
  bg.scale = 1.5;

  gameOver1 = createSprite(400, 50);
  gameOver1.addImage(gameOver);
  gameOver1.scale = 0.1;
  gameOver1.visible = false;

  reset1 = createSprite(70, 30);
  reset1.addImage(reset);
  reset1.scale = 0.1;
  reset1.visible = false;

  runner = createSprite(50, 350, 10, 10);
  runner.addAnimation('running', runningAnimation);
  runner.scale = 1.5;

  invisibleGround = createSprite(400, 410, 800, 10);
  invisibleGround.visible = false;

  platformGroup = new Group();
  fireGroup = new Group();
  coinGroup = new Group();
  potionGroup = new Group();
}

function draw() {
  background(255, 255, 255);
  if (food > 3 && food < 7) {
    bg.addImage('Background', gameBackground2);
  } else if (food > 6) {
    bg.addImage('Background', gameBackground3);
  }
  if (gameState == 1) {

    spawnPlatform();
    spawnfireBall();
    spawnCoin();

    if (keyDown("space")) {
      runner.velocityY = -10;
    }
    runner.velocityY += 0.5;
    if (runner.isTouching(platformGroup)) {
      runner.velocityY = 0;
    }

    if (runner.isTouching(fireGroup)) {
      gameState = 0;

    }
    if (runner.isTouching(potionGroup)) {
      potionGroup.destroyEach();
      food = food + 1;
    }
    if (runner.isTouching(coinGroup)) {
      coinGroup.destroyEach();
      score = score + 1
    }
  } else {
    coinGroup.setVelocityXEach(0);
    platformGroup.setVelocityXEach(0);
    fireGroup.setVelocityXEach(0);
    potionGroup.setVelocityXEach(0);
    gameOver1.visible = true;
    reset1.visible = true;
  }
  bg.velocityX = -4;
  if (bg.x < 140) {
    bg.x = bg.width / 2;
  }
  runner.collide(invisibleGround);
  console.log(platformGroup);
  drawSprites();
  textSize(18);
  text("ninja have collected " + food + " potions", 550, 50);
  text("ninja have " + score + " coins", 550, 20)
}

function spawnPlatform() {
  var rand = Math.round(random(1, 3)); switch (rand) { case 1: myrand = 250; break; case 2: myrand = 150; break; case 3: myrand = 175; break; }
  if (frameCount % myrand === 0) {
    platform = createSprite(700, random(200, 300));
    platform.addImage(platformBackground);
    if (food > 3 && food < 7) {
      platform.addImage(platformBackground2);
    } else if (food > 6) {
      platform.addImage(platformBackground3);
    }
    platform.velocityX = -2;
    platform.scale = 0.1;
    platform.Lifetime = 700;
    platformGroup.add(platform);
    random1 = Math.round(random(1, 10));
    if (random1 % 3 == 0) {
      potion = createSprite(platform.x + 10, platform.y - 30);
      potion.addImage(potion1);
      potion.scale = 0.05;
      potion.velocityX = platform.velocityX;
      potionGroup.add(potion);
    }
  }
}

function spawnfireBall() {
  var rand = Math.round(random(1, 3)); switch (rand) { case 1: myrand = 250; break; case 2: myrand = 150; break; case 3: myrand = 175; break; }
  if (frameCount % myrand === 0) {
    fire = createSprite(700, 380);
    fire.addAnimation("fire", fireBall);
    fire.velocityX = -Math.round(random(4, 10));
    fire.scale = 0.1;
    fire.Lifetime = 700;
    fireGroup.add(fire);
  }
}

function spawnCoin() {
  if (frameCount % 400 == 0) {
    coin = createSprite(700, random(100, 250));
    coin.velocityX = -2;
    coin.lifetime = 700;
    coin.addImage(coin1);
    coin.scale = 0.03;
    coinGroup.add(coin);
  }
}