
/*
Define {{{
 */
var ASSETS, ENEMY_HEIGHT, ENEMY_SCALE_FACTOR, ENEMY_WIDTH, PLAYER_HEIGHT, PLAYER_POSITION_Y, PLAYER_SCALE_FACTOR, PLAYER_WIDTH, SCREEN_CENTER_X, SCREEN_CENTER_Y, SCREEN_HEIGHT, SCREEN_WIDTH, UI_DATA, bgmPlayed, enableController, enemyTimer, score;

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


/*
Define }}}
 */


/*
UI.json {{{
 */

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
        type: "tm.display.Label",
        name: "timeLabel",
        x: SCREEN_CENTER_X,
        y: 120,
        width: SCREEN_WIDTH,
        fillStyle: "black",
        text: " ",
        fontSize: 60,
        align: "center"
      }
    ]
  }
};


/*
UI.json }}}
 */


/*
ASSETS {{{
 */

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
  "tutorial": "assets/image/setumeiLead.png"
};


/*
ASSETS }}}
 */


/*
Global Variables {{{
 */

score = 0;

enableController = false;

enemyTimer = 60;

bgmPlayed = false;


/*
Global Variables }}}
 */

tm.main(function() {
  var app, loadingScene;
  app = tm.display.CanvasApp("#World");
  app.resize(SCREEN_WIDTH, SCREEN_HEIGHT);
  app.fitWindow();
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
    this.ground.y = SCREEN_HEIGHT - this.ground.height / 2;
    return this.enemyGroup = tm.app.CanvasElement().addChildTo(this);
  },
  update: function(app) {
    var enemies, enemy, self;
    if (this.worldSpeed < 5) {
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
    this.timeLabel.text = score;
    ++this.timer;
    if (this.timer % enemyTimer === 0) {
      enemy = Enemy().addChildTo(this.enemyGroup);
      enemy.x = Math.rand(0, SCREEN_WIDTH);
      enemy.y = 0 - enemy.height;
    }
    self = this;
    enemies = this.enemyGroup.children;
    return enemies.each(function(enemy) {
      if (self.enta.isHitElement(enemy)) {
        return app.replaceScene(EndScene(score));
      }
    });
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

tm.define("Enta", {
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
    var moveX;
    if (app.pointing.getPointingStart()) {
      this.direction = app.pointing.x < SCREEN_WIDTH / 2 ? "left" : "right";
      if (this.direction === "left") {
        if (this.prevFrameDirection !== this.direction) {
          this.accel = 1;
        } else {
          if (this.accel < 2) {
            this.accel++;
          }
        }
      } else {
        if (this.prevFrameDirection !== this.direction) {
          this.accel = -1;
        } else {
          if (this.accel > -2) {
            this.accel--;
          }
        }
      }
    }
    if (this.direction === "left") {
      this.image = "entaLeft";
    } else {
      this.image = "entaRight";
    }
    if (enableController && (this.prevFrameDirection !== this.direction || this.degree > 90 - 35 && this.degree < 90 + 35)) {
      this.degree += this.accel;
      if (this.prevFrameDirection !== this.direction) {
        this.degree += this.accel;
      }
    }
    moveX = Math.cos(this.degree * (Math.PI / 180));
    this.x += moveX * 20.0;
    this.rotation = -(this.degree - 90);
    if (this.rotation < -35) {
      this.rotation = -35;
    }
    if (this.rotation > 35) {
      this.rotation = 35;
    }
    if (this.x > SCREEN_WIDTH) {
      this.x = SCREEN_WIDTH;
    }
    if (this.x < 0) {
      this.x = 0;
    }
    return this.prevFrameDirection = this.direction;
  }
});

tm.define("Enemy", {
  superClass: "tm.app.Sprite",
  init: function() {
    this.superInit("tina", ENEMY_WIDTH / ENEMY_SCALE_FACTOR, ENEMY_HEIGHT / ENEMY_SCALE_FACTOR);
    this.speed = Math.rand(6, 12);
    return this.counted = false;
  },
  update: function(app) {
    this.y += this.speed;
    if (this.y > SCREEN_HEIGHT + this.height) {
      this.remove();
    }
    if (!this.counted && this.y > PLAYER_POSITION_Y) {
      score++;
      if (score === 20) {
        enemyTimer = 30;
      }
      if (score === 30) {
        enemyTimer = 20;
      }
      if (score === 40) {
        enemyTimer = 10;
      }
      if (score === 50) {
        enemyTimer = 5;
      }
      return this.counted = true;
    }
  }
});
