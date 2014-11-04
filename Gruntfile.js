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
        watch: {
            options: {
                livereload: true,
            },
            files: [
                '_includes/*',
                '_layouts/*',
                '_pages/*',
                '_posts/*',
                '_config.yml',
                'index.html'
            ],
            tasks: ['shell:jekyllBuild', 'shell:jekyllServe'],
            options: {
                interrupt: true,
                atBegin: true
            }
        }
    });

    require('load-grunt-tasks')(grunt);

    grunt.registerTask('default', ['shell']);

};