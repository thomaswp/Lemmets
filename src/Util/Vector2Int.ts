export class Vector2 {

    constructor(public x: number, public y: number) {
        this.x = x;
        this.y = y;
    }

    equals(other: Vector2): boolean {
        return this.x === other.x && this.y === other.y;
    }

    is(x: number, y: number): boolean {
        return this.x === x && this.y === y;
    }

    clone(): Vector2 {
        return new Vector2(this.x, this.y);
    }

    setTo(other: Vector2): void {
        this.x = other.x;
        this.y = other.y;
    }

    setXY(x: number, y: number): void {
        this.x = x;
        this.y = y;
    }

    add(other: Vector2): void {
        this.x += other.x;
        this.y += other.y;
    }
};