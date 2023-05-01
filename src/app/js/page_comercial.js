



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
//------------------------------------------------------------
/*
Función mostrarListaVentas():
*/
//------------------------------------------------------------
function mostrarListaVentas(){
    document.getElementById("boton-lista-ventas").classList.add("activo");
    document.getElementById("boton-graficas").classList.remove("activo");

    document.getElementById("lista-ventas").style.display = "block";
    document.getElementById("graficas-ventas").style.display = "none";
}

//------------------------------------------------------------
/*
Función mostrarGraficas():
*/
//------------------------------------------------------------
function mostrarGraficas(){
    document.getElementById("boton-graficas").classList.add("activo");
    document.getElementById("boton-lista-ventas").classList.remove("activo");

    document.getElementById("graficas-ventas").style.display = "block";
    document.getElementById("lista-ventas").style.display = "none";
}


//--------------------------------------------------------------------
/*
función obtenerDatos():
*/
//--------------------------------------------------------------------
async function obtenerDatos(url, callback){
    let archivo = await fetch (url);
    let datos = await archivo.json();
    callback(datos);
}

//--------------------------------------------------------------------
/*
función DatosGraficaMes()
*/
//--------------------------------------------------------------------

function datosGraficaMes(){

    obtenerDatos("../../../api/200datos_grafica_importe_fecha.json", (datos)=>{

        let arrayImporte = [0,0,0,0,0,0,0,0,0,0,0,0];

        for(let i=0; i<datos.length; i++){
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
                    backgroundColor: 'rgba(255,69,34,.5)', //colores. De forma rgba añade transparencia (la a es la transparencia)
                    borderColor: 'rgb(255,110,86)',
                    borderDash: [2, 3], //punteado [1,3,3,2]
                    tension: 0, //para curvar. Si ponemos tensión 0, es una línea recta. Añadir tensión es como estirar
                    //la recta para curvarla. Entre 0 y 0.5 es adecuado para curvar. Sino sale muy raro.
                    pointStyle: 'rectRot', //tipo de punto (este es diamante).
                    pointRadius: 10, //este controla el tamaño del punto.
                }
            ]
        } //datos

        let opciones = { //las opciones de la gráfica.
            responsive: true, //va a ser responsive
            maintainAspectRatio: false, //mantener la razón de aspecto, false para que se estire o se encoja
                                        //según necesite.
            scales: { //configurar las escalas, aquí digo que en el eje y aparezca apilada.
                //entonces la segunda gráfica, su 0 es el primer punto de la primera gráfica. En este caso, el 100 es el
                //0 de la gráfica azul.
                y: {
                    stacked: false
                }
            },
            plugins: {
                legend: {
                    position: 'bottom', //posicionamiento de la leyenda. En qué borde.
                    align: 'end' //dentro del borde, donde queremos que aparezca (start, center y end).
                },
                title: { //titulo de la gráfica
                    display: true,
                    text: 'Ventas del mes',
                    position: 'left',
                    align: 'start',
                    padding:{
                        right: 50
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
            type: 'line',
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
function datosGraficaAnio(){

    obtenerDatos("../../../api/200datos_grafica_importe_fecha.json", (datos)=>{

        let arrayImporte = [0,0,0,0,0];

        for(let i=0; i<datos.length; i++){
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
            labels: ["2020","2021","2022","2023","2024"],
            datasets: [
                {
                    label: "Importe",
                    data: arrayImporte,
                    backgroundColor: 'rgba(255,69,34,.5)', //colores. De forma rgba añade transparencia (la a es la transparencia)
                    borderColor: 'rgb(255,110,86)',
                    borderDash: [2, 3], //punteado [1,3,3,2]
                    tension: 0, //para curvar. Si ponemos tensión 0, es una línea recta. Añadir tensión es como estirar
                    //la recta para curvarla. Entre 0 y 0.5 es adecuado para curvar. Sino sale muy raro.
                    pointStyle: 'rectRot', //tipo de punto (este es diamante).
                    pointRadius: 10, //este controla el tamaño del punto.
                }
            ]
        } //datos

        let opciones = { //las opciones de la gráfica.
            responsive: true, //va a ser responsive
            maintainAspectRatio: false, //mantener la razón de aspecto, false para que se estire o se encoja
                                        //según necesite.
            scales: { //configurar las escalas, aquí digo que en el eje y aparezca apilada.
                //entonces la segunda gráfica, su 0 es el primer punto de la primera gráfica. En este caso, el 100 es el
                //0 de la gráfica azul.
                y: {
                    stacked: false
                }
            },
            plugins: {
                legend: {
                    position: 'bottom', //posicionamiento de la leyenda. En qué borde.
                    align: 'end' //dentro del borde, donde queremos que aparezca (start, center y end).
                },
                title: { //titulo de la gráfica
                    display: true,
                    text: 'Ventas del mes',
                    position: 'left',
                    align: 'start',
                    padding:{
                        right: 50
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
            type: 'line',
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




