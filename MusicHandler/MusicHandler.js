/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class MusicHandler extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("costume1", "./MusicHandler/costumes/costume1.svg", {
        x: 0,
        y: 0
      })
    ];

    this.sounds = [
      new Sound("Video Game 2", "./MusicHandler/sounds/Video Game 2.wav")
    ];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked2)
    ];
  }

  *whenGreenFlagClicked() {
    while (true) {
      yield* this.playSoundUntilDone("Video Game 2");
      yield;
    }
  }

  *whenGreenFlagClicked2() {
    while (true) {
      if (this.stage.vars.lives == 3) {
        this.audioEffects.pitch = 0;
      } else {
        if (this.stage.vars.lives == 2) {
          this.audioEffects.pitch = -10;
        } else {
          this.audioEffects.pitch = -40;
        }
      }
      yield;
    }
  }
}
