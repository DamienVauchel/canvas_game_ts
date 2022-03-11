import CollisionManager from '../manager/CollisionManager';
import EnemySpawner from '../service/EnemySpawner';
import EnemyManager from '../manager/EnemyManager';
import GameController from '../service/GameController';
import LoadedServices from '../interface/LoadedServices';
import ParticleManager from '../manager/ParticleManager';
import ProjectileManager from '../manager/ProjectileManager';
import ScoreManager from '../service/ScoreManager';

export default class ServiceManager {
    constructor(
        private readonly canvasCtx: CanvasRenderingContext2D,
        private readonly canvas: HTMLCanvasElement,
        public readonly services: LoadedServices = {}
    ){}
    
    public initServices(): void {
        this.services.enemySpawner = new EnemySpawner(this.canvasCtx, this.canvas.width, this.canvas.height);
        this.services.scoreManager = new ScoreManager();
        this.services.projectileManager = new ProjectileManager(this.canvas.width, this.canvas.height);
        this.services.enemyManager = new EnemyManager(this.services.enemySpawner);
        this.services.particleManager = new ParticleManager();
        this.services.gameController = new GameController(this.services.scoreManager, this.services.enemyManager, this.services.projectileManager, this.services.particleManager);
        this.services.collisionManager = new CollisionManager(this.services.scoreManager, this.services.projectileManager, this.services.enemyManager, this.services.particleManager, this.services.gameController);
    }
}
