const gulp = require('gulp'),
	runSequence = require('run-sequence'),
	argv    = require('yargs').argv,
	del    = require('del');

//datos
const data = require('./../frontend.json'),
	  production = argv.prod;


gulp.task('build', (cb)=>{

	if (production){
		runSequence(
	  		'copy:ts',
	  		'views',
	  		'template',
	  		'css',
	  		'minicss',
	  		'hide:dev',
	  		'copy:dev',
	  		'delete:dev',
	  		cb
		);
		
	}


})