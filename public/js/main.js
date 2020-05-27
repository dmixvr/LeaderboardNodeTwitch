var puntuacionesAnteriores;

$(document).ready(function() {
    console.log("ready!");

    cargarTabla();
    setInterval(function() {
        ActualizarTabla();
    }, 3000);
});


function ActualizarTabla() {
    console.log("Update")
    cargarTabla();

    // cargarTabla();
}

function cargarTabla() {
    $.ajax({
        url: 'http://localhost:8081/api/leaderboard/1',
        success: function(respuesta) {
            console.log(respuesta);
            puntuacionesAnteriores = respuesta;

            for (let index = 0; index < 5; index++) {
                var usuario = respuesta[index]

                var fila = $("li:nth-child(" + (index + 1) + ")");


                if (usuario != undefined) {
                    if (usuario.Nick != fila.find(".nick").html() || usuario.Puntuacion != fila.find(".score").html()) {

                        fila.find(".nick").html(usuario.Nick)
                        fila.find(".score").html(usuario.Puntuacion)
                        fila.removeClass("run-fadeInLfet")
                        fila.width();
                        fila.addClass("run-fadeInLfet")
                    }
                }





            }

        },
        error: function() {
            console.log("No se ha podido obtener la información");
        }
    });
}