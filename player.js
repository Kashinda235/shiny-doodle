/* ================================
   PLAYER CLASS
================================ */
export class Player {
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