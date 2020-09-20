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
  constructor(gameWidth, gameHeight) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.gameState = GameState.LOGIN;
    this.gameObjects = [];
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
      ctx.rect(0, 0, this.gameWidth, this.gameHeight);
      ctx.fillStyle = "rgba(0,0,0,1)";
      ctx.fill();

      ctx.font = "30px Arial";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText("Login", this.gameWidth / 2, this.gameHeight / 2);
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
