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
      this.timerLabel.text = gameTimer

    if this.timer % enemyTimer is 0
      enemy = Enemy().addChildTo this.enemyGroup
      enemy.x = Math.rand 0, SCREEN_WIDTH
      enemy.y = 0 - enemy.height

    self = this
    enemies = this.enemyGroup.children
    enemies.each (enemy) ->
      # if self.enta.isHitElement enemy
        # app.replaceScene EndScene(score)

