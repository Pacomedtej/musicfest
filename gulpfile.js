
function tarea(done) {
    console.log("Mi primer tarea");

    done();
}

const { src, dest, watch, parallel } = require("gulp"); // Extrae la funcionalidad de la carpeta gulp

// Dependencias de CSS
const sass = require("gulp-sass")(require("sass"));
const plumber = require("gulp-plumber");

// Dependencias de Imagen
const cache = require('gulp-cache');
const imagemin = require('gulp-imagemin');
const webPromise = import('gulp-webp');
const avif = require('gulp-avif');

function css(done){

    src("src/scss/app.scss") // Identificar el archivo SASS
        .pipe(plumber())
        .pipe(sass()) // Compilarlo
        .pipe(dest("build/css")) // Almacenarlo en el disco duro



    done(); // Callback que avisa a gulp que llegamos al final
}

async function versionWebp(done){
    const { default: webp } = await webPromise;

    const opciones = {
        quality: 50
    }

    src('src/img/**/*.{png,jpg}')
        .pipe(webp(opciones))
        .pipe(dest('build/img'));

    done();
}

function imagenes(done){

    const opciones = {
        optimizationLevel: 3
    }

    src('src/img/**/*.{png,jpg}')
        .pipe(cache( imagemin(opciones) ))
        .pipe( dest('build/img') )

    done();
}

function versionAvif(done){

    const opciones = {
        quality: 50
    }

    src('src/img/**/*.{png,jpg}')
        .pipe(avif(opciones))
        .pipe(dest('build/img'));

    done();
}

function dev(done){
    // watch("src/scss/app.scss", css); // Watch para UN archivo scss

    watch("src/scss/**/*.scss", css) // Watch para todas las carpetas y archivos scss
    console.log("I´m using gulp!");
    done()
}


// nombre a llamar = functionName()
// exports.tarea = tarea;

exports.css = css;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.dev = parallel( imagenes, versionWebp, versionAvif, dev);