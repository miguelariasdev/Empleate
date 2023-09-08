/*Funcion  para buscar dentro de las ofertas de empleo*/
export default function buscar(respuesta, provincia, valor) {
    // Elimino el contenedor de cards de empleo
    $(".cards").remove();
    // Genero uno nuevo
    const $cards = $('<div>').addClass('cards');
    let nResultados = "";
    console.log(respuesta.data)
    // A traves del bucle for accedo a los datos de la provincia que el usuario haya hecho click
    for (let i = 0; i < respuesta.data.results.length; i++) {
        if (respuesta.data.results[i].provincia === provincia) {
            // Mediante match compruebo si hay alguna coincidencia en el titulo de la oferta de empleo
            // Mediante normalize dejo la cadena sin acentos y con RegExp las mayusculas a minusculas
            if (respuesta.data.results[i].titulo.normalize('NFD').replace(/[\u0300-\u036f]/g, "").match(new RegExp(valor, "iu"))) {
                // Conteo los resultados y genero las cards
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
    }
    // Aviso con el nuevo numero de resultados al hacer la búsqueda
    $('#nResultados').html("Se han encontrado <strong>" + nResultados + " resultados </strong>(No todos los resultados están geolocalizados por la administración)");
    // Devuelvo las cards del resultado de la búsqueda
    return $cards;
}