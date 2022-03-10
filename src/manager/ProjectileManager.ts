import Projectile from '../model/Projectile';

export default class ProjectileManager {
    public projectiles: Projectile[] = [];

    constructor(
        private readonly canvasWidth: number, 
        private readonly canvasHeight: number
    ) {}

    public cleanProjectile(projectile: Projectile, projectileIndex: number): void {
        if (
            projectile.x + projectile.radius < 0 ||
            projectile.x - projectile.radius > this.canvasWidth ||
            projectile.y + projectile.radius < 0 ||
            projectile.y - projectile.radius > this.canvasHeight
        ) {
            this.removeProjectile(projectileIndex);
        }
    }

    public removeProjectile(i: number) {
        setTimeout(() => {
            this.projectiles.splice(i, 1);
        }, 0);
    }
}
