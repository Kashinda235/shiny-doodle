/* ================================
   INPUT HANDLER CLASS
================================ */
class InputHandler {
  constructor() {
    this.keys = {};

    window.addEventListener("keydown", (e) => {
      this.keys[e.code] = true;
    });

    window.addEventListener("keyup", (e) => {
      this.keys[e.code] = false;
    });
  }

  isDown(key) {
    return this.keys[key];
  }
}

/* ================================
   PLAYER CLASS
================================ */
class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 50;
    this.height = 50;
    this.speed = 300;
  }

  update(deltaTime, input) {
        const {upKeys, downKeys, leftKeys, rightKeys} = {
            upKeys: ["ArrowUp", "KeyW", "Numpad8"],
            downKeys: ["ArrowDown", "KeyS", "Numpad2"],
            leftKeys: ["ArrowLeft", "KeyA", "Numpad4"],
            rightKeys: ["ArrowRight", "KeyD", "Numpad6"]
        };
        if (upKeys.some(key => input.keys[key])) this.y -= this.speed * deltaTime;
        if (downKeys.some(key => input.keys[key])) this.y += this.speed * deltaTime;
        if (leftKeys.some(key => input.keys[key])) this.x -= this.speed * deltaTime;
        if (rightKeys.some(key => input.keys[key])) this.x += this.speed * deltaTime;
  }

  draw(ctx) {
    ctx.fillStyle = "lime";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

/* ================================
   GAME CLASS
================================ */
class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.input = new InputHandler();
    this.player = new Player(100, 100);
    this.lastTime = 0;

    this.resize();
    window.addEventListener("resize", () => this.resize());

    requestAnimationFrame((timestamp) => this.gameLoop(timestamp));
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  update(deltaTime) {
    this.player.update(deltaTime, this.input);
  }

  render() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.player.draw(this.ctx);
  }

  gameLoop(timestamp) {
    const deltaTime = (timestamp - this.lastTime) / 1000;
    this.lastTime = timestamp;

    this.update(deltaTime);
    this.render();

    requestAnimationFrame((t) => this.gameLoop(t));
  }
}

/* ================================
   START GAME
================================ */
const canvas = document.getElementById("gameCanvas");
new Game(canvas);
