function mostrarInput(element){
    element.parentNode.classList.add("activo");
}

function ocultarInput(element) {
    element.parentNode.classList.remove("activo");
}

let solicitudesPorPagina = 15;

let pagina = 1;

let solicitudes = [];

const contenedorPendientes = document.getElementById("tabla-solicitudes-pendientes");
const contenedorProceso = document.getElementById("tabla-solicitudes-proceso");
const contenedorFinalizadas = document.getElementById("tabla-solicitudes-finalizadas");
const contenedorVentas = document.getElementById("tabla-ventas");


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
    let ultimoBoton = document.querySelector(".paginador > button:last-child")
    ultimoBoton.innerText = ultimaPagina;
    ultimoBoton.onclick = () => cambiarPagina(ultimaPagina);

    let inputPagina = document.querySelector(".paginador input");
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

    let celdaBoton = document.createElement("td");
    let botonVerVenta = document.createElement("button");
    botonVerVenta.textContent = "VER VENTA";
    celdaBoton.appendChild(botonVerVenta);

    fila.append(celdaId, celdaEmail, celdaNombre, celdaBoton);

    return fila;
}

//------------------------------------------------------------
/*
Función cambiarPagina():
*/
//------------------------------------------------------------

function cambiarPagina(numeroPagina) {
    pagina = numeroPagina;
    contenedorPendientes.innerHTML = "";
    contenedorProceso.innerHTML = "";
    contenedorFinalizadas.innerHTML = "";
    contenedorVentas.innerHTML = "";

    let inicio = (pagina - 1) * solicitudesPorPagina;
    for (let i = inicio; i < inicio + solicitudesPorPagina; i++) {
        let solicitud = solicitudes[i];
        if(solicitud) {
            contenedorPendientes.appendChild(crearFilaSolicitud(solicitud));
            contenedorProceso.appendChild(crearFilaSolicitud(solicitud));
            contenedorFinalizadas.appendChild(crearFilaSolicitud(solicitud));
            contenedorVentas.appendChild(crearFilaSolicitud(solicitud));
        }
    }
    let inputPagina = document.querySelector(".paginador input");
    inputPagina.value = pagina;
}

//------------------------------------------------------------
/*
Función mostrarSolicitudes():
*/
//------------------------------------------------------------
function mostrarSolicitudes(){
    // Cambiar la clase "activo" del botón correspondiente
    document.getElementById("boton-solicitudes").classList.add("activo");
    document.getElementById("boton-ventas").classList.remove("activo");

    // Mostrar la sección de solicitudes y ocultar la sección de ventas
    document.getElementById("solicitudes").style.display = "block";
    document.getElementById("ventas").style.display = "none";
    document.getElementById("ver-venta").style.display = "none";
}

//------------------------------------------------------------
/*
Función mostrarVentas():
*/
//------------------------------------------------------------
function mostrarVentas() {
    // Cambiar la clase "activo" del botón correspondiente
    document.getElementById("boton-ventas").classList.add("activo");
    document.getElementById("boton-solicitudes").classList.remove("activo");

    // Mostrar la sección de ventas y ocultar la sección de solicitudes
    document.getElementById("ventas").style.display = "block";
    document.getElementById("solicitudes").style.display = "none";
}

//------------------------------------------------------------
/*
Función mostrarSolicitudesPendientes():
*/
//------------------------------------------------------------
function mostrarSolicitudesPendientes(){
    document.getElementById("boton-solicitudes-pendientes").classList.add("activo");
    document.getElementById("boton-solicitudes-proceso").classList.remove("activo");
    document.getElementById("boton-solicitudes-finalizadas").classList.remove("activo");

    document.getElementById("solicitudes-pendientes").style.display = "block";
    document.getElementById("solicitudes-en-proceso").style.display = "none";
    document.getElementById("solicitudes-finalizadas").style.display = "none";
}

//------------------------------------------------------------
/*
Función mostrarSolicitudesEnProceso():
*/
//------------------------------------------------------------
function mostrarSolicitudesEnProceso(){
    document.getElementById("boton-solicitudes-proceso").classList.add("activo");
    document.getElementById("boton-solicitudes-pendientes").classList.remove("activo");
    document.getElementById("boton-solicitudes-finalizadas").classList.remove("activo");

    document.getElementById("solicitudes-en-proceso").style.display = "block";
    document.getElementById("solicitudes-pendientes").style.display = "none";
    document.getElementById("solicitudes-finalizadas").style.display = "none";
}

//------------------------------------------------------------
/*
Función mostrarSolicitudesFinalizadas():
*/
//------------------------------------------------------------
function mostrarSolicitudesFinalizadas(){
    document.getElementById("boton-solicitudes-finalizadas").classList.add("activo");
    document.getElementById("boton-solicitudes-proceso").classList.remove("activo");
    document.getElementById("boton-solicitudes-pendientes").classList.remove("activo");

    document.getElementById("solicitudes-finalizadas").style.display = "block";
    document.getElementById("solicitudes-en-proceso").style.display = "none";
    document.getElementById("solicitudes-pendientes").style.display = "none";
}
//------------------------------------------------------------
/*
Función buscarSolicitudesPendientes():
*/
//------------------------------------------------------------
function buscarSolicitudesPendientes() {
    // Obtenemos el valor del input de búsqueda
    var input = document.getElementById("buscador-pendientes").value.toUpperCase();

    // Obtenemos la tabla
    var tabla = document.getElementById("tabla-pendientes");

    // Obtenemos todas las filas de la tabla
    var filas = tabla.getElementsByTagName("tr");

    // Recorremos todas las filas de la tabla
    for (var i = 0; i < filas.length; i++) {
        // Obtenemos todas las celdas de la fila actual
        var celdas = filas[i].getElementsByTagName("td");
        var mostrarFila = false;

        // Recorremos todas las celdas de la fila actual
        for (var j = 0; j < celdas.length; j++) {
            var textoCelda = celdas[j].textContent.toUpperCase();
            if (textoCelda.indexOf(input) > -1) {
                // Si encontramos la cadena de búsqueda en una celda, mostramos la fila
                mostrarFila = true;
                break;
            }
        }

        // Mostramos u ocultamos la fila según corresponda
        if (mostrarFila) {
            filas[i].style.display = "";
        } else {
            filas[i].style.display = "none";
        }
    }
}
//------------------------------------------------------------
/*
Función buscarSolicitudesEnProceso():
*/
//------------------------------------------------------------
function buscarSolicitudesEnProceso() {
    // Obtenemos el valor del input de búsqueda
    var input = document.getElementById("buscador-proceso").value.toUpperCase();

    // Obtenemos la tabla
    var tabla = document.getElementById("tabla-proceso");

    // Obtenemos todas las filas de la tabla
    var filas = tabla.getElementsByTagName("tr");

    // Recorremos todas las filas de la tabla
    for (var i = 0; i < filas.length; i++) {
        // Obtenemos todas las celdas de la fila actual
        var celdas = filas[i].getElementsByTagName("td");
        var mostrarFila = false;

        // Recorremos todas las celdas de la fila actual
        for (var j = 0; j < celdas.length; j++) {
            var textoCelda = celdas[j].textContent.toUpperCase();
            if (textoCelda.indexOf(input) > -1) {
                // Si encontramos la cadena de búsqueda en una celda, mostramos la fila
                mostrarFila = true;
                break;
            }
        }

        // Mostramos u ocultamos la fila según corresponda
        if (mostrarFila) {
            filas[i].style.display = "";
        } else {
            filas[i].style.display = "none";
        }
    }
}

//------------------------------------------------------------
/*
Función buscarSolicitudesFinalizadas():
*/
//------------------------------------------------------------
function buscarSolicitudesFinalizadas() {
    // Obtenemos el valor del input de búsqueda
    var input = document.getElementById("buscador-finalizadas").value.toUpperCase();

    // Obtenemos la tabla
    var tabla = document.getElementById("tabla-finalizadas");

    // Obtenemos todas las filas de la tabla
    var filas = tabla.getElementsByTagName("tr");

    // Recorremos todas las filas de la tabla
    for (var i = 0; i < filas.length; i++) {
        // Obtenemos todas las celdas de la fila actual
        var celdas = filas[i].getElementsByTagName("td");
        var mostrarFila = false;

        // Recorremos todas las celdas de la fila actual
        for (var j = 0; j < celdas.length; j++) {
            var textoCelda = celdas[j].textContent.toUpperCase();
            if (textoCelda.indexOf(input) > -1) {
                // Si encontramos la cadena de búsqueda en una celda, mostramos la fila
                mostrarFila = true;
                break;
            }
        }

        // Mostramos u ocultamos la fila según corresponda
        if (mostrarFila) {
            filas[i].style.display = "";
        } else {
            filas[i].style.display = "none";
        }
    }
}



