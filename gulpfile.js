
function tarea(done) {
    console.log("Mi primer tarea");

    done();
}

const { src, dest, watch } = require("gulp"); // Extrae la funcionalidad de la carpeta gulp
const sass = require("gulp-sass")(require("sass"));
const plumber = require("gulp-plumber");

function css(done){

    src("src/scss/app.scss") // Identificar el archivo SASS
        .pipe(plumber())
        .pipe(sass()) // Compilarlo
        .pipe(dest("build/css")) // Almacenarlo en el disco duro



    done(); // Callback que avisa a gulp que llegamos al final
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
exports.dev = dev;