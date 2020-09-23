
import { Game } from './game';
declare let ip;
declare let port;
const canvas = <HTMLCanvasElement>document.getElementById('gameScreen');
let ctx: CanvasRenderingContext2D = canvas.getContext("2d");
let GAME_WIDTH = canvas.width;
let GAME_HEIGHT = canvas.height;
let game = new Game(canvas, ip, port);

let lastTime = 0;
function gameLoop(timestamp){
    let deltaTime = timestamp - lastTime;
    lastTime = timestamp;
    
    ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    game.update(deltaTime);
    game.draw(ctx);
    
    requestAnimationFrame(gameLoop);
}
requestAnimationFrame(gameLoop);