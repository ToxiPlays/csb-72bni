/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class TextEngine extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume(" ", "./TextEngine/costumes/ .png", { x: 0, y: 0 })
    ];

    this.sounds = [new Sound("meow", "./TextEngine/sounds/meow.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked)
    ];

    this.vars.ci2 = 4;
    this.vars.c2 = 27;
    this.vars.i2 = 36;
    this.vars.ax2 = -18;
    this.vars.y2 = 0;
    this.vars.vx2 = 10;
    this.vars.vy2 = 147;
    this.vars.data2 = [
      "◻",
      "11111100011000110001100011000111111",
      "a",
      "00100010101000110001111111000110001",
      "b",
      "11110100011000111110100011000111110",
      "c",
      "01110100011000010000100001000101110",
      "d",
      "11110100011000110001100011000111110",
      "e",
      "11111100001000011110100001000011111",
      "f",
      "11111100001000011110100001000010000",
      "g",
      "01110100011000010011100011000101110",
      "h",
      "10001100011000111111100011000110001",
      "i",
      "11111001000010000100001000010011111",
      "j",
      "00001000010000100001000011000101110",
      "k",
      "10001100011001011100100101000110001",
      "l",
      "10000100001000010000100001000011111",
      "m",
      "10001110111010110001100011000110001",
      "n",
      "10001100011100110101100111000110001",
      "o",
      "01110100011000110001100011000101110",
      "p",
      "11110100011000111110100001000010000",
      "q",
      "01110100011000110001100011001001101",
      "r",
      "11110100011000111110100011000110001",
      "s",
      "01110100011000001110000011000101110",
      "t",
      "11111001000010000100001000010000100",
      "u",
      "10001100011000110001100011000101110",
      "v",
      "10001100011000110001100010101000100",
      "w",
      "10001100011000110001101011101110001",
      "x",
      "10001100010101000100010101000110001",
      "y",
      "10001100010101000100001000010000100",
      "z",
      "11111000010001000100010001000011111",
      0,
      "01110100011000110001100011000101110",
      1,
      "00100011000010000100001000010001110",
      2,
      "01110100010000100110010001000011111",
      3,
      "01110100010000100110000011000101110",
      4,
      "00011001010100110001111110000100001",
      5,
      "11111100001000011110000011000101110",
      6,
      "01110100011000011110100011000101110",
      7,
      "11111000010001000010001000010000100",
      8,
      "01110100011000101110100011000101110",
      9,
      "01110100011000101111000011000101110",
      "!",
      "00100001000010000100001000000000100",
      "@",
      "00000011101000110111101111000001111",
      "#",
      "00000010101111101010111110101000000",
      "$",
      "00100011111010001110001011111000100",
      "%",
      "00000100010001000100010001000100000",
      "^",
      "00000001000101000000000000000000000",
      "&",
      "00100010100101000100010110101000111",
      "*",
      "10101011101111101110101010000000000",
      "(",
      "00100010001000010000100000100000100",
      ")",
      "00100000100000100001000010001000100",
      "-",
      "00000000000000011111000000000000000",
      "+",
      "00000001000010011111001000010000000",
      "=",
      "00000000001111100000111110000000000",
      "_",
      11111,
      "[",
      "01110010000100001000010000100001110",
      "]",
      "01110000100001000010000100001001110",
      '"',
      "01010010100000000000000000000000000",
      "'",
      "00010001100010000000000000000000000",
      ".",
      10000000,
      "/",
      "00000000010001000100010001000000000",
      "?",
      "01110100010000100010001000000000100",
      ":",
      "00000000000010000000001000000000000",
      ",",
      1000100
    ];
  }

  *writeAtAllignSizeRgbKernItalic(txt, x, y3, al, s, r, g, b, k, i3) {
    if (al == 1) {
      this.vars.ax2 = x;
    } else {
      if (al == 2) {
        this.vars.ax2 = x - (txt.length / 2) * (6 * s + k) + ((6 / 2) * s + k);
      } else {
        this.vars.ax2 = x - (txt.length - 1) * (6 * s);
      }
    }
    this.vars.ax2 = Math.floor(this.vars.ax2 - (5 * s) / 2);
    this.penColor = Color.num(
      Math.round(r) * 65536 + Math.round(g) * 256 + Math.round(b)
    );
    this.penSize = s;
    this.vars.ci2 = 1;
    for (let i = 0; i < txt.length; i++) {
      if (
        !(String(txt)[this.vars.ci2 - 1] == String(txt)[this.vars.ci2 - 1 - 1])
      ) {
        yield* this.getChar(String(txt)[this.vars.ci2 - 1]);
      }
      if (this.vars.c2 > -1) {
        this.vars.vx2 = this.vars.ax2 + (this.vars.ci2 - 1) * (6 * s + k);
        this.vars.vy2 = y3 + (6 / 2) * s;
        if (i3 == 1) {
          this.vars.vx2 += 6;
        }
        this.vars.i2 = 1;
        for (let i = 0; i < 7; i++) {
          for (let i = 0; i < 5; i++) {
            if (
              Math.abs(this.vars.vx2) < 240 &&
              Math.abs(this.vars.vy2) < 180
            ) {
              if (
                String(this.vars.data2[this.vars.c2 + 1 - 1])[
                  this.vars.i2 - 1
                ] == 1
              ) {
                if (s == 1) {
                  this.goto(
                    Math.floor(this.vars.vx2) + 0.35,
                    Math.floor(this.vars.vy2) + 0.5
                  );
                  this.penDown = true;
                  this.goto(Math.floor(this.x) + 1, Math.floor(this.y) + 0.5);
                  this.penDown = false;
                } else {
                  this.goto(this.vars.vx2, this.vars.vy2);
                  this.penDown = true;
                  this.penDown = false;
                }
              }
            }
            this.vars.i2 += 1;
            this.vars.vx2 += s;
            yield;
          }
          this.vars.vx2 = this.vars.ax2 + (this.vars.ci2 - 1) * (6 * s + k);
          this.vars.vy2 = this.vars.vy2 - s;
          if (i3 == 1) {
            this.vars.vx2 += 6 - this.vars.i2 / 6;
          }
          yield;
        }
      }
      this.vars.ci2 += 1;
      yield;
    }
  }

  *getChar(c3) {
    if (c3 == 0) {
      this.vars.c2 = -1;
    } else {
      if (this.vars.data2.includes(c3)) {
        this.vars.c2 = 1;
        while (
          !(
            this.vars.data2[this.vars.c2 - 1] == c3 ||
            this.vars.c2 > this.vars.data2.length - 1
          )
        ) {
          this.vars.c2 += 1;
          yield;
        }
        if (this.vars.c2 > this.vars.data2.length - 1) {
          this.vars.c2 = 1;
        }
      } else {
        this.vars.c2 = 1;
      }
    }
  }

  *displayMeters() {
    yield* this.writeAtAllignSizeRgbKernItalic(
      "" + this.stage.vars.meters + "m",
      0,
      155,
      2,
      2,
      1,
      1,
      1,
      2,
      0
    );
  }

  *whenGreenFlagClicked() {
    this.stage.vars.meters = 0;
    while (true) {
      yield* this.wait(".");
      this.clearPen();
      yield* this.displayMeters();
      yield;
    }
  }
}
