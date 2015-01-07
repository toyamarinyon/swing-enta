tm.define "MainScene",
  superClass: "tm.app.Scene"
  init: ->
    this.superInit()
    this.fromJSON UI_DATA.gameScene
    this.fromJSON UI_DATA.playerAndTimeLabel

    this.timer = 0
    this.maxSpeed = 2.0
    worldSpeed = 0
    score = 0
    enableController = false
    enemyTimer = 60
    itemBalloonFlag = true

    this.timerLabel.text = gameTimer = GAME_LIMIT_TIMER
    this.ground.y = SCREEN_HEIGHT - this.ground.height/2

    this.extraTimers = tm.app.CanvasElement().addChildTo this
    this.balloons = tm.app.CanvasElement().addChildTo this
  update: (app) ->
    worldSpeed+= 0.05 if worldSpeed < this.maxSpeed
    this.ground.y += worldSpeed
    this.back1.y += worldSpeed
    this.back2.y += worldSpeed
    if this.back1.y > SCREEN_HEIGHT + SCREEN_HEIGHT/2
      this.back1.y = -(SCREEN_HEIGHT-this.back2.y)
    if this.back2.y > SCREEN_HEIGHT + SCREEN_HEIGHT/2
      this.back2.y = -(SCREEN_HEIGHT-this.back1.y)
    if worldSpeed > 2.0
      enableController = true


    score += worldSpeed / 100
    this.scoreLabel.text = Math.round score

    ++this.timer

    if this.timer % 60 is 0
      gameTimer--
      if gameTimer < 1
        app.replaceScene EndScene Math.round score
      this.timerLabel.text = gameTimer

    if itemBalloonFlag and this.timer % balloonFrequency is 0
      balloon = Balloon().addChildTo this.balloons
      balloon.x = Math.rand 0, SCREEN_WIDTH
      balloon.y = 0 - balloon.height
      # balloonFrequency = Math.rand 100, 150

    if this.timer % extraTimerFrequency is 0
      extraTimer = Timer().addChildTo this.extraTimers
      extraTimer.x = Math.rand 0, SCREEN_WIDTH
      extraTimer.y = 0 - extraTimer.height
      # extraTimerFrequency = Math.rand extraTimerFrequency

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

    this.balloons.children.each (balloon) ->
      if self.player.isHitElement balloon
        self.maxSpeed += 1.0
        self.player.getBalloon()
        if self.player.hasBallons == LIMIT_BALLOONS
          itemBalloonFlag = false
        balloon.remove()
        self.balloonLabel.visible = true
        self.balloonLabel.tweener
          .clear()
          .fadeIn 400
          .fadeOut 400
          .fadeIn 400
          .fadeOut 400

