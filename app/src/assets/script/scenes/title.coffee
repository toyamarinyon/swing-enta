tm.define "TitleScene",
  superClass: "tm.app.TitleScene"
  init: ->
    this.superInit()
    this.fromJSON UI_DATA.gameScene
    this.fromJSON UI_DATA.titleScene
    this.ground.y = SCREEN_HEIGHT - this.ground.height/2
    this.addEventListener "pointingend", (event) ->
      event.app.replaceScene TutorialScene()
