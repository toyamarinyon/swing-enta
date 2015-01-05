tm.define "Player",
  superClass: "tm.app.Sprite"
  direction: "left"
  prevFrameDirection: "left"
  degree: 90
  accel: 0
  init: ->
    this.superInit "entaRight", PLAYER_WIDTH/PLAYER_SCALE_FACTOR, PLAYER_HEIGHT/PLAYER_SCALE_FACTOR
    this.origin.y = 0

  update: (app) ->
    if app.pointing.getPointingStart()
      this.direction = if app.pointing.x < SCREEN_WIDTH/2 then "left" else "right"


    if enableController
      if this.direction is "left"
        this.accel-=0.2 if this.accel > -8.0
        this.image = "entaLeft"
      if this.direction is "right"
        this.accel+=0.2 if this.accel < 8.0
        this.image = "entaRight"

      this.x += this.accel
      this.rotation = this.accel*2.0

    if this.x > SCREEN_WIDTH
      this.x = SCREEN_WIDTH
      this.accel = 0
    if this.x < 0
      this.x = 0
      this.accel = 0

