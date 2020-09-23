import io from 'socket.io-client';
import { Game } from './game';
export class Client {
    constructor(canvas: HTMLCanvasElement) {
        const sock = io('http://74.90.215.202:9898');
        sock.emit('connected', 'testusername');
        sock.on('joined', (payload) => {
            console.log(payload);
        });
    }
}
const canvas = <HTMLCanvasElement>document.getElementById('gameScreen');
let ctx: CanvasRenderingContext2D = canvas.getContext("2d");
let GAME_WIDTH = canvas.width;
let GAME_HEIGHT = canvas.height;
let game = new Game(canvas);

let lastTime = 0;
const client = new Client(canvas);
function gameLoop(timestamp){
    let deltaTime = timestamp - lastTime;
    lastTime = timestamp;
    
    ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    game.update(deltaTime);
    game.draw(ctx);
    
    requestAnimationFrame(gameLoop);
}
requestAnimationFrame(gameLoop);