import { Camera } from "./camera.js";
import { InputHandler } from "./inputs.js";
import { Player } from "./player.js";
import { TiledBackground } from "./tiledBG.js";

/* ================================
   GAME CLASS
================================ */
class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.input = new InputHandler();
    this.player = new Player(100, 100);
    this.background = new TiledBackground();
    this.camera = new Camera(
      this.canvas.width,
      this.canvas.height,
      this.canvas.width * 2, // world width
      this.canvas.height * 2 // world height
    );
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
    this.camera.follow(this.player, deltaTime, this.input);
    // this.camera.updateZoom(this.input);
    // this.camera.updateShake(deltaTime, this.input);
  }

  render() {
    const ctx = this.ctx;

    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // apply camera offset
    this.camera.apply(ctx);

    // draw WORLD objects
    this.background.draw(
      ctx,
      this.canvas.width,
      this.canvas.height,
      this.camera.x,
      this.camera.y
    );
    this.player.draw(ctx, this.camera);

    // reset for UI
    this.camera.reset(ctx);

    // draw UI here ...
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

