/* Función para generar el listado inicial de ofertas de empleo según provincia*/
export default function listado (respuesta, provincia){
    // Vaío el contenedor
    $('#container').empty();
    // Creo la variable $cards
    const $cards = $('<div>').addClass('cards');
    // Dentro del container añado el titulo con la provincia clickada y le añado los estilos
    $('#container').append($('<h1>Ofertas de empleo en ' + provincia + '</h1>').css({
        "text-align": "center",
        "padding": "20px",
        "background-color" : "grey",
        "color" : "white",
        "width" : "100%"
    })
    );
    let nResultados = "";
    // En el bucle según la provincia clickada genero la card 
    // de cada oferta de empleo para esa ciudad y conteo la cantidad de resultados
    for (let i = 0; i < respuesta.data.results.length; i++) {
        if (respuesta.data.results[i].provincia === provincia) {
            nResultados ++;
            let card = $('<div>', {
                class: 'card',
                id: 'card'
            });
            card.append('<h2>' + respuesta.data.results[i].titulo + '</h2>');
            card.append('<p>' + respuesta.data.results[i].descripcion + '</p>');
            card.append('<p>' + respuesta.data.results[i].localidad + '</p>');
            card.append('<p>' + respuesta.data.results[i].actualizacionmetadatos + '</p>');
            card.append('<a href="' + respuesta.data.results[i].enlace_al_contenido + '">Enlace</a>');
            $cards.append(card);
        }
    }
    // Añado al container la cantidad de resultado despues del h1
    $('#container').find('h1').after("<p id='nResultados'>Se han encontrado <strong>" + nResultados + " resultados </strong>(No todos los resultados están geolocalizados por la administración)</p>");

    // Devuelvo las cards para luego insertarlas desde app.js
    return $cards;
}