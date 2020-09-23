export interface GameObject {
    draw(ctx: CanvasRenderingContext2D);
    update(delta: number);
}

export interface UserInterface {
    draw(ctx: CanvasRenderingContext2D);
    onKeyPress(event: KeyboardEvent);
    onMouseDown(event: MouseEvent);
}