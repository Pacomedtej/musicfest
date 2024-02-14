
function tarea(done) {
    console.log("Mi primer tarea");

    done();
}

const { src, dest, watch } = require("gulp"); // Extrae la funcionalidad de la carpeta gulp
const sass = require("gulp-sass")(require("sass"))

function css(done){

    src("src/scss/app.scss") // Identificar el archivo SASS
        .pipe(sass()) // Compilarlo
        .pipe(dest("build/css")) // Almacenarlo en el disco duro



    done(); // Callback que avisa a gulp que llegamos al final
}

function dev(done){
    watch("src/scss/app.scss", css);

    done()
}


// nombre a llamar = functionName()
// exports.tarea = tarea;

exports.css = css;
exports.dev = dev;