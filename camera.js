/* =====================================
   ADVANCED 2D CAMERA
   - smoothing
   - dead zone
   - world bounds
   - camera shake
===================================== */

export class Camera {
    constructor(viewWidth, viewHeight, worldWidth, worldHeight) {
        // camera position (world coords)
        this.x = 0;
        this.y = 0;

        // viewport size
        this.viewWidth = viewWidth;
        this.viewHeight = viewHeight;

        // world limits
        this.worldWidth = worldWidth;
        this.worldHeight = worldHeight;

        /* ---------- smoothing ---------- */
        this.smoothness = 0.05; // smaller = smoother

        /* ---------- dead zone ---------- */
        this.deadZone = {
        x: viewWidth / 2 - 100,
        y: viewHeight / 2 - 100,
        width: 200,
        height: 200
        };

        /* ---------- zoom ---------- */
        this.zoom = 1;
        this.targetZoom = 1;
        this.zoomSmoothness = 0.08;
        this.minZoom = 0.5;
        this.maxZoom = 3;
        
        /* ---------- shake ---------- */
        this.shakeTime = 0;
        this.shakeDuration = 0;
        this.shakeMagnitude = 0;
        this.shakeOffsetX = 0;
        this.shakeOffsetY = 0;
    }

    /* =====================================
        FOLLOW TARGET WITH DEAD ZONE + SMOOTH
    ===================================== */
    follow(target, dt) {
        const targetScreenX = target.x - this.x;
        const targetScreenY = target.y - this.y;

        // visible world area changes with zoom
        const visibleWidth = this.viewWidth / this.zoom;
        const visibleHeight = this.viewHeight / this.zoom;

        let targetCamX = targetScreenX - visibleWidth / 2;
        let targetCamY = targetScreenY - visibleHeight / 2;

        // let targetCamX = this.x;
        // let targetCamY = this.y;

        // // horizontal dead zone
        // if (targetScreenX < this.deadZone.x) {
        // targetCamX = target.x - this.deadZone.x;
        // } else if (
        // targetScreenX >
        // this.deadZone.x + this.deadZone.width
        // ) {
        // targetCamX =
        //     target.x - (this.deadZone.x + this.deadZone.width);
        // }

        // // vertical dead zone
        // if (targetScreenY < this.deadZone.y) {
        // targetCamY = target.y - this.deadZone.y;
        // } else if (
        // targetScreenY >
        // this.deadZone.y + this.deadZone.height
        // ) {
        // targetCamY =
        //     target.y - (this.deadZone.y + this.deadZone.height);
        // }

        // smoothing (LERP)
        this.x += (targetCamX - this.x) * this.smoothness;
        this.y += (targetCamY - this.y) * this.smoothness;

        this.clampToWorld();
        this.updateShake(dt);
    }

    /* =====================================
        WORLD BOUNDS
    ===================================== */
    clampToWorld() {
        const visibleWidth = this.viewWidth / this.zoom;
        const visibleHeight = this.viewHeight / this.zoom;

        this.x = Math.max(
        0,
        Math.min(this.x, this.worldWidth - visibleWidth)
        );

        this.y = Math.max(
        0,
        Math.min(this.y, this.worldHeight - visibleHeight)
        );
    }

    /* =====================================
        CAMERA SHAKE
    ===================================== */
    shake(duration = 0.3, magnitude = 8) {
        this.shakeDuration = duration;
        this.shakeTime = duration;
        this.shakeMagnitude = magnitude;
    }

    updateShake(dt) {
        if (this.shakeTime > 0) {
        this.shakeTime -= dt;

        this.shakeOffsetX =
            (Math.random() * 2 - 1) * this.shakeMagnitude;
        this.shakeOffsetY =
            (Math.random() * 2 - 1) * this.shakeMagnitude;
        } else {
        this.shakeOffsetX = 0;
        this.shakeOffsetY = 0;
        }
    }

    /* =====================================
        ZOOM CONTROL
    ===================================== */
    setZoom(value) {
        this.targetZoom = Math.max(
        this.minZoom,
        Math.min(this.maxZoom, value)
        );
    }

    zoomIn(amount = 0.1) {
        this.setZoom(this.targetZoom + amount);
    }

    zoomOut(amount = 0.1) {
        this.setZoom(this.targetZoom - amount);
    }

    updateZoom(input) {
        // smooth zoom interpolation
        if (input.keys["Equal"]) this.zoomIn();   // +
        if (input.keys["Minus"]) this.zoomOut();  // -
        this.zoom += (this.targetZoom - this.zoom) * this.zoomSmoothness;
        console.log(this.targetZoom);
    }

    /* =====================================
        APPLY CAMERA TRANSFORM
    ===================================== */
    apply(ctx) {
        ctx.setTransform(
            this.zoom,
            0,
            0,
            this.zoom,
            -Math.floor((this.x + this.shakeOffsetX) * this.zoom),
            -Math.floor((this.y + this.shakeOffsetY) * this.zoom)
        );
    }

    /* reset transform for UI drawing */
    reset(ctx) {
        ctx.setTransform(1, 0, 0, 1, 0, 0);
    }
}