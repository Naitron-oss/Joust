let player;
let enemy;
let enemy2;
let enemy3;
let enemy4;
let enemies;
let dead;
let coinFlips;
let base;
let platform;
let platform2;
let platform3;
let platform4;
let platform5;
let platform6;
let platform7;
let ciel;
let platforms;
let playerStatus;

function setup() {
  bg = loadImage("assets/background.jpg");
  createCanvas(1000, 600);
  player = createSprite(500, 50, 60, 40);
  player.addAnimation("normalright", "assets/player/readyright.gif");
  player.addAnimation("normalleft", "assets/player/readyleft.gif");
  player.addAnimation("runright", "assets/player/runright1.png", "assets/player/runright2.png",
                      "assets/player/runright3.png", "assets/player/runright4.png");
  player.addAnimation("runleft", "assets/player/runleft1.png", "assets/player/runleft2.png",
                      "assets/player/runleft3.png", "assets/player/runleft4.png");
  player.addAnimation("jumpright", "assets/player/attackright.gif");
  player.addAnimation("jumpleft", "assets/player/attackleft.gif");

  enemy = createEnemy(900, 320);
  enemy2 = createEnemy(950, 70);
  enemy3 = createEnemy(50, 70);
  enemy4 = createEnemy(100, 320);
  enemies = [enemy, enemy2, enemy3, enemy4];
  coinFlips = [Math.random(), Math.random(), Math.random(), Math.random()];

  setInterval(enemyJump, 60);

  dead = [];

  base = createSprite(500, 580, 700, 30);
  base.addAnimation("normal", "assets/base.jpg");

  platform = createSprite(940, 130, 130, 15);
  platform.addAnimation("normal", "assets/platforms/platform.png");

  platform2 = createSprite(35, 130, 120, 15);
  platform2.addAnimation("normal", "assets/platforms/platform2.png");

  platform3 = createSprite(120, 350, 250, 15);
  platform3.addAnimation("normal", "assets/platforms/platform3.png");

  platform4 = createSprite(900, 350, 200, 15);
  platform4.addAnimation("normal", "assets/platforms/platform4.png");

  platform5 = createSprite(450, 200, 170, 15);
  platform5.addAnimation("normal", "assets/platforms/platform5.png");

  platform6 = createSprite(590, 450, 160, 15);
  platform6.addAnimation("normal", "assets/platforms/platform6.png");

  platform7 = createSprite(100, 480, 90, 15);
  platform7.addAnimation("normal", "assets/platforms/platform7.png");

  ciel = createSprite(500, -5, 1000, 5)

  platforms = [base, platform, platform2, platform3, platform4,
    platform5, platform6, platform7, ciel]
}

function draw() {
  background(bg);
  drawSprites();

  //BOARD SETUP

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

  //ENEMY BEHAVIOR

  enemies.forEach((e) => {
    e.velocity.y += 0.4;
    e.maxSpeed = 3.5;
  });

  enemies.forEach((e) => {
    platforms.forEach((plat) => {
      if (e.collide(plat)) {
        if ((e.position.x < plat.position.x - (plat.originalWidth / 2)) ||
            (e.position.x > plat.position.x + (plat.originalWidth / 2))) {
          e.bounce(plat);
          e.velocity.y += 0.4;
        } else
        if (e.position.y < plat.position.y - 5) {
          e.velocity.y = 0;
        } else {
          e.bounce(plat);
        }
      };
    });
  });

  enemies.forEach((e) => {
    if (e.position.x < 0) {
      e.position.x = 1000;
    }

    if (e.position.x > 1000 ) {
      e.position.x = 0;
    }
  })

  enemies.forEach((e) => {
    if (e.position.y > 550) {
      e.velocity.y -= 7;
    }
  })


  coinFlips.forEach((c, i) => {
    if (c < 0.5) {
      enemies[i].velocity.x += 0.5;
      enemies[i].changeAnimation("runright");
    } else if (c >= 0.5) {
      enemies[i].velocity.x -= 0.5;
      enemies[i].changeAnimation("runleft");
    }
  });

  //PLAYER MOVEMENT, CONTROLS

  player.velocity.y += 0.3;
  player.maxSpeed = 4.5;

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

  // COMBAT

  enemies.forEach((e) => {
    if (e.collide(player)) {
      if (player.position.y < e.position.y - 25) {
        createDeadEnemy(e.position.x, e.position.y)
        e.remove();
      } else if (e.position.y < player.position.y - 25) {
        player.remove();
      } else {
        if (e.position.x > player.position.x) {
          e.velocity.x += 40;
          player.velocity.x -= 40;
        } else {
          e.velocity.x -= 40;
          player.velocity.x += 40;
        }
      }
    }
  });

  if (dead.length > 0) {
    dead.forEach((d) => {
      deadEnemyFall(d);
    });
  }

}

function createEnemy(x, y) {
  let e = createSprite(x, y, 60, 40);
  e.addAnimation("normalright", "assets/enemy/readyright.gif");
  e.addAnimation("runright", "assets/enemy/runright1.png", "assets/enemy/runright2.png",
                "assets/enemy/runright3.png", "assets/enemy/runright4.png");
  e.addAnimation("jumpright", "assets/enemy/attackright.gif");
  e.addAnimation("normalleft", "assets/enemy/readyleft.gif");
  e.addAnimation("runleft", "assets/enemy/runleft1.png", "assets/enemy/runleft2.png",
                "assets/enemy/runleft3.png", "assets/enemy/runleft4.png");
  e.addAnimation("jumpleft", "assets/enemy/attackleft.gif");

  return e;
}

function enemyJump() {
  let min = Math.ceil(0);
  let max = Math.floor(4);
  let e = Math.floor(Math.random() * 4);

  if (enemies[e].position.y < 300) {
    let sleep = Math.random() * (80 - 50) + 50;
    setTimeout(sleep);
    enemies[e].velocity.y -= 8
  } else {
    let sleep = Math.random() * (80 - 40) + 40;
    setTimeout(sleep);
    enemies[e].velocity.y -= 10
  }
}

function createDeadEnemy(x, y) {
  let e = createSprite(x, y, 60, 40);
  e.addAnimation("painright", "assets/enemycorpse/painright.gif")
  e.addAnimation("painleft", "assets/enemycorpse/painleft.gif")
  e.addAnimation("fallenright", "assets/enemycorpse/fallenright.gif")
  e.addAnimation("fallenleft", "assets/enemycorpse/fallenleft.gif")

  e.changeAnimation("painleft");

  dead.push(e);
}

function deadEnemyFall(d) {
  d.velocity.y += 0.25;

  platforms.forEach((plat) => {
    if (d.collide(plat)) {
      d.velocity.y = 0;
      d.position.y += 10;
      d.changeAnimation("fallenleft");
    }
  });
}

function deadDecompose() {

}
