/* ================================
   INPUT HANDLER CLASS
================================ */
export class InputHandler {
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