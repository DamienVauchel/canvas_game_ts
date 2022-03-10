export default class GameController {
    public endGame(animationId: number): void {
        cancelAnimationFrame(animationId)
    }
}
