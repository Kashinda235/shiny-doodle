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

    draw(ctx, canvasWidth, canvasHeight, cameraX = 0, cameraY = 0) {
        const cols = Math.ceil(canvasWidth / this.tileSize) + 1;
        const rows = Math.ceil(canvasHeight / this.tileSize) + 1;

        const startCol = Math.floor(cameraX / this.tileSize);
        const startRow = Math.floor(cameraY / this.tileSize);

        for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const worldCol = col + startCol;
            const worldRow = row + startRow;

            // alternate colors
            const isEven = (worldCol + worldRow) % 2 === 0;
            ctx.fillStyle = isEven ? this.colorA : this.colorB;

            const x =
            col * this.tileSize - (cameraX % this.tileSize);
            const y =
            row * this.tileSize - (cameraY % this.tileSize);

            ctx.fillRect(x, y, this.tileSize, this.tileSize);
        }
        }
    }
}