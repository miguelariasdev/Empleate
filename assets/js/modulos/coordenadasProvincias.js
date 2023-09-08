/* Con esta función genero las coordenadas por provincia */
export function coordenadas(respuesta2, provincia) {
    for (let i = 0; i < respuesta2.data.records.length; i++) {
        if (respuesta2.data.records[i].fields.provincia === provincia) {
            return respuesta2.data.records[i].fields.geo_point_2d;
        }
    }
}
/* Accedeo al li donde añadi las coordenadas según provincia
y la convierto en un array para poder insertarlo en el mapa que creare
*/
export function liCoordenadas (provincia) {
    let coordenada = "";
    for (let i = 0; i < $('#navbar li').length; i++) {
        if($('#navbar li').eq(i).text() === provincia){
            coordenada = ($('#navbar li').eq(i).attr('id'));
        }
    }
    let arrayCoordenadas = coordenada.split(',');
    return arrayCoordenadas;
}