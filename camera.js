export class Camera {
    constructor(width, height) {
        this.x = 0;
        this.y = 0;
        this.width = width;
        this.height = height;
    }

    follow(target) {
        // keep target centered
        this.x = target.x - this.width / 2;
        this.y = target.y - this.height / 2;
    }
}