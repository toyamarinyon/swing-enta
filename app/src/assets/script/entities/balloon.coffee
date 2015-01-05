tm.define "Balloon",
  superClass: "tm.app.Sprite"
  init: ->
    this.superInit "itemBallonRed"
    this.speed = Math.rand 4,6

  update: (app)->
    this.y += this.speed + worldSpeed

    if this.y > SCREEN_HEIGHT + this.height
      this.remove()

