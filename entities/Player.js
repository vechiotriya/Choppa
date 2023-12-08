export class Player {
  isRespawning = false;
  coins = 0;
  constructor(posX, posY, speed, jumpForce, nbLives, currentLevelScene) {
    this.currentLevelScene = currentLevelScene;
    this.initialX = posX;
    this.initialY = posY;
    this.speed = speed;
    this.jumpForce = jumpForce;
    this.lives = nbLives;
    this.makePlayer();
    this.previousHeight = this.gameObj.pos.y;
    this.setPlayerControls();
  }
  makePlayer() {
    this.gameObj = add([
      sprite("player"),
      area({ shape: new Rect(vec2(0, 7), 10, 10) }),
      anchor("center"),
      pos(this.initialX, this.initialY),
      scale(4),
      body(),
      "player",
    ]);
  }
  enablePassthrough() {
    this.gameObj.onBeforePhysicsResolve((collision) => {
      if (collision.target.is("passthrough") && this.gameObj.isJumping()) {
        collision.preventResolution();
      }
    });
  }
  setPlayerControls() {
    onKeyDown("right", () => {
      if (!this.isRespawning) {
        this.gameObj.move(this.speed, 0);
      }
    });
    onKeyDown("left", () => {
      if (!this.isRespawning) {
        this.gameObj.move(-this.speed, 0);
      }
    });
    onKeyPress("space", () => {
      if (!this.isRespawning && this.gameObj.isGrounded()) {
        this.gameObj.jump(this.jumpForce);
        play("jump");
      }
    });
    onKeyPress("up", () => {
      if (!this.isRespawning && this.gameObj.isGrounded()) {
        this.gameObj.jump(this.jumpForce);
        play("jump");
      }
    });
  }
  respawnPlayer() {
    if (this.lives > 0) {
      this.lives--;
      this.gameObj.pos = vec2(this.initialX, this.initialY);
      this.isRespawning = true;
      setTimeout(() => (this.isRespawning = false), 1000);
      return;
    }
    go("gameover");
  }
  enableMobVunerability() {
    function hitAndRespawn(context) {
      play("hit", { speed: 1.5 });
      context.respawnPlayer();
    }
    this.gameObj.onCollide("fish", () => hitAndRespawn(this));
    this.gameObj.onCollide("spiders", () => hitAndRespawn(this));
  }
  update() {
    onUpdate(() => {
      if (this.gameObj.pos.y > 1000) {
        play("hit", { speed: 1.5 });
        this.respawnPlayer();
      }
    });
  }
  enableCoinPickUp() {
    this.gameObj.onCollide("coin", (coin) => {
      this.coins++;
      destroy(coin);
      play("coin");
    });
  }
  updateLives(livesCountUI) {
    onUpdate(() => {
      livesCountUI.text = this.lives;
    });
  }
  updateCoinCount(coinCountUI) {
    onUpdate(() => {
      coinCountUI.text = `${this.coins}/${coinCountUI.fullCoinCount}`;
      if (this.coins === coinCountUI.fullCoinCount) {
        go("end");
      }
    });
  }
}
