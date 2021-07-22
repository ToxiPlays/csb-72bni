/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Bubble extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume(
        "pixil-frame-0 (5)",
        "./Bubble/costumes/pixil-frame-0 (5).png",
        { x: 22, y: 22 }
      ),
      new Costume("costume1", "./Bubble/costumes/costume1.svg", {
        x: 13.25,
        y: 19.48124999999999
      })
    ];

    this.sounds = [new Sound("pop", "./Bubble/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(
        Trigger.BROADCAST,
        { name: "stageClick" },
        this.whenIReceiveStageclick
      ),
      new Trigger(Trigger.CLONE_START, this.startAsClone),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked2)
    ];
  }

  *whenGreenFlagClicked() {
    this.costume = "costume1";
    this.stage.vars.debugBubblesOnScreen = 0;
    this.stage.watchers.debugBubblesOnScreen.visible = false;
    this.visible = false;
  }

  *whenIReceiveStageclick() {
    if (this.costumeNumber == 2) {
      this.createClone();
      yield* this.wait(1);
    }
  }

  *startAsClone() {
    this.costume = "pixil-frame-0 (5)";
    yield* this.startSound("pop");
    this.moveBehind();
    this.visible = true;
    this.stage.vars.debugBubblesOnScreen += 1;
    this.goto(this.mouse.x, this.mouse.y);
    for (let i = 0; i < 20; i++) {
      yield* this.wait(0.02);
      this.effects.ghost += 5;
      this.effects.color += 25;
      this.y += 10;
      /* TODO: Implement motion_ifonedgebounce */ null;
      yield;
    }
    this.stage.vars.debugBubblesOnScreen += -1;
    this.deleteThisClone();
  }

  *whenGreenFlagClicked2() {
    while (true) {
      if (this.stage.vars.debugBubblesOnScreen > 50) {
        this.stage.watchers.debugBubblesOnScreen.visible = true;
      } else {
        this.stage.watchers.debugBubblesOnScreen.visible = false;
      }
      yield;
    }
  }
}
