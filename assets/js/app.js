/* MODULOS */
import ulNavbar from "./modulos/ulNavbar.js";
import crearMapa from "./modulos/mapa.js";
import listado from "./modulos/ListadoOfertas.js";
import buscar from "./modulos/Buscar.js";
import { coordenadas, liCoordenadas } from "./modulos/coordenadasProvincias.js";

/* CONEXIÓN CON LA API OFERTAS DE EMPLEO */
/* axios.get("https://analisis.datosabiertos.jcyl.es/api/records/1.0/search/?dataset=ofertas-de-empleo&q=&rows=1000&sort=fecha_de_publicacion&facet=provincia&facet=fecha_de_publicacion&facet=fuentecontenido") */
axios.get("https://analisis.datosabiertos.jcyl.es/api/explore/v2.1/catalog/datasets/ofertas-de-empleo/records?limit=100")
    .then(function (respuesta) {
        $(document).ready(function () {
            console.log(respuesta.data)
            /* NAVBAR */
            // Añado al navbar el ul generado con las provincias
            $('#navbar').append(ulNavbar(respuesta));
            // Añado el footer dinamicamente despues de container
            $('#container').after($('<footer>Miguel Ángel Arias Sánchez</footer>'));
            // A partir del evento click en el menu generamos el mapa y el listado de ofertas según provincia
            $("#navbar li").click(function () {
                let provincia = $(this).text();
                // Cade vez que hago click vacio mapa y contenedor
                // Y genero una animacion
                $('#container').addClass('loading');
                $('#container').empty();

                if ($('#map').length === 1) {
                    $('#map').remove();
                };
                // Indico medio segundo en el timer
                // elimino la animacion y cargo todo el contenido
                setTimeout(function () {
                    // Elimimo el footer
                    $('footer').remove();
                    // Elimino la clase loading para eliminar el gif animado
                    $('#container').removeClass('loading');
                    // Accedo a las coordenadas de la provincia clickada
                    // Creo el mapa y lo genero despues del nav
                    crearMapa(liCoordenadas(provincia)[0],liCoordenadas(provincia)[1], respuesta, provincia);
                    // Añado un input buscador al container
                    // Añado el listado al container
                    $('#container').append(listado(respuesta, provincia));
                    $(".cards").before("<label>Buscador: </label><input type='text' id='buscador' class='buscador' />");
                    // Llevar el footer al final del todo
                    $('.cards').after($('<footer>Miguel Ángel Arias Sánchez</footer>'));
                    // Si buscador existe genero un evento
                    if ($('#buscador').length === 1) {
                        /* $('#map').remove(); */
                        // Filtro por el titulo de la oferta
                        $("#buscador").on("keyup", function () {
                            $('footer').remove();
                            let valor = ($(this).val())
                            $('#container').append(buscar(respuesta, provincia, valor));
                            $('.cards').after($('<footer>Miguel Ángel Arias Sánchez</footer>'));
                        });
                    };
                    // Final del timer
                }, 500);
            });
        })
    }).catch(function (error) {
        // Tratamiento a traves de la consola de los posibles errores en el servidor
        if (error.response.status === 404) {
            console.log("Error de recurso no encontrado");
        } else if (error.response.status === 500) {
            console.log("Error del servidor");
        } else {
            console.log("Error de acceso a la api de ofertas de empleo", error)
        }
    })

/* CONEXIÓN CON LA API COORDENADAS PROVINCIAS */
axios.get("https://public.opendatasoft.com/api/records/1.0/search/?dataset=provincias-espanolas&q=&rows=55&sort=provincia&facet=ccaa&facet=provincia")
    .then(function (respuesta2) {
        $(document).ready(function () {
            // A traves del navbar cojo todas las provincias y las meto en un array
            let provincia = $('#navbar li');
            let arrayProvincias = [];
            provincia.each(function () {
                arrayProvincias.push($(this).text());
            });            
            // Con un bucle for recorro el array y accedo a las coordenadas de cada provincia
            // Estas se las asigno a traves del navbar por id
            for (let i = 0; i < arrayProvincias.length; i++) {
                $('#navbar li').eq(i).attr('id', coordenadas(respuesta2, arrayProvincias[i]));
            }            
        })
    }).catch(function (error) {
        // Tratamiento a traves de la consola de los posibles errores en el servidor
        if (error.response.status === 404) {
            console.log("Error de recurso no encontrado en api coordenadas");
        } else if (error.response.status === 500) {
            console.log("Error del servidor en api coordenadas");
        } else {
            console.log("Error de acceso a la api de coordenadas", error)
        }
})

