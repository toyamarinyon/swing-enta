tm.define "Timer",
  superClass: "tm.app.AnimationSprite"

  init: ->
    this.speed = Math.rand 1,2
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
    this.superInit ss
    this.gotoAndPlay "blink"

  update: (app)->
    this.y += this.speed + worldSpeed

    if this.y > SCREEN_HEIGHT + this.height
      this.remove()

