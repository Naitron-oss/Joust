let cnv;
let player;
let enemy;
let enemy2;
let enemy3;
let enemy4;
let enemy5;
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
let scoreText;
let score = 0;
let hasStarted = false;
let paused = false;
let turnCount = 0;
let levelCount = 1;
let oldLevelCount = levelCount;

function setup() {
  bg = loadImage("assets/background.jpg");
  cnv = createCanvas(1000, 600);
  cnv.parent('sketch-holder');

  enemy1 = createEnemy();
  enemy2 = createEnemy();
  enemy3 = createEnemy();
  enemy4 = createEnemy();
  enemy5 = createEnemy();

  enemies = [enemy1, enemy2, enemy3, enemy4, enemy5];
  coinFlips = [Math.random(), Math.random(), Math.random(), Math.random(),
               Math.random()];

  setInterval(enemyJump, 143);
  setInterval(reroll, 300);

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

  if (hasStarted === true) {

    background(bg);
    drawSprites();


    //BASIC INTERFACE SETUP

    textSize(16);
    textFont("courier");
    fill(255, 255, 255);
    let scoreText = text("Enemies Bested: " + score, 820, 20);
    let levelText = text("Level " + levelCount, 20, 20);

    if (paused === true) {
      textSize(30);
      textFont("courier");
      fill(255, 255, 255);
      let pauseText = text("Paused", 450, 285);
    }


    //PLATFORM COLLISION

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


    //PLAYER MOVEMENT & CONTROLS

    player.velocity.y += 0.23;
    player.maxSpeed = 5;

    if (player.position.x < 0) {
      player.position.x = 1000;
    }

    if (player.position.x > 1000 ) {
      player.position.x = 0;
    }

    if (keyWentDown(" ") || keyWentDown(UP_ARROW) || keyWentDown("w")) {
      player.velocity.y -= 20;
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
      player.velocity.x += 0.4;
      player.changeAnimation("runright")
    };

    if (keyWentDown("a") || keyWentDown(LEFT_ARROW)) {
      playerStatus = "left";
    };

    if (keyDown("a") || keyDown(LEFT_ARROW)) {
      player.velocity.x -= 0.4;
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


    //ENEMY MOVEMENT

    enemies.forEach((e) => {
      e.velocity.y += 0.3;
      e.maxSpeed = 5;
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
      if (enemies[i] === undefined) {
        return null
      } else if (c < 0.05) {
        enemies[i].velocity.x += 0.20;
        enemies[i].changeAnimation("runright");
      } else if (c < 0.1) {
        enemies[i].velocity.x += 0.30;
        enemies[i].changeAnimation("runright");
      } else if (c < 0.15) {
        enemies[i].velocity.x += 0.35;
        enemies[i].changeAnimation("runright");
      } else if (c < 0.2) {
        enemies[i].velocity.x += 0.40;
        enemies[i].changeAnimation("runright");
      } else if (c < 0.25) {
        enemies[i].velocity.x += 0.45;
        enemies[i].changeAnimation("runright");
      } else if (c < 0.3) {
        enemies[i].velocity.x -= 0.20;
        enemies[i].changeAnimation("runleft");
      } else if (c < 0.35) {
        enemies[i].velocity.x -= 0.30;
        enemies[i].changeAnimation("runleft");
      } else if (c < 0.4) {
        enemies[i].velocity.x -= 0.35;
        enemies[i].changeAnimation("runleft");
      } else if (c < 0.45) {
        enemies[i].velocity.x -= 0.40;
        enemies[i].changeAnimation("runleft");
      } else if (c < 5) {
        enemies[i].velocity.x -= 0.45;
        enemies[i].changeAnimation("runleft");
      } else {
        if (player.position.x >= enemies[i].position.x) {
          enemies[i].velocity.x += 0.4;
          enemies[i].changeAnimation("runright");
        } else {
          enemies[i].velocity.x -= 0.4;
          enemies[i].changeAnimation("runleft");
        }
      }
    });


    //COMBAT

    enemies.forEach((e, i) => {
      if (e.collide(player)) {
        if (player.position.y < e.position.y - 25) {
          if (e.velocity.x > 0) {
            createDeadEnemy(e.position.x, e.position.y, "right", player);
          } else {
            createDeadEnemy(e.position.x, e.position.y, "left", player);
          }
          e.remove();
          enemies.splice(i, 1);
        } else if (e.position.y < player.position.y - 25) {
          player.remove();
          if (player.velocity.x > 0) {
            createDeadPlayer(player.position.x, player.position.y, "right");
          } else {
            createDeadPlayer(player.position.x, player.position.y, "left");
          }
          setTimeout(restart, 750);
        } else {
          if (e.position.x > player.position.x) {
            e.velocity.x += 40;
            player.velocity.x -= 40;
          } else {
            e.velocity.x -= 40;
            player.velocity.x += 40;
          }
        }

        if (e.position.y > 600) {
          if (e.velocity.x > 0) {
            createDeadEnemy(e.position.x, e.position.y, "right", player);
          } else {
            createDeadEnemy(e.position.x, e.position.y, "left", player);
          }
          e.remove();
          enemies.splice(i, 1);
        }
      }
    });


    //DEATH BEHAVIOR

    if (dead.length > 0) {
      dead.forEach((d) => {
        deadEnemyFall(d);
      });

      dead.forEach((d) => {
        if (d[0].velocity.y === 0) {
          if (d[0].collide(player)) {
            let dead_idx = dead.indexOf(d);
            d[0].remove();
            d[2] = true;
            score += 1;
            dead.splice(dead_idx, dead_idx + 1);
          }
        }

        if (d[0].position.y > 600) {
          let dead_idx = dead.indexOf(d);
          d[0].remove();
          d[2] = true;
          score += 1;
          dead.splice(dead_idx, dead_idx + 1);
        }
      })
    }

    if (enemies.length === 0 && dead.length === 0) {
      setTimeout(nextLevel, 2000);
      setTimeout(incrementLevel, 10000);
    }

    if (player.position.y > 700) {
      player.remove();
      setTimeout(restart, 750);
    }

  } else {

    background(bg);
    drawSprites();


    //INTERFACE SETUP

    textSize(16);
    textFont("courier");
    fill(255, 255, 255);
    if (turnCount === 0) {
      let scoreText = text("Click to Start", 810, 30);
    } else {
      let scoreText = text("Click to Try Again", 810, 30);
    }

    textSize(50);
    textFont("courier");
    fill(255, 255, 255);
    let titleCard = text("Bout", 440, 270);

    textSize(24);
    textFont("courier");
    fill(255, 255, 255);
    let nameTag = text("~a game by reed gaines~", 330, 310);


    //ENEMY MOVEMENT

    enemies.forEach((e) => {
      e.velocity.y += 0.25;
      e.maxSpeed = 5;
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
      if (e.position.y > 700) {
        e.remove();
      }
    })


    coinFlips.forEach((c, i) => {
      if (enemies[i] === undefined) {
        return null
      } else if (c < 0.1) {
        enemies[i].velocity.x += 0.20;
        enemies[i].changeAnimation("runright");
      } else if (c < 0.2) {
        enemies[i].velocity.x += 0.30;
        enemies[i].changeAnimation("runright");
      } else if (c < 0.3) {
        enemies[i].velocity.x += 0.35;
        enemies[i].changeAnimation("runright");
      } else if (c < 0.4) {
        enemies[i].velocity.x += 0.40;
        enemies[i].changeAnimation("runright");
      } else if (c < 0.5) {
        enemies[i].velocity.x += 0.45;
        enemies[i].changeAnimation("runright");
      } else if (c < 0.6) {
        enemies[i].velocity.x -= 0.20;
        enemies[i].changeAnimation("runleft");
      } else if (c < 0.7) {
        enemies[i].velocity.x -= 0.30;
        enemies[i].changeAnimation("runleft");
      } else if (c < 0.8) {
        enemies[i].velocity.x -= 0.35;
        enemies[i].changeAnimation("runleft");
      } else if (c < 0.9) {
        enemies[i].velocity.x -= 0.40;
        enemies[i].changeAnimation("runleft");
      } else if (c < 1) {
        enemies[i].velocity.x -= 0.45;
        enemies[i].changeAnimation("runleft");
      }
    });
  }
}


//UTILITY FUNCTIONS

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


//ENEMY MOVEMENT FUNCTIONS

function enemyJump() {
  enemies.forEach((e) => {
    coin = Math.random();
    if (player) {
      if (player.position.y <= e.position.y) {
        if (e.position.y < 100) {
          if (coin < 0.15) {
            e.velocity.y -= 7
          }
        } else if (e.position.y < 150) {
          if (coin < 0.25) {
            e.velocity.y -= 8
          }
        } else if (e.position.y < 250) {
          if (coin < 0.45) {
            e.velocity.y -= 8
          }
        } else if (e.position.y < 350) {
          if (coin < 0.5) {
            e.velocity.y -= 9
          }
        } else if (e.position.y < 450) {
          if (coin < 0.55) {
            e.velocity.y -= 9
          }
        } else {
          if (coin < 0.6) {
            e.velocity.y -= 9
          }
        }
      } else {
        if (e.position.y < 100) {
          if (coin < 0.1) {
            e.velocity.y -= 7
          }
        } else if (e.position.y < 150) {
          if (coin < 0.15) {
            e.velocity.y -= 7
          }
        } else if (e.position.y < 250) {
          if (coin < 0.25) {
            e.velocity.y -= 7
          }
        } else if (e.position.y < 350) {
          if (coin < 0.3) {
            e.velocity.y -= 7
          }
        } else if (e.position.y < 450) {
          if (coin < 0.45) {
            e.velocity.y -= 8
          }
        } else {
          if (coin < 0.5) {
            e.velocity.y -= 8
          }
        }
      }
    } else {
      if (e.position.y < 100) {
        if (coin < 0.1) {
          e.velocity.y -= 6
        }
      } else if (e.position.y < 150) {
        if (coin < 0.15) {
          e.velocity.y -= 6
        }
      } else if (e.position.y < 250) {
        if (coin < 0.3) {
          e.velocity.y -= 7
        }
      } else if (e.position.y < 350) {
        if (coin < 0.35) {
          e.velocity.y -= 7
        }
      } else if (e.position.y < 450) {
        if (coin < 0.45) {
          e.velocity.y -= 8
        }
      } else {
        if (coin < 0.5) {
          e.velocity.y -= 8
        }
      }
    }
  })
}

function reroll() {
  let randomchange = Math.floor(Math.random() * enemies.length);
  coinFlips[randomchange] = Math.random();
}


//ENEMY BIRTH/DEATH FUNCTIONS

function createEnemy(x = 600, y = 400) {
  let e = createSprite(x, y, 80, 53);

  e.addAnimation("normalright", "assets/enemy/readyright.png");
  e.addAnimation("runright", "assets/enemy/runright1.png", "assets/enemy/runright2.png",
                "assets/enemy/runright3.png", "assets/enemy/runright4.png");
  e.addAnimation("jumpright", "assets/enemy/attackright.png");
  e.addAnimation("normalleft", "assets/enemy/readyleft.png");
  e.addAnimation("runleft", "assets/enemy/runleft1.png", "assets/enemy/runleft2.png",
                "assets/enemy/runleft3.png", "assets/enemy/runleft4.png");
  e.addAnimation("jumpleft", "assets/enemy/attackleft.png");

  return e;
}

function createDeadEnemy(x, y, z, p) {
  let e = createSprite(x, y, 80, 53);
  e.addAnimation("painright", "assets/enemycorpse/painright.png")
  e.addAnimation("painleft", "assets/enemycorpse/painleft.png")
  e.addAnimation("fallenright", "assets/enemycorpse/fallenright.png")
  e.addAnimation("fallenleft", "assets/enemycorpse/fallenleft.png")
  e.addAnimation("blinkleft", "assets/playercorpse/fallenleft.gif")
  e.addAnimation("blinkright", "assets/playercorpse/fallenright.gif")
  let fullE = [e];

  if (z === "left") {
    e.changeAnimation("painleft");
    fullE.push("left");
  } else {
    e.changeAnimation("painright");
    fullE.push("right")
  }

  fullE.push(false);
  dead.push(fullE);

  clearDead(fullE, p);
}

function deadEnemyFall(d) {
  d[0].velocity.y += 0.25;

  platforms.forEach((plat) => {
    if (d[0].collide(plat)) {
      d[0].velocity.y = 0;
      d[0].position.y += 10;
      if (d[1] === "left") {
        d[0].changeAnimation("fallenleft");
      } else {
        d[0].changeAnimation("fallenright");
      }
    }
  });
}


//DEATH FUNCTIONS

async function clearDead(e, p) {
  if (e) {
    if (e.length === 3) {
      await sleep(3000);
      if (e[1] === "left") {
        e[0].changeAnimation("blinkleft");
        await sleep(750);
        e[0].changeAnimation("blinkleft");
        await sleep(750);
        e[0].changeAnimation("blinkleft");
        await sleep(750);
        e[0].changeAnimation("blinkleft");
        await sleep(400);
        e[0].changeAnimation("blinkleft");
        await sleep(400);
        e[0].changeAnimation("blinkleft");
        await sleep(400);
        e[0].changeAnimation("blinkleft");
      } else {
        e[0].changeAnimation("blinkright");
        await sleep(750);
        e[0].changeAnimation("blinkright");
        await sleep(750);
        e[0].changeAnimation("blinkright");
        await sleep(750);
        e[0].changeAnimation("blinkright");
        await sleep(400);
        e[0].changeAnimation("blinkright");
        await sleep(400);
        e[0].changeAnimation("blinkright");
        await sleep(400);
        e[0].changeAnimation("blinkright");
      }

      if (e[2] === false) {
        e[0].remove();
        spawnEnemy(e[0].position.x, e[0].position.y);
        ind = dead.indexOf(e);
        dead.splice(ind, ind + 1);
      }
    }
    else {
      await sleep(500);
      if (e[0]) {
        e[0].remove();
        ind = dead.indexOf(e);
        dead.splice(ind, ind + 1);
      }
    }
  } else {
    ind = dead.indexOf(e);
    dead.splice(ind, ind + 1);
  }
}

function spawnEnemy(x = null, y = null) {
  let coin = Math.random();
  if (enemies.length < 5) {
    if (x && y) {
      let nextEnemy = createEnemy(x, y);
      enemies.push(nextEnemy);
    } else {
      if (coin < 0.25) {
        let nextEnemy = createEnemy(100, 300);
        enemies.push(nextEnemy);
      } else if (coin < 0.5) {
        let nextEnemy = createEnemy(100, 100);
        enemies.push(nextEnemy);
      } else if (coin < 0.7) {
        let nextEnemy = createEnemy(900, 300);
        enemies.push(nextEnemy);
      } else {
        let nextEnemy = createEnemy(900, 100);
        enemies.push(nextEnemy);
      }
    }
  }
}

function mousePressed() {
  if (hasStarted === false) {
    if (player) {
      player.remove();
    }
    player = createSprite(450, 150, 80, 53);
    player.addAnimation("normalright", "assets/player/readyright.gif");
    player.addAnimation("normalleft", "assets/player/readyleft.gif");
    player.addAnimation("runright", "assets/player/runright1.png", "assets/player/runright2.png",
                        "assets/player/runright3.png", "assets/player/runright4.png");
    player.addAnimation("runleft", "assets/player/runleft1.png", "assets/player/runleft2.png",
                        "assets/player/runleft3.png", "assets/player/runleft4.png");
    player.addAnimation("jumpright", "assets/player/attackright.gif");
    player.addAnimation("jumpleft", "assets/player/attackleft.gif");

    enemies.forEach((e) => {
      e.remove();
    })

    enemies = [];

    while (enemies.length < 5) {
      spawnEnemy();
    }

    hasStarted = true;
  } else {
    if (paused === false) {
      paused = true;
      noLoop();
    } else {
      paused = false;
      loop();
    }
  }
}

function createDeadPlayer(x, y, z) {
  let e = createSprite(x, y, 80, 53);
  e.addAnimation("painright", "assets/playercorpse/painright.gif")
  e.addAnimation("painleft", "assets/playercorpse/painleft.gif")
  e.addAnimation("fallenright", "assets/playercorpse/fallenright.gif")
  e.addAnimation("fallenleft", "assets/playercorpse/fallenleft.gif")
  let fullE = [e];

  if (z === "left") {
    e.changeAnimation("painleft");
    fullE.push("left");
    dead.push(fullE);
  } else {
    e.changeAnimation("painright");
    fullE.push("right");
    dead.push(fullE);
  }

  clearDead(fullE, null);
}


function restart() {
  hasStarted = false;
  oldLevelCount = 1;
  nextLevel();
  turnCount += 1;
  score = 0;
}

function nextLevel() {

  if (hasStarted === false) {
    levelCount = 1;
  } else {
    while (levelCount < oldLevelCount + 1) {
      levelCount += 1;
    }
  }

  while (enemies.length < 5) {
    spawnEnemy();
  }

}

function incrementLevel() {
  while (oldLevelCount < levelCount) {
    oldLevelCount += 1;
  }
}
