import { InputHandler } from "./inputs";
import { Player } from "./player";

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
