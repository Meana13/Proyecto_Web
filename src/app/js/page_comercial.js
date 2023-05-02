



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
//------------------------------------------------------------
/*
Datos de la gráfica:
*/
//------------------------------------------------------------
let datos = {
    labels: ['lunes', 'martes', 'miércoles', 'jueves', 'viernes'], //array que nos permite establecer valores para el
    //eje horizontal
    datasets: [ //array donde colocamos los datasets que queremos que se dibujen.
        //cada dataset puede tener su etiqueta. Si hacemos click, se tacha y se oculta.
        {
            label: 'ventas',
            data: [100, 234, 45, 210, 430], //datos que queremos que se dibujen. Cada número, para un día de la semana.
            //fill: true, //para que se rellene la zona de abajo de la línea.
            backgroundColor: 'rgba(255,69,34,.5)', //colores. De forma rgba añade transparencia (la a es la transparencia)
            borderColor: 'rgb(255,110,86)',
            borderDash: [2,3], //punteado [1,3,3,2]
            tension: 0, //para curvar. Si ponemos tensión 0, es una línea recta. Añadir tensión es como estirar
            //la recta para curvarla. Entre 0 y 0.5 es adecuado para curvar. Sino sale muy raro.
            pointStyle: 'rectRot', //tipo de punto (este es diamante).
            pointRadius: 10, //este controla el tamaño del punto.
        },
        {
            label: 'ventas 2',
            data: [350, 34, 267, 110, 30],
            //fill: true,
            backgroundColor: 'rgb(63,80,255)', //rgb no tiene la a, por tanto no tiene transparencia.
            borderColor: 'rgb(119,145,255)',
            borderDash: [3,2],
            pointStyle: 'rectRot',
            pointRadius: 10,
        },
    ]
}; //aquí irán los datos de la gráfica

//------------------------------------------------------------
/*
Opciones de la gráfica:
*/
//------------------------------------------------------------
let opciones = { //las opciones de la gráfica.
    responsive: true, //va a ser responsive
    maintainAspectRatio: false, //mantener la razón de aspecto, false para que se estire o se encoja
                                //según necesite.
    scales: { //configurar las escalas, aquí digo que en el eje y aparezca apilada.
        //entonces la segunda gráfica, su 0 es el primer punto de la primera gráfica. En este caso, el 100 es el
        //0 de la gráfica azul.
        y: {
            stacked: true
        }
    },
    plugins: {
        legend: {
            position: 'bottom', //posicionamiento de la leyenda. En qué borde.
            align: 'end' //dentro del borde, donde queremos que aparezca (start, center y end).
        },
        title: { //titulo de la gráfica
            display: true,
            text: '   Ventas de la semana',
            position: 'left',
            align: 'start',
            padding:{
                right: 10
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

let ctx = document.getElementById('chart'); //referencia al canvas.

let miGrafica = new Chart(ctx, { //le pasamos el canvas y un objeto con la configuración.
    type: 'line',
    data: datos, //los datos
    options: opciones //las opciones
});




