tm.define "Timer",
  superClass: "tm.app.AnimationSprite"

  init: ->
    this.speed = Math.rand 3,6
    ss = tm.asset.SpriteSheet
      image: "itemTimer"
      frame:
        width: 88
        height: 80
        count: 2
      animations:
        blink:
          frames: [0,1]
          next: "blink"
          frequency: "30"
    this.superInit ss, 88/1.5, 80/1.5
    this.gotoAndPlay "blink"

  update: (app)->
    this.y += this.speed + worldSpeed

    if this.y > SCREEN_HEIGHT + this.height
      this.remove()

