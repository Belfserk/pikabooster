module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        concat: {
            dist: {
                src: [
                    'js/libs/*.js',
                    'js/main.js'
                ],
                dest: 'js/build/production.js'
            }
        },

        uglify: {
            build: {
                src: 'js/build/production.js',
                dest: 'js/build/production.min.js'
            }
        },

        less: {
            development: {
                files: {
                    "css/main.css": "less/main.less"
                }
            }
        },

        watch: {
            scripts: {
                files: [
                    'js/*.js',
                    'less/*.less'
                ],
                tasks: ['concat', 'uglify', 'less'],
                options: {
                    spawn: false
                }
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-less');

    grunt.registerTask('default', ['concat', 'uglify', 'less', 'watch']);

};