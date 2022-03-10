import ScoreManager from './ScoreManager';

export default class GameController {
    public readonly gameOverModal: HTMLElement = document.getElementById('game-over-modal')!;
    public readonly startGameBtn: HTMLElement = document.getElementById('start-game-button')!;

    constructor(private readonly scoreManager: ScoreManager){}

    public startGame(initGame: Function, animate: Function, spawnEnemies: Function): void {
        this.startGameBtn.addEventListener('click', () => {
            initGame();
            this.gameOverModal.style.display = 'none';
            animate();
            spawnEnemies();
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
