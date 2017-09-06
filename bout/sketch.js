let player;
let base;
let platform;
let platform2;
let platform3;
let platform4;

function setup() {
  createCanvas(1000, 600);
  player = createSprite(500, 50, 25, 25);
  base = createSprite(500, 585, 950, 10);
  platform = createSprite(530, 200, 230, 10);
  platform2 = createSprite(210, 480, 200, 10);
  platform3 = createSprite(770, 430, 230, 10);
  platform4 = createSprite(370, 340, 160, 10);
  platforms = [base, platform, platform2, platform3, platform4]
}

function draw() {
  background(0,0,0);
  drawSprites();

  player.velocity.y += 0.2;

  platforms.forEach((plat) => {
    if (player.collide(plat)) {
      player.velocity.y = 0;
    };
  });

  if (keyWentDown(" ")) {
    player.velocity.y -= 3.5;
  };

  if (keyDown("a")) {
    player.velocity.x -= 0.3;
  };

  if (keyDown("d")) {
    player.velocity.x += 0.3;
  };

  if (keyWentUp("a") || keyWentUp("d")) {
    player.velocity.x = 0;
  };
}
