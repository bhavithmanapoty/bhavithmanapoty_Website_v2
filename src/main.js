
import { k } from "./kaboomCtx"
import { mainScene } from "./scenes/mainScene";


k.loadSprite("character", "./character.png", {
    sliceX: 17,
    sliceY: 8,
    anims: {
        "idle-down": 0,
        "walk-down": {
            from: 0,
            to: 3,
            speed: 8,
            loop: true,
        },
        "idle-side": 17,
        "walk-side": {
            from: 17,
            to: 20,
            speed: 8,
            loop: true,
        },
        "idle-up": 34,
        "walk-up": {
            from: 34,
            to: 37,
            speed: 8,
            loop: true,
        },
    },
});

k.loadSprite("map", "./map.png");
k.setBackground(k.Color.fromHex("#213357"));

mainScene(k);

k.go("main");
