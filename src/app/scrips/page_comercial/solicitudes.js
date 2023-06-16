//......................................................................................................................
/*                                            SECCIÓN SOLICITUDES COMERCIAL                                           */
//......................................................................................................................
//......................................................................................................................
//......................................................................................................................
//DECLARACIÓN DE VARIABLES:
//Secciones:
const seccionSolicitudes = document.getElementById("solicitudes");
let seccionPendientes = document.getElementById('solicitudes-pendientes');
let seccionProceso = document.getElementById('solicitudes-en-proceso');
let seccionFinalizadas = document.getElementById('solicitudes-finalizadas');
//Navegación por la sección:
let botonSolicitudesPendientes = document.getElementById('boton-solicitudes-pendientes');
let botonSolicitudesProceso = document.getElementById('boton-solicitudes-proceso');
let botonSolicitudesFinalizadas = document.getElementById('boton-solicitudes-finalizadas');
//Tablas:
const tablaPendientes = document.getElementById("tabla-solicitudes-pendientes");
const tablaProceso = document.getElementById("tabla-solicitudes-proceso");
const tablaFinalizadas = document.getElementById("tabla-solicitudes-finalizadas");
const tablaVentas = document.getElementById("tabla-ventas");
//Botones:
const verVenta = document.getElementById("ver-venta");
const verMas = document.getElementById("ver-mas");

//......................................................................................................................
//......................................................................................................................
//.......................................................
/*
          BOTÓN SOLICITUDES PENDIENTES
*/
//.......................................................
botonSolicitudesPendientes.addEventListener('click', function (){
    escribirTablaPendientes();
    seccionPendientes.style.display = "block";
    seccionProceso.style.display = "none";
    seccionFinalizadas.style.display = "none";
});
//......................................................................................................................
//......................................................................................................................
//.......................................................
/*
          BOTÓN SOLICITUDES EN PROCESO
*/
//.......................................................
botonSolicitudesProceso.addEventListener('click', function (){
    escribirTablaProceso();
    seccionProceso.style.display = "block";
    seccionPendientes.style.display = "none";
    seccionFinalizadas.style.display = "none";
});
//......................................................................................................................
//......................................................................................................................
//.......................................................
/*
          BOTÓN SOLICITUDES FINALIZADAS
*/
//.......................................................
botonSolicitudesFinalizadas.addEventListener('click', function (){
    escribirTablaFinalizadas();
    seccionFinalizadas.style.display = "block";
    seccionPendientes.style.display = "none";
    seccionProceso.style.display = "none";

});

//......................................................................................................................
//......................................................................................................................
//.......................................................
/*
    estado --> getSolicitudesPorEstado() --> datos
                                                       _____datos_____
                                                       asunto: N
                                                       email: txt
                                                       estado_consulta: N
                                                       id_consulta: N
                                                       id_usuario: N
                                                       mensaje: txt
                                                       _______________
*/
//.......................................................
async function getSolicitudesPorEstado(estado){

    const respuesta = await fetch('../../../api/solicitudes/' + '?estado=' + estado);
    if(respuesta.ok){
        const datos = await respuesta.json();
        console.log(datos);
        return datos;
    }
}
//......................................................................................................................
//......................................................................................................................
//.......................................................
/*
                escribirTablaPendientes()
*/
//.......................................................
async function escribirTablaPendientes() {
    let datos = await getSolicitudesPorEstado(1);

    tablaPendientes.innerHTML = "";
    datos.forEach(function (solicitud) {
        tablaPendientes.innerHTML +=
            `<tr>
            <td>${solicitud.email}</td>
            <td>${solicitud.asunto_formulario_contacto}</td>
            <td>fecha</td>
            <td><button>VER MÁS</button></td> 
            </tr>`
    });
}
//......................................................................................................................
//......................................................................................................................
//.......................................................
/*
                escribirTablaProceso()
*/
//.......................................................
async function escribirTablaProceso() {
    let datos = await getSolicitudesPorEstado(2);

    tablaProceso.innerHTML = "";
    datos.forEach(function (solicitud) {
        tablaProceso.innerHTML +=
            `<tr>
            <td>${solicitud.email}</td>
            <td>${solicitud.asunto_formulario_contacto}</td>
            <td>fecha</td>
            <td><button>VER MÁS</button></td> 
            </tr>`
    });
}
//......................................................................................................................
//......................................................................................................................
//.......................................................
/*
                escribirTablaFinalizadas()
*/
//.......................................................
async function escribirTablaFinalizadas() {
    let datos = await getSolicitudesPorEstado(3);

    tablaFinalizadas.innerHTML = "";
    datos.forEach(function (solicitud) {
        tablaFinalizadas.innerHTML +=
            `<tr>
            <td>${solicitud.email}</td>
            <td>${solicitud.asunto_formulario_contacto}</td>
            <td>fecha</td>
            <td><button>VER MÁS</button></td> 
            </tr>`
    });
}

//......................................................................................................................
//......................................................................................................................
//LLAMADA DE FUNCIONES
escribirTablaPendientes(); //la llamamos aquí para que se carguen los datos cuando se cargue la página.