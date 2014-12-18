var ASSETS, PLAYER_HEIGHT, PLAYER_WIDTH, SCREEN_HEIGHT, SCREEN_WIDTH;

SCREEN_WIDTH = 640;

SCREEN_HEIGHT = 960;

PLAYER_WIDTH = 370;

PLAYER_HEIGHT = 320;

ASSETS = {
  "player": "assets/image/player.png",
  "back": "assets/image/background.png",
  "ground": "assets/image/ground.png"
};

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
  app.enableController = false;
  return app.run();
});

tm.define("TitleScene", {
  superClass: "tm.app.TitleScene",
  init: function() {
    this.superInit({
      title: "Flying Enta!",
      width: SCREEN_WIDTH,
      height: SCREEN_HEIGHT
    });
    return this.addEventListener("pointingend", function(event) {
      return event.app.replaceScene(MainScene());
    });
  }
});

tm.define("MainScene", {
  superClass: "tm.app.Scene",
  init: function() {
    this.superInit();
    this.worldSpeed = 0;
    this.back1 = tm.app.Sprite("back", SCREEN_WIDTH, SCREEN_HEIGHT).addChildTo(this);
    this.back1.position.set(SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2);
    this.back2 = tm.app.Sprite("back", SCREEN_WIDTH, SCREEN_HEIGHT).addChildTo(this);
    this.back2.position.set(SCREEN_WIDTH / 2, -SCREEN_HEIGHT / 2);
    this.ground = tm.app.Sprite("ground", SCREEN_WIDTH, SCREEN_HEIGHT).addChildTo(this);
    this.ground.position.set(SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2);
    this.enta = Enta().addChildTo(this);
    return this.enta.position.set(SCREEN_WIDTH / 2, SCREEN_HEIGHT - PLAYER_HEIGHT / 1.4 - 170);
  },
  update: function(app) {
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
      return app.enableController = true;
    }
  }
});

tm.define("EndScene", {
  superClass: "tm.app.ResultScene",
  init: function() {
    return this.superInit({
      score: 256,
      msg: "Flying Enta!",
      hastags: ["FlyingEnta!"],
      url: "http://christmas.icebreak.jp",
      width: SCREEN_WIDTH,
      height: SCREEN_HEIGHT,
      related: "thank you for playing!"
    });
  }
});

tm.define("Enta", {
  superClass: "tm.app.Sprite",
  direction: 'left',
  degree: 90,
  init: function() {
    this.superInit("player", PLAYER_WIDTH / 1.4, PLAYER_HEIGHT / 1.4);
    return this.origin.y = 0;
  },
  update: function(app) {
    var accel;
    if (app.pointing.getPointingStart()) {
      this.direction = this.direction === 'left' ? 'right' : 'left';
    }
    if (app.enableController) {
      if (this.direction === 'left') {
        if (this.degree > 45) {
          this.degree -= 1;
        }
      } else {
        if (this.degree < 135) {
          this.degree += 1;
        }
      }
    }
    accel = Math.cos(this.degree * (Math.PI / 180));
    this.x += accel * 20.0;
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
      return this.x = 0;
    }
  }
});
