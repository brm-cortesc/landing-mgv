const gulp = require('gulp'),
	path   = require('path'),
	gReport = require('gulp-sizereport');

//Data
const data = require('./../frontend.json');


gulp.task('report:js', ()=>{
	return gulp.src( './dist/**/*js')//devolvemos todos los archivos de js/
		.pipe(gReport({			
            '*':{
            	'maxSize': 200000 // cada js no deben pesar más de 200kb
            }
        }));

});

gulp.task('report:css', ()=>{
	return gulp.src( './dist/**/*css')//devolvemos todos los archivos de css/
		.pipe(gReport({			
            '*':{
            	'maxSize': 200000 // cada js no deben pesar más de 200kb
            }
        }));
});


gulp.task('report:img', ()=>{
	return gulp.src( './dist/**/*{gif,svg,jpg,png}')//devolvemos todos los archivos de imagen/
		.pipe(gReport({			
            '*':{
            	'maxSize': 300000 // cada img no deben pesar más de 300kb
            }
    }));
});