export const load = {
  fonts: () => {
    loadFont("Press", "./assets/PressStart2P-Regular.ttf");
  },
  assets: () => {
    loadSprite("forest-background", "./assets/sprites/bg1.png");
    loadSprite("logo", "./assets/sprites/choppa-logo.png");

    loadSprite("up", "./assets/sprites/Arrow_Up_Key_Dark.png");
    loadSprite("left", "./assets/sprites/Arrow_Left_Key_Dark.png");
    loadSprite("right", "./assets/sprites/Arrow_Right_Key_Dark.png");
    loadSprite("space", "./assets/sprites/Space_Key_Dark.png");

    loadSprite("coin", "./assets/sprites/Coin.png");
    loadSprite("bridge", "./assets/sprites/Bridge.png");

    loadSprite("grass-tileset", "./assets/sprites/grass_Tileset.png", {
      sliceX: 3,
      sliceY: 4,
      anims: {
        tl: 0,
        tm: 1,
        tr: 2,
        ml: 3,
        mm: 4,
        mr: 5,
        bl: 6,
        bm: 7,
        br: 8,
      },
    });
    loadSprite("grass-oneway-tileset", "./assets/sprites/grass_Oneway.png", {
      sliceX: 3,
      sliceY: 4,
      anims: {
        tl: 0,
        tm: 1,
        tr: 2,
        ml: 3,
        mm: 4,
        mr: 5,
        bl: 6,
        bm: 7,
        br: 8,
      },
    });
    loadSprite("water", "./assets/sprites/Water.png", {
      sliceX: 8,
      sliceY: 1,
      anims: {
        wave: {
          from: 0,
          to: 7,
          speed: 16,
          loop: true,
        },
      },
    });
    loadSprite("player", "./assets/sprites/cp-front.png");
    loadSprite("coin-icon", "./assets/sprites/Coins_Ui.png");
    loadSprite("heart", "./assets/sprites/Heart.png");
    loadSprite("spider", "./assets/sprites/Spider_1.png", {
      sliceX: 3,
      sliceY: 1,
      anims: {
        crawl: { from: 0, to: 2, loop: true },
        idle: 0,
      },
    });
    loadSprite("fish", "./assets/sprites/Fish_2.png", {
      sliceX: 2,
      sliceY: 1,
      anims: {
        swim: { from: 0, to: 1, loop: true },
      },
    });
    // loadSprite("sky", "./assets/sprites/sky.png");
    // loadSprite("land", "./assets/sprites/land-block.png");
    // loadSprite("platform", "./assets/sprites/Platform.png");
  },
  sounds: () => {
    loadSound("confirm", "./assets/sounds/confirm-ui.wav");
    loadSound("jump", "./assets/sounds/jump.wav");
    loadSound("hit", "./assets/sounds/hit.wav");
    loadSound("coin", "./assets/sounds/coin.wav");
    loadSound("spider-attack", "./assets/sounds/spider-attack.mp3");
    loadSound("water-ambience", "./assets/sounds/water-ambience.mp3");
    loadSound("intro", "./assets/sounds/intro.wav");
  },
};
