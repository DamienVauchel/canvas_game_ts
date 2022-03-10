import CanvasConfig from './config/CanvasConfig';
import EnemySpawner from './service/EnemySpawner';
import GameController from './service/GameController';
import LoadedServices from './interface/LoadedServices';
import ScoreManager from './service/ScoreManager';

export default class App {
    private canvas: HTMLCanvasElement;
    private canvasCtx: CanvasRenderingContext2D;
    private services: LoadedServices = {};

    constructor() {
        this.canvas = document.querySelector('canvas')!;
        this.canvasCtx = this.canvas.getContext('2d');
        const canvasConfig = new CanvasConfig(this.canvas);

        canvasConfig.configurate();
        this.initServices();
    }

    private initServices(): void {
        this.services.enemySpawner = new EnemySpawner(this.canvasCtx, this.canvas.width, this.canvas.height);
        this.services.scoreManager = new ScoreManager();
        this.services.gameController = new GameController(this.services.scoreManager);
    }

    public getCanvas(): HTMLCanvasElement {
        return this.canvas;
    }

    public getCanvasCtx(): CanvasRenderingContext2D {
        return this.canvasCtx;
    }

    public getServices(): LoadedServices {
        return this.services;
    }

    public getService(service: string): any {
        return this.services[service];
    }
}
