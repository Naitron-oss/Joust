## Bout

### Background

*Joust*, developed by Williams Electronics and released in 1982, is an arcade game
set in a far-flung alternate reality in which knights joust one another mounted on flying
ostriches. *Bout* is my interpretation, an endless battle of flying horses, heartbreak,
and try, try again.

Gameplay is simple. There are three buttons—two to move right and left, and one to jump.
If you collide with an enemy, victory is determined by relative altitude. Players see how
many enemies they can best before being bested themselves.

### Tech

*Bout* is built using the p5.js and the p5.play libraries. p5.js handles all rendering,
while p5.play offers a Sprite class and collision detection.

Enemies are set to random speeds, directions, and jump patterns. After the player bests
an enemy, it will fall to the ground and respawn in the same position after a few seconds.
