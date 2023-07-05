
import { Brick } from '../sprites/Brick';
import { Paddle} from "../sprites/Paddle";
import { Ball} from "../sprites/Ball";


export class CanvasView {
    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D | null;
    private scoreDisplay: HTMLObjectElement | null;
    private start: HTMLObjectElement | null;
    private info: HTMLObjectElement | null;

    constructor(canvasName: string) {
        this.canvas = document.querySelector(canvasName) as HTMLCanvasElement;
        this.context = this.canvas.getContext('2d');
        this.scoreDisplay = document.querySelector('#score');
        this.start = document.querySelector('#start');
        this.info = document.querySelector('#info');
    }

    clear(): void {
        this.context?.clearRect(0,0, this.canvas.width, this.canvas.height);
    }

    initStartButton(startFunction: (view: CanvasView) => void): void {
        this.start?.addEventListener('click', () => startFunction(this))
    }

    drawScore(score: number): void {
        if (this.scoreDisplay) this.scoreDisplay.innerHTML = score.toString();
    }

    drawInfo(text: string): void {
        if (this.info) this.info.innerHTML = text;
    }

    // fixed for all sprites
    drawSprite(sprite: Ball | Brick | Paddle): void {
        if (!sprite) return;


        // possible refactor - abstract it into separate sprite class
        // and have other sprites extend from it
        this.context?.drawImage(
            sprite.image,
            sprite.pos.x,
            sprite.pos.y,
            sprite.width,
            sprite.height
        );
    }

    // draw bricks on the canvas
    drawBricks(bricks: Brick[]): void {
        bricks.forEach(brick => this.drawSprite(brick));
    }


}