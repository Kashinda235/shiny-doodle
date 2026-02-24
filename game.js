/* ================================
   CANVAS SETUP
================================ */

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

/* ================================
   INPUT HANDLING
================================ */

const keys = {};

window.addEventListener("keydown", (e) => {
  keys[e.code] = true;
});

window.addEventListener("keyup", (e) => {
  keys[e.code] = false;
});

/* ================================
   GAME STATE
================================ */

let lastTime = 0;

const player = {
  x: 100,
  y: 100,
  width: 50,
  height: 50,
  speed: 300
};

/* ================================
   UPDATE FUNCTION
================================ */

const {upKeys, downKeys, leftKeys, rightKeys} = {
  upKeys: ["ArrowUp", "KeyW", "Numpad8"],
  downKeys: ["ArrowDown", "KeyS", "Numpad2"],
  leftKeys: ["ArrowLeft", "KeyA", "Numpad4"],
  rightKeys: ["ArrowRight", "KeyD", "Numpad6"]
};

function update(deltaTime) {
  // Movement
  if (upKeys.some(key => keys[key])) player.y -= player.speed * deltaTime;
  if (downKeys.some(key => keys[key])) player.y += player.speed * deltaTime;
  if (leftKeys.some(key => keys[key])) player.x -= player.speed * deltaTime;
  if (rightKeys.some(key => keys[key])) player.x += player.speed * deltaTime;
}

/* ================================
   RENDER FUNCTION
================================ */

function render() {
  // Clear screen
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw player
  ctx.fillStyle = "lime";
  ctx.fillRect(player.x, player.y, player.width, player.height);
}

/* ================================
   GAME LOOP
================================ */

function gameLoop(timestamp) {
  const deltaTime = (timestamp - lastTime) / 1000; // convert to seconds
  lastTime = timestamp;

  update(deltaTime);
  render();

  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);

