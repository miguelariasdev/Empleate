/* función para generar el navbar según las provincias a traves de la API*/
export default function ulNavbar (respuesta){
    // Capturo en un array todas las provincias
    let arrayProvincias = ["Valladolid", "Ávila", "Segovia", "Palencia", "Burgos", "León", "Salamanca", "Zamora", "Soria"];
/*     for (let i = 0; i < respuesta.data.facet_groups[0].facets.length; i++) {
        arrayProvincias.push(respuesta.data.facet_groups[0].facets[i].name);
    } */
    // Ordeno el array por orden alfabetico
    // Hay acentos, asi que uso localCompare para poder ordenarlo correctamente
    arrayProvincias.sort((a,b) => a.localeCompare(b));
    // Quito el apartado "Otra" al final del array
    arrayProvincias.splice(arrayProvincias.indexOf("Otra"), 1)[0];
    // Accedo al nav y le añado un ul
    let ul = $("<ul></ul>");
    // Añado al ul las provincias del array en li
    for (let i = 0; i < arrayProvincias.length; i++) {
        $(ul).append("<li><a>" + arrayProvincias[i] + "</a></li>");                
    }
    return $(ul);
}