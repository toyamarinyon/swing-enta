tm.define "Enemy",
  superClass: "tm.app.Sprite"
  init: ->
    this.superInit "tina", ENEMY_WIDTH/ENEMY_SCALE_FACTOR, ENEMY_HEIGHT/ENEMY_SCALE_FACTOR
    this.speed = Math.rand 2,6
    this.counted = false

  update: (app)->
    this.y += this.speed

    if this.y > SCREEN_HEIGHT + this.height
      this.remove()
    if ! this.counted and this.y > PLAYER_POSITION_Y
      this.counted = true

