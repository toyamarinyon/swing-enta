tm.define "TutorialScene",
  superClass: "tm.app.Scene"
  init: ->
    this.superInit()
    this.fromJSON UI_DATA.gameScene
    this.fromJSON UI_DATA.tutorialScene
    this.fromJSON UI_DATA.playerAndTimeLabel
    this.ground.y = SCREEN_HEIGHT - this.ground.height/2
    this.addEventListener "pointingend", (event) ->
      event.app.replaceScene MainScene()


