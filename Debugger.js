/* =====================================
   CAMERA DEBUG OVERLAY
===================================== */

export class Debugger {
    constructor(camera) {
        this.dbgCamera = new CameraDebugger(camera);
        this.fps = new FPSCounter();
    }

    update() {
        if (this.input.keys["Backquote"]) {
            this.cameraDebugger.enabled = !this.cameraDebugger.enabled;
        }
        this.fps.update();
    } 

    draw(ctx) {
        this.dbgCamera.draw(ctx);
        this.fps.draw(ctx);
    }
}

class CameraDebugger {
    constructor(camera) {
        this.camera = camera;
        this.enabled = true;
    }

    draw(ctx) {
        if (!this.enabled) return;

        const cam = this.camera;

        // visible world size (zoom aware)
        const visibleWidth = cam.viewWidth / cam.zoom;
        const visibleHeight = cam.viewHeight / cam.zoom;

        /* ---------- draw in WORLD SPACE ---------- */
        ctx.save();

        // camera viewport
        ctx.strokeStyle = "red";
        ctx.lineWidth = 2;
        ctx.strokeRect(cam.x, cam.y, visibleWidth / 10, visibleHeight / 10);

        // dead zone
        const dz = cam.deadZone;

        ctx.strokeStyle = "yellow";
        ctx.lineWidth = 2;

        ctx.strokeRect(
        cam.x,
        cam.y,
        cam.worldWidth / 10,
        cam.worldHeight / 10
        );

        // camera center crosshair
        const cx = cam.x + visibleWidth / 20;
        const cy = cam.y + visibleHeight / 20;

        ctx.strokeStyle = "cyan";
        ctx.beginPath();
        ctx.moveTo(cx - 20, cy);
        ctx.lineTo(cx + 20, cy);
        ctx.moveTo(cx, cy - 20);
        ctx.lineTo(cx, cy + 20);
        ctx.stroke();

        ctx.restore();

        /* ---------- UI SPACE INFO ---------- */
        cam.reset(ctx);

        ctx.fillStyle = "white";
        ctx.font = "14px monospace";

        ctx.fillText(`Camera X: ${cam.x.toFixed(1)}`, 10, 20);
        ctx.fillText(`Camera Y: ${cam.y.toFixed(1)}`, 10, 40);
        ctx.fillText(`Zoom: ${cam.zoom.toFixed(2)}`, 10, 60);
    }
}

/* ================================
   FPS COUNTER
================================ */

class FPSCounter {
    constructor(x = 10, y = 20) {
        this.x = x;
        this.y = y;
        this.lastTime = performance.now();
        this.frameCount = 0;
        this.fps = 0;
        this.accumulator = 0;

        // update FPS every N seconds (smoothing)
        this.updateInterval = 0.5; // seconds
    }

    update() {
        const now = performance.now();
        const delta = (now - this.lastTime) / 1000;
        this.lastTime = now;

        this.frameCount++;
        this.accumulator += delta;

        // update displayed FPS periodically (stable value)
        if (this.accumulator >= this.updateInterval) {
        this.fps = Math.round(this.frameCount / this.accumulator);
        this.frameCount = 0;
        this.accumulator = 0;
        }
    }

    draw(ctx) {
        ctx.save();

        // draw in screen space (ignore camera transforms)
        ctx.setTransform(1, 0, 0, 1, 0, 0);

        ctx.font = "14px monospace";
        ctx.fillStyle = "lime";
        ctx.fillText(`FPS: ${this.fps}`, 10, 80);

        ctx.restore();
    }
}