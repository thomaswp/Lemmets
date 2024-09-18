import { Entity, System } from "ecs-lib";
import { GridWalkerComponent } from "../components/GridWalker";
import { GridTransformComponent } from "../components/GridTransform";
import { Vector2 } from "../Util/Vector2Int";
import { PSystem } from "../engine/PSystem";
import { SingletonManager } from "../engine/SingletonManager";

const components = [
    GridWalkerComponent,
    GridTransformComponent
] as const;

export class PlayerControls extends PSystem<typeof components> {

    private readonly cursorKeys: Phaser.Types.Input.Keyboard.CursorKeys;
    private readonly keyboardDirection = new Vector2(0, 0);

    constructor(singletonManger: SingletonManager) {
        super(singletonManger, components);

        this.cursorKeys = this.scene.input.keyboard?.createCursorKeys()!;
    }

    beforeUpdateAll(time: number): void {
        this.updateKeyboardDirection();
    }

    update(time: number, delta: number, entity: Entity) {
        const [
            gridWalker,
            gridTransform,
        ] = this.getData(entity);

        if (gridWalker.timeSinceLastMove < gridWalker.moveInterval) {
            return;
        }

        this.updateKeyboardDirection();
        if (this.keyboardDirection.is(0, 0)) {
            return;
        }

        if (gridWalker.canMoveDiagonally) {
            gridTransform.add(this.keyboardDirection);
        } else {
            if (this.keyboardDirection.x !== 0) {
                gridTransform.x += this.keyboardDirection.x;
            } else {
                gridTransform.y += this.keyboardDirection.y;
            }
        }
        gridWalker.timeSinceLastMove = 0;
    }

    updateKeyboardDirection() {
        this.keyboardDirection.setXY(0, 0);
        if (this.cursorKeys.up?.isDown) {
            this.keyboardDirection.y += -1;
        }
        if (this.cursorKeys.down?.isDown) {
            this.keyboardDirection.y += 1;
        }
        if (this.cursorKeys.left?.isDown) {
            this.keyboardDirection.x += -1;
        }
        if (this.cursorKeys.right?.isDown) {
            this.keyboardDirection.x += 1;
        }
    }
}