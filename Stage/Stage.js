/* eslint-disable require-yield, eqeqeq */

import {
  Stage as StageBase,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Stage extends StageBase {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("pixil-frame-2", "./Stage/costumes/pixil-frame-2.png", {
        x: 480,
        y: 360
      }),
      new Costume("pixil-frame-3", "./Stage/costumes/pixil-frame-3.png", {
        x: 480,
        y: 360
      }),
      new Costume("pixil-frame-0", "./Stage/costumes/pixil-frame-0.png", {
        x: 480,
        y: 360
      })
    ];

    this.sounds = [new Sound("pop", "./Stage/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(
        Trigger.KEY_PRESSED,
        { key: "up arrow" },
        this.whenKeyUpArrowPressed
      ),
      new Trigger(Trigger.CLICKED, this.whenstageclicked)
    ];

    this.vars.myVariable = 0;
    this.vars.meters = 20;
    this.vars.lives = 3;
    this.vars.debugBubblesOnScreen = 1;
    this.vars.playervel = [2, 11.999999999999993];
  }

  *whenGreenFlagClicked() {
    this.effects.brightness = 6;
    while (true) {
      this.effects.pixelate += 2;
      yield* this.wait(3 / this.vars.lives);
      this.costumeNumber += 1;
      this.effects.fisheye += 1;
      yield;
    }
  }

  *whenKeyUpArrowPressed() {
    this.effects.whirl += 25;
    yield* this.wait(0.1);
    this.effects.whirl += -25;
  }

  *whenstageclicked() {
    yield* this.broadcastAndWait("stageClick");
  }
}
