module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        shell: {
            jekyllBuild: {
                command: 'jekyll build'
            },
            jekyllServe: {
                command: 'jekyll serve'
            }
        },
        // sass: {
        //     dist: {
        //         options: {
        //             style: 'expanded'
        //         },
        //         files: {
        //             'assets/css/main.css': 'assets/scss/main.scss'
        //         }
        //     },
        //     prod: {
        //         options: {
        //             style: 'compressed'
        //         },
        //         files: {
        //             'assets/css/main.css': 'assets/scss/main.scss'
        //         }
        //     }
        // },
        compass: {
            dist: {
                options: {
                    config: 'config.rb',
                    environment: 'production',
                    outputStyle: 'compressed',
                    sourcemap: true
                }
            },
            dev: {
                options: {
                    config: 'config.rb',
                    environment: 'development',
                    outputStyle: 'expanded'
                }
            }
        },
        concat: {
            options: {
                separator: ';',
            },
            dist: {
                src: [
                    'bower_components/jquery/dist/jquery.js', 
                    'bower_components/bootstrap-sass-official/assets/javascripts/bootstrap.js',
                    'bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/collapse.js'
                ],
                dest: 'assets/js/dev/global.js'
            },
        },
        uglify: {
            dist: {
                files: {
                    'assets/js/main.min.js': ['assets/js/dev/global.js', 'assets/js/dev/main.js']
                }
            }
        },
        watch: {
            options: {
                livereload: true,
                interrupt: true,
                atBegin: true
            },
            jekyll: {
                files: [
                    '_includes/*',
                    '_layouts/*',
                    '_pages/*',
                    '_posts/*',
                    '_config.yml',
                    'index.html'
                ],
                tasks: [
                    'shell:jekyllBuild'
                ],
                options: {
                    spawn: false
                }                   
            },
            css: {
                files: ['assets/scss/*.scss'],
                tasks: ['compass:dev', 'shell:jekyllBuild'],
                options: {
                    spawn: false
                }
            },
            js: {
                files: ['assets/js/dev/main.js'],
                tasks: ['concat:dist', 'uglify:dist', 'shell:jekyllBuild'],
                options: {
                    spawn: false
                }
            }
        }
    });

    require('load-grunt-tasks')(grunt);

    grunt.registerTask('default', ['compass:dev', 'watch']);

};