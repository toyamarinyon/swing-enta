tm.define "MainScene",
  superClass: "tm.app.Scene"
  init: ->
    this.superInit()
    this.fromJSON UI_DATA.gameScene
    this.fromJSON UI_DATA.playerAndTimeLabel

    this.timer = 0
    this.worldSpeed = 0
    score = 0
    enableController = false
    enemyTimer = 60

    this.timerLabel.text = gameTimer = GAME_LIMIT_TIMER
    this.ground.y = SCREEN_HEIGHT - this.ground.height/2

    this.enemyGroup = tm.app.CanvasElement().addChildTo this
    this.extraTimers = tm.app.CanvasElement().addChildTo this
  update: (app) ->
    this.worldSpeed+= 0.05 if this.worldSpeed < 2.0
    this.ground.y += this.worldSpeed
    this.back1.y += this.worldSpeed
    this.back2.y += this.worldSpeed
    if this.back1.y > SCREEN_HEIGHT + SCREEN_HEIGHT/2
      this.back1.y = -(SCREEN_HEIGHT-this.back2.y)
    if this.back2.y > SCREEN_HEIGHT + SCREEN_HEIGHT/2
      this.back2.y = -(SCREEN_HEIGHT-this.back1.y)
    if this.worldSpeed > 2.0
      enableController = true


    score += this.worldSpeed / 100
    this.scoreLabel.text = Math.round score

    ++this.timer

    if this.timer % 60 is 0
      gameTimer--
      if gameTimer < 1
        app.replaceScene EndScene Math.round score
      this.timerLabel.text = gameTimer

    if this.timer % extraTimerFrequency is 0
      extraTimer = Timer().addChildTo this.extraTimers
      extraTimer.x = Math.rand 100, SCREEN_WIDTH-100
      extraTimer.y = 0 - extraTimer.height

    self = this
    this.extraTimers.children.each (extraTimer) ->
      if self.player.isHitElement extraTimer
        gameTimer += 3
        self.timerLabel.text = gameTimer
        extraTimer.remove()
        self.extendedTimeLabel.visible = true
        self.extendedTimeLabel.tweener
          .clear()
          .fadeIn 400
          .fadeOut 400
          .fadeIn 400
          .fadeOut 400

