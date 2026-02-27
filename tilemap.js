/* ================================
   TILE MAP CLASS
   - Draws a tiled background
   - Supports sprite tileset images
================================ */

export class TileMap {
    /**
     * @param {number[][]} map 2D array of tile indices
     * @param {number} tileSize size of each tile in pixels
     * @param {HTMLImageElement} tileset image containing tiles
     * @param {number} tilesetColumns number of columns in tileset image
     */
    constructor(map, tileSize, tileset, tilesetColumns) {
        this.map = map;
        this.tileSize = tileSize;
        this.tileset = tileset;
        this.tilesetColumns = tilesetColumns;
    }

    /* Draw entire tilemap */
    draw(ctx, cameraX = 0, cameraY = 0) {
        for (let row = 0; row < this.map.length; row++) {
        for (let col = 0; col < this.map[row].length; col++) {
            const tileIndex = this.map[row][col];

            // skip empty tiles (-1 means empty)
            if (tileIndex < 0) continue;

            const sx =
            (tileIndex % this.tilesetColumns) * this.tileSize;
            const sy =
            Math.floor(tileIndex / this.tilesetColumns) *
            this.tileSize;

            const dx = col * this.tileSize - cameraX;
            const dy = row * this.tileSize - cameraY;

            ctx.drawImage(
            this.tileset,
            sx,
            sy,
            this.tileSize,
            this.tileSize,
            dx,
            dy,
            this.tileSize,
            this.tileSize
            );
        }
        }
    }

    /* Optional helper: get tile at world position */
    getTileAt(worldX, worldY) {
        const col = Math.floor(worldX / this.tileSize);
        const row = Math.floor(worldY / this.tileSize);

        if (
        row < 0 ||
        col < 0 ||
        row >= this.map.length ||
        col >= this.map[0].length
        ) {
        return -1;
        }

        return this.map[row][col];
    }
}

 /* ================================
   SIMPLE CHECKERED TILE BACKGROUND
   (no images — alternating colors)
================================ */

export class Background {
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