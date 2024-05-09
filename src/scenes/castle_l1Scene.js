import { dialogueData, scaleFactor } from "../constants";
import { displayDialogue, setCamScale } from "../utils";

export function castle_l1Scene(k) {
    k.scene("castle_l1", async () => {
        const castle_l1Data = await (await fetch("./castle_l1.json")).json();
        const layers = castle_l1Data.layers;

        const castle_l1 = k.add([
            k.sprite("castle_l1"),
            k.pos(0),
            k.scale(scaleFactor),
        ]);

        const player = k.make([
            k.sprite("character", {anim: "idle-up"}),
            k.area({
                shape: new k.Rect(k.vec2(0, 0), 10, 15),
            }),
            k.body(),
            k.anchor("center"),
            k.pos(),
            k.scale(scaleFactor),
            {
                speed: 250,
                direction: "down",
                isInDialogue: false,
            },
            "player",
        ]);

        for (const layer of layers) {
            if (layer.name === "boundaries"){
                for (const boundary of layer.objects){
                    castle_l1.add([
                        k.area({
                            shape: new k.Rect(k.vec2(0), boundary.width, boundary.height),
                        }),
                        k.body({isStatic: true}),
                        k.pos(boundary.x, boundary.y),
                        boundary.name,
                    ]);

                    if (boundary.name){
                        if (boundary.name === "enter-map"){
                            player.onCollide(boundary.name, () => {
                                if (!player.isInDialogue) {
                                    player.isInDialogue = true;
                                    k.go("main");
                                    player.isInDialogue = false;
                                }
                            });
                        }
                        else if (boundary.name === "enter-castle_l2"){
                            player.onCollide(boundary.name, () => {
                                if (!player.isInDialogue) {
                                    player.isInDialogue = true;
                                    k.go("castle_l2");
                                    player.isInDialogue = false;
                                }
                            });
                        }
                        else if (boundary.name !== "wall"){
                            player.onCollide(boundary.name, () => {
                                player.isInDialogue = true;
                                displayDialogue(dialogueData[boundary.name], () => (player.isInDialogue = false))
                            });
                        }
                    }
                }
                continue;
            }

            if (layer.name === "player-spawn"){
                console.log(layer.name);
                for (const entity of layer.objects){
                    if (entity.name === "player"){
                        player.pos = k.vec2(
                            (castle_l1.pos.x + entity.x) * scaleFactor,
                            (castle_l1.pos.y + entity.y) * scaleFactor
                        );
                        k.add(player);
                        continue;
                    }
                }
            }
        }

        setCamScale(k);
    
        k.onResize(() => {
            setCamScale(k);
        });
    
        k.onUpdate(() => {
            k.camPos(player.pos.x, player.pos.y - 100);
        });

        k.onMouseDown((mouseBtn) => {
            if (mouseBtn != "left" || player.isInDialogue){
                return;
            }
    
            const worldMousePos = k.toWorld(k.mousePos());
            player.moveTo(worldMousePos, player.speed);
    
            const mouseAngle = player.pos.angle(worldMousePos);
    
            const lowerBound = 50;
            const upperBound = 125;
    
            if (
                mouseAngle > lowerBound &&
                mouseAngle < upperBound &&
                player.curAnim() !== "walk-up"
            ) {
                player.play("walk-up");
                player.direction = "up";
                return;
            }
          
            if (
                mouseAngle < -lowerBound &&
                mouseAngle > -upperBound &&
                player.curAnim() !== "walk-down"
            ) {
                player.play("walk-down");
                player.direction = "down";
                return;
            }
          
            if (Math.abs(mouseAngle) > upperBound) {
                player.flipX = false;
                if (player.curAnim() !== "walk-side") player.play("walk-side");
                player.direction = "right";
                return;
            }
          
            if (Math.abs(mouseAngle) < lowerBound) {
                player.flipX = true;
                if (player.curAnim() !== "walk-side") player.play("walk-side");
                player.direction = "left";
                return;
            }
        });
    
        function stopAnims() {
            if (player.direction === "down") {
              player.play("idle-down");
              return;
            }
            if (player.direction === "up") {
              player.play("idle-up");
              return;
            }
        
            player.play("idle-side");
        }
        
        k.onMouseRelease(stopAnims);
        
        k.onKeyRelease(() => {
            stopAnims();
        });
    
        k.onKeyDown((key) => {
            const keyMap = [
              k.isKeyDown("right"),
              k.isKeyDown("left"),
              k.isKeyDown("up"),
              k.isKeyDown("down"),
            ];
        
            let nbOfKeyPressed = 0;
            for (const key of keyMap) {
              if (key) {
                nbOfKeyPressed++;
              }
            }
        
            if (nbOfKeyPressed > 1) return;
        
            if (player.isInDialogue) return;
            if (keyMap[0]) {
              player.flipX = false;
              if (player.curAnim() !== "walk-side") player.play("walk-side");
              player.direction = "right";
              player.move(player.speed, 0);
              return;
            }
        
            if (keyMap[1]) {
              player.flipX = true;
              if (player.curAnim() !== "walk-side") player.play("walk-side");
              player.direction = "left";
              player.move(-player.speed, 0);
              return;
            }
        
            if (keyMap[2]) {
              if (player.curAnim() !== "walk-up") player.play("walk-up");
              player.direction = "up";
              player.move(0, -player.speed);
              return;
            }
        
            if (keyMap[3]) {
              if (player.curAnim() !== "walk-down") player.play("walk-down");
              player.direction = "down";
              player.move(0, player.speed);
            }
        });
    });
}