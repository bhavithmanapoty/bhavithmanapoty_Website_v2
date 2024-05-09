
import { k } from "./kaboomCtx"
import { castle_l1Scene } from "./scenes/castle_l1Scene";
import { castle_l2Scene } from "./scenes/castle_l2Scene";
import { homeScene } from "./scenes/homeScene";
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
k.loadSprite("home", "./home.png");
k.loadSprite("castle_l1", "./castle_l1.png");
k.loadSprite("castle_l2", "./castle_l2.png");

k.setBackground(k.Color.fromHex("#213357"));

mainScene(k);
homeScene(k);
castle_l1Scene(k);
castle_l2Scene(k);

k.go("main");
