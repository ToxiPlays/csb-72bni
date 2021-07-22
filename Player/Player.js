/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Player extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("right", "./Player/costumes/right.png", { x: 83, y: 47 }),
      new Costume("left", "./Player/costumes/left.png", { x: 83, y: 47 }),
      new Costume("down", "./Player/costumes/down.png", { x: 81, y: 71 })
    ];

    this.sounds = [
      new Sound("Video Game 2", "./Player/sounds/Video Game 2.wav"),
      new Sound("Skid", "./Player/sounds/Skid.wav"),
      new Sound("Ripples", "./Player/sounds/Ripples.wav"),
      new Sound("Low Squeak", "./Player/sounds/Low Squeak.wav"),
      new Sound("Bowling Strike", "./Player/sounds/Bowling Strike.wav")
    ];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(
        Trigger.KEY_PRESSED,
        { key: "right arrow" },
        this.whenKeyRightArrowPressed
      ),
      new Trigger(
        Trigger.KEY_PRESSED,
        { key: "left arrow" },
        this.whenKeyLeftArrowPressed
      ),
      new Trigger(
        Trigger.KEY_PRESSED,
        { key: "down arrow" },
        this.whenKeyDownArrowPressed
      ),
      new Trigger(
        Trigger.KEY_PRESSED,
        { key: "up arrow" },
        this.whenKeyUpArrowPressed
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "bloatPlayer" },
        this.whenIReceiveBloatplayer
      )
    ];

    this.vars.ci = 0;
    this.vars.c = 0;
    this.vars.i = 0;
    this.vars.ax = 0;
    this.vars.y = 0;
    this.vars.vx = 0;
    this.vars.vy = 0;
    this.vars.data = [];
  }

  *whenGreenFlagClicked() {
    this.costume = "down";
    this.stage.vars.playervel = [];
    this.stage.vars.meters = 0;
    this.stage.vars.lives = 3;
    this.stage.vars.playervel.push(2);
    this.stage.vars.playervel.push(10);
    this.goto(0, 500);
    yield* this.glide(0.3, 0, 0);
    while (true) {
      yield* this.wait(0.4);
      this.stage.vars.playervel.splice(
        2 - 1,
        1,
        this.stage.vars.playervel[2 - 1] + 0.1
      );
      this.stage.vars.meters += Math.round(
        this.stage.vars.playervel[2 - 1] / 20
      );
      yield;
    }
  }

  *whenKeyRightArrowPressed() {
    this.costume = "right";
    yield* this.startSound("Skid");
    this.stage.vars.playervel.splice(1 - 1, 1, 3);
  }

  *whenKeyLeftArrowPressed() {
    this.costume = "left";
    yield* this.startSound("Skid");
    this.stage.vars.playervel.splice(1 - 1, 1, 1);
  }

  *whenKeyDownArrowPressed() {
    this.costume = "down";
    this.stage.vars.playervel.splice(1 - 1, 1, 2);
    this.stage.vars.playervel.splice(
      2 - 1,
      1,
      this.stage.vars.playervel[2 - 1] + 2
    );
    this.size = 110;
    yield* this.wait(0.1);
    this.size = 100;
    yield* this.playSoundUntilDone("Ripples");
  }

  *whenKeyUpArrowPressed() {
    this.costume = "down";
    this.goto(0, 3);
    this.broadcast("bloatPlayer");
    yield* this.startSound("Low Squeak");
    this.stage.vars.playervel.splice(1 - 1, 1, 2);
    this.stage.vars.playervel.splice(2 - 1, 1, 8);
    yield* this.glide(1, 0, 0);
  }

  *whenIReceiveBloatplayer() {
    this.effects.fisheye += 10;
    for (let i = 0; i < 10; i++) {
      this.effects.fisheye += -1;
      yield* this.wait(0.1);
      yield;
    }
    this.effects.clear();
  }
}
