export default class AbstractCircleElement {
    constructor(
        protected readonly ctx: CanvasRenderingContext2D, 
        protected x: number, 
        protected y: number, 
        protected readonly radius: number, 
        protected readonly color: string
    ) {}

    render(): void {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        this.ctx.fillStyle = this.color;
        this.ctx.fill()
    }
}
