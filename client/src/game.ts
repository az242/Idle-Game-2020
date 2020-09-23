import { Menu } from "./menu";

const GameState = {
  SETTINGS: 0,
  RUNNING: 1,
  LOGIN: 2
};
export class Game {
  gameWidth: number;
  gameHeight: number;
  gameState: any;
  gameObjects: any[];
  menu: Menu;
  constructor(canvas: HTMLCanvasElement) {
    this.gameWidth = canvas.width;
    this.gameHeight = canvas.height;
    this.gameState = GameState.LOGIN;
    this.gameObjects = [];
    this.menu = new Menu(this);
    document.addEventListener('keydown', (event)=>this.menu.onKeyPress(event));
    canvas.addEventListener('mousedown', (event)=>this.menu.onMouseDown(event));
  }

  start() {
    if (this.gameState !== GameState.LOGIN) {
        return;
    }
    this.gameObjects = [];
    this.gameState = GameState.RUNNING;
  }

  update(deltaTime) {
    if (this.gameState === GameState.LOGIN)
      return;

    [...this.gameObjects].forEach(object =>
      object.update(deltaTime)
    );
  }

  draw(ctx) {
    [...this.gameObjects].forEach(object => object.draw(ctx));

    if (this.gameState === GameState.SETTINGS) {
      ctx.rect(0, 0, this.gameWidth, this.gameHeight);
      ctx.fillStyle = "rgba(0,0,0,0.5)";
      ctx.fill();

      ctx.font = "30px Arial";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText("Settings", this.gameWidth / 2, this.gameHeight / 2);
    }

    if (this.gameState === GameState.LOGIN) {
      this.menu.draw(ctx);
    }
  }

  togglePause() {
    if (this.gameState == GameState.SETTINGS) {
      this.gameState = GameState.RUNNING;
    } else {
      this.gameState = GameState.SETTINGS;
    }
  }
}
