"use strict";

module.exports = function(grunt) {

	require('load-grunt-tasks')(grunt);

	require('time-grunt')(grunt);

	require('jit-grunt')(grunt, {
		express : 'grunt-express-server',
		watch : 'grunt-contrib-watch',		
		sass : 'grunt-contrib-sass',
		copy : 'grunt-contrib-copy',
        connect : 'grunt-contrib-connect',
        nodemon : 'grunt-nodemon'
	});

	grunt.initConfig({
		concurrent : {
			app : {
				tasks : ['sass','watch','nodemon', 'connect'],
				options : {
					logConcurrentOutput : true
				}
			},
			browser : {
				tasks : ['connect'],
				options : {
					logConcurrentOutput : true
				}
			}
		},
        nodemon : {
			dev : {
				script : 'server/app.js',
				options : {
					watch: ['server'],
					env: {
						PORT: '5001'
					},
					ext: 'js',
					legacyWatch: true,
					cwd: __dirname,
					callback : function(nodemon) {
						nodemon.on('log',function(event){
							console.log(event.colour);
						});
					}
				}
			}
		},		
		connect : {
			server : {
				options : {
					open: {
						target: 'http://localhost:5001/dashboard'
					}
				}
			}
		},		
		watch : {
			gruntFile : {
				files : ['Gruntfile.js']
			},
			livereload : {
				files : ['client/*','client/**/*'],
				options : {
					livereload : true
				}
			},
			sass : {
				files : ['client/scss/**/*.scss'],
				tasks : ['sass']
			}
		},
		shell : {
			git : {
				command : []
			}
		},		
		sass : {
			dist : {
				files : [{
					expand : true,
					cwd : 'client/scss',
					src : ['**/*.scss'],
					dest : 'client/commons/css',
					ext : '.css'
				}]
			}
		},
		copy : {
			html : {
				expand : true,
				cwd : 'client/dashboard',
				src : ['**/*.html','**/*.css'],
				dest : 'client/dashboard/resources'
			}
		},
		requirejs : {
			compile : {
				options : {
					baseUrl: "client",
					mainConfigFile : 'client/require.config.js',
					name: "bower_components/almond/almond",
					out: "client/require.config.js",
					uglify : {
						mangle   : false
					}
				}
			}
		}
	});

	grunt.registerTask('cli',function(){
		grunt.log.writeln(grunt.option('m'));
	});	

	grunt.registerTask('wait', function() {

		grunt.log.writeln('A basic timeout wait..... PROCESSING');

		var done = this.async();

		setTimeout(function(){
			grunt.log.writeln('Processing Completed');
			done();
		}, 1500);

	});
    
	//grunt.registerTask('default',[]);
	grunt.registerTask('serve',['concurrent:app','wait','concurrent:browser']);
	grunt.registerTask('test',['simplemocha']);
	grunt.registerTask('build', ['requirejs', 'sass','copy']);

};