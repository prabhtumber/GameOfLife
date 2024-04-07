class Automata {
    constructor(gameEngine, width, height) {
        this.gameEngine = gameEngine;
        this.width = width;
        this.height = height;
        this.cellSize = 7; // Size of each cell in pixels
        this.grid = this.initializeGrid();
    }

    initializeGrid() {
        let rows = Math.floor(this.height / this.cellSize);
        let cols = Math.floor(this.width / this.cellSize);
        let grid = new Array(cols);
        for (let i = 0; i < cols; i++) {
            grid[i] = new Array(rows).fill(0);
        }

        // Example: Seed the grid with a random pattern
        for (let i = 0; i < cols; i++) {
            for (let j = 0; j < rows; j++) {
                grid[i][j] = Math.random() < 0.15 ? 1 : 0; // 20% chance of being alive
            }
        }

        return grid;
    }





    update() {
        console.log("Update called");
        let newGrid = this.initializeGrid();
        for (let x = 0; x < this.grid.length; x++) {
            for (let y = 0; y < this.grid[x].length; y++) {
                let neighbors = this.countNeighbors(x, y);
                let state = this.grid[x][y];
                if (state === 0 && neighbors === 3) {
                    newGrid[x][y] = 1;
                } else if (state === 1 && (neighbors < 2 || neighbors > 3)) {
                    newGrid[x][y] = 0;
                } else {
                    newGrid[x][y] = state;
                }
            }
        }
        this.grid = newGrid;
    }

    countNeighbors(x, y) {
        let sum = 0;
        for (let i = -1; i < 2; i++) {
            for (let j = -1; j < 2; j++) {
                let col = (x + i + this.grid.length) % this.grid.length;
                let row = (y + j + this.grid[x].length) % this.grid[x].length;
                sum += this.grid[col][row];
            }
        }
        sum -= this.grid[x][y];
        return sum;
    }

    draw(ctx) {
        for (let x = 0; x < this.grid.length; x++) {
            for (let y = 0; y < this.grid[x].length; y++) {
                if (this.grid[x][y] === 1) {
                    ctx.fillStyle = "black"; // Live cells
                } else {
                    ctx.fillStyle = "white"; // Dead cells
                }
                ctx.fillRect(x * this.cellSize, y * this.cellSize, this.cellSize, this.cellSize);
            }
        }
    }


}
