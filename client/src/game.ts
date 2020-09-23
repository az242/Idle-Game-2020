import { Connection } from "./connection";
import { InputHandler } from "./InputHandler";
import { GameObject } from "./interfaces";
import { Login } from "./login";

export enum GameState {
  SETTINGS,
  RUNNING,
  LOGIN
};
export class Game {
  gameState: GameState;
  gameObjects: GameObject[];
  login: Login;
  inputHandler: InputHandler;
  connection: Connection;
  constructor(public canvas: HTMLCanvasElement, public ip: string, public port: string) {
    this.gameState = GameState.LOGIN;
    this.gameObjects = [];
    this.login = new Login(this);
    this.inputHandler = new InputHandler(this);
    this.connection = new Connection(ip,port);
    this.inputHandler.addKeyboardEventListener(this.login.onKeyPress.bind(this.login), GameState.LOGIN);
    this.inputHandler.addMouseEventListener(this.login.onMouseDown.bind(this.login), GameState.LOGIN);
    this.switchGameState(GameState.LOGIN);
    this.connection.addListener('joined', (payload) => console.log(payload));
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
        this.login.draw(ctx);
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
