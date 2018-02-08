const gulp        = require('gulp'),
      path        = require('path'),
      rename     = require('gulp-rename'),
      del    	= require('del'),
      changed     = require('gulp-changed');

//datos
const data = require('./../frontend.json');

const tsPath = [data.root + data.dev + '**/*.ts', '!'+data.root + data.dev + 'templates/'];


const devPath =data.root + data.dev


gulp.task('copy:ts', ()=>{

  return gulp.src(tsPath)
        .pipe(changed(data.root + data.app))
        .pipe(gulp.dest(data.root + data.app))
});


//ocultamos carpeta de desarrollo para el build

gulp.task('hide:dev', ()=>{
	return gulp.src(devPath)
		.pipe(rename('.temp'))
		.pipe(gulp.dest(data.root))
});



gulp.task('copy:dev', ()=>{
	return gulp.src(devPath + '**/*')
		.pipe(gulp.dest('./src/.temp'))
});


// borramos carpeta dev para build
gulp.task('delete:dev', ()=>{
	return del(devPath)

})


//traemos de nuevo carpeta dev

gulp.task('show:dev', ()=>{
	return gulp.src('./src/.temp')
		.pipe(rename('dev'))
		.pipe(gulp.dest(data.root))
});


gulp.task('copy:temp', ()=>{
	return gulp.src('./src/.temp/**/*')
		.pipe(gulp.dest(data.root + data.dev))
});



//Borramos temporal

gulp.task('delete:temp', ()=>{
	return del('./src/.temp')
});

