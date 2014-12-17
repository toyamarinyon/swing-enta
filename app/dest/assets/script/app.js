var ASSETS, PLAYER_HEIGHT, PLAYER_WIDTH, SCREEN_HEIGHT, SCREEN_WIDTH;

SCREEN_WIDTH = 640;

SCREEN_HEIGHT = 960;

PLAYER_WIDTH = 370;

PLAYER_HEIGHT = 320;

ASSETS = {
  "player": "assets/image/player.png"
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
    this.enta = Enta().addChildTo(this);
    this.enta.position.set(SCREEN_WIDTH / 2, SCREEN_HEIGHT);
    return this.addEventListener("pointingend", function(event) {
      return event.app.replaceScene(EndScene());
    });
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
  init: function() {
    return this.superInit("player", PLAYER_WIDTH / 2, PLAYER_HEIGHT / 2);
  }
});
