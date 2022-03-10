import Enemy from './model/Enemy';
import Particle from './model/Particle';
import Player from './model/Player';
import Projectile from './model/Projectile';
import App from './App';
import EnemySpawner from './service/EnemySpawner';
import GameController from './service/GameController';
import DistanceComputer from './util/DistanceComputer';
import ScoreManager from './service/ScoreManager';

const app: App = new App();
const canvas: HTMLCanvasElement = app.getCanvas();
const canvasCtx: CanvasRenderingContext2D = app.getCanvasCtx();
const enemySpawner: EnemySpawner = app.getService('enemySpawner');
const gameController: GameController = app.getService('gameController');
const scoreManager: ScoreManager = app.getService('scoreManager');

const playerX = canvas.width / 2;
const playerY = canvas.height / 2;

const player = new Player(canvasCtx, playerX, playerY, 10, '#fff');
let projectiles: Projectile[] = [];
let enemies: Enemy[] = [];
let particles: Particle[] = [];

let animationId: number;

const animate = () => {
    animationId = requestAnimationFrame(animate);

    canvasCtx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    canvasCtx.fillRect(0, 0, canvas.width, canvas.height);

    player.render();
    animateParticles();
    animateProjectiles();
    animateEnemies();
};

const animateParticles = () => {
    particles.forEach((particle, i) => {
        if (particle.alpha <= 0) {
            particles.splice(i, 1);
        } else {
            particle.updatePosition();
        }
    });
}

const animateProjectiles = () => {
    projectiles.forEach((projectile, i) => {
        projectile.updatePosition();
        cleanProjectile(projectile, i)
    })
}

const animateEnemies = () => {
    enemies.forEach((enemy, i) => {
        enemy.updatePosition();

        const dist = DistanceComputer.computeDistBetweenTwoElements(player, enemy);

        if (dist - enemy.radius - player.radius < 1) {
            gameController.endGame(animationId);
        }

        projectiles.forEach((projectile, j) => {
            manageProjectileEnemyCollision(projectile, enemy, j, i);
        })
    })
}

const manageProjectileEnemyCollision = (projectile: Projectile, enemy: Enemy, projectileIndex: number, enemyIndex: number) => {
    const dist = DistanceComputer.computeDistBetweenTwoElements(projectile, enemy);

    if (dist - enemy.radius - projectile.radius < 1) {
        particles.push(...enemy.explode());

        if (enemy.radius - 10 > 5) {
            scoreManager.increase();
            enemy.shrink();            
            removeProjectile(projectileIndex);
        } else {
            scoreManager.increase(250);
            removeEnemy(enemyIndex);
            removeProjectile(projectileIndex);
        }
    }
}

const cleanProjectile = (projectile: Projectile, projectileIndex: number) => {
    if (
        projectile.x + projectile.radius < 0 ||
        projectile.x - projectile.radius > canvas.width ||
        projectile.y + projectile.radius < 0 ||
        projectile.y - projectile.radius > canvas.height
    ) {
        removeProjectile(projectileIndex);
    }
}

const removeEnemy = (i: number) => {
    setTimeout(() => {
        enemies.splice(i, 1);
    }, 0);
}

const removeProjectile = (i: number) => {
    setTimeout(() => {
        projectiles.splice(i, 1);
    }, 0);
}

const spawnEnemies = () => {
    setInterval(() => {
    enemies.push(enemySpawner.spawnOneRandom(playerX, playerY));   
    }, 1000);
};

const initGame = () => {
    projectiles = [];
    enemies = [];
    particles = [];
}

addEventListener('click', event => {
    projectiles.push(player.shoot(event.clientX, event.clientY));
});

gameController.startGame(initGame, animate, spawnEnemies);
