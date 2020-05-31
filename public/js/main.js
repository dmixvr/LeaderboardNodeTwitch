var puntuacionesAnteriores;
var minijuego = 1;
$(document).ready(function() {
    console.log("ready!");

    cargarTabla();
    setInterval(function() {
        ActualizarTabla();
    }, 3000);

    minijuego = getUrlParameter("minijuego");
    if (minijuego == 1) {
        $("h1").html('<svg class="ico-cup"> <use xlink:href="#cup"></use> </svg> Aim Factory');
    } else if (minijuego == 2) {
        $("h1").html('<svg class="ico-cup"> <use xlink:href="#cup"></use> </svg> Blast Jump');
    } else if (minijuego == 3) {
        $("h1").html('<svg class="ico-cup"> <use xlink:href="#cup"></use> </svg> Flappy bird');
    }

});


function ActualizarTabla() {
    cargarTabla();
}

function cargarTabla() {

    $.ajax({
        url: 'http://localhost:8083/api/leaderboard/' + minijuego,
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

var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
};