tm.define "EndScene",
  superClass: "tm.app.ResultScene"
  init: (score) ->
    enableController = false
    this.superInit
      score: score
      msg: "空飛ぶエンタ"
      hastags: ["FlyingEnta!"]
      url: "http://icebreak.jp"
      width: SCREEN_WIDTH
      height: SCREEN_HEIGHT
      related: "thank you for playing!"
  onnextscene: (event) ->
    event.target.app.replaceScene TutorialScene()


