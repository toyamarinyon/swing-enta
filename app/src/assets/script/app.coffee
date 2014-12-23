
SCREEN_WIDTH = 640
SCREEN_HEIGHT = 960

PLAYER_WIDTH = 298
PLAYER_HEIGHT = 358
PLAYER_POSITION_Y = SCREEN_HEIGHT - PLAYER_HEIGHT/1.4 -20
PLAYER_SCALE_FACTOR = 2.0

ENEMY_WIDTH  = 161
ENEMY_HEIGHT = 156
ENEMY_SCALE_FACTOR = 2.0

UI_DATA =
  main:
    children: [
      type: "Label"
      name: "timeLabel"
      x: 200
      y: 120
      width: SCREEN_WIDTH
      fillStyle: "black"
      text: " "
      fontSize: 60
      align: "center"
    ]

ASSETS = 
  "entaRight": "assets/image/entaRight.png"
  "entaLeft": "assets/image/entaLeft.png"
  "sky": "assets/image/sky.png"
  "skyNogu": "assets/image/skyNogu.png"
  "ground": "assets/image/ground.png"
  "tina": "assets/image/tina.png"

score = 0
enableController = false

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
      title: "空飛ぶエン太"
      width: SCREEN_WIDTH
      height: SCREEN_HEIGHT
    this.addEventListener "pointingend", (event) ->
      event.app.replaceScene MainScene()

tm.define "MainScene",
  superClass: "tm.app.Scene"
  init: ->
    this.superInit()
    this.timer = 0
    this.worldSpeed = 0
    score = 0
    enableController = false

    this.back1 = tm.app.Sprite("sky", SCREEN_WIDTH, SCREEN_HEIGHT).addChildTo this
    this.back1.position.set SCREEN_WIDTH/2, SCREEN_HEIGHT/2
    this.back2 = tm.app.Sprite("skyNogu", SCREEN_WIDTH, SCREEN_HEIGHT).addChildTo this
    this.back2.position.set SCREEN_WIDTH/2, -SCREEN_HEIGHT/2

    this.ground = tm.app.Sprite("ground").addChildTo this
    this.ground.position.set SCREEN_WIDTH/2, SCREEN_HEIGHT - this.ground.height/2

    this.enta = Enta().addChildTo this
    this.enta.position.set SCREEN_WIDTH/2, PLAYER_POSITION_Y
    this.fromJSON UI_DATA.main

    this.enemyGroup = tm.app.CanvasElement().addChildTo this


  update: (app) ->
    this.worldSpeed+= 0.05 if this.worldSpeed < 5
    this.ground.y += this.worldSpeed
    this.back1.y += this.worldSpeed
    this.back2.y += this.worldSpeed
    if this.back1.y > SCREEN_HEIGHT + SCREEN_HEIGHT/2
      this.back1.y = -(SCREEN_HEIGHT-this.back2.y)
    if this.back2.y > SCREEN_HEIGHT + SCREEN_HEIGHT/2
      this.back2.y = -(SCREEN_HEIGHT-this.back1.y)
    if this.worldSpeed > 2.0
      enableController = true


    this.timeLabel.text = score

    ++this.timer

    if this.timer % 60 is 0
      enemy = Enemy().addChildTo this.enemyGroup
      enemy.x = Math.rand 0, SCREEN_WIDTH
      enemy.y = 0 - enemy.height

    self = this
    enemies = this.enemyGroup.children
    enemies.each (enemy) ->
      if self.enta.isHitElement enemy
        app.replaceScene EndScene(score)

tm.define "EndScene",
  superClass: "tm.app.ResultScene"
  init: (score) ->
    this.superInit
      score: score
      msg: "空飛ぶエン太"
      hastags: ["FlyingEnta!"]
      url: "http://icebreak.jp"
      width: SCREEN_WIDTH
      height: SCREEN_HEIGHT
      related: "thank you for playing!"
  onnextscene: (event) ->
    event.target.app.replaceScene TitleScene()

tm.define "Enta",
  superClass: "tm.app.Sprite"
  direction: "left"
  degree: 90
  init: ->
    this.superInit "entaRight", PLAYER_WIDTH/PLAYER_SCALE_FACTOR, PLAYER_HEIGHT/PLAYER_SCALE_FACTOR
    this.origin.y = 0

  update: (app) ->
    if app.pointing.getPointingStart()
      this.direction = if this.direction is "left" then "right" else "left"

    if this.direction is "left"
      this.image = "entaLeft"
    else
      this.image = "entaRight"

    if enableController
      if this.direction is "left"
        this.degree-= 1 if this.degree > 70
      else
        this.degree+= 1 if this.degree < 110

    accel = Math.cos this.degree * (Math.PI/180)

    this.x += accel * 20.0

    this.rotation = -(this.degree - 90)

    if this.rotation < -35
      this.rotation = -35
    if this.rotation > 35
      this.rotation = 35

    if this.x > SCREEN_WIDTH
      this.x = SCREEN_WIDTH
    if this.x < 0
      this.x = 0

tm.define "Enemy",
  superClass: "tm.app.Sprite"
  init: ->
    this.superInit "tina", ENEMY_WIDTH/ENEMY_SCALE_FACTOR, ENEMY_HEIGHT/ENEMY_SCALE_FACTOR
    this.speed = Math.rand 6,12
    this.counted = false

  update: (app)->
    this.y += this.speed

    if this.y > SCREEN_HEIGHT + this.height
      this.remove()
    if ! this.counted and this.y > PLAYER_POSITION_Y
      score++
      this.counted = true
