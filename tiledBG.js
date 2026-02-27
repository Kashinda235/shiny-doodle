/* ================================
   SIMPLE CHECKERED TILE BACKGROUND
   (no images — alternating colors)
================================ */

export class TiledBackground {
    /**
     * @param {number} tileSize Size of each tile (px)
     * @param {string} colorA First tile color
     * @param {string} colorB Second tile color
     */
    constructor(tileSize = 64, colorA = "#2c2c2c", colorB = "#242424") {
        this.tileSize = tileSize;
        this.colorA = colorA;
        this.colorB = colorB;
    }

    draw(ctx, canvasWidth, canvasHeight, camX = 0, camY = 0) {
        const cols = Math.ceil(canvasWidth / this.tileSize) + 1;
        const rows = Math.ceil(canvasHeight / this.tileSize) + 1;

        const startCol = Math.floor(camX / this.tileSize);
        const startRow = Math.floor(camY / this.tileSize);

        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                const worldCol = col + startCol;
                const worldRow = row + startRow;

                // alternate colors
                const isEven = (worldCol + worldRow) % 2 === 0;
                ctx.fillStyle = isEven ? this.colorA : this.colorB;

                const x =
                camX + col * this.tileSize - (camX % this.tileSize);
                const y =
                camY + row * this.tileSize - (camY % this.tileSize);

                ctx.fillRect(x, y, this.tileSize, this.tileSize);
            }
        }
    }

    DRAW(ctx, camera) {
        const viewWidth = camera.viewWidth;
        const viewHeight = camera.viewHeight;
        const camX = camera.x;
        const camY = camera.y;

        const cols = Math.ceil(viewWidth / this.tileSize) + 1;
        const rows = Math.ceil(viewHeight / this.tileSize) + 1;

        const startCol = Math.floor(camX / this.tileSize);
        const startRow = Math.floor(camY / this.tileSize);
        
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                const worldCol = col + startCol;
                const worldRow = row + startRow;

                // alternate colors
                const isEven = (worldCol + worldRow) % 2 === 0;
                ctx.fillStyle = isEven ? this.colorA : this.colorB;

                const x =
                camX + col * this.tileSize - (camX % this.tileSize);
                const y =
                camY + row * this.tileSize - (camera.y % this.tileSize);

                ctx.fillRect(x, y, this.tileSize, this.tileSize);
            }
        }
    }
}