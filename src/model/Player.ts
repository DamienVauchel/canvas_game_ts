import EnemyManager from '../manager/EnemyManager';
import ProjectileManager from '../manager/ProjectileManager';
import AbstractCircleElement from './abstract/AbstractCircleElement';
import Projectile from './Projectile';

export default class Player extends AbstractCircleElement {
    private PROJECTILE_VELOCITY_MULTIPLIER = 5;
    private DEPLACEMENT_VALUE = 10;

    public respawn(x: number, y: number): void {
        this.x = x;
        this.y = y;
    }

    private shoot(clientX: number, clientY: number): Projectile {
        const angle = Math.atan2(clientY - this.y, clientX - this.x);
        const velocity = {
            x: Math.cos(angle) * this.PROJECTILE_VELOCITY_MULTIPLIER,
            y: Math.sin(angle) * this.PROJECTILE_VELOCITY_MULTIPLIER
        };

        return new Projectile(this.ctx, this.x, this.y, 5, this.color, velocity);
    }

    public addShootEventListener(projectileManager: ProjectileManager): void {
        addEventListener('click', event => {
            projectileManager.projectiles.push(this.shoot(event.clientX, event.clientY));
        });
    }

    private go(enemyManager: EnemyManager, direction: string): void {
        switch (direction) {
            case 'up':
                this.y -= this.DEPLACEMENT_VALUE;
                break;
            case 'left':
                this.x -= this.DEPLACEMENT_VALUE;
                break;
            case 'down':
                this.y += this.DEPLACEMENT_VALUE;
                break;
            case 'right':
                this.x += this.DEPLACEMENT_VALUE;
                break;
            case 'upLeft':
                this.y -= this.DEPLACEMENT_VALUE;
                this.x -= this.DEPLACEMENT_VALUE;
                break;
            case 'upRight':
                this.y -= this.DEPLACEMENT_VALUE;
                this.x += this.DEPLACEMENT_VALUE;
                break;
            case 'downLeft':
                this.y += this.DEPLACEMENT_VALUE;
                this.x -= this.DEPLACEMENT_VALUE;
                break;
            case 'downRight':
                this.y += this.DEPLACEMENT_VALUE;
                this.x += this.DEPLACEMENT_VALUE;
                break;
            default:
        }
        
        enemyManager.updateTarget(this.x, this.y);
    }

    public addControlEventListener(enemyManager: EnemyManager): void {
        let keysPressed: {[key: string]: Boolean} = {};

        addEventListener('keydown', (event) => {
            keysPressed[event.key] = true;
            
            switch (true) {
                case keysPressed['z'] && keysPressed['q']:
                    this.go(enemyManager, 'upLeft');
                    break;
                case keysPressed['z'] && keysPressed['d']:
                    this.go(enemyManager, 'upRight');
                    break;
                case keysPressed['s'] && keysPressed['q']:
                    this.go(enemyManager, 'downLeft');
                    break;
                case keysPressed['s'] && keysPressed['d']:
                    this.go(enemyManager, 'downRight');
                    break;
                case keysPressed['z']:
                    this.go(enemyManager, 'up');
                    break;
                case keysPressed['q']:
                    this.go(enemyManager, 'left');
                    break;
                case keysPressed['s']:
                    this.go(enemyManager, 'down');
                    break;
                case keysPressed['d']:
                    this.go(enemyManager, 'right');
                    break;
                default:
            }
         });
         
        addEventListener('keyup', (event) => {
            delete keysPressed[event.key];
         });
    }
}
