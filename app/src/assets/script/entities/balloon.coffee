tm.define "Balloon",
  superClass: "tm.app.Sprite"
  init: ->
    this.superInit "itemBallonRed", 66/1.5, 107/1.5
    this.speed = Math.rand 4,6

  update: (app)->
    this.y += this.speed + worldSpeed

    if this.y > SCREEN_HEIGHT + this.height
      this.remove()

