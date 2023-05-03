async function obtenerDatos(url, callback){
    let archivo = await fetch (url);
    let datos = await archivo.json();
    callback(datos);
}
function mostrarInput(element){
    element.parentNode.classList.add("activo");
}

function ocultarInput(element) {
    element.parentNode.classList.remove("activo");
}

let filasPorPagina = 15;

let pagina = 1;

let solicitudesPendientes = [];
let solicitudesProceso = [];
let solicitudesFinalizadas = [];
let ventas = [];

const contenedorPendientes = document.getElementById("tabla-solicitudes-pendientes");
const contenedorProceso = document.getElementById("tabla-solicitudes-proceso");
const contenedorFinalizadas = document.getElementById("tabla-solicitudes-finalizadas");
const contenedorVentas = document.getElementById("tabla-ventas");
const seccionVerVenta = document.getElementById("ver-venta");
const seccionVerMas = document.getElementById("ver-mas");
const seccionSolicitudes = document.getElementById("solicitudes");


function prePaginadorPendientes(){
    obtenerDatos("../../../api/200_datos_nombre_apellidos_email.json", (datos)=>{

        solicitudesPendientes = datos;

        let ultimaPagina = Math.ceil(solicitudesPendientes.length / filasPorPagina);
        let ultimoBoton = document.querySelector("#paginadorPendientes > button:last-child")
        ultimoBoton.innerText = ultimaPagina;
        ultimoBoton.onclick = () => cambiarPaginaPaginadorPendientes(ultimaPagina);

        let inputPagina = document.querySelector("#paginadorPendientes input");
        inputPagina.max = ultimaPagina;
        inputPagina.min = 1;

        cambiarPaginaPaginadorPendientes(1);

    })
}

prePaginadorPendientes();

function crearFilaSolicitudPendiente(solicitud) {
    let fila = document.createElement('tr');

    let celdaNombre = document.createElement('td');
    celdaNombre.textContent = solicitud.nombre;

    let celdaApellidos = document.createElement('td');
    celdaApellidos.textContent = solicitud.apellidos;

    let celdaEmail = document.createElement('td');
    celdaEmail.textContent = solicitud.email;

    let celdaBoton = document.createElement("td");
    let botonVerSolicitud = document.createElement("button");
    botonVerSolicitud.textContent = "VER MÁS";
    celdaBoton.appendChild(botonVerSolicitud);


    fila.append(celdaNombre, celdaApellidos, celdaEmail, celdaBoton);

    contenedorPendientes.addEventListener("click",(event)=>{
        if(event.target.tagName === "BUTTON"){
            const filaBoton = event.target.parentNode.parentNode;

            llenarVerMas(filaBoton);

            seccionSolicitudes.style.display = "none";
            seccionVerMas.style.display = "block";

            document.getElementById("boton-volver-a-lista-solicitudes").onclick= ()=>{
                volverAListaSolicitudes("boton-volver-a-lista-solicitudes","solicitudes","ver-mas");
            }
        }
    });

    function llenarVerMas(filaBoton){
        const nombre = filaBoton.cells[0].textContent;
        const apellidos = filaBoton.cells[1].textContent;
        const email = filaBoton.cells[2].textContent;
        const direccion = "Dirección de ejemplo"; // Reemplazar con la dirección correspondiente

        const nombreSpan = seccionVerMas.querySelector("#nombre-solicitud");
        const apellidosSpan = seccionVerMas.querySelector("#apellidos-solicitud");
        const emailSpan = seccionVerMas.querySelector("#email-solicitud");
        const direccionSpan = seccionVerMas.querySelector("#direccion-solicitud");

        apellidosSpan.textContent = apellidos;
        emailSpan.textContent = email;
        nombreSpan.textContent = nombre;
        direccionSpan.textContent = direccion;

    }


    return fila;
}

function cambiarPaginaPaginadorPendientes(numeroPagina) {
    pagina = numeroPagina;
    contenedorPendientes.innerHTML = "";
    let inicio = (pagina - 1) * filasPorPagina;
    for (let i = inicio; i < inicio + filasPorPagina; i++) {
        let solicitud = solicitudesPendientes[i];
        if(solicitud) contenedorPendientes.appendChild(crearFilaSolicitudPendiente(solicitud));
    }
    let inputPagina = document.querySelector("#paginadorPendientes input");
    inputPagina.value = pagina;
}

function prePaginadorProceso(){
    obtenerDatos("../../../api/200_datos_nombre_apellidos_email.json", (datos)=>{

        solicitudesProceso = datos;

        let ultimaPagina = Math.ceil(solicitudesProceso.length / filasPorPagina);
        let ultimoBoton = document.querySelector("#paginadorProceso > button:last-child")
        ultimoBoton.innerText = ultimaPagina;
        ultimoBoton.onclick = () => cambiarPaginaPaginadorProceso(ultimaPagina);

        let inputPagina = document.querySelector("#paginadorProceso input");
        inputPagina.max = ultimaPagina;
        inputPagina.min = 1;

        cambiarPaginaPaginadorProceso(1);

    })
}

prePaginadorProceso();

function crearFilaSolicitudProceso(solicitud) {
    let fila = document.createElement('tr');

    let celdaNombre = document.createElement('td');
    celdaNombre.textContent = solicitud.nombre;

    let celdaApellidos = document.createElement('td');
    celdaApellidos.textContent = solicitud.apellidos;

    let celdaEmail = document.createElement('td');
    celdaEmail.textContent = solicitud.email;

    let celdaBoton = document.createElement("td");
    let botonVerSolicitud = document.createElement("button");
    botonVerSolicitud.textContent = "VER MÁS";
    celdaBoton.appendChild(botonVerSolicitud);


    fila.append(celdaNombre, celdaApellidos, celdaEmail, celdaBoton);

    contenedorProceso.addEventListener("click",(event)=>{
        if(event.target.tagName === "BUTTON"){
            const filaBoton = event.target.parentNode.parentNode;

            llenarVerMas(filaBoton);

            seccionSolicitudes.style.display = "none";
            seccionVerMas.style.display = "block";

            document.getElementById("boton-volver-a-lista-solicitudes").onclick= ()=>{
                volverAListaSolicitudes("boton-volver-a-lista-solicitudes","solicitudes","ver-mas");
            }
        }
    });
    function llenarVerMas(filaBoton){
        const nombre = filaBoton.cells[0].textContent;
        const apellidos = filaBoton.cells[1].textContent;
        const email = filaBoton.cells[2].textContent;
        const direccion = "Dirección de ejemplo"; // Reemplazar con la dirección correspondiente

        const nombreSpan = seccionVerMas.querySelector("#nombre-solicitud");
        const apellidosSpan = seccionVerMas.querySelector("#apellidos-solicitud");
        const emailSpan = seccionVerMas.querySelector("#email-solicitud");
        const direccionSpan = seccionVerMas.querySelector("#direccion-solicitud");

        apellidosSpan.textContent = apellidos;
        emailSpan.textContent = email;
        nombreSpan.textContent = nombre;
        direccionSpan.textContent = direccion;

    }


    return fila;
}

function cambiarPaginaPaginadorProceso(numeroPagina) {
    pagina = numeroPagina;
    contenedorProceso.innerHTML = "";
    let inicio = (pagina - 1) * filasPorPagina;
    for (let i = inicio; i < inicio + filasPorPagina; i++) {
        let solicitud = solicitudesProceso[i];
        if(solicitud) contenedorProceso.appendChild(crearFilaSolicitudProceso(solicitud));
    }
    let inputPagina = document.querySelector("#paginadorProceso input");
    inputPagina.value = pagina;
}

function prePaginadorFinalizadas(){
    obtenerDatos("../../../api/200_datos_nombre_apellidos_email.json", (datos)=>{

        solicitudesFinalizadas = datos;

        let ultimaPagina = Math.ceil(solicitudesFinalizadas.length / filasPorPagina);
        let ultimoBoton = document.querySelector("#paginadorFinalizadas > button:last-child")
        ultimoBoton.innerText = ultimaPagina;
        ultimoBoton.onclick = () => cambiarPaginaPaginadorFinalizadas(ultimaPagina);

        let inputPagina = document.querySelector("#paginadorFinalizadas input");
        inputPagina.max = ultimaPagina;
        inputPagina.min = 1;

        cambiarPaginaPaginadorFinalizadas(1);

    })
}

prePaginadorFinalizadas();

function crearFilaSolicitudFinalizadas(solicitud) {
    let fila = document.createElement('tr');

    let celdaNombre = document.createElement('td');
    celdaNombre.textContent = solicitud.nombre;

    let celdaApellidos = document.createElement('td');
    celdaApellidos.textContent = solicitud.apellidos;

    let celdaEmail = document.createElement('td');
    celdaEmail.textContent = solicitud.email;

    let celdaBoton = document.createElement("td");
    let botonVerSolicitud = document.createElement("button");
    botonVerSolicitud.textContent = "VER MÁS";
    celdaBoton.appendChild(botonVerSolicitud);


    fila.append(celdaNombre, celdaApellidos, celdaEmail, celdaBoton);

    contenedorFinalizadas.addEventListener("click",(event)=>{
        if(event.target.tagName === "BUTTON"){
            const filaBoton = event.target.parentNode.parentNode;

            llenarVerMas(filaBoton);

            seccionSolicitudes.style.display = "none";
            seccionVerMas.style.display = "block";

            document.getElementById("boton-volver-a-lista-solicitudes").onclick= ()=>{
                volverAListaSolicitudes("boton-volver-a-lista-solicitudes","solicitudes","ver-mas");
            }
        }
    });

    function llenarVerMas(filaBoton){
        const nombre = filaBoton.cells[0].textContent;
        const apellidos = filaBoton.cells[1].textContent;
        const email = filaBoton.cells[2].textContent;
        const direccion = "Dirección de ejemplo"; // Reemplazar con la dirección correspondiente

        const nombreSpan = seccionVerMas.querySelector("#nombre-solicitud");
        const apellidosSpan = seccionVerMas.querySelector("#apellidos-solicitud");
        const emailSpan = seccionVerMas.querySelector("#email-solicitud");
        const direccionSpan = seccionVerMas.querySelector("#direccion-solicitud");

        apellidosSpan.textContent = apellidos;
        emailSpan.textContent = email;
        nombreSpan.textContent = nombre;
        direccionSpan.textContent = direccion;

    }


    return fila;
}

function cambiarPaginaPaginadorFinalizadas(numeroPagina) {
    pagina = numeroPagina;
    contenedorFinalizadas.innerHTML = "";
    let inicio = (pagina - 1) * filasPorPagina;
    for (let i = inicio; i < inicio + filasPorPagina; i++) {
        let solicitud = solicitudesFinalizadas[i];
        if(solicitud) contenedorFinalizadas.appendChild(crearFilaSolicitudFinalizadas(solicitud));
    }
    let inputPagina = document.querySelector("#paginadorFinalizadas input");
    inputPagina.value = pagina;
}


function volverAListaSolicitudes(idBotonActivo, idSeccionMostrar, idSeccionOcultar){

    document.getElementById(idBotonActivo).classList.add("activo");

    document.getElementById(idSeccionOcultar).style.display = "none";
    document.getElementById(idSeccionMostrar).style.display = "block";

}



function prePaginadorVentas(){
    obtenerDatos("../../../api/200_datos_nombre_apellidos_email.json", (datos)=>{

        ventas = datos;

        let ultimaPagina = Math.ceil(ventas.length / filasPorPagina);
        let ultimoBoton = document.querySelector("#paginadorVentas > button:last-child")
        ultimoBoton.innerText = ultimaPagina;
        ultimoBoton.onclick = () => cambiarPaginaPaginadorVentas(ultimaPagina);

        let inputPagina = document.querySelector("#paginadorVentas input");
        inputPagina.max = ultimaPagina;
        inputPagina.min = 1;

        cambiarPaginaPaginadorVentas(1);

    })
}

prePaginadorVentas();

function crearFilaVenta(venta) {
    let fila = document.createElement('tr');

    let celdaNombre = document.createElement('td');
    celdaNombre.textContent = venta.nombre;

    let celdaApellidos = document.createElement('td');
    celdaApellidos.textContent = venta.apellidos;

    let celdaEmail = document.createElement('td');
    celdaEmail.textContent = venta.email;

    let celdaBoton = document.createElement("td");
    let botonVerVenta = document.createElement("button");
    botonVerVenta.textContent = "VER MÁS";
    celdaBoton.appendChild(botonVerVenta);


    fila.append(celdaNombre, celdaApellidos, celdaEmail, celdaBoton);

    contenedorVentas.addEventListener("click",(event)=>{
        if(event.target.tagName === "BUTTON"){
            const filaBoton = event.target.parentNode.parentNode;

            llenarVerVenta(filaBoton);

            const seccionVentas = document.getElementById("ventas");
            seccionVentas.style.display = "none";
            seccionVerVenta.style.display = "block";
        }
    });
    function llenarVerVenta(filaBoton){
        const id = filaBoton.cells[0].textContent;
        const email = filaBoton.cells[1].textContent;
        const nombre = filaBoton.cells[2].textContent;
        const direccion = "Dirección de ejemplo"; // Reemplazar con la dirección correspondiente

        const idSpan = seccionVerVenta.querySelector("#id-venta");
        const emailSpan = seccionVerVenta.querySelector("#email-venta");
        const nombreSpan = seccionVerVenta.querySelector("#nombre-venta");
        const direccionSpan = seccionVerVenta.querySelector("#direccion-venta");

        idSpan.textContent = id;
        emailSpan.textContent = email;
        nombreSpan.textContent = nombre;
        direccionSpan.textContent = direccion;

    }

    return fila;
}

function cambiarPaginaPaginadorVentas(numeroPagina) {
    pagina = numeroPagina;
    contenedorVentas.innerHTML = "";
    let inicio = (pagina - 1) * filasPorPagina;
    for (let i = inicio; i < inicio + filasPorPagina; i++) {
        let venta = ventas[i];
        if(venta) contenedorVentas.appendChild(crearFilaVenta(venta));
    }
    let inputPagina = document.querySelector("#paginadorVentas input");
    inputPagina.value = pagina;
}

function volverAListaVentas() {

    document.getElementById("boton-volver-a-lista-ventas").classList.add("activo");

    document.getElementById("ver-venta").style.display = "none";
    document.getElementById("ventas").style.display = "block";
}

    function mostrarContenidoEntreDos(idBotonActivo, idBotonInactivo, idSeccionMostrar, idSeccionOcultar) {
        document.getElementById(idBotonActivo).classList.add("activo");
        document.getElementById(idBotonInactivo).classList.remove("activo");

        document.getElementById(idSeccionMostrar).style.display = "block";
        document.getElementById(idSeccionOcultar).style.display = "none";
    }

    function mostrarContenidoEntreTres(idBotonActivo, idBotonInactivoUno, idBotonInactivoDos, idSeccionMostrar, idSeccionOcultarUno, idSeccionOcultarDos) {
        document.getElementById(idBotonActivo).classList.add("activo");
        document.getElementById(idBotonInactivoUno).classList.remove("activo");
        document.getElementById(idBotonInactivoDos).classList.remove("activo");

        document.getElementById(idSeccionMostrar).style.display = "block";
        document.getElementById(idSeccionOcultarUno).style.display = "none";
        document.getElementById(idSeccionOcultarDos).style.display = "none";
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

function buscarVentas() {
    // Obtenemos el valor del input de búsqueda
    var input = document.getElementById("buscador-ventas").value.toUpperCase();

    // Obtenemos la tabla
    var tabla = document.getElementById("tabla-ventas");

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

//--------------------------------------------------------------------
    /*
    función DatosGraficaMes()
    */

//--------------------------------------------------------------------

    function datosGraficaMes() {

        obtenerDatos("../../../api/200datos_grafica_importe_fecha.json", (datos) => {

            let arrayImporte = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

            for (let i = 0; i < datos.length; i++) {
                let venta = datos[i];

                if (venta.fecha[3] == 0 && venta.fecha[4] == 1) {
                    arrayImporte[0] = arrayImporte[0] + venta.importe;
                }
                if (venta.fecha[3] == 0 && venta.fecha[4] == 2) {
                    arrayImporte[1] = arrayImporte[1] + venta.importe;
                }
                if (venta.fecha[3] == 0 && venta.fecha[4] == 3) {
                    arrayImporte[2] = arrayImporte[2] + venta.importe;
                }
                if (venta.fecha[3] == 0 && venta.fecha[4] == 4) {
                    arrayImporte[3] = arrayImporte[3] + venta.importe;
                }
                if (venta.fecha[3] == 0 && venta.fecha[4] == 5) {
                    arrayImporte[4] = arrayImporte[4] + venta.importe;
                }
                if (venta.fecha[3] == 0 && venta.fecha[4] == 6) {
                    arrayImporte[5] = arrayImporte[5] + venta.importe;
                }
                if (venta.fecha[3] == 0 && venta.fecha[4] == 7) {
                    arrayImporte[6] = arrayImporte[6] + venta.importe;
                }
                if (venta.fecha[3] == 0 && venta.fecha[4] == 8) {
                    arrayImporte[7] = arrayImporte[7] + venta.importe;
                }
                if (venta.fecha[3] == 0 && venta.fecha[4] == 9) {
                    arrayImporte[8] = arrayImporte[8] + venta.importe;
                }
                if (venta.fecha[3] == 1 && venta.fecha[4] == 0) {
                    arrayImporte[9] = arrayImporte[9] + venta.importe;
                }
                if (venta.fecha[3] == 1 && venta.fecha[4] == 1) {
                    arrayImporte[10] = arrayImporte[10] + venta.importe;
                }
                if (venta.fecha[3] == 1 && venta.fecha[4] == 2) {
                    arrayImporte[11] = arrayImporte[11] + venta.importe;
                }

            }//for

            let datosGraficaMes = {
                labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
                datasets: [
                    {
                        label: "Importe",
                        data: arrayImporte,
                        backgroundColor: ' #790050', //colores. De forma rgba añade transparencia (la a es la transparencia)
                    }
                ]
            } //datos

            let opciones = { //las opciones de la gráfica.
                responsive: true, //va a ser responsive
                maintainAspectRatio: false, //mantener la razón de aspecto, false para que se estire o se encoja
                                            //según necesite.
                scales:{
                    x:{
                        grid:{
                            drawOnChartArea:false
                        },
                        ticks:{
                            font:{
                                size:15
                            }
                        }
                    },
                    y:{
                        ticks: {
                            font:{
                                size: 15
                            }
                        }
                    },
                },
                plugins: {
                    legend: {
                        position: 'bottom', //posicionamiento de la leyenda. En qué borde.
                        align: 'end',//dentro del borde, donde queremos que aparezca (start, center y end).
                        labels:{
                            font:{
                                size: 15
                            }
                        }
                    },
                    title: { //titulo de la gráfica
                        display: true,
                        text: 'Ventas mensuales',
                        position: 'top',
                        align: 'center',
                        font:{
                            size:15
                        }
                    },
                    tooltip: {
                        backgroundColor: '#fff',
                        titleColor: '#000',
                        titleAlign: 'center',
                        bodyColor: '#333',
                        borderColor: '#666',
                        borderWidth: 1,
                    }

                }//plugins

            }//opciones


            let ctxmes = document.getElementById('chart-mes'); //referencia al canvas.

            let miGraficaMes = new Chart(ctxmes, { //le pasamos el canvas y un objeto con la configuración.
                type: 'bar',
                data: datosGraficaMes, //los datos
                options: opciones //las opciones
            });


        })//callback

    }//funcion
//--------------------------------------------------------------------
    /*
    llamada de función datosGraficaMes()
    */
//--------------------------------------------------------------------
    datosGraficaMes();


//--------------------------------------------------------------------
    /*
    función DatosGraficaAnio()
    */

//--------------------------------------------------------------------
    function datosGraficaAnio() {

        obtenerDatos("../../../api/200datos_grafica_importe_fecha.json", (datos) => {

            let arrayImporte = [0, 0, 0, 0, 0];

            for (let i = 0; i < datos.length; i++) {
                let venta = datos[i];

                if (venta.fecha[9] == 0) {
                    arrayImporte[0] = arrayImporte[0] + venta.importe;
                }
                if (venta.fecha[9] == 1) {
                    arrayImporte[1] = arrayImporte[1] + venta.importe;
                }
                if (venta.fecha[9] == 2) {
                    arrayImporte[2] = arrayImporte[2] + venta.importe;
                }
                if (venta.fecha[9] == 3) {
                    arrayImporte[3] = arrayImporte[3] + venta.importe;
                }
                if (venta.fecha[9] == 4) {
                    arrayImporte[4] = arrayImporte[4] + venta.importe;
                }

            }//for

            console.log(arrayImporte);

            let datosGraficaAnio = {
                labels: ["2020", "2021", "2022", "2023", "2024"],
                datasets: [
                    {
                        label: "Importe",
                        data: arrayImporte,
                        backgroundColor: ' #790050', //colores. De forma rgba añade transparencia (la a es la transparencia)
                    }
                ]
            } //datos

            let opciones = { //las opciones de la gráfica.
                responsive: true, //va a ser responsive
                maintainAspectRatio: false, //mantener la razón de aspecto, false para que se estire o se encoja
                                            //según necesite.
                scales:{
                    x:{
                        grid:{
                            drawOnChartArea:false
                        },
                        ticks:{
                            font:{
                                size:15
                            }
                        }
                    },
                    y:{
                        ticks: {
                            font:{
                                size: 15
                            }
                        }
                    },
                },
                plugins: {
                    legend: {
                        position: 'bottom', //posicionamiento de la leyenda. En qué borde.
                        align: 'end',//dentro del borde, donde queremos que aparezca (start, center y end).
                        labels:{
                            font:{
                                size: 15
                            }
                        }
                    },
                    title: { //titulo de la gráfica
                        display: true,
                        text: 'Ventas anuales',
                        position: 'top',
                        align: 'center',
                        font:{
                            size:15
                        }
                    },
                    tooltip: {
                        backgroundColor: '#fff',
                        titleColor: '#000',
                        titleAlign: 'center',
                        bodyColor: '#333',
                        borderColor: '#666',
                        borderWidth: 1,
                    }

                }//plugins

            }//opciones


            let ctxAnio = document.getElementById('chart-anio'); //referencia al canvas.

            let miGraficaAnio = new Chart(ctxAnio, { //le pasamos el canvas y un objeto con la configuración.
                type: 'bar',
                data: datosGraficaAnio, //los datos
                options: opciones //las opciones
            });

        })//callback

    }//funcion
//--------------------------------------------------------------------
    /*
    llamada de función datosGraficaAnio()
    */
//--------------------------------------------------------------------
    datosGraficaAnio();


//--------------------------------------------------------------------
    /*
    función DatosGraficaSemana()
    */

//--------------------------------------------------------------------
    function datosGraficaSemana() {

        obtenerDatos("../../../api/200datos_grafica_importe_fecha.json", (datos) => {

            let arrayImporte = [0, 0, 0, 0, 0, 0, 0];


            // Función para convertir una cadena de fecha en formato "dd/mm/yyyy" a objeto Date
            function parseDate(str) {
                const parts = str.split("/");
                return new Date(parts[2], parts[1] - 1, parts[0]);
            }

            // Función de comparación para ordenar los datos por fecha de más reciente a más antigua
            function compareDates(a, b) {
                const dateA = parseDate(a.fecha);
                const dateB = parseDate(b.fecha);
                return dateB - dateA;
            }

            // Ordena los datos usando la función de comparación
            datos.sort(compareDates);

            const datosRecientes = datos.slice(0, 7);


            for (let i = 0; i < datosRecientes.length; i++) {
                arrayImporte[i] = arrayImporte[i] + datosRecientes[i].importe;
            }

            let datosGraficaSemana = {
                labels: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"],
                datasets: [
                    {
                        label: "Importe",
                        data: arrayImporte,
                        backgroundColor: ' #790050', //colores. De forma rgba añade transparencia (la a es la transparencia)
                    }
                ]
            } //datos

            let opciones = { //las opciones de la gráfica.
                responsive: true, //va a ser responsive
                maintainAspectRatio: false, //mantener la razón de aspecto, false para que se estire o se encoja
                                            //según necesite.
                scales:{
                  x:{
                      grid:{
                          drawOnChartArea:false
                      },
                      ticks:{
                          font:{
                              size:15
                          }
                      }
                  },
                  y:{
                      ticks: {
                          font:{
                              size: 15
                          }
                      }
                  },
                },
                plugins: {
                    legend: {
                        position: 'bottom', //posicionamiento de la leyenda. En qué borde.
                        align: 'end',//dentro del borde, donde queremos que aparezca (start, center y end).
                        labels:{
                            font:{
                                size: 15
                            }
                        }
                    },
                    title: { //titulo de la gráfica
                        display: true,
                        text: 'Ventas de la semana',
                        position: 'top',
                        align: 'center',
                        font:{
                            size:15
                        }
                    },
                    tooltip: {
                        backgroundColor: '#fff',
                        titleColor: '#000',
                        titleAlign: 'center',
                        bodyColor: '#333',
                        borderColor: '#666',
                        borderWidth: 1,
                    }

                }//plugins

            }//opciones


            let ctxSemana = document.getElementById('chart-semana'); //referencia al canvas.

            let miGraficaSemana = new Chart(ctxSemana, { //le pasamos el canvas y un objeto con la configuración.
                type: 'bar',
                data: datosGraficaSemana, //los datos
                options: opciones //las opciones
            });


        })//callback

    }//funcion
//--------------------------------------------------------------------
    /*
    llamada de función datosGraficaSemana()
    */
//--------------------------------------------------------------------
    datosGraficaSemana();


//--------------------------------------------------------------------
    /*
    función DatosGraficaDia()
    */

//--------------------------------------------------------------------
    function datosGraficaDia() {

        obtenerDatos("../../../api/200datos_grafica_importe_fecha.json", (datos) => {

            let arrayImporte = [0];


            // Función para convertir una cadena de fecha en formato "dd/mm/yyyy" a objeto Date
            function parseDate(str) {
                const parts = str.split("/");
                return new Date(parts[2], parts[1] - 1, parts[0]);
            }

            // Función de comparación para ordenar los datos por fecha de más reciente a más antigua
            function compareDates(a, b) {
                const dateA = parseDate(a.fecha);
                const dateB = parseDate(b.fecha);
                return dateB - dateA;
            }

            // Ordena los datos usando la función de comparación
            datos.sort(compareDates);

            const datosDia = datos[0];

            arrayImporte[0] = arrayImporte[0] + datosDia.importe;

            console.log(arrayImporte);

            let datosGraficaDia = {
                labels: ["Hoy: " + datosDia.fecha],
                datasets: [
                    {
                        label: "Importe",
                        data: arrayImporte,
                        backgroundColor: ' #790050', //colores. De forma rgba añade transparencia (la a es la transparencia)
                    }
                ]
            } //datos

            let opciones = { //las opciones de la gráfica.
                responsive: true, //va a ser responsive
                maintainAspectRatio: false, //mantener la razón de aspecto, false para que se estire o se encoja
                                            //según necesite.
                scales:{
                    x:{
                        grid:{
                            drawOnChartArea:false
                        },
                        ticks:{
                            font:{
                                size:15
                            }
                        }
                    },
                    y:{
                        ticks: {
                            font:{
                                size: 15
                            }
                        }
                    },
                },
                plugins: {
                    legend: {
                        position: 'bottom', //posicionamiento de la leyenda. En qué borde.
                        align: 'end',//dentro del borde, donde queremos que aparezca (start, center y end).
                        labels:{
                            font:{
                                size: 15
                            }
                        }
                    },
                    title: { //titulo de la gráfica
                        display: true,
                        text: 'Ventas durante las últimas 24h',
                        position: 'top',
                        align: 'center',
                        font:{
                            size:15
                        }
                    },
                    tooltip: {
                        backgroundColor: '#fff',
                        titleColor: '#000',
                        titleAlign: 'center',
                        bodyColor: '#333',
                        borderColor: '#666',
                        borderWidth: 1,
                    }

                }//plugins

            }//opciones


            let ctxDia = document.getElementById('chart-dia'); //referencia al canvas.

            let miGraficaDia = new Chart(ctxDia, { //le pasamos el canvas y un objeto con la configuración.
                type: 'bar',
                data: datosGraficaDia, //los datos
                options: opciones //las opciones
            });

        })//callback

    }//funcion
//--------------------------------------------------------------------
    /*
    llamada de función datosGraficaDia()
    */
//--------------------------------------------------------------------
    datosGraficaDia();

    function seleccionarOpcion() {
        var opcionSeleccionada = document.getElementById("selector-opciones-graficas").value;
        if (opcionSeleccionada === "dia") {
            mostrarGraficaDia();
        } else if (opcionSeleccionada === "semana") {
            mostrarGraficaSemana();
        } else if (opcionSeleccionada === "mes") {
            mostrarGraficaMes();
        } else if (opcionSeleccionada === "anio") {
            mostrarGraficaAnio();
        }
    }

    function mostrarGraficaDia() {
        document.getElementById("opcion-dia").classList.add("activo");
        document.getElementById("opcion-semana").classList.remove("activo");
        document.getElementById("opcion-mes").classList.remove("activo");
        document.getElementById("opcion-anio").classList.remove("activo");

        document.getElementById("chart-container-dia").style.display = "block";
        document.getElementById("chart-container-semana").style.display = "none";
        document.getElementById("chart-container-mes").style.display = "none";
        document.getElementById("chart-container-anio").style.display = "none";
    }

    function mostrarGraficaSemana() {
        document.getElementById("opcion-semana").classList.add("activo");
        document.getElementById("opcion-dia").classList.remove("activo");
        document.getElementById("opcion-mes").classList.remove("activo");
        document.getElementById("opcion-anio").classList.remove("activo");

        document.getElementById("chart-container-semana").style.display = "block";
        document.getElementById("chart-container-dia").style.display = "none";
        document.getElementById("chart-container-mes").style.display = "none";
        document.getElementById("chart-container-anio").style.display = "none";
    }

    function mostrarGraficaMes() {
        document.getElementById("opcion-mes").classList.add("activo");
        document.getElementById("opcion-semana").classList.remove("activo");
        document.getElementById("opcion-dia").classList.remove("activo");
        document.getElementById("opcion-anio").classList.remove("activo");

        document.getElementById("chart-container-mes").style.display = "block";
        document.getElementById("chart-container-semana").style.display = "none";
        document.getElementById("chart-container-dia").style.display = "none";
        document.getElementById("chart-container-anio").style.display = "none";
    }

    function mostrarGraficaAnio() {
        document.getElementById("opcion-anio").classList.add("activo");
        document.getElementById("opcion-semana").classList.remove("activo");
        document.getElementById("opcion-mes").classList.remove("activo");
        document.getElementById("opcion-dia").classList.remove("activo");

        document.getElementById("chart-container-anio").style.display = "block";
        document.getElementById("chart-container-semana").style.display = "none";
        document.getElementById("chart-container-mes").style.display = "none";
        document.getElementById("chart-container-dia").style.display = "none";
    }
    