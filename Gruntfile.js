module.exports = function(grunt){

   "use strict";
   require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        project: {
            app: 'app',
            assets: '<%= project.app %>/assets',
            src: '<%= project.assets %>/src',
            css: [
                '<%= project.src %>/scss/style.scss'
            ],
            js: [
                '<%= project.src %>/js/*.js'
            ]
        },

        banner: '/*!\n' +
                  ' * <%= pkg.name %>\n' +
                  ' * <%= pkg.title %>\n' +
                  ' * <%= pkg.url %>\n' +
                  ' * @author <%= pkg.author %>\n' +
                  ' * @version <%= pkg.version %>\n' +
                  ' * Copyright <%= pkg.copyright %>. <%= pkg.license %> licensed.\n' +
                  ' */\n'
        },

        cssc: {
            build: {
                options: {
                    consolidateViaDeclarations: true,
                    consolidateViaSelectors:    true,
                    consolidateMediaQueries:    true
                },
                files: {
                    'build/css/master.css': 'build/css/master.css'
                }
            }
        },

        cssmin: {
            build: {
                src: 'build/css/master.css',
                dest: 'build/css/master.css'
            }
        },

        less: {
          development: {
            options: {
              paths: ["assets/css"]
            },
            files: {
              "assets/css/master.css": "assets/css/master.less"
            }
          },

          production: {
            options: {
              paths: ["assets/css"],
              cleancss: true,
            },
            files: {
              "build/css/master.css": "assets/css/master.less"
            }
          }
        },

        watch: {
            html: {
                files: ['index.html'],
                tasks: ['htmlhint']
            },
            js: {
                files: ['assets/js/base.js'],
                tasks: ['uglify']
            },
            css: {
                files: ['assets/css/**/*.less'],
                tasks: ['buildcss']
            }
        },

        htmlhint: {
            build: {
                options: {
                    'tag-pair': true,
                    // Force tags to have a closing pair
                    'tagname-lowercase': true,
                    // Force tags to be lowercase
                    'attr-lowercase': true,
                    // Force attribute names to be lowercase e.g. <div id="header"> is invalid
                    'attr-value-double-quotes': true,
                    // Force attributes to have double quotes rather than single
                    'doctype-first': true,
                    // Force the DOCTYPE declaration to come first in the document
                    'spec-char-escape': true,
                    // Force special characters to be escaped
                    'id-unique': true,
                    // Prevent using the same ID multiple times in a document
                    'head-script-disabled': true,
                    // Prevent script tags being loaded in the  for performance reasons
                    'style-disabled': true
                    // Prevent style tags. CSS should be loaded through
                },
                src: ['index.html']
            }
        },

        uglify: {
            build: {
                files: {
                    'build/js/reflex.min.js': ['assets/js/reflex.js']
                }
            }
        }

    });

    grunt.registerTask('default',   []);
    grunt.registerTask('buildcss',  ['less', 'cssc', 'cssmin']);

};