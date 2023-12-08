import { level1Layout, level1Mappings } from "./content/level1/level1Layout.js";
import { uiManager } from "./utils/UIManager.js";
import { load } from "./utils/loader.js";
import { Level } from "./utils/Level.js";
import { Player } from "./entities/Player.js";
import attachCamera from "./utils/camera.js";
import { Spiders } from "./entities/Spider.js";
import { level1Config } from "./content/level1/config.js";
import { Fish } from "./entities/Fish.js";

kaboom({
  width: 1280,
  height: 720,
  letterbox: true,
  debug: false,
});

load.fonts();
load.assets();
load.sounds();
const scenes = {
  menu: () => {
    const introMusic = play("intro", {
      volume: 0.8,
      loop: true,
    });
    onSceneLeave(() => {
      introMusic.paused = true;
    });
    uiManager.displayMainMenu();
  },
  controls: () => {
    uiManager.displayControlsMenu();
  },
  1: () => {
    const waterAmbience = play("water-ambience", {
      volume: 0.2,
      loop: true,
    });
    onSceneLeave(() => {
      waterAmbience.paused = true;
    });
    setGravity(1400);
    const level1 = new Level();
    level1.drawBackground("forest-background");
    level1.drawMapLayout(level1Layout, level1Mappings);
    const player = new Player(1500, 100, 300, 650, 3, 1);
    player.update();
    player.enablePassthrough();
    player.enableCoinPickUp();
    player.enableMobVunerability();
    const spiders = new Spiders(
      level1Config.spiderPositions.map((spiderPos) => spiderPos()),
      level1Config.spiderAmplitudes,
      level1Config.spiderSpeeds
    );
    spiders.setMovementPattern();
    spiders.enablePassthrough();
    const fish = new Fish(
      level1Config.fishPositions.map((fishPos) => fishPos()),
      level1Config.fishAmplitudes
    );
    fish.setMovementPattern();
    level1.drawWaves("water", "wave");
    attachCamera(player.gameObj, 0, 200);
    uiManager.displayCoinCount();
    player.updateCoinCount(uiManager.coinCountUI);
    uiManager.displayLivesCount();
    player.updateLives(uiManager.livesCountUI);
  },
  gameover: async () => uiManager.displayGameOverScreen(),
  end: () => uiManager.displayEndGameScreen(),
};
for (const key in scenes) {
  scene(key, scenes[key]);
}
go("menu");

// add([sprite("bg1"), fixed(), scale(5)]);
// add([sprite("bg1"), fixed(), pos(7500, 0), scale(5)]).flipX = true;

// const map = [
//   "B6   6   6   6   6   6   6   6   6   6   6   6   6   6   6   6   6   6   6   6   6    6   6   6   6    6   6   6   6   6   6   66 B",
//   " B                                                                                                                B",
//   " B                                                                                                                B",
//   " B                                                                                                                B",
//   " B                                                                                                                B",
//   " B                                                                                                                B",
//   " B                                                                                                                B",
//   " B                          2 2                                                                                   B",
//   " B                                                                                                                B",
//   " B                                                                                                                B",
//   " B          22                                                                                                    B",
//   " B                                                                                                                B",
//   "5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 55B",
//   "5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 55B",
// ];
// const levelCfg = {
//   tileWidth: 22,
//   tileHeight: 22,
//   tiles: {
//     5: () => [sprite("land"), area(), body({ isStatic: true })],
//     2: () => [sprite("platform"), area(), body({ isStatic: true })],
//     B: () => [rect(15, 15), opacity(0), area(), body({ isStatic: true })],
//     6: () => [sprite("sky")],
//   },
// };
// const level = addLevel(map, levelCfg);
// setGravity(500);
// const player = add([
//   sprite("cp"),
//   scale(1.5),
//   area({ shape: new Rect(vec2(0), 15, 17), offset: vec2(0, 3) }),
//   anchor("center"),
//   body(),
//   pos(70, 40),
//   {
//     speed: 500,
//     previousHeight: null,
//     heightDelta: 0,
//     direction: "right",
//   },
// ]);

// onKeyDown("right", () => {
//   player.move(player.speed, 0);
// });
// onKeyDown("left", () => {
//   player.move(-player.speed, 0);
// });
// onKeyPress("up", () => {
//   if (player.isGrounded()) {
//     player.jump();
//   }
// });
// camScale(1.2);

// onUpdate(() => {
//   const cameraLeftBound = 230;
//   const cameraRightBound = 5000;
//   const cameraVerticalOffset = player.pos.y - 50;
//   if (cameraLeftBound > player.pos.x) {
//     camPos(cameraLeftBound, cameraVerticalOffset);
//   } else if (cameraRightBound < player.pos.x) {
//     camPos(cameraRightBound, cameraVerticalOffset);
//   } else {
//     camPos(player.pos.x, cameraVerticalOffset);
//   }
// });
