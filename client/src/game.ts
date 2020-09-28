import { Chat } from "./chat";
import { Connection } from "./connection";
import { InputHandler } from "./InputHandler";
import { GameObject, UserInterface } from "./interfaces";
import { Login } from "./login";

export enum GameState {
  SETTINGS,
  RUNNING,
  LOGIN
};
export class Game {
  user: {username: string, password: string} = {username: '', password:''};
  gameState: GameState;
  gameObjects: GameObject[];
  uiObjects: UserInterface[];
  login: Login;
  inputHandler: InputHandler;
  connection: Connection;
  constructor(public canvas: HTMLCanvasElement, public ip: string, public port: string) {
    this.gameState = GameState.LOGIN;
    this.gameObjects = [];
    this.inputHandler = new InputHandler(this);
    this.connection = new Connection(ip,port);
    this.login = new Login(this);
    this.uiObjects = [];
    this.uiObjects.push(new Chat(this, 1000, 0, 500, 300));
    this.uiObjects.push(new Login(this));
    // this.inputHandler.addKeyboardEventListener(this.login.onKeyPress.bind(this.login), GameState.LOGIN);
    // this.inputHandler.addMouseEventListener(this.login.onMouseDown.bind(this.login), GameState.LOGIN);
    [...this.uiObjects].forEach(object => {
      this.inputHandler.addKeyboardEventListener(object.onKeyPress.bind(object), object.gameState);
      this.inputHandler.addMouseEventListener(object.onMouseDown.bind(object), object.gameState);
    });
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
        [...this.uiObjects].forEach(object => {
          if(object.gameState === GameState.RUNNING)
            object.draw(ctx)
        });
        [...this.gameObjects].forEach(object => object.draw(ctx));
        // LOGIN SUCCESS REMOVE LATER
        // ctx.globalAlpha = 1;
        ctx.font = '30px Arial';
        ctx.fillStyle = 'black';
        ctx.textAlign = 'center';
        ctx.fillText('Success!', this.canvas.width / 2, (this.canvas.height / 2) - (this.login.lineDimensions.height*2));
        ctx.fillText(this.login.inputs['username'], this.canvas.width / 2, (this.canvas.height / 2) - (this.login.lineDimensions.height/2));
        ctx.fillText(this.login.inputs['password'], this.canvas.width / 2, (this.canvas.height / 2) + (this.login.lineDimensions.height/2));
        // LOGIN SUCCESS REMOVE LATER
        break;
      case GameState.LOGIN:
        [...this.uiObjects].forEach(object => {
          if(object.gameState === GameState.LOGIN)
            object.draw(ctx)
        });
        break;
    }

  }
  setUser(user: {username: string, password: string}) {
    this.user = user;
  }
  switchGameState(newState: GameState) {
    // call everything that needs to react on gamestate changes
    this.inputHandler.onStateChange(newState);

    // make sure gamestate in game object is updated LAST
    this.gameState = newState;
  }
}
