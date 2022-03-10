import gsap from 'gsap';
import AbstractVelocityCircleElement from './abstract/AbstractVelocityCircleElement';
import Particle from './Particle';

export default class Enemy extends AbstractVelocityCircleElement {
    public shrink(): void {
        gsap.to(this, {
            radius: this.radius - 10
        })
    }

    public explode(): Particle[] {
        const particles: Particle[] = [];

        for (let k = 0; k < this.radius * 2; ++k) {
            particles.push(
                new Particle(
                    this.ctx, 
                    this.x, 
                    this.y, 
                    Math.random() * 2, 
                    this.color, 
                    { 
                        x: (Math.random() - 0.5) * (Math.random() * 6), 
                        y: (Math.random() - 0.5) * (Math.random() * 6) 
                    }
                )
            )                    
        }

        return particles;
    }
}
