var ASSETS, BALLOON_HEIGHT, BALLOON_WIDTH, ENEMY_HEIGHT, ENEMY_SCALE_FACTOR, ENEMY_WIDTH, GAME_LIMIT_TIMER, LIMIT_BALLOONS, PLAYER_HEIGHT, PLAYER_POSITION_Y, PLAYER_SCALE_FACTOR, PLAYER_WIDTH, SCREEN_CENTER_X, SCREEN_CENTER_Y, SCREEN_HEIGHT, SCREEN_WIDTH, UI_DATA, balloonFrequency, bgmPlayed, enableController, enemyTimer, extraTimerFrequency, gameTimer, itemBalloonFlag, score, worldSpeed;

SCREEN_WIDTH = 640;

SCREEN_HEIGHT = 960;

SCREEN_CENTER_X = SCREEN_WIDTH / 2;

SCREEN_CENTER_Y = SCREEN_HEIGHT / 2;

PLAYER_WIDTH = 298;

PLAYER_HEIGHT = 358;

PLAYER_SCALE_FACTOR = 2.0;

PLAYER_POSITION_Y = SCREEN_HEIGHT - PLAYER_HEIGHT / PLAYER_SCALE_FACTOR - 100;

BALLOON_WIDTH = 469;

BALLOON_HEIGHT = 349;

LIMIT_BALLOONS = 8;

ENEMY_WIDTH = 161;

ENEMY_HEIGHT = 156;

ENEMY_SCALE_FACTOR = 2.0;

GAME_LIMIT_TIMER = 30;

score = 0;

gameTimer = 60;

enableController = false;

enemyTimer = 60;

extraTimerFrequency = Math.rand(250, 300);

balloonFrequency = Math.rand(100, 150);

bgmPlayed = false;

worldSpeed = 0.0;

itemBalloonFlag = true;

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
  "gameScoreBackground": "assets/image/header1.png",
  "itemTimer": "assets/image/timer.png",
  "balloonRight1": "assets/image/balloons/right_balloons_1.png",
  "balloonRight2": "assets/image/balloons/right_balloons_2.png",
  "balloonRight3": "assets/image/balloons/right_balloons_3.png",
  "balloonRight4": "assets/image/balloons/right_balloons_4.png",
  "balloonRight5": "assets/image/balloons/right_balloons_5.png",
  "balloonRight6": "assets/image/balloons/right_balloons_6.png",
  "balloonRight7": "assets/image/balloons/right_balloons_7.png",
  "balloonRight8": "assets/image/balloons/right_balloons_8.png",
  "balloonLeft1": "assets/image/balloons/left_balloons_1.png",
  "balloonLeft2": "assets/image/balloons/left_balloons_2.png",
  "balloonLeft3": "assets/image/balloons/left_balloons_3.png",
  "balloonLeft4": "assets/image/balloons/left_balloons_4.png",
  "balloonLeft5": "assets/image/balloons/left_balloons_5.png",
  "balloonLeft6": "assets/image/balloons/left_balloons_6.png",
  "balloonLeft7": "assets/image/balloons/left_balloons_7.png",
  "balloonLeft8": "assets/image/balloons/left_balloons_8.png",
  "itemBallonRed": "assets/image/balloons/itemBalloonRed.png",
  "itemBallonOrange": "assets/image/balloons/itemBalloonOrange.png",
  "itemBallonBlue": "assets/image/balloons/itemBalloonBlue.png",
  "itemBallonGreen": "assets/image/balloons/itemBalloonGreen.png",
  "itemBallonYellow": "assets/image/balloons/itemBalloonYellow.png"
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
        type: "Player",
        name: "player",
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
      }, {
        type: "tm.display.Label",
        name: "extendedTimeLabel",
        x: SCREEN_CENTER_X + 72,
        y: 90,
        width: SCREEN_WIDTH,
        fillStyle: "orange",
        text: "＋３秒！",
        fontSize: 30,
        align: "center",
        visible: false,
        fontWeight: "bold"
      }, {
        type: "tm.display.Label",
        name: "balloonLabel",
        x: SCREEN_CENTER_X + 230,
        y: 90,
        width: SCREEN_WIDTH,
        fillStyle: "orange",
        text: "SPEED UP！",
        fontSize: 30,
        align: "center",
        visible: false,
        fontWeight: "bold"
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
  return app.run();
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
    this.maxSpeed = 2.0;
    worldSpeed = 0;
    score = 0;
    enableController = false;
    enemyTimer = 60;
    itemBalloonFlag = true;
    this.timerLabel.text = gameTimer = GAME_LIMIT_TIMER;
    this.ground.y = SCREEN_HEIGHT - this.ground.height / 2;
    this.extraTimers = tm.app.CanvasElement().addChildTo(this);
    return this.balloons = tm.app.CanvasElement().addChildTo(this);
  },
  update: function(app) {
    var balloon, extraTimer, self;
    if (worldSpeed < this.maxSpeed) {
      worldSpeed += 0.05;
    }
    this.ground.y += worldSpeed;
    this.back1.y += worldSpeed;
    this.back2.y += worldSpeed;
    if (this.back1.y > SCREEN_HEIGHT + SCREEN_HEIGHT / 2) {
      this.back1.y = -(SCREEN_HEIGHT - this.back2.y);
    }
    if (this.back2.y > SCREEN_HEIGHT + SCREEN_HEIGHT / 2) {
      this.back2.y = -(SCREEN_HEIGHT - this.back1.y);
    }
    if (worldSpeed > 2.0) {
      enableController = true;
    }
    score += worldSpeed / 100;
    this.scoreLabel.text = Math.round(score);
    ++this.timer;
    if (this.timer % 60 === 0) {
      gameTimer--;
      if (gameTimer < 1) {
        app.replaceScene(EndScene(Math.round(score)));
      }
      this.timerLabel.text = gameTimer;
    }
    if (itemBalloonFlag && this.timer % balloonFrequency === 0) {
      balloon = Balloon().addChildTo(this.balloons);
      balloon.x = Math.rand(100, SCREEN_WIDTH - 100);
      balloon.y = 0 - balloon.height;
    }
    if (this.timer % extraTimerFrequency === 0) {
      extraTimer = Timer().addChildTo(this.extraTimers);
      extraTimer.x = Math.rand(100, SCREEN_WIDTH - 100);
      extraTimer.y = 0 - extraTimer.height;
    }
    self = this;
    this.extraTimers.children.each(function(extraTimer) {
      if (self.player.isHitElement(extraTimer)) {
        gameTimer += 3;
        self.timerLabel.text = gameTimer;
        extraTimer.remove();
        self.extendedTimeLabel.visible = true;
        return self.extendedTimeLabel.tweener.clear().fadeIn(400).fadeOut(400).fadeIn(400).fadeOut(400);
      }
    });
    return this.balloons.children.each(function(balloon) {
      if (self.player.isHitElement(balloon)) {
        self.maxSpeed += 1.0;
        self.player.getBalloon();
        if (self.player.hasBallons === LIMIT_BALLOONS) {
          itemBalloonFlag = false;
        }
        balloon.remove();
        self.balloonLabel.visible = true;
        return self.balloonLabel.tweener.clear().fadeIn(400).fadeOut(400).fadeIn(400).fadeOut(400);
      }
    });
  }
});

tm.define("EndScene", {
  superClass: "tm.app.ResultScene",
  init: function(score) {
    enableController = false;
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
  direction: "right",
  prevFrameDirection: "right",
  degree: 90,
  accel: 0,
  hasBallons: 0,
  init: function() {
    this.superInit("entaRight", PLAYER_WIDTH / PLAYER_SCALE_FACTOR, PLAYER_HEIGHT / PLAYER_SCALE_FACTOR);
    this.origin.y = 0;
    this.balloonImage = tm.app.Sprite("balloonRight1", BALLOON_WIDTH / PLAYER_SCALE_FACTOR, BALLOON_HEIGHT / PLAYER_SCALE_FACTOR).addChildTo(this);
    this.balloonImage.visible = false;
    this.balloonImage.y -= 34;
    return this.balloonImage.x -= 10;
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
        if (this.hasBallons > 0) {
          this.balloonImage.image = "balloonLeft" + this.hasBallons;
        }
        this.balloonImage.x = 10;
      }
      if (this.direction === "right") {
        if (this.accel < 8.0) {
          this.accel += 0.2;
        }
        this.image = "entaRight";
        if (this.hasBallons > 0) {
          this.balloonImage.image = "balloonRight" + this.hasBallons;
        }
        this.balloonImage.x = -10;
      }
      this.x += this.accel;
      this.rotation = this.accel * 2.0;
    }
    if (this.x > SCREEN_WIDTH) {
      this.x = SCREEN_WIDTH;
      this.accel = 0;
    }
    if (this.x < 0) {
      this.x = 0;
      return this.accel = 0;
    }
  },
  getBalloon: function() {
    this.balloonImage.visible = true;
    return this.hasBallons++;
  }
});

tm.define("Timer", {
  superClass: "tm.app.AnimationSprite",
  init: function() {
    var ss;
    this.speed = Math.rand(3, 6);
    ss = tm.asset.SpriteSheet({
      image: "itemTimer",
      frame: {
        width: 88,
        height: 80,
        count: 2
      },
      animations: {
        blink: {
          frames: [0, 1],
          next: "blink",
          frequency: "30"
        }
      }
    });
    this.superInit(ss, 88 / 1.5, 80 / 1.5);
    return this.gotoAndPlay("blink");
  },
  update: function(app) {
    this.y += this.speed + worldSpeed;
    if (this.y > SCREEN_HEIGHT + this.height) {
      return this.remove();
    }
  }
});

tm.define("Balloon", {
  superClass: "tm.app.Sprite",
  init: function() {
    this.superInit("itemBallonRed");
    return this.speed = Math.rand(4, 6);
  },
  update: function(app) {
    this.y += this.speed + worldSpeed;
    if (this.y > SCREEN_HEIGHT + this.height) {
      return this.remove();
    }
  }
});
