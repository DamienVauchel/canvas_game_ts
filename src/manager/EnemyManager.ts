import Enemy from '../model/Enemy';
import EnemySpawner from '../service/EnemySpawner';

export default class EnemyManager {
    public enemies: Enemy[] = [];

    constructor(private readonly enemySpawner: EnemySpawner){}

    public removeEnemy(i: number) {
        setTimeout(() => {
            this.enemies.splice(i, 1);
        }, 0);
    }
    
    public spawnEnemies(playerX: number, playerY: number): void {
        setInterval(() => {
        this.enemies.push(this.enemySpawner.spawnOneRandom(playerX, playerY));   
        }, 1000);
    };
}
