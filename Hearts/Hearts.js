/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Hearts extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("full", "./Hearts/costumes/full.png", { x: 160, y: 160 }),
      new Costume("none", "./Hearts/costumes/none.png", { x: 160, y: 160 })
    ];

    this.sounds = [new Sound("Coin", "./Hearts/sounds/Coin.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.CLONE_START, this.startAsClone)
    ];

    this.vars.spacing = 33;
    this.vars.clonecount = 3;
    this.vars.heart = 0;
  }

  *whenGreenFlagClicked() {
    this.size = 15;
    this.vars.clonecount = 0;
    this.visible = false;
    for (let i = 0; i < 3; i++) {
      this.vars.clonecount += 1;
      this.createClone();
      yield;
    }
    this.deleteThisClone();
  }

  *startAsClone() {
    this.vars.heart = this.vars.clonecount;
    this.y = 125;
    if (this.vars.clonecount == 2) {
      this.x = 0;
    } else {
      if (this.vars.clonecount == 3) {
        this.x = this.vars.spacing;
      } else {
        this.x = this.vars.spacing - this.vars.spacing * 2;
      }
    }
    this.effects.ghost += 100;
    this.effects.pixelate = 100;
    this.visible = true;
    this.costume = "full";
    for (let i = 0; i < 20; i++) {
      yield* this.wait(0.05);
      this.effects.ghost += -5;
      this.effects.pixelate += -5;
      yield;
    }
    yield* this.wait(2);
    while (!(this.stage.vars.lives < this.vars.heart)) {
      yield;
    }
    this.moveAhead();
    this.size += 10;
    this.audioEffects.pitch += this.random(-10, 5);
    yield* this.startSound("Coin");
    this.costume = "none";
    for (let i = 0; i < 10; i++) {
      this.size += -1;
      yield;
    }
    yield* this.wait(1);
    while (!this.touching(this.sprites[undefined].andClones())) {
      this.direction += 0.2;
      this.effects.ghost += 2;
      this.y += 1;
      yield;
    }
    this.deleteThisClone();
  }
}
