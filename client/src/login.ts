import { Game, GameState } from "./game";
import { UserInterface } from "./interfaces";

export class Login implements UserInterface{
    inputs = {
        username: '',
        password: ''
    };
    lineDimensions = {
        height: 30,
        loginWidth: 0,
        passwordWidth: 0
    };
    focus: string = 'username';
    constructor(public game: Game) {
        this.game.connection.addListener('joined', (payload) => {
            if(payload === this.inputs['username'] + ':' + this.inputs['password']) {
                this.game.switchGameState(GameState.RUNNING);
                console.log('LOGGED IN SUCCESFULLY: ',this.inputs['username'] + ':' + this.inputs['password'] );
            }
        });
    }
    onMouseDown(event: MouseEvent) {
        console.log(event.offsetX + ', ' + event.offsetY);
        let loginLeftX = this.game.canvas.width / 2 - this.lineDimensions.loginWidth / 2;
        let loginRightX = this.game.canvas.width / 2 + this.lineDimensions.loginWidth / 2;
        let loginTopY = (this.game.canvas.height / 2) - this.lineDimensions.height;
        let loginBottomY = this.game.canvas.height / 2;

        let passLeftX = this.game.canvas.width / 2 - this.lineDimensions.passwordWidth / 2;
        let passRightX = this.game.canvas.width / 2 + this.lineDimensions.passwordWidth / 2;
        let passTopY = this.game.canvas.height / 2;
        let passBottomY = (this.game.canvas.height / 2) + this.lineDimensions.height; 

        if( event.offsetX > loginLeftX && event.offsetX < loginRightX && event.offsetY > loginTopY && event.offsetY <loginBottomY) {
            this.focus = 'username';
        } else if (event.offsetX > passLeftX && event.offsetX < passRightX && event.offsetY > passTopY && event.offsetY <passBottomY) {
            this.focus = 'password';
        }
    }
    onKeyPress(event: KeyboardEvent) {
        if (event.key.length === 1) {
            this.inputs[this.focus] += event.key;
        } else {
            switch(event.key) {
                case 'Enter':
                    // init server connection
                    this.game.connection.emitAction('connected', this.inputs['username'] + ':' + this.inputs['password'] );
                    break;
                case 'Backspace':
                    this.inputs[this.focus] = this.inputs[this.focus].substring(0, this.inputs[this.focus].length - 1);
                    break;
            }
        }
    }
    draw(ctx: CanvasRenderingContext2D) {
        ctx.rect(0, 0, this.game.canvas.width, this.game.canvas.height);
        ctx.fillStyle = 'rgba(0,0,0,1)';
        ctx.fill();

        ctx.font = '30px Arial';
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        this.lineDimensions.loginWidth = ctx.measureText('Login: ' + this.inputs['username']).width;
        this.lineDimensions.passwordWidth = ctx.measureText('Password: ' + this.inputs['password']).width;
        ctx.fillText('Login: ' + this.inputs['username'], this.game.canvas.width / 2, (this.game.canvas.height / 2) - (this.lineDimensions.height/2));
        ctx.fillText('Password: ' + this.inputs['password'], this.game.canvas.width / 2, (this.game.canvas.height / 2) + (this.lineDimensions.height/2));
    }
}