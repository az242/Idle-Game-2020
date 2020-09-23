import { GameObject } from "./interfaces";
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
  gameObjects: GameObject[];
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
      //settings drawing stuff goes here
    }

    if (this.gameState === GameState.LOGIN) {
      this.menu.draw(ctx);
    }
  }
}
