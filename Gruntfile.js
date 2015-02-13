var fs = require('fs'),
    browserify = require('browserify'),
    exorcist = require('exorcist'),
    env = process.env.NODE_ENV || 'dev';

module.exports = function(grunt) {

    'use strict';

    var wwwDir             = 'www',
        stylusDir          = 'stylus',
        cssDir             = wwwDir + '/css',
        cssFileName        = 'qwixx.css',
        jsDir              = wwwDir + '/js',
        logsDir            = 'logs';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        bump: {
            options: {
                files: ['package.json'],
                updateConfigs: ['pkg'],
                commit: true,
                commitMessage: 'Release v%VERSION%',
                commitFiles: ['package.json'], // '-a' for all files
                createTag: true,
                tagName: 'v%VERSION%',
                tagMessage: 'Version %VERSION%',
                push: true,
                pushTo: 'origin',
                gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d' // options to use with '$ git describe'
            }
        },
        clean: {
            styles: [
                cssDir
            ],
            js: [
                jsDir
            ]
        },
        mkdir: {
            all: {
                options: {
                    create: [
                        jsDir
                    ]
                }
            }
        },
        copy: {
            fonts: {
                files: [
                    {
                        src: ['node_modules/bootstrap-styl/fonts/**'],
                        dest: 'www/fonts/',
                        expand: true,
                        flatten: true,
                        filter: 'isFile'
                    }
                ]
            }
        },
        stylus: {
            compile: {
                options: {
                    paths: [ stylusDir ],
                    define: {
                        $version: '<%= pkg.version %>'
                    },
                    sourcemap: {
                        comment: false
                    },
                    'include css': true
                },
                dest: cssDir + '/' + cssFileName,
                src: [ stylusDir + '/app.styl' ]
            }
        },
        jshint: {
            client: [
                'www/js/.jshintrc',
                'www/js/.jshintignore',
                'www/tests/.jshintrc',
                'www/tests/.jshintignore',
                'www/js/app/**/*.js',
                'www/tests/**/*.js'
            ],
            options: {
                jshintrc: true
            },
            reporter_output: {
                options: {
                    reporter: 'jslint',
                    reporterOutput: logsDir+ '/logs/jshint.xml'
                }
            }
        },
        watch: {
            client: {
                files: ['<%= jshint.client %>', 'www/js/template/**'],
                tasks: ['jshint:client']
            },
            stylus: {
                files: [stylusDir + '/**'],
                tasks: ['stylus']
            },
            browserify: {
                files: ['webapp.js', 'lib/**', 'templates/**'],
                tasks: ['browserify']
            }
        },
        concurrent: {
            start: {
                tasks: ['supervisor', 'watch'],
                options: {
                    logConcurrentOutput: true
                }
            }
        },
        supervisor: {
            server: {
                script: 'index.js',
                options: {
                    ignore: ['Gruntfile.js', 'node_modules/', 'templates/', 'tests/', 'www/', 'webapp.js'],
                    pollInterval: 500,
                    debug: true,
                    noRestartOn: 'error',
                    quiet: true
                }
            }
        }
    });

    /**
     * This currently only works for Browserify v5. We can update Browserify once this issue has been resolved:
     * https://github.com/ben-ng/minifyify/issues/74
     */
    grunt.registerTask('browserify', function() {
        var bundler = browserify({ debug: true });
        var done = this.async();

        bundler.add(__dirname + '/webapp.js');

        if (env !== 'dev') {
            bundler.plugin('minifyify', { map: 'index.js.map', output: __dirname + '/www/js/index.js.map' });
            bundler.bundle(done)
                .pipe(fs.createWriteStream(__dirname + '/www/js/index.js'));
        } else {
            bundler.bundle()
                .pipe(exorcist(__dirname + '/www/js/index.js.map').on('end', done))
                .pipe(fs.createWriteStream(__dirname + '/www/js/index.js'));
        }
    });


    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-stylus');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-bump');
    grunt.loadNpmTasks('grunt-mkdir');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-supervisor');


    grunt.registerTask('build', ['clean', 'mkdir', 'browserify', 'stylus', 'copy']);
    grunt.registerTask('start', ['concurrent:start']);
    grunt.registerTask('default', ['build']);
};
