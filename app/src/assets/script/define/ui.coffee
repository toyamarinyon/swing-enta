UI_DATA =
  titleScene:
    children: [
      type: "tm.display.Sprite"
      name: "title"
      init: ["title"]
      x: SCREEN_CENTER_X
      y: 220
     ,
      type: "tm.display.Sprite"
      name: "titleButton"
      init: ["titleButton"]
      x: SCREEN_CENTER_X
      y: SCREEN_HEIGHT - 300
    ]
  tutorialScene:
    children: [
      type: "tm.display.Sprite"
      name: "tutorial"
      init: ["tutorial"]
      x: SCREEN_CENTER_X
      y: SCREEN_CENTER_Y - 200
    ]
  gameScene:
    children: [
      type: "tm.display.Sprite"
      name: "back1"
      init: ["sky"]
      x: SCREEN_CENTER_X
      y: SCREEN_CENTER_Y
      width: SCREEN_WIDTH
      height: SCREEN_HEIGHT
     ,
      type: "tm.display.Sprite"
      name: "back2"
      init: ["skyNogu"]
      x: SCREEN_CENTER_X
      y: -SCREEN_CENTER_Y
      width: SCREEN_WIDTH
      height: SCREEN_HEIGHT
     ,
      type: "tm.display.Sprite"
      name: "ground"
      init: ["ground"]
      x: SCREEN_CENTER_X
      y:  SCREEN_HEIGHT
    ]
  playerAndTimeLabel:
    children: [
      type: "Player"
      name: "player"
      x: SCREEN_CENTER_X
      y: PLAYER_POSITION_Y
     ,
      type: "tm.display.Sprite"
      name: "gameScoreBackground"
      init: ["gameScoreBackground"]
      x: SCREEN_CENTER_X
      y: 0
      originY: 0
     ,
      type: "tm.display.Label"
      name: "timerLabel"
      x: SCREEN_CENTER_X + 80
      y: 40
      width: SCREEN_WIDTH
      fillStyle: "black"
      text: "0"
      fontSize: 30
      align: "right"
     ,
      type: "tm.display.Label"
      name: "scoreLabel"
      x: SCREEN_CENTER_X + 280
      y: 40
      width: SCREEN_WIDTH
      fillStyle: "black"
      text: "0"
      fontSize: 30
      align: "right"
     ,
      type: "tm.display.Label"
      name: "extendedTimeLabel"
      x: SCREEN_CENTER_X + 72
      y: 90
      width: SCREEN_WIDTH
      fillStyle: "orange"
      text: "＋３秒！"
      fontSize: 30
      align: "center"
      visible: false
      fontWeight: "bold"
     ,
      type: "tm.display.Label"
      name: "balloonLabel"
      x: SCREEN_CENTER_X + 230
      y: 90
      width: SCREEN_WIDTH
      fillStyle: "orange"
      text: "SPEED UP！"
      fontSize: 30
      align: "center"
      visible: false
      fontWeight: "bold"
    ]
