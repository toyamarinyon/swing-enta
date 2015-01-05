module.exports = (grunt) ->
  grunt.initConfig
    pkg: grunt.file.readJSON("package.json"),
    connect:
      server:
        options:
          hostname: "*"
          port: 8080
          livereload: true
          base: "./app/dest/"

    watch:
      options:
        livereload: true
      jade:
        files:
          "./app/src/**/*.jade"
        tasks:
          "jade"
      coffee:
        files:
          "./app/src/**/*.coffee"
        tasks:
          "coffee"

    jade:
      compile:
        options:
          pretty: true
        files: [
          expand: true
          cwd  : "./app/src"
          src  : "**/*.jade"
          dest : "./app/dest"
          ext  : ".html"
        ]

    coffee:
      options:
        bare: true
        join: true
      compile:
        files: 
          "./app/dest/assets/script/app.js":[

            "./app/src/assets/script/define/const.coffee",
            "./app/src/assets/script/define/variables.coffee",
            "./app/src/assets/script/define/asset.coffee",
            "./app/src/assets/script/define/ui.coffee",

            "./app/src/assets/script/main.coffee",

            "./app/src/assets/script/scenes/title.coffee",
            "./app/src/assets/script/scenes/tutorial.coffee",
            "./app/src/assets/script/scenes/main.coffee",
            "./app/src/assets/script/scenes/end.coffee",

            "./app/src/assets/script/entities/player.coffee",
            "./app/src/assets/script/entities/enemy.coffee"

          ]
          

    concurrent:
      build:
        tasks: ["jade","coffee"]
        options:
          logConcurrentOutput: true

  grunt.loadNpmTasks "grunt-contrib-connect"
  grunt.loadNpmTasks "grunt-contrib-watch"
  grunt.loadNpmTasks "grunt-contrib-jade"
  grunt.loadNpmTasks "grunt-contrib-coffee"
  grunt.loadNpmTasks "grunt-contrib-concat"
  grunt.loadNpmTasks "grunt-concurrent"

  grunt.registerTask "default", ["concurrent:build","connect","watch"]
