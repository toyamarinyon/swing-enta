tm.define "EndScene",
  score: 0
  superClass: "tm.app.Scene"
  init: (score) ->
    enableController = false
    this.leaderboard(score)
    this.superInit()
    this.fromJSON UI_DATA.gameScene
    this.fromJSON UI_DATA.endScene
    this.scoreLabel.text = score
    this.ground.y = SCREEN_HEIGHT - this.ground.height/2
  onnextscene: (event) ->
    event.target.app.replaceScene TutorialScene()

  leaderboard: (score) ->
    self = this
    fetchLeaderboard = ->
      readerboard = Parse.Object.extend "Leaderboard"
      query = new Parse.Query readerboard
      query
        .descending "score"
        .limit 3
      query.find
        success: (results) ->
          for result, i in results
            if i is 0
              userName = result.get "userName"
              score = result.get "score"
              self.leaderboardFirst.text = self.leaderboardFirst.text + " " + userName + " " + score
            if i is 1
              userName = result.get "userName"
              score = result.get "score"
              self.leaderboardSecond.text = self.leaderboardSecond.text + " " + userName + " " + score
            if i is 2
              userName = result.get "userName"
              score = result.get "score"
              self.leaderboardThird.text = self.leaderboardThird.text + " " + userName + " " + score
    this.sendScore score, fetchLeaderboard

  sendScore: (score, callback) ->
    leaderboard = Parse.Object.extend "Leaderboard"
    l = new leaderboard()
    l
      .save
        score: score
        userName: document.getElementById("UserNameTextForm").value
      .then (object) ->
        console.log "yey!"
        callback()

