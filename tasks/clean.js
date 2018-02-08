const gulp   = require('gulp'),
	  del    = require('del');


//datos
const data = require('./../frontend.json');


const build = data.build;

//borramos la carpeta de maps
gulp.task('clean:maps', ()=>{
	return del('./publication/maps/')
} );


//borramos archivos temporales
gulp.task('clean:temps', ()=>{
	del(['./publication/assets/css/*.**','!'+data.build + data.assets + data.css +'/**/'+data.name+'.min.css']);
});


//limpiamos publication para generar assets, html, css y js desde 0
gulp.task('clean', ()=>{
	
	return del(build).then(paths =>{
		console.log('se borraron los archivos carpetas:\n', paths.join('\n'));
	});

});

