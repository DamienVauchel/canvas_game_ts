import Enemy from "../model/Enemy";

export default class EnemySpawner {
    constructor(
        private readonly ctx: CanvasRenderingContext2D, 
        private readonly canvasWidth: number, 
        private readonly canvasHeight: number, 
        private maxRandomRadius: number = 50, 
        private minRandomRadius: number = 5
    ) {
        this.ctx = ctx;
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.maxRandomRadius = maxRandomRadius;
        this.minRandomRadius = minRandomRadius;
    }

    spawnOneRandom(playerX: number, playerY: number) {
        const radius = Math.random() * (this.maxRandomRadius - this.minRandomRadius) + this.minRandomRadius;
        let x;
        let y;

        if (Math.random() < 0.5) {       
            x = Math.random() < 0.5 ? 0 - radius : this.canvasWidth + radius;
            y = Math.random() * this.canvasHeight;
        } else {
            x = Math.random() * this.canvasWidth;
            y = Math.random() < 0.5 ? 0 - radius : this.canvasHeight + radius;
        }

        const angle = Math.atan2(playerY - y, playerX - x);
        const velocity = {
            x: Math.cos(angle),
            y: Math.sin(angle)
        };

        return new Enemy(this.ctx, x, y, radius, 'red', velocity);
    }
}
