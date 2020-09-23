import { Game, GameState } from "./game";

export class InputHandler {
    keyboardEventListeners = {};
    mouseEventListeners = {};
    constructor(public game: Game) {
        for (const value in Object.keys(GameState)) {
            if(GameState[value] !== undefined) {
                this.keyboardEventListeners[value] = new Array<Function>();
                this.mouseEventListeners[value] = new Array<Function>();
            }   
        }
    }
    addKeyboardEventListener(func: Function, state: GameState) {
        this.keyboardEventListeners[state].push(func);
    }
    addMouseEventListener(func: Function, state: GameState) {
        this.mouseEventListeners[state].push(func);
    }
    onStateChange(newState: GameState) {
        //remove old listeners
        this.keyboardEventListeners[this.game.gameState].forEach(func => {
            document.removeEventListener('keydown', func);
        });
        this.mouseEventListeners[this.game.gameState].forEach(func => {
            this.game.canvas.removeEventListener('mousedown', func)
        });
        //add new listeners
        this.keyboardEventListeners[newState].forEach(func => {
            document.addEventListener('keydown', func);
        });
        this.mouseEventListeners[newState].forEach(func => {
            this.game.canvas.addEventListener('mousedown',func)
        });
    }
}