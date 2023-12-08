class UIManager {
  displayLivesCount(player) {
    this.livesCountUI = add([
      text("", {
        font: "Press",
        size: 40,
      }),
      fixed(),
      pos(90, 60),
    ]);
    this.livesCountUI.add([sprite("heart"), pos(-60, -5), scale(2.4), fixed()]);
  }
  displayCoinCount(player) {
    this.coinCountUI = add([
      text("", {
        font: "Press",
        size: 40,
      }),
      {
        fullCoinCount: get("coin", { recursive: true }).length,
      },
      fixed(),
      pos(90, 120),
    ]);
    this.coinCountUI.add([
      sprite("coin-icon"),
      pos(-55, 0),
      scale(2.6),
      fixed(),
    ]);
  }
  displayBlinkingUiMessage(content, position) {
    const message = add([
      text(content, {
        size: 30,
        font: "Press",
      }),
      area(),
      anchor("center"),
      pos(position),
      opacity(),
      state("flash-up", ["flash-up", "flash-down"]),
    ]);
    message.onStateEnter("flash-up", async () => {
      await tween(
        message.opacity,
        0,
        0.5,
        (opacity) => (message.opacity = opacity),
        easings.linear
      );
      message.enterState("flash-down");
    });
    message.onStateEnter("flash-down", async () => {
      await tween(
        message.opacity,
        1,
        0.5,
        (opacity) => (message.opacity = opacity),
        easings.linear
      );
      message.enterState("flash-up");
    });
  }
  displayMainMenu() {
    add([sprite("forest-background"), scale(4)]);
    add([sprite("logo"), area(), anchor("center"), scale(0.5), pos(300, 250)]);
    add([
      text("Choppa", {
        size: 100,
        font: "Press",
      }),
      pos(center().x - 180, center().y - 150),
    ]);
    this.displayBlinkingUiMessage(
      "Press [Enter] to begin",
      vec2(center().x, center().y + 100)
    );
    onKeyPress("enter", () => {
      play("confirm", { speed: "1.2" });
      go("controls");
    });
  }
  displayControlsMenu() {
    add([sprite("forest-background"), scale(4)]);
    add([
      text("Controls", {
        size: 60,
        font: "Press",
      }),
      pos(center().x - 230, center().y - 210),
    ]);
    const controlPrompts = add([pos(center().x + 10, center().y)]);
    controlPrompts.add([sprite("space"), pos(-200, 0)]);
    controlPrompts.add([sprite("up"), pos(0, -80)]);
    controlPrompts.add([sprite("left"), pos(-80, 0)]);
    controlPrompts.add([sprite("right"), pos(80, 0)]);
    controlPrompts.add([
      text("Jump", {
        size: 30,
        font: "Press",
      }),
      pos(-190, 100),
    ]);
    controlPrompts.add([
      text("Move", {
        size: 30,
        font: "Press",
      }),
      pos(-10, 100),
    ]);
    this.displayBlinkingUiMessage(
      "Press [Enter] to begin",
      vec2(center().x, center().y + 200)
    );
    onKeyPress("enter", () => {
      play("confirm", { speed: "1.2" });
      go("1");
    });
  }

  displayGameOverScreen() {
    add([rect(1280, 720), color(0, 0, 0)]);
    add([
      text("Game Over!", { size: 50, font: "Press" }),
      area(),
      anchor("center"),
      pos(center()),
    ]);

    this.displayBlinkingUiMessage(
      "Press [ Enter ] to Start Game",
      vec2(center().x, center().y + 100)
    );

    onKeyPress("enter", () => {
      play("confirm");
      go(1);
    });
  }

  displayEndGameScreen() {
    add([rect(1280, 720), color(0, 0, 0)]);
    add([
      text("You Won! Thanks for Playing.", { size: 39, font: "Press" }),
      area(),
      anchor("center"),
      pos(center()),
    ]);

    this.displayBlinkingUiMessage(
      "Press [ Enter ] to Play Again",
      vec2(center().x, center().y + 100)
    );

    onKeyPress("enter", () => {
      play("confirm");
      go("menu");
    });
  }
}
export const uiManager = new UIManager();
