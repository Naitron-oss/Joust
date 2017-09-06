let player;
let base;
let platform;
let platform2;
let platform3;
let platform4;
let platform5;
let platform6;
let platform7;
let playerStatus;
let MARGIN = 10;

function setup() {
  bg = loadImage("assets/background.jpg");
  createCanvas(1000, 600);
  player = createSprite(500, 50, 60, 40);
  player.addAnimation("normalright", "assets/players/readyright.gif");
  player.addAnimation("normalleft", "assets/players/readyleft.gif");
  player.addAnimation("runright", "assets/players/runright1.png", "assets/players/runright2.png",
                      "assets/players/runright3.png", "assets/players/runright4.png");
  player.addAnimation("runleft", "assets/players/runleft1.png", "assets/players/runleft2.png",
                      "assets/players/runleft3.png", "assets/players/runleft4.png");
  player.addAnimation("jumpright", "assets/players/attackright.gif");
  player.addAnimation("jumpleft", "assets/players/attackleft.gif");

  base = createSprite(500, 592, 700, 26.5);
  base.addAnimation("normal", "assets/base.jpg");

  platform = createSprite(940, 130, 130, 16);
  platform.addAnimation("normal", "assets/platforms/platform.png");

  platform2 = createSprite(35, 130, 120, 16);
  platform2.addAnimation("normal", "assets/platforms/platform2.png");

  platform3 = createSprite(120, 350, 250, 16);
  platform3.addAnimation("normal", "assets/platforms/platform3.png");

  platform4 = createSprite(900, 350, 200, 16);
  platform4.addAnimation("normal", "assets/platforms/platform4.png");

  platform5 = createSprite(450, 200, 170, 16);
  platform5.addAnimation("normal", "assets/platforms/platform5.png");

  platform6 = createSprite(590, 450, 160, 16);
  platform6.addAnimation("normal", "assets/platforms/platform6.png");
  
  platform7 = createSprite(100, 480, 90, 16);
  platform7.addAnimation("normal", "assets/platforms/platform7.png");

  platforms = [base, platform, platform2, platform3, platform4,
    platform5, platform6, platform7]
}

function draw() {
  background(bg);
  drawSprites();

  player.velocity.y += 0.3;
  player.maxSpeed = 4.5;

  platforms.forEach((plat) => {
    if (player.collide(plat)) {
      player.velocity.y = 0;
      if (playerStatus === "right") {
        player.changeAnimation("normalright");
      } else if (playerStatus === "left") {
        player.changeAnimation("normalleft");
      }
    };
  });

  if (player.position.x < 0) {
    player.position.x = 1000;
  }

  if (player.position.x > 1000 ) {
    player.position.x = 0;
  }

  if (keyWentDown(" ") || keyWentDown(UP_ARROW) || keyWentDown("w")) {
    player.velocity.y -= 7;
    if (playerStatus === "right") {
      player.changeAnimation("jumpright");
    } else if (playerStatus === "left") {
      player.changeAnimation("jumpleft");
    }
  };

  if (keyWentDown("d") || keyWentDown(RIGHT_ARROW)) {
    playerStatus = "right";
  };

  if (keyDown("d") || keyDown(RIGHT_ARROW)) {
    player.velocity.x += 0.5;
    player.changeAnimation("runright")
  };

  if (keyWentDown("a") || keyWentDown(LEFT_ARROW)) {
    playerStatus = "left";
  };

  if (keyDown("a") || keyDown(LEFT_ARROW)) {
    player.velocity.x -= 0.5;
    player.changeAnimation("runleft")
  };

  if (keyWentUp("a") || keyWentUp("d") ||
  keyWentUp(LEFT_ARROW) || keyWentUp(RIGHT_ARROW)) {
    player.velocity.x = 0;
    if (playerStatus === "right") {
      if (player.velocity.y) {
        player.changeAnimation("jumpright");
      } else {
        player.changeAnimation("runright");
      }
    } else if (playerStatus === "left") {
      if (player.velocity.y) {
        player.changeAnimation("jumpleft");
      } else {
        player.changeAnimation("runleft");
      }
    }
  };
}
