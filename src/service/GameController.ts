import ParticleManager from '../manager/ParticleManager';
import ProjectileManager from '../manager/ProjectileManager';
import EnemyManager from '../manager/EnemyManager';
import ScoreManager from './ScoreManager';

export default class GameController {
    public readonly gameOverModal: HTMLElement = document.getElementById('game-over-modal')!;
    public readonly startGameBtn: HTMLElement = document.getElementById('start-game-button')!;

    constructor(
        private readonly scoreManager: ScoreManager,
        private readonly enemyManager: EnemyManager,
        private readonly projectileManager: ProjectileManager,
        private readonly particleManager: ParticleManager
    ){}

    private initGame() {
        this.projectileManager.projectiles = [];
        this.enemyManager.enemies = [];
        this.particleManager.particles = [];
    }

    public startGame(animate: Function, playerX: number, playerY: number): void {
        this.startGameBtn.addEventListener('click', () => {
            this.initGame();
            this.gameOverModal.style.display = 'none';
            animate();
            this.enemyManager.spawnEnemies(playerX, playerY);
            this.scoreManager.score = 0;
            this.scoreManager.refreshRender();
        });
    }

    public endGame(animationId: number): void {
        cancelAnimationFrame(animationId);
        this.gameOverModal.style.display = 'flex';
        this.scoreManager.modalScoreElement.innerHTML = this.scoreManager.score.toString();
    }
}
