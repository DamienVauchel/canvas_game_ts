import AbstractVelocityCircleElement from './abstract/AbstractVelocityCircleElement';

export default class Particle extends AbstractVelocityCircleElement {
    private FRICTION = 0.99;
    public alpha = 1;

    render(): void {
        this.ctx.save();
        this.ctx.globalAlpha = this.alpha;
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
        this.ctx.restore();
    }    

    updatePosition() {
        this.render();
        this.velocity.x *= this.FRICTION;
        this.velocity.y *= this.FRICTION;
        this.x = this.x + this.velocity.x;
        this.y = this.y + this.velocity.y;
        this.alpha -= 0.01;
    }
}
