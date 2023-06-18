//......................................................................................................................
/*                                            SECCIÓN SOLICITUDES COMERCIAL                                           */
//......................................................................................................................
//......................................................................................................................
//......................................................................................................................
//DECLARACIÓN DE VARIABLES:
//Secciones:
let seccionSolicitudes = document.getElementById('solicitudes');
let seccionVentas = document.getElementById('ventas');
let seccionPendientes = document.getElementById('solicitudes-pendientes');
let seccionProceso = document.getElementById('solicitudes-en-proceso');
let seccionFinalizadas = document.getElementById('solicitudes-finalizadas');
const seccionVerMas = document.getElementById("ver-mas");
//Navegación por la sección:
let botonSolicitudesPendientes = document.getElementById('boton-solicitudes-pendientes');
let botonSolicitudesProceso = document.getElementById('boton-solicitudes-proceso');
let botonSolicitudesFinalizadas = document.getElementById('boton-solicitudes-finalizadas');
let botonSolicitudes = document.getElementById('boton-solicitudes');
let botonVentas = document.getElementById('boton-ventas');
//Tablas:
const tablaPendientes = document.getElementById("tabla-solicitudes-pendientes");
const tablaProceso = document.getElementById("tabla-solicitudes-proceso");
const tablaFinalizadas = document.getElementById("tabla-solicitudes-finalizadas");
//Ver más:
let verMasNombre = document.getElementById('nombre-solicitud');
let verMasApellido = document.getElementById('apellidos-solicitud');
let verMasEmail = document.getElementById('email-solicitud');
let verMasAsunto = document.getElementById('asunto-solicitud');
let verMasMensaje = document.getElementById('mensaje-solicitud');
let botonPasarPte = document.getElementById('boton-pasar-a-pendientes');
let botonPasarProceso = document.getElementById('boton-pasar-a-proceso');
let botonPasarFin = document.getElementById('boton-pasar-a-finalizada');
let botonVolverASolicitudes = document.getElementById('boton-volver-a-lista-solicitudes');
//......................................................................................................................
//......................................................................................................................
//.......................................................
/*
          BOTÓN SOLICITUDES
*/
//.......................................................
botonSolicitudes.addEventListener('click', function(){
    seccionSolicitudes.style.display = "block";
    seccionVentas.style.display = "none";
})
//......................................................................................................................
//......................................................................................................................
//.......................................................
/*
          BOTÓN VENTAS
*/
//.......................................................
botonVentas.addEventListener('click', function(){
    seccionSolicitudes.style.display = "none";
    seccionVentas.style.display = "block";
})

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
async function getSolicitudesPorEstado(estado, pagina, senyal){

    const respuesta = await fetch('../../../api/solicitudes/'
        +'?cantidad=' + 10
        + '&estado=' + estado
        + '&senyal=' + senyal
        + '&pagina=' + pagina);

    if(respuesta.ok){
        const datos = await respuesta.json();
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
            <td><button onclick='verMasDeSolicitud(${JSON.stringify(solicitud)})'>VER MÁS</button></td> 
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
            <td><button onclick='verMasDeSolicitud(${JSON.stringify(solicitud)})'>VER MÁS</button></td> 
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
    seccionSolicitudes.style.display = "none";
    seccionVerMas.style.display = "block";
    seccionProceso.style.display = "none";
    seccionPendientes.style.display = "none";
    seccionFinalizadas.style.display = "none";

    let datos = await getDatosCliente(solicitud.id_usuario);
    console.log(solicitud);

    verMasNombre.innerText = datos[0].nombre;
    verMasApellido.innerText = datos[0].apellidos;
    verMasEmail.innerText = solicitud.email;
    verMasAsunto.innerText = solicitud.asunto_formulario_contacto;
    verMasMensaje.innerText = solicitud.mensaje;

    let estado = parseInt(solicitud.estado_consulta);

    //Botón volver:
    botonVolverASolicitudes.addEventListener('click', function(){
        if(estado === 1) {
            seccionSolicitudes.style.display = "block";
            seccionVerMas.style.display = "none";
            seccionPendientes.style.display = "block";
            seccionProceso.style.display = "none";
            seccionFinalizadas.style.display = "none";
        }
        else if(estado === 2){
            seccionSolicitudes.style.display = "block";
            seccionVerMas.style.display = "none";
            seccionProceso.style.display = "block";
            seccionPendientes.style.display = "none";
            seccionFinalizadas.style.display = "none";

        }
        else if(estado === 3){
            seccionSolicitudes.style.display = "block";
            seccionVerMas.style.display = "none";
            seccionFinalizadas.style.display = "block";
            seccionProceso.style.display = "none";
            seccionPendientes.style.display = "none";
        }
    });

    //Si la solicitud ya es pendiente, ocultaremos el botón de pendiente:
    if(estado === 1){
        botonPasarPte.style.display = "none";
        botonPasarProceso.style.display = "block";
        botonPasarFin.style.display = "block";
    }
    else if(estado === 2){
        botonPasarProceso.style.display = "none";
        botonPasarPte.style.display = "block";
        botonPasarFin.style.display = "block";
    }
    else if(estado === 3){
        botonPasarFin.style.display = "none";
        botonPasarProceso.style.display = "block";
        botonPasarPte.style.display = "block";
    }


    //Boton pasar a pendiente:
    botonPasarPte.addEventListener('click', async function(){
        let datos = {
            estado : 1
        }

        await fetch('../../../api/solicitudes/' + solicitud.id_consulta , {
            method : 'put',
            body: JSON.stringify(datos)
        });
    });
    //Boton pasar a en proceso:
    botonPasarProceso.addEventListener('click', async function(){
        let datos = {
            estado : 2
        }

        await fetch('../../../api/solicitudes/' + solicitud.id_consulta , {
            method : 'put',
            body: JSON.stringify(datos)
        });
    });
    //Boton pasar a finalizadas:
    botonPasarFin.addEventListener('click', async function(){
        let datos = {
            estado : 3
        }

        await fetch('../../../api/solicitudes/' + solicitud.id_consulta , {
            method : 'put',
            body: JSON.stringify(datos)
        });
    });




}


//......................................................................................................................
//......................................................................................................................
//LLAMADA DE FUNCIONES
escribirTablaPendientes(); //la llamamos aquí para que se carguen los datos cuando se cargue la página.