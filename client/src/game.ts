import { InputHandler } from "./InputHandler";
import { GameObject } from "./interfaces";
import { Menu } from "./menu";

export enum GameState {
  SETTINGS,
  RUNNING,
  LOGIN
};
export class Game {
  gameWidth: number;
  gameHeight: number;
  gameState: GameState;
  gameObjects: GameObject[];
  menu: Menu;
  inputHandler: InputHandler;
  constructor(public canvas: HTMLCanvasElement) {
    this.gameWidth = canvas.width;
    this.gameHeight = canvas.height;
    this.gameState = GameState.LOGIN;
    this.gameObjects = [];
    this.menu = new Menu(this);
    this.inputHandler = new InputHandler(this);
    this.inputHandler.addKeyboardEventListener(this.menu.onKeyPress.bind(this.menu), GameState.LOGIN);
    this.inputHandler.addMouseEventListener(this.menu.onMouseDown.bind(this.menu), GameState.LOGIN);
    this.switchGameState(GameState.LOGIN);
  }

  update(deltaTime) {
    if (this.gameState === GameState.LOGIN)
      return;

    [...this.gameObjects].forEach(object =>
      object.update(deltaTime)
    );
  }

  draw(ctx) {
    switch (this.gameState) {
      case GameState.SETTINGS:
      case GameState.RUNNING:
        [...this.gameObjects].forEach(object => object.draw(ctx));
        break;
      case GameState.LOGIN:
        this.menu.draw(ctx);
        break;
    }
  }

  switchGameState(newState: GameState) {
    // call everything that needs to react on gamestate changes
    this.inputHandler.onStateChange(newState);

    // make sure gamestate in game object is updated LAST
    this.gameState = newState;
  }
}
