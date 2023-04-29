function mostrarInput(element){
    element.parentNode.classList.add("activo");
}

function ocultarInput(element) {
    element.parentNode.classList.remove("activo");
}

let solicitudesPorPagina = 15;

let pagina = 1;

let solicitudes = [];

const contenedor = document.getElementById("tabla-solicitudes-pendientes");

//------------------------------------------------------------
/*
Función anonima para obtener datos:
*/
//------------------------------------------------------------


(async () => {
    const respuesta = await fetch("../../../api/cien_datos_para_tabla.json");
    const data = await respuesta.json();
    solicitudes = data;

    let ultimaPagina = Math.ceil(solicitudes.length / solicitudesPorPagina);
    let ultimoBoton = document.querySelector("#paginador > button:last-child")
    ultimoBoton.innerText = ultimaPagina;
    ultimoBoton.onclick = () => cambiarPagina(ultimaPagina);

    let inputPagina = document.querySelector("#paginador input");
    inputPagina.max = ultimaPagina;
    inputPagina.min = 1;

    cambiarPagina(1);
})();

//------------------------------------------------------------
/*
Función crearFilaSolicitud()
*/
//------------------------------------------------------------
function crearFilaSolicitud(solicitud) {
    let fila = document.createElement("tr");

    let celdaId = document.createElement("td");
    celdaId.textContent = solicitud.id;

    let celdaEmail = document.createElement("td");
    celdaEmail.textContent = solicitud.email;

    let celdaNombre = document.createElement("td");
    celdaNombre.textContent = solicitud.nombre;

    fila.append(celdaId, celdaEmail, celdaNombre);

    return fila;
}

//------------------------------------------------------------
/*
Función cambiarPagina():
*/
//------------------------------------------------------------

function cambiarPagina(numeroPagina) {
    pagina = numeroPagina;
    contenedor.innerHTML = "";
    let inicio = (pagina - 1) * solicitudesPorPagina;
    for (let i = inicio; i < inicio + solicitudesPorPagina; i++) {
        let solicitud = solicitudes[i];
        if(solicitud) contenedor.appendChild(crearFilaSolicitud(solicitud)); //conversión implícita de tipos (ventas no es un booleano, pero aquí, si venta
        //contiene un objeto, considera que es verdadero. Si es undefined (variable que no tiene valor asignado), lo considera falso.
    }
    let inputPagina = document.querySelector("#paginador input");
    inputPagina.value = pagina;
}
