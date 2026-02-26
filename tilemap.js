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