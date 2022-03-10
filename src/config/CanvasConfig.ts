export default class CanvasConfig {
    constructor(private readonly canvas: HTMLCanvasElement) {}

    configurate() {
        this.canvas.width = innerWidth;
        this.canvas.height = innerHeight;

        return this.canvas;
    }
}
