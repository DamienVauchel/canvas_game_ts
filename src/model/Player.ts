import AbstractCircleElement from "./abstract/AbstractCircleElement";
import Projectile from "./Projectile";

export default class Player extends AbstractCircleElement {
    shoot(clientX: number, clientY: number): Projectile {
        const angle = Math.atan2(clientY - this.y, clientX - this.x);
        const velocity = {
            x: Math.cos(angle),
            y: Math.sin(angle)
        };

        return new Projectile(this.ctx, this.x, this.y, 5, this.color, velocity);
    }
}
