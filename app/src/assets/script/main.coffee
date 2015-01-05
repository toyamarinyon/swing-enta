tm.main ->
  app = tm.display.CanvasApp "#World"
  app.resize SCREEN_WIDTH, SCREEN_HEIGHT
  app.fitWindow()
  app.fps = 60
  app.background = "rgb(0, 0, 0)"

  loadingScene = tm.app.LoadingScene
    assets: ASSETS
    nextScene: TitleScene
    width: SCREEN_WIDTH
    height: SCREEN_HEIGHT

  app.replaceScene loadingScene

  app.run()

  app.canvas.element.addEventListener "touchstart", ->
    if not bgmPlayed
      tm.asset.AssetManager.get("bgm").setLoop(true).play()
      bgmPlayed = true

