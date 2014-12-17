module.exports = (grunt) ->
  grunt.initConfig
    pkg: grunt.file.readJSON('package.json'),
    connect:
      server:
        options:
          hostname: '*'
          port: 8080
          livereload: true
          base: './app/dest/'

    watch:
      options:
        livereload: true
      jade:
        files:
          './app/src/**/*.jade'
        tasks:
          'jade'
      coffee:
        files:
          './app/src/**/*.coffee'
        tasks:
          'coffee'

    jade:
      compile:
        options:
          pretty: true
        files: [
          expand: true
          cwd  : './app/src'
          src  : '**/*.jade'
          dest : './app/dest'
          ext  : '.html'
        ]

    coffee:
      options:
        bare: true
      compile:
        files: [
          expand: true
          cwd  : './app/src'
          src  : '**/*.coffee'
          dest : './app/dest'
          ext  : '.js'
        ]

    concurrent:
      build:
        tasks: ['jade','coffee']
        options:
          logConcurrentOutput: true

  grunt.loadNpmTasks 'grunt-contrib-connect'
  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-contrib-jade'
  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-concurrent'

  grunt.registerTask 'default', ['concurrent:build','connect','watch']
