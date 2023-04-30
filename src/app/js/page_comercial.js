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
    document.getElementById("boton-solicitudes").classList.add("activo");
    document.getElementById("boton-ventas").classList.remove("activo");

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




/*
function activarElemento(elementos, posicion) {
    for (let i = 0; i < elementos.length; i++) {
        if (i === posicion - 1) {
            elementos[i].classList.add("activo");
        } else {
            elementos[i].classList.remove("activo");
        }
    }
}

function cambiarTab(tab) {
    console.log("Tab:", tab);
    let botones = document.querySelectorAll("button");
    activarElemento(botones, tab);
    let articulos = document.getElementById("solicitudes");
    activarElemento(articulos, tab);
}
*/