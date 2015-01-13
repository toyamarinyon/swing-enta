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
      y: SCREEN_CENTER_Y - 180
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
  endScene:
    children: [
      type: "tm.display.Label"
      name: "sceneTitleLabel"
      x: SCREEN_CENTER_X
      y: 140
      width: SCREEN_WIDTH
      fillStyle: "black"
      text: "TIME UP!"
      fontSize: 80
      fontWeight: "bold"
      align: "center"
     ,
      type: "tm.display.Label"
      name: "sceneh2TitleLabel"
      x: SCREEN_CENTER_X
      y: 200
      width: SCREEN_WIDTH
      fillStyle: "black"
      text: "これまでのトップ３"
      fontSize: 20
      fontWeight: "bold"
      align: "center"
     ,
      type: "tm.display.Label"
      name: "scoreLabel"
      x: SCREEN_CENTER_X
      y: 540
      width: SCREEN_WIDTH
      fillStyle: "black"
      text: "0"
      fontSize: 30
      align: "right"
     ,
      type: "tm.display.Label"
      name: "leaderboardFirst"
      x: SCREEN_CENTER_X
      y: 250
      width: SCREEN_WIDTH
      fillStyle: "black"
      text: "１位"
      fontSize: 30
      align: "center"
     ,
      type: "tm.display.Label"
      name: "leaderboardSecond"
      x: SCREEN_CENTER_X
      y: 300
      width: SCREEN_WIDTH
      fillStyle: "black"
      text: "２位"
      fontSize: 30
      align: "center"
     ,
      type: "tm.display.Label"
      name: "leaderboardThird"
      x: SCREEN_CENTER_X
      y: 350
      width: SCREEN_WIDTH
      fillStyle: "black"
      text: "３位"
      fontSize: 30
      align: "center"
     ,
      type: "tm.display.Label"
      name: "sceneTitleLabel"
      x: SCREEN_CENTER_X
      y: 500
      width: SCREEN_WIDTH
      fillStyle: "black"
      text: "あなたのスコア"
      fontSize: 20
      fontWeight: "bold"
      align: "center"
    ]
