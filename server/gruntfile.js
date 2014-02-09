module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		banner :"/*Puta madre mother fuckers!!*/",
		jshint: {
            all: {
                src: ['../app/**/*.js'],
                options: {
                    jshintrc: true
                }
            }
        },
		uglify: {
			options: {
		    // the banner is inserted at the top of the output
		    banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
		  },
		  dist: {
		    src:['../app/**/*.js'],
		    dest:"../app/<%= pkg.name %>.<%= pkg.version %>.min.js"
		  }
		},
		jshint: {
		  // define the files to lint
		  all: ['*.js']
		},
		compass:{
			dist:{
				options: {
					config: 'config.rb'
				}
			}
		},
		cssmin:{
			compress:{
				options:{
					banner : '<%= banner %>'
				},
				files:{
					'../app/resources/css/app.min.css' : ['../app/resources/css/*.css']
				}
			}
		}

	});

	//minification
	grunt.loadNpmTasks('grunt-contrib-uglify');
	//code quality
	grunt.loadNpmTasks('grunt-contrib-jshint');
	//css minify
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	//compass
	grunt.loadNpmTasks('grunt-contrib-compass');
	//watch????
	//grunt.loadNpmTasks('grunt-contrib-watch');
	//concatination
	//grunt.loadNpmTasks('grunt-contrib-concat');


	// this would be run by typing "grunt test" on the command line
	grunt.registerTask('test', ['jshint']);

	// the default task can be run just by typing "grunt" on the command line
	grunt.registerTask('default', ['uglify','compass','cssmin']);
}