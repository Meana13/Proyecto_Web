//......................................................................................................................
/*                                            SECCIÓN SOLICITUDES COMERCIAL                                           */
//......................................................................................................................
//......................................................................................................................
//......................................................................................................................
//DECLARACIÓN DE VARIABLES:
//Secciones:
let seccionPendientes = document.getElementById('solicitudes-pendientes');
let seccionProceso = document.getElementById('solicitudes-en-proceso');
let seccionFinalizadas = document.getElementById('solicitudes-finalizadas');
const seccionVerMas = document.getElementById("ver-mas");
//Navegación por la sección:
let botonSolicitudesPendientes = document.getElementById('boton-solicitudes-pendientes');
let botonSolicitudesProceso = document.getElementById('boton-solicitudes-proceso');
let botonSolicitudesFinalizadas = document.getElementById('boton-solicitudes-finalizadas');
//Tablas:
const tablaPendientes = document.getElementById("tabla-solicitudes-pendientes");
const tablaProceso = document.getElementById("tabla-solicitudes-proceso");
const tablaFinalizadas = document.getElementById("tabla-solicitudes-finalizadas");



//......................................................................................................................
//......................................................................................................................
//.......................................................
/*
          BOTÓN SOLICITUDES PENDIENTES
*/
//.......................................................
botonSolicitudesPendientes.addEventListener('click', function (){
    escribirTablaPendientes();
    botonSolicitudesPendientes.classList.add('activo');
    botonSolicitudesProceso.classList.remove('activo');
    botonSolicitudesFinalizadas.classList.remove('activo');

    seccionPendientes.style.display = "block";
    seccionProceso.style.display = "none";
    seccionFinalizadas.style.display = "none";
    seccionVerMas.style.display ="none";
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
    botonSolicitudesProceso.classList.add('activo');
    botonSolicitudesPendientes.classList.remove('activo');
    botonSolicitudesFinalizadas.classList.remove('activo');

    seccionProceso.style.display = "block";
    seccionPendientes.style.display = "none";
    seccionFinalizadas.style.display = "none";
    seccionVerMas.style.display = "none";
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
    botonSolicitudesFinalizadas.classList.add("activo");
    botonSolicitudesProceso.classList.remove("activo");
    botonSolicitudesPendientes.classList.remove("activo");

    seccionFinalizadas.style.display = "block";
    seccionPendientes.style.display = "none";
    seccionProceso.style.display = "none";
    seccionVerMas.style.display = "none";
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
   idUsuario --> getDatosCliente() --> datos
                                            ____datos____
                                            id_usuario: N
                                            id_cliente: N
                                            nombre: txt
                                            apellidos: txt
                                            email: txt
                                            direccion: txt
                                            _____________
*/
//.......................................................
async function getDatosCliente(idUsuario){

    const respuesta = await fetch('../../../api/clientes/' + '?idUsuario=' + idUsuario);
    if(respuesta.ok){
        const datos = await respuesta.json();
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
            <td><button onclick='verMasDeSolicitud(${JSON.stringify(solicitud)})'>VER MÁS</button></td> 
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
//.......................................................
/*
        solicitud --> verMasDeSolicitud()
*/
//.......................................................
async function verMasDeSolicitud(solicitud) {
    seccionVerMas.style.display = "block";
    seccionProceso.style.display = "none";
    seccionPendientes.style.display = "none";
    seccionFinalizadas.style.display = "none";

    let datos = await getDatosCliente(solicitud.id_usuario);
    console.log(datos);
    console.log(solicitud);
}

//......................................................................................................................
//......................................................................................................................
//LLAMADA DE FUNCIONES
escribirTablaPendientes(); //la llamamos aquí para que se carguen los datos cuando se cargue la página.