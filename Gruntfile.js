module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        concat: {
            dist: {
                src: [
                    'source/data/js/libs/*.js',
                    'source/data/js/main.js'
                ],
                dest: 'source/data/js/build/production.js'
            }
        },

        uglify: {
            build: {
                src: 'source/data/js/build/production.js',
                dest: 'source/data/js/build/production.min.js'
            }
        },

        less: {
            development: {
                files: {
                    "source/data/css/main.css": "source/data/less/main.less",
                    "source/data/css/blackVersion.css": "source/data/less/blackVersion.less"
                }
            }
        },

        watch: {
            scripts: {
                files: [
                    'source/data/js/*.js',
                    'source/data/less/*.less'
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