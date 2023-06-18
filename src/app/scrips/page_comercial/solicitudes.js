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
let verMasFecha = document.getElementById('fecha-solicitud')
let verMasNombre = document.getElementById('nombre-solicitud');
let verMasApellido = document.getElementById('apellidos-solicitud');
let verMasEmail = document.getElementById('email-solicitud');
let verMasAsunto = document.getElementById('asunto-solicitud');
let verMasMensaje = document.getElementById('mensaje-solicitud');
let botonPasarPte = document.getElementById('boton-pasar-a-pendientes');
let botonPasarProceso = document.getElementById('boton-pasar-a-proceso');
let botonPasarFin = document.getElementById('boton-pasar-a-finalizada');
let botonVolverASolicitudes = document.getElementById('boton-volver-a-lista-solicitudes');
//Paginador:
let paginadorPendientes = document.getElementById('paginadorPtes');
let paginadorProceso = document.getElementById('paginadorProceso');
let paginadorFinalizadas = document.getElementById('paginadorFinalizadas');

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
    botonSolicitudesPendientes.click();
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
    getPaginadorPendientes(1);
    escribirTablaPendientes(1);
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
    getPaginadorProceso(1);
    escribirTablaProceso(1);
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
    getPaginadorFinalizadas(1);
    escribirTablaFinalizadas(1);
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
                getPaginadorPendientes()

*/
//.......................................................
async function getPaginadorPendientes(pagina){
    let datos = await getSolicitudesPorEstado(1,pagina,2)
    console.log(datos);

    for (let i = 1; i <= datos.paginas-1; i++) {
        const opt = document.createElement('option');
        opt.value = i;
        opt.innerText = i;
        paginadorPendientes.appendChild(opt);
    }

}
paginadorPendientes.addEventListener('change', async ()=>{
    escribirTablaPendientes(paginadorPendientes.value);
    console.log(paginadorPendientes.value);
})
//......................................................................................................................
//......................................................................................................................
//.......................................................
/*
                getPaginadorProceso()

*/
//.......................................................
async function getPaginadorProceso(pagina){
    let datos = await getSolicitudesPorEstado(2,pagina,2)

    for (let i = 1; i <= datos.paginas-1; i++) {
        const opt = document.createElement('option');
        opt.value = i;
        opt.innerText = i;
        paginadorProceso.appendChild(opt);
    }
}
paginadorProceso.addEventListener('change', async ()=>{
    escribirTablaProceso(paginadorProceso.value);
})

//......................................................................................................................
//......................................................................................................................
//.......................................................
/*
                getPaginadorPendientes()

*/
//.......................................................
async function getPaginadorFinalizadas(pagina){
    let datos = await getSolicitudesPorEstado(3,pagina,2)

    for (let i = 1; i <= datos.paginas-1; i++) {
        const opt = document.createElement('option');
        opt.value = i;
        opt.innerText = i;
        paginadorFinalizadas.appendChild(opt);
    }
    if(paginadorFinalizadas.value === 1){
        paginadorFinalizadas.style.display = "none";
    }
}
paginadorFinalizadas.addEventListener('change', async ()=>{
    escribirTablaFinalizadas(paginadorFinalizadas.value);
})
//......................................................................................................................
//......................................................................................................................
//.......................................................
/*
         fecha:txt --> formatearFechaSolicitud() --> txt
*/
//.......................................................
function formatearFechaSolicitud(fechaMal) {
    let partes = fechaMal.split("-");
    var anio = partes[0];
    var mes = partes[1];
    var dia = partes[2];

    var fechaBien = dia + "/" + mes + "/" + anio;
    return fechaBien;
}

//......................................................................................................................
//......................................................................................................................
//.......................................................
/*
                escribirTablaPendientes()
*/
//.......................................................
async function escribirTablaPendientes(pagina) {
    let datos = await getSolicitudesPorEstado(1,pagina,3);
    console.log(datos);

    tablaPendientes.innerHTML = "";
    datos.forEach(function (solicitud) {
        let fecha=formatearFechaSolicitud(solicitud.fecha);
        tablaPendientes.innerHTML +=
            `<tr>
            <td>${solicitud.email}</td>
            <td>${solicitud.asunto_formulario_contacto}</td>
            <td>${fecha}</td>
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
async function escribirTablaProceso(pagina) {
    let datos = await getSolicitudesPorEstado(2, pagina, 3);

    tablaProceso.innerHTML = "";
    datos.forEach(function (solicitud) {
        let fecha=formatearFechaSolicitud(solicitud.fecha);
        tablaProceso.innerHTML +=
            `<tr>
            <td>${solicitud.email}</td>
            <td>${solicitud.asunto_formulario_contacto}</td>
            <td>${fecha}</td>
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
async function escribirTablaFinalizadas(pagina) {
    let datos = await getSolicitudesPorEstado(3, pagina, 3);

    tablaFinalizadas.innerHTML = "";
    datos.forEach(function (solicitud) {
        let fecha=formatearFechaSolicitud(solicitud.fecha);
        tablaFinalizadas.innerHTML +=
            `<tr>
            <td>${solicitud.email}</td>
            <td>${solicitud.asunto_formulario_contacto}</td>
            <td>${fecha}</td>
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

    verMasFecha.innerText = formatearFecha(solicitud.fecha);
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
botonSolicitudesPendientes.click();