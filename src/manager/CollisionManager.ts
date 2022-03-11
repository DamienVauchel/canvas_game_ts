import Player from "../model/Player";
import GameController from "../service/GameController";
import Enemy from "../model/Enemy";
import Projectile from "../model/Projectile";
import ScoreManager from "../service/ScoreManager";
import DistanceComputer from "../util/DistanceComputer";
import EnemyManager from "./EnemyManager";
import ParticleManager from "./ParticleManager";
import ProjectileManager from "./ProjectileManager";

export default class CollisionManager {
    constructor(
        private readonly scoreManager: ScoreManager,
        private readonly projectileManager: ProjectileManager,
        private readonly enemyManager: EnemyManager,
        private readonly particleManager: ParticleManager,
        private readonly gameController: GameController
    ){}

    public projectileEnemyCollision(projectile: Projectile, enemy: Enemy, projectileIndex: number, enemyIndex: number) {
        const dist = DistanceComputer.computeDistBetweenTwoElements(projectile, enemy);

        if (dist - enemy.radius - projectile.radius < 1) {
            this.particleManager.particles.push(...enemy.explode());

            if (enemy.radius - 10 > 5) {
                this.scoreManager.increase();
                enemy.shrink();            
                this.projectileManager.removeProjectile(projectileIndex);
            } else {
                this.scoreManager.increase(250);
                this.enemyManager.removeEnemy(enemyIndex);
                this.projectileManager.removeProjectile(projectileIndex);
            }
        }
    }

    public enemyPlayerCollision(enemy: Enemy, player: Player, animationId: number) {
        const dist = DistanceComputer.computeDistBetweenTwoElements(player, enemy);

        if (dist - enemy.radius - player.radius < 1) {
            this.gameController.endGame(animationId);
        }

    }
}
