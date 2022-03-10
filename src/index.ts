import Enemy from "./model/Enemy";
import Player from "./model/Player";
import Projectile from "./model/Projectile";
import App from "./App";
import EnemySpawner from "./service/EnemySpawner";

const app: App = new App();
const canvas: HTMLCanvasElement = app.getCanvas();
const canvasCtx: CanvasRenderingContext2D = app.getCanvasCtx();
const enemySpawner: EnemySpawner = app.getService('enemySpawner');

const playerX = canvas.width / 2;
const playerY = canvas.height / 2;

const player = new Player(canvasCtx, playerX, playerY, 30, 'blue');
const projectiles: Projectile[] = [];
const enemies: Enemy[] = [];

const animate = () => {
    requestAnimationFrame(animate)
    canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
    player.render();

    projectiles.forEach(projectile => {
        projectile.updatePosition();
    })

    enemies.forEach(enemy => {
        enemy.updatePosition();
    })
};

const spawnEnemies = () => {
    setInterval(() => {
        enemies.push(enemySpawner.spawnOneRandom(playerX, playerY))        
    }, 1000);
};

addEventListener('click', event => {
    projectiles.push(player.shoot(event.clientX, event.clientY));
})

animate();
spawnEnemies();
