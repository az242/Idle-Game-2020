import { Game, GameState } from "./game";
import { UserInterface } from "./interfaces";

export class Chat implements UserInterface {
    gameState: GameState = GameState.RUNNING;
    chat: { user:string, message: string}[]; 
    isTyping: boolean;
    currentMessage: string;
    constructor(public game: Game, public x: number, public y: number, public width: number, public height: number){
        this.chat = [];
        this.isTyping = false;
        this.currentMessage = '';
        this.game.connection.addListener('message', (payload) => {
            this.chat.push(payload);
            console.log('incoming message:', payload);
        });
    }
    addMessage(user: string, message: string) {
        this.chat.push({user: user, message:message});
    }
    draw(ctx: CanvasRenderingContext2D) {
        ctx.globalAlpha = 0.2;
        ctx.fillStyle = "black";
        ctx.fillRect(this.x, this.y, this.width, this.height);
        //text box
        ctx.fillRect(this.x, this.y + this.height - 25, this.width, 25);
        ctx.globalAlpha = 1;
        ctx.font = '20px Arial';
        ctx.fillStyle = 'black';
        ctx.textAlign = 'left';
        ctx.fillText(this.game.user.username + ': ' + this.currentMessage, this.x + 2, this.y + this.height - 5);
    }
    onKeyPress(event: KeyboardEvent) {
        if (event.key.length === 1 && this.isTyping) {
            this.currentMessage += event.key;
        } else {
            switch(event.key) {
                case 'Escape':
                    this.currentMessage = '';
                case 'Enter':
                    // start/send message
                    this.isTyping = !this.isTyping;
                    if (this.currentMessage.trim() !== '') {
                        this.game.connection.emitAction('message', {user: this.game.user.username, message: this.currentMessage});
                    }
                    break;
                case 'Backspace':
                    this.currentMessage = this.currentMessage.substring(0, this.currentMessage.length - 1);
                    break;
            }
        }
    }
    onMouseDown(event: MouseEvent) {
    }
}