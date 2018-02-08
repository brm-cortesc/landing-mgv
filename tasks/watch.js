const gulp        = require('gulp'),
      watch       = require('gulp-watch'),
      path        = require('path');


//datos
const data = require('./../frontend.json');

const tsPath = data.root + data.dev + '**/**/*.ts';



gulp.task('watch', ['copy:ts', 'views', 'template', 'css'], ()=>{

  watch(data.root + data.stylus, ()=>{
    gulp.start('css', 'csslint')
  });


  watch( [data.root + data.dev + '**/*.pug', '!'+data.root + data.dev + data.templates ], ()=>{
    gulp.start('views')
   });


   // watch( data.root + data.dev + 'app.component.pug', ()=>{
   //  gulp.start('shell:app')
   // });


  watch( [data.root + data.dev + data.templates + '**/*.pug'], ()=>{
    gulp.start('template')
   });

  watch(tsPath, ()=>{
    gulp.start('copy:ts');

  });

});


