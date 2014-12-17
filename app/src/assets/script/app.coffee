
SCREEN_WIDTH = 640
SCREEN_HEIGHT = 960

PLAYER_WIDTH = 370
PLAYER_HEIGHT = 320

ASSETS = 
  "player": "assets/image/player.png"

tm.main ->
  app = tm.display.CanvasApp "#World"
  app.resize SCREEN_WIDTH, SCREEN_HEIGHT
  app.fitWindow()
  app.background = "rgb(0, 0, 0)"

  loadingScene = tm.app.LoadingScene
    assets: ASSETS
    nextScene: TitleScene
    width: SCREEN_WIDTH
    height: SCREEN_HEIGHT

  app.replaceScene loadingScene

  app.run()


tm.define "TitleScene",
  superClass: "tm.app.TitleScene"
  init: ->
    this.superInit
      title: "Flying Enta!"
      width: SCREEN_WIDTH
      height: SCREEN_HEIGHT
    this.addEventListener "pointingend", (event) ->
      event.app.replaceScene MainScene()

tm.define "MainScene",
  superClass: "tm.app.Scene"
  init: ->
    this.superInit()
    this.enta = Enta().addChildTo this
    this.enta.position.set SCREEN_WIDTH/2, SCREEN_HEIGHT
    this.addEventListener "pointingend", (event) ->
      event.app.replaceScene EndScene()

tm.define "EndScene",
  superClass: "tm.app.ResultScene"
  init: ->
    this.superInit
      score: 256
      msg: "Flying Enta!"
      hastags: ["FlyingEnta!"]
      url: "http://christmas.icebreak.jp"
      width: SCREEN_WIDTH
      height: SCREEN_HEIGHT
      related: "thank you for playing!"

tm.define "Enta",
  superClass: "tm.app.Sprite"
  init: ->
    this.superInit "player", PLAYER_WIDTH/2, PLAYER_HEIGHT/2
