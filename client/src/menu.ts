import { Game } from "./game";
import { UserInterface } from "./interfaces";

export class Menu implements UserInterface{
    inputs = {
        username: '',
        password: ''
    }
    focus: string = 'username';
    constructor(public game: Game) {
    }
    onMouseDown(event: MouseEvent) {
        console.log(event.offsetX + ', ' + event.offsetY);
    }
    onKeyPress(event: KeyboardEvent) {
        if (event.key.length === 1) {
            console.log(this.inputs);
            this.inputs[this.focus] += event.key;
        } else {
            switch(event.key) {
                case 'enter':
                    // init server connection
                    console.log('server connection');
                    break;
                case 'backspace':
                    this.inputs[this.focus] = this.inputs[this.focus].substring(0, this.inputs[this.focus].length - 1);
                    break;
            }
        }
    }
    draw(ctx: CanvasRenderingContext2D) {
        ctx.rect(0, 0, this.game.gameWidth, this.game.gameHeight);
        ctx.fillStyle = "rgba(0,0,0,1)";
        ctx.fill();

        ctx.font = "30px Arial";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.fillText("Login: " + this.inputs['username'], this.game.gameWidth / 2, this.game.gameHeight / 2);
    }
}