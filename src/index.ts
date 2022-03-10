import Player from './model/Player';
import App from './App';
import GameController from './service/GameController';
import DistanceComputer from './util/DistanceComputer';
import ProjectileManager from './manager/ProjectileManager';
import EnemyManager from './manager/EnemyManager';
import CollisionManager from './manager/CollisionManager';
import ParticleManager from './manager/ParticleManager';

const app: App = new App();
const canvas: HTMLCanvasElement = app.getCanvas();
const canvasCtx: CanvasRenderingContext2D = app.getCanvasCtx();

const gameController: GameController = app.serviceManager.services.gameController;
const collisionManager: CollisionManager = app.serviceManager.services.collisionManager;
const enemyManager: EnemyManager = app.serviceManager.services.enemyManager;
const particleManager: ParticleManager = app.serviceManager.services.particleManager;
const projectileManager: ProjectileManager = app.serviceManager.services.projectileManager;

const playerX = canvas.width / 2;
const playerY = canvas.height / 2;

const player = new Player(canvasCtx, playerX, playerY, 10, '#fff');

let animationId: number;

const animate = () => {
    animationId = requestAnimationFrame(animate);

    canvasCtx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    canvasCtx.fillRect(0, 0, canvas.width, canvas.height);

    player.render();
    animateParticles();
    animateProjectiles();
    animateEnemies(player, animationId);
};

const animateProjectiles = () => {
    projectileManager.projectiles.forEach((projectile, i) => {
        projectile.updatePosition();
        projectileManager.cleanProjectile(projectile, i);
    })
}

const animateParticles = () => {
    particleManager.particles.forEach((particle, i) => {
        if (particle.alpha <= 0) {
            particleManager.particles.splice(i, 1);
        } else {
            particle.updatePosition();
        }
    });
}

const animateEnemies = (player: Player, animationId: number) => {
    enemyManager.enemies.forEach((enemy, i) => {
        enemy.updatePosition();

        const dist = DistanceComputer.computeDistBetweenTwoElements(player, enemy);

        if (dist - enemy.radius - player.radius < 1) {
            gameController.endGame(animationId);
        }

        projectileManager.projectiles.forEach((projectile, j) => {
            collisionManager.manageProjectileEnemyCollision(projectile, enemy, j, i);
        })
    })
}

addEventListener('click', event => {
    projectileManager.projectiles.push(player.shoot(event.clientX, event.clientY));
});

gameController.startGame(animate, playerX, playerY);
