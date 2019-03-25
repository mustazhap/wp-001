var gulp = require('gulp'), // Gilp
    watch = require('gulp-watch'), // Watcher
    prefixer = require('gulp-autoprefixer'), // Автопрефиксер
    uglify = require('gulp-uglify'), // Минификация JS
    sass = require('gulp-sass'), // Sass
    sourcemaps = require('gulp-sourcemaps'), // Sourcemap
    cssmin = require('gulp-minify-css'), // минифиакция css
    imagemin = require('gulp-imagemin'), // минифиакция img
    pngquant = require('imagemin-pngquant'), // минифиакция png
    browserSync = require("browser-sync"), // reloader browser
    concat = require('gulp-concat'), // склейка JS
    rigger = require('gulp-file-include'), //склейка html
    notify = require("gulp-notify"),
    reload = browserSync.reload; // для перезагрузки



var path = {    
    public: { //Тут мы укажем куда складывать готовые после сборки файлы
        html: 'public/',
        js: 'public/assets/js/',
        css: 'public/assets/css/',
        img: 'public/assets/img/' ,
        fonts: 'public/assets/fonts/',
        libs: 'public/assets/libs/',
        media: 'public/assets/media'
    },
    src: { //Пути откуда брать исходники
        html: 'dev/*.html', //Синтаксис src/*.html говорит gulp что мы хотим взять все файлы с расширением .html
        js: 'dev/assets/js/main.js',//В стилях и скриптах нам понадобятся только main файлы
        style: 'dev/assets/scss/main.scss',
        img: 'dev/assets/img/**/*.*', //Синтаксис img/**/*.* означает - взять все файлы всех расширений из папки и из вложенных каталогов
        fonts: 'dev/assets/fonts/**/*.*',
        libs: 'dev/assets/libs/**/*.*',
        media: 'dev/assets/media/**/*.*'
    },
    watch: { //Тут мы укажем, за изменением каких файлов мы хотим наблюдать
        html: 'dev/**/*.html',
        js: 'dev/**/*.js',
        style: 'dev/**/*.scss',
        img: 'dev/assets/img/**/*.*',
        fonts: 'dev/assets/fonts/**/*.*',
        libs: 'dev/assets/libs/**/*.*',
        media: 'dev/assets/media/**/*.*'

    },
    clean: './public'
};


var config = { // Сервер для live-reload (Browser-sync)
    server: {
        baseDir: "./public"
    },
    //tunnel: true,
    host: 'localhost',
    port: 9000,
    
};

//  Сборка HTML
gulp.task('html:build', function () { 
    gulp.src(path.src.html) //Выберем файлы по нужному пути
        .pipe(rigger()) // Прогоним через rigger
        .on("error", notify.onError(function(error) {
            return "Message to the notifier: " + error.message;
        }))
        .pipe(gulp.dest(path.public.html)) //Выплюнем их в папку public
        .pipe(reload({stream: true})); //И перезагрузим наш сервер для обновлений
});



gulp.task('js:build', function() {
    gulp.src([
                'dev/assets/js/main.js',
                'dev/blocks/js/*.js'
               
        ]) // файлы, которые обрабатываем
        //.pipe(concat('main.js')) // склеиваем все JS
        //.pipe(uglify()) // получившуюся "портянку" минифицируем 
        .pipe(gulp.dest(path.public.js)) // результат пишем по указанному адресу
});


gulp.task('style:build', function () {
    gulp.src(path.src.style) //Выберем наш main.scss
        .pipe(sourcemaps.init()) //То же самое что и с js
        .pipe(sass()) //Скомпилируем
        .on("error", notify.onError(function(error) {
            return "Message to the notifier: " + error.message;
        }))
        .pipe(prefixer(
            {
                browsers: ['last 10 versions'],
                cascade: false
            }
        )) //Добавим вендорные префиксы
        .pipe(cssmin()) //Сожмем
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.public.css)) //И в public
        .pipe(reload({stream: true}));
});

gulp.task('image:build', function () {
    gulp.src(path.src.img) //Выберем наши картинки
        //.pipe(imagemin({ //Сожмем их
         //   progressive: true,
         //   svgoPlugins: [{removeViewBox: false}],
         //   use: [pngquant()],
         //   interlaced: true
       // }))
        .pipe(gulp.dest(path.public.img)) //И бросим в public
        .pipe(reload({stream: true}));
});

gulp.task('fonts:build', function() {
    gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.public.fonts))
});

gulp.task('libs:build', function() {
    gulp.src(path.src.libs)
        .pipe(gulp.dest(path.public.libs))
});


gulp.task('media:build', function() {
    gulp.src(path.src.media)
        .pipe(gulp.dest(path.public.media))
});

// все таски :build собираем в одинь
gulp.task('build', [
    'html:build',
    'js:build',
    'style:build',
    'fonts:build',
    'image:build',
    'libs:build',
    'media:build'
]);

// подключаем watcher
gulp.task('watch', function(){ 
    watch([path.watch.html], function(event, cb) {
        gulp.start('html:build');
    });
    watch([path.watch.style], function(event, cb) {
        gulp.start('style:build');
    });
    watch([path.watch.js], function(event, cb) {
        gulp.start('js:build');
    });
    watch([path.watch.img], function(event, cb) {
        gulp.start('image:build');
    });
    watch([path.watch.fonts], function(event, cb) {
        gulp.start('fonts:build');
    });
    watch([path.watch.libs], function(event, cb) {
        gulp.start('libs:build');
    });
});

gulp.task('webserver', function () {
    browserSync(config);
});

gulp.task('clean', function (cb) {
    rimraf(path.clean, cb);
});

gulp.task('default', ['build', 'webserver', 'watch']);