/* MAPA DINAMICO */
export default function crearMapa(latitud1, longitud1, respuesta, provincia) {
    // Si el mapa esta creado, eliminarlo para crear una nueva instancia
    if ($('#map').length === 1) {
        $('#map').remove();
    };
    // Inserto el mapa despues del navbar
    $("#navbar").after("<div class='map' id='map'></div>");

    // Creo el mapa según la documentación de leaflet
    var map = L.map('map').setView([latitud1, longitud1], 8);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Sacar las datos dependiendo de la ciudad
    respuesta.data.results
        .filter(result => result.provincia === provincia && result.posicion.lat !== undefined && result.posicion.lon)
        .map(result => { 
            // Genero un marcador por cada coordenada, despues de haber filtrado previamente las undefined
            let marcador = L.marker([result.posicion.lat, result.posicion.lon], {draggable: true, zIndexOffset: 1000}).addTo(map)
            
                .bindPopup(
                    // En el popup añado la oferta de empleo con titulo y descripción
                    '<u><strong>' + result.titulo + '<br></strong></u><br><strong>Descripción:</strong>' + result.descripcion
                )
                .openPopup();
        });
}