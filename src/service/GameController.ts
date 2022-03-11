import ParticleManager from '../manager/ParticleManager';
import ProjectileManager from '../manager/ProjectileManager';
import EnemyManager from '../manager/EnemyManager';
import ScoreManager from './ScoreManager';
import Player from '../model/Player';

export default class GameController {
    public readonly gameOverModal: HTMLElement = document.getElementById('game-over-modal')!;
    public readonly startGameBtn: HTMLElement = document.getElementById('start-game-button')!;

    constructor(
        private readonly scoreManager: ScoreManager,
        private readonly enemyManager: EnemyManager,
        private readonly projectileManager: ProjectileManager,
        private readonly particleManager: ParticleManager
    ){}

    public initGame(player: Player, initialX: number, initialY: number): void {
        this.projectileManager.projectiles = [];
        this.enemyManager.enemies = [];
        this.particleManager.particles = [];
        player.respawn(initialX, initialY);
    }

    public startGame(animate: Function, player: Player, initialX: number, initialY: number): void {
        this.startGameBtn.addEventListener('click', () => {
            this.initGame(player, initialX, initialY);
            this.gameOverModal.style.display = 'none';
            animate();
            this.enemyManager.spawnEnemies(player.x, player.y);
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
