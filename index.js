import { Project } from "https://unpkg.com/leopard@^1/dist/index.esm.js";

import Stage from "./Stage/Stage.js";
import Player from "./Player/Player.js";
import TextEngine from "./TextEngine/TextEngine.js";
import Hearts from "./Hearts/Hearts.js";
import MusicHandler from "./MusicHandler/MusicHandler.js";
import Bubble from "./Bubble/Bubble.js";

const stage = new Stage({ costumeNumber: 1 });

const sprites = {
  Player: new Player({
    x: 0,
    y: 0,
    direction: 90,
    costumeNumber: 3,
    size: 100,
    visible: true,
    layerOrder: 5
  }),
  TextEngine: new TextEngine({
    x: 18,
    y: 149,
    direction: 90,
    costumeNumber: 1,
    size: 100,
    visible: false,
    layerOrder: 1
  }),
  Hearts: new Hearts({
    x: 0,
    y: 125,
    direction: 90,
    costumeNumber: 1,
    size: 15,
    visible: false,
    layerOrder: 2
  }),
  MusicHandler: new MusicHandler({
    x: 36,
    y: 28,
    direction: 90,
    costumeNumber: 1,
    size: 100,
    visible: false,
    layerOrder: 3
  }),
  Bubble: new Bubble({
    x: 36,
    y: 28,
    direction: 90,
    costumeNumber: 2,
    size: 100,
    visible: false,
    layerOrder: 4
  })
};

const project = new Project(stage, sprites, {
  frameRate: 30 // Set to 60 to make your project run faster
});
export default project;
