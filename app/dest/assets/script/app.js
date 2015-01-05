var ASSETS, ENEMY_HEIGHT, ENEMY_SCALE_FACTOR, ENEMY_WIDTH, GAME_LIMIT_TIMER, PLAYER_HEIGHT, PLAYER_POSITION_Y, PLAYER_SCALE_FACTOR, PLAYER_WIDTH, SCREEN_CENTER_X, SCREEN_CENTER_Y, SCREEN_HEIGHT, SCREEN_WIDTH, UI_DATA, bgmPlayed, enableController, enemyTimer, gameTimer, score;

SCREEN_WIDTH = 640;

SCREEN_HEIGHT = 960;

SCREEN_CENTER_X = SCREEN_WIDTH / 2;

SCREEN_CENTER_Y = SCREEN_HEIGHT / 2;

PLAYER_WIDTH = 298;

PLAYER_HEIGHT = 358;

PLAYER_SCALE_FACTOR = 2.0;

PLAYER_POSITION_Y = SCREEN_HEIGHT - PLAYER_HEIGHT / PLAYER_SCALE_FACTOR - 60;

ENEMY_WIDTH = 161;

ENEMY_HEIGHT = 156;

ENEMY_SCALE_FACTOR = 2.0;

GAME_LIMIT_TIMER = 30;

score = 0;

gameTimer = 60;

enableController = false;

enemyTimer = 60;

bgmPlayed = false;

ASSETS = {
  "entaRight": "assets/image/entaRight.png",
  "entaLeft": "assets/image/entaLeft.png",
  "sky": "assets/image/sky.png",
  "skyNogu": "assets/image/skyNogu.png",
  "ground": "assets/image/ground.png",
  "tina": "assets/image/tina.png",
  "title": "assets/image/title.png",
  "titleButton": "assets/image/btn.png",
  "titleBack": "assets/image/bg.png",
  "playButton": "assets/image/playButton.png",
  "bgm": "assets/sound/bgm.mp3",
  "tutorial": "assets/image/setumeiLead.png",
  "gameScoreBackground": "assets/image/header1.png"
};

UI_DATA = {
  titleScene: {
    children: [
      {
        type: "tm.display.Sprite",
        name: "title",
        init: ["title"],
        x: SCREEN_CENTER_X,
        y: 220
      }, {
        type: "tm.display.Sprite",
        name: "titleButton",
        init: ["titleButton"],
        x: SCREEN_CENTER_X,
        y: SCREEN_HEIGHT - 300
      }
    ]
  },
  tutorialScene: {
    children: [
      {
        type: "tm.display.Sprite",
        name: "tutorial",
        init: ["tutorial"],
        x: SCREEN_CENTER_X,
        y: SCREEN_CENTER_Y - 200
      }
    ]
  },
  gameScene: {
    children: [
      {
        type: "tm.display.Sprite",
        name: "back1",
        init: ["sky"],
        x: SCREEN_CENTER_X,
        y: SCREEN_CENTER_Y,
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT
      }, {
        type: "tm.display.Sprite",
        name: "back2",
        init: ["skyNogu"],
        x: SCREEN_CENTER_X,
        y: -SCREEN_CENTER_Y,
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT
      }, {
        type: "tm.display.Sprite",
        name: "ground",
        init: ["ground"],
        x: SCREEN_CENTER_X,
        y: SCREEN_HEIGHT
      }
    ]
  },
  playerAndTimeLabel: {
    children: [
      {
        type: "Enta",
        name: "enta",
        x: SCREEN_CENTER_X,
        y: PLAYER_POSITION_Y
      }, {
        type: "tm.display.Sprite",
        name: "gameScoreBackground",
        init: ["gameScoreBackground"],
        x: SCREEN_CENTER_X,
        y: 0,
        originY: 0
      }, {
        type: "tm.display.Label",
        name: "timerLabel",
        x: SCREEN_CENTER_X + 80,
        y: 40,
        width: SCREEN_WIDTH,
        fillStyle: "black",
        text: "0",
        fontSize: 30,
        align: "right"
      }, {
        type: "tm.display.Label",
        name: "scoreLabel",
        x: SCREEN_CENTER_X + 280,
        y: 40,
        width: SCREEN_WIDTH,
        fillStyle: "black",
        text: "0",
        fontSize: 30,
        align: "right"
      }
    ]
  }
};

tm.main(function() {
  var app, loadingScene;
  app = tm.display.CanvasApp("#World");
  app.resize(SCREEN_WIDTH, SCREEN_HEIGHT);
  app.fitWindow();
  app.fps = 60;
  app.background = "rgb(0, 0, 0)";
  loadingScene = tm.app.LoadingScene({
    assets: ASSETS,
    nextScene: TitleScene,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT
  });
  app.replaceScene(loadingScene);
  app.run();
  return app.canvas.element.addEventListener("touchstart", function() {
    if (!bgmPlayed) {
      tm.asset.AssetManager.get("bgm").setLoop(true).play();
      return bgmPlayed = true;
    }
  });
});

tm.define("TitleScene", {
  superClass: "tm.app.TitleScene",
  init: function() {
    this.superInit();
    this.fromJSON(UI_DATA.gameScene);
    this.fromJSON(UI_DATA.titleScene);
    this.ground.y = SCREEN_HEIGHT - this.ground.height / 2;
    return this.addEventListener("pointingend", function(event) {
      return event.app.replaceScene(TutorialScene());
    });
  }
});

tm.define("TutorialScene", {
  superClass: "tm.app.Scene",
  init: function() {
    this.superInit();
    this.fromJSON(UI_DATA.gameScene);
    this.fromJSON(UI_DATA.tutorialScene);
    this.fromJSON(UI_DATA.playerAndTimeLabel);
    this.ground.y = SCREEN_HEIGHT - this.ground.height / 2;
    return this.addEventListener("pointingend", function(event) {
      return event.app.replaceScene(MainScene());
    });
  }
});

tm.define("MainScene", {
  superClass: "tm.app.Scene",
  init: function() {
    this.superInit();
    this.fromJSON(UI_DATA.gameScene);
    this.fromJSON(UI_DATA.playerAndTimeLabel);
    this.timer = 0;
    this.worldSpeed = 0;
    score = 0;
    enableController = false;
    enemyTimer = 60;
    this.timerLabel.text = gameTimer = GAME_LIMIT_TIMER;
    this.ground.y = SCREEN_HEIGHT - this.ground.height / 2;
    return this.enemyGroup = tm.app.CanvasElement().addChildTo(this);
  },
  update: function(app) {
    var enemies, enemy, self;
    if (this.worldSpeed < 2.0) {
      this.worldSpeed += 0.05;
    }
    this.ground.y += this.worldSpeed;
    this.back1.y += this.worldSpeed;
    this.back2.y += this.worldSpeed;
    if (this.back1.y > SCREEN_HEIGHT + SCREEN_HEIGHT / 2) {
      this.back1.y = -(SCREEN_HEIGHT - this.back2.y);
    }
    if (this.back2.y > SCREEN_HEIGHT + SCREEN_HEIGHT / 2) {
      this.back2.y = -(SCREEN_HEIGHT - this.back1.y);
    }
    if (this.worldSpeed > 2.0) {
      enableController = true;
    }
    score += this.worldSpeed / 100;
    this.scoreLabel.text = Math.round(score);
    ++this.timer;
    if (this.timer % 60 === 0) {
      gameTimer--;
      this.timerLabel.text = gameTimer;
    }
    if (this.timer % enemyTimer === 0) {
      enemy = Enemy().addChildTo(this.enemyGroup);
      enemy.x = Math.rand(0, SCREEN_WIDTH);
      enemy.y = 0 - enemy.height;
    }
    self = this;
    enemies = this.enemyGroup.children;
    return enemies.each(function(enemy) {});
  }
});

tm.define("EndScene", {
  superClass: "tm.app.ResultScene",
  init: function(score) {
    return this.superInit({
      score: score,
      msg: "空飛ぶエンタ",
      hastags: ["FlyingEnta!"],
      url: "http://icebreak.jp",
      width: SCREEN_WIDTH,
      height: SCREEN_HEIGHT,
      related: "thank you for playing!"
    });
  },
  onnextscene: function(event) {
    return event.target.app.replaceScene(TutorialScene());
  }
});

tm.define("Player", {
  superClass: "tm.app.Sprite",
  direction: "left",
  prevFrameDirection: "left",
  degree: 90,
  accel: 0,
  init: function() {
    this.superInit("entaRight", PLAYER_WIDTH / PLAYER_SCALE_FACTOR, PLAYER_HEIGHT / PLAYER_SCALE_FACTOR);
    return this.origin.y = 0;
  },
  update: function(app) {
    if (app.pointing.getPointingStart()) {
      this.direction = app.pointing.x < SCREEN_WIDTH / 2 ? "left" : "right";
    }
    if (enableController) {
      if (this.direction === "left") {
        if (this.accel > -8.0) {
          this.accel -= 0.2;
        }
        this.image = "entaLeft";
      }
      if (this.direction === "right") {
        if (this.accel < 8.0) {
          this.accel += 0.2;
        }
        this.image = "entaRight";
      }
      this.x += this.accel;
      this.rotation = this.accel * 2.0;
    }
    if (this.x > SCREEN_WIDTH) {
      this.x = SCREEN_WIDTH;
    }
    if (this.x < 0) {
      return this.x = 0;
    }
  }
});

tm.define("Enemy", {
  superClass: "tm.app.Sprite",
  init: function() {
    this.superInit("tina", ENEMY_WIDTH / ENEMY_SCALE_FACTOR, ENEMY_HEIGHT / ENEMY_SCALE_FACTOR);
    this.speed = Math.rand(2, 6);
    return this.counted = false;
  },
  update: function(app) {
    this.y += this.speed;
    if (this.y > SCREEN_HEIGHT + this.height) {
      this.remove();
    }
    if (!this.counted && this.y > PLAYER_POSITION_Y) {
      return this.counted = true;
    }
  }
});
