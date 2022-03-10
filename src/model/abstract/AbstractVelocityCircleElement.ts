import AbstractCircleElement from './AbstractCircleElement';
import VelocityInterface from '../../interface/Velocity';

export default class AbstractVelocityCircleElement extends AbstractCircleElement {
    constructor(
        ctx: CanvasRenderingContext2D, 
        x: number, 
        y: number, 
        radius: number, 
        color: string, 
        protected readonly velocity: VelocityInterface
    ) {
        super(ctx, x, y, radius, color);
    }

    updatePosition() {
        this.render();
        this.x = this.x + this.velocity.x;
        this.y = this.y + this.velocity.y;
    }
}
