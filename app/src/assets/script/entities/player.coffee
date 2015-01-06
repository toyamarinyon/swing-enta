tm.define "Player",
  superClass: "tm.app.Sprite"
  direction: "right"
  prevFrameDirection: "right"
  degree: 90
  accel: 0
  hasBallons: 0
  init: ->
    this.superInit "entaRight", PLAYER_WIDTH/PLAYER_SCALE_FACTOR, PLAYER_HEIGHT/PLAYER_SCALE_FACTOR
    this.origin.y = 0
    this.balloonImage = tm.app.Sprite("balloonRight1", BALLOON_WIDTH/PLAYER_SCALE_FACTOR, BALLOON_HEIGHT/PLAYER_SCALE_FACTOR).addChildTo this
    this.balloonImage.visible = false
    this.balloonImage.y -= 34
    this.balloonImage.x -= 10

  update: (app) ->
    if app.pointing.getPointingStart()
      this.direction = if app.pointing.x < SCREEN_WIDTH/2 then "left" else "right"


    if enableController
      if this.direction is "left"
        this.accel-=0.2 if this.accel > -8.0
        this.image = "entaLeft"
        this.balloonImage.image = "balloonLeft"+this.hasBallons if this.hasBallons > 0
        this.balloonImage.x = 10
      if this.direction is "right"
        this.accel+=0.2 if this.accel < 8.0
        this.image = "entaRight"
        this.balloonImage.image = "balloonRight"+this.hasBallons if this.hasBallons > 0
        this.balloonImage.x = -10

      this.x += this.accel
      this.rotation = this.accel*2.0

    if this.x > SCREEN_WIDTH
      this.x = SCREEN_WIDTH
      this.accel = 0
    if this.x < 0
      this.x = 0
      this.accel = 0

  getBalloon: ->
    this.balloonImage.visible = true
    this.hasBallons++



