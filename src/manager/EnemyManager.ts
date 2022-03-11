import Enemy from '../model/Enemy';
import EnemySpawner from '../service/EnemySpawner';

export default class EnemyManager {
    public spawnInterval: ReturnType<typeof setInterval>;
    public enemies: Enemy[] = [];

    constructor(private readonly enemySpawner: EnemySpawner){}

    public removeEnemy(i: number) {
        setTimeout(() => {
            this.enemies.splice(i, 1);
        }, 0);
    }
    
    public spawnEnemies(playerX: number, playerY: number): void {
        this.spawnInterval = setInterval(() => {
            this.enemies.push(this.enemySpawner.spawnOneRandom(playerX, playerY));   
        }, 800);
    };

    public updateTarget(targetX: number, targetY: number): void {
        clearInterval(this.spawnInterval);
        this.spawnEnemies(targetX, targetY);
    }
}
