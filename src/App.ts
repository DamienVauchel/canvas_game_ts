import CanvasConfig from './config/CanvasConfig';
import ServiceManager from './manager/ServiceManager';

export default class App {
    private canvas: HTMLCanvasElement;
    private canvasCtx: CanvasRenderingContext2D;
    public serviceManager: ServiceManager;

    constructor() {
        this.canvas = document.querySelector('canvas')!;
        this.canvasCtx = this.canvas.getContext('2d');
        const canvasConfig = new CanvasConfig(this.canvas);

        canvasConfig.configurate();

        this.serviceManager = new ServiceManager(this.canvasCtx, this.canvas);
        this.serviceManager.initServices();
    }

    public getCanvas(): HTMLCanvasElement {
        return this.canvas;
    }

    public getCanvasCtx(): CanvasRenderingContext2D {
        return this.canvasCtx;
    }
}
