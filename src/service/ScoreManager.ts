export default class ScoreManager {
    private readonly scoreElement: HTMLElement = document.getElementById('score-count')!;
    public readonly modalScoreElement: HTMLElement = document.getElementById('game-over-modal-score')!;
    public score: number = 0

    public increase(value: number = 100): void {
        this.score += value;
        this.refreshRender();
    }

    public refreshRender(): void {
        this.scoreElement.innerHTML = this.score.toString();
    }
}
