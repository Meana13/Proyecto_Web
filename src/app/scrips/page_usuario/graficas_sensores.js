
let datosSal = {
    labels: ['lunes', 'martes', 'miércoles', 'jueves', 'viernes','sábado','domingo'],

    datasets: [
        {
            label: 'datosSal',
            data: [50, 55, 40, 45, 50, 55, 50], //datos que queremos que se dibujen. Cada número, para un día de la semana.
            fill: false, //para que se rellene la zona de abajo de la línea.
            backgroundColor: 'rgba(255,69,34,.5)', //colores. De forma rgba añade transparencia (la a es la transparencia)
            borderColor: 'rgb(255,110,86)',
            borderDash: [2,3], //punteado [1,3,3,2]
            tension: 0, //para curvar. Si ponemos tensión 0, es una línea recta. Añadir tensión es como estirar
            //la recta para curvarla. Entre 0 y 0.5 es adecuado para curvar. Sino sale muy raro.
            pointStyle: 'rectRot', //tipo de punto (este es diamante).
            pointRadius: 10, //este controla el tamaño del punto.
        },
    ]
}; //aquí irán los datos de la gráfica

let opcionesSal = { //las opciones de la gráfica.
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
        legend: false,

        title: { //titulo de la gráfica
            display: true,
            text: 'Datos de salinidad',
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

let ctxSal = document.getElementById('chart-sal'); //referencia al canvas.

let miGrafica = new Chart(ctxSal, { //le pasamos el canvas y un objeto con la configuración.
    type: 'line',
    data: datosSal, //los datos
    options: opcionesSal //las opciones
});



let datosHumedad = {
    labels: ['lunes', 'martes', 'miércoles', 'jueves', 'viernes','sábado','domingo'],

    datasets: [
        {
            label: 'datosHumedad',
            data: [50, 55, 40, 45, 50, 55, 50], //datos que queremos que se dibujen. Cada número, para un día de la semana.
            fill: false, //para que se rellene la zona de abajo de la línea.
            backgroundColor: 'rgba(255,69,34,.5)', //colores. De forma rgba añade transparencia (la a es la transparencia)
            borderColor: 'rgb(255,110,86)',
            borderDash: [2,3], //punteado [1,3,3,2]
            tension: 0, //para curvar. Si ponemos tensión 0, es una línea recta. Añadir tensión es como estirar
            //la recta para curvarla. Entre 0 y 0.5 es adecuado para curvar. Sino sale muy raro.
            pointStyle: 'rectRot', //tipo de punto (este es diamante).
            pointRadius: 10, //este controla el tamaño del punto.
        },
    ]
}; //aquí irán los datos de la gráfica

let opcionesHumedad = { //las opciones de la gráfica.
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
        legend: false,

        title: { //titulo de la gráfica
            display: true,
            text: 'Datos de humedad',
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

let ctxHumedad = document.getElementById('chart-humedad'); //referencia al canvas.

let miGraficaHumedad = new Chart(ctxHumedad, { //le pasamos el canvas y un objeto con la configuración.
    type: 'line',
    data: datosHumedad, //los datos
    options: opcionesHumedad //las opciones
});


let datosTemperatura = {
    labels: ['lunes', 'martes', 'miércoles', 'jueves', 'viernes','sábado','domingo'],

    datasets: [
        {
            label: 'datosTemperatura',
            data: [50, 55, 40, 45, 50, 55, 50], //datos que queremos que se dibujen. Cada número, para un día de la semana.
            fill: false, //para que se rellene la zona de abajo de la línea.
            backgroundColor: 'rgba(255,69,34,.5)', //colores. De forma rgba añade transparencia (la a es la transparencia)
            borderColor: 'rgb(255,110,86)',
            borderDash: [2,3], //punteado [1,3,3,2]
            tension: 0, //para curvar. Si ponemos tensión 0, es una línea recta. Añadir tensión es como estirar
            //la recta para curvarla. Entre 0 y 0.5 es adecuado para curvar. Sino sale muy raro.
            pointStyle: 'rectRot', //tipo de punto (este es diamante).
            pointRadius: 10, //este controla el tamaño del punto.
        },
    ]
}; //aquí irán los datos de la gráfica

let opcionesTemperatura = { //las opciones de la gráfica.
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
        legend: false,

        title: { //titulo de la gráfica
            display: true,
            text: 'Datos de temperatura',
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

let ctxTemperatura = document.getElementById('chart-temperatura'); //referencia al canvas.

let miGraficaTemperatura = new Chart(ctxTemperatura, { //le pasamos el canvas y un objeto con la configuración.
    type: 'line',
    data: datosTemperatura, //los datos
    options: opcionesTemperatura //las opciones
});


let datospH = {
    labels: ['lunes', 'martes', 'miércoles', 'jueves', 'viernes','sábado','domingo'],

    datasets: [
        {
            label: 'datospH',
            data: [50, 55, 40, 45, 50, 55, 50], //datos que queremos que se dibujen. Cada número, para un día de la semana.
            fill: false, //para que se rellene la zona de abajo de la línea.
            backgroundColor: 'rgba(255,69,34,.5)', //colores. De forma rgba añade transparencia (la a es la transparencia)
            borderColor: 'rgb(255,110,86)',
            borderDash: [2,3], //punteado [1,3,3,2]
            tension: 0, //para curvar. Si ponemos tensión 0, es una línea recta. Añadir tensión es como estirar
            //la recta para curvarla. Entre 0 y 0.5 es adecuado para curvar. Sino sale muy raro.
            pointStyle: 'rectRot', //tipo de punto (este es diamante).
            pointRadius: 10, //este controla el tamaño del punto.
        },
    ]
}; //aquí irán los datos de la gráfica

let opcionespH = { //las opciones de la gráfica.
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
        legend: false,

        title: { //titulo de la gráfica
            display: true,
            text: 'Datos de temperatura',
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

let ctxpH = document.getElementById('chart-pH'); //referencia al canvas.

let miGraficapH = new Chart(ctxpH, { //le pasamos el canvas y un objeto con la configuración.
    type: 'line',
    data: datospH, //los datos
    options: opcionespH //las opciones
});


let datosLuz = {
    labels: ['lunes', 'martes', 'miércoles', 'jueves', 'viernes','sábado','domingo'],

    datasets: [
        {
            label: 'datosLuz',
            data: [50, 55, 40, 45, 50, 55, 50], //datos que queremos que se dibujen. Cada número, para un día de la semana.
            fill: false, //para que se rellene la zona de abajo de la línea.
            backgroundColor: 'rgba(255,69,34,.5)', //colores. De forma rgba añade transparencia (la a es la transparencia)
            borderColor: 'rgb(255,110,86)',
            borderDash: [2,3], //punteado [1,3,3,2]
            tension: 0, //para curvar. Si ponemos tensión 0, es una línea recta. Añadir tensión es como estirar
            //la recta para curvarla. Entre 0 y 0.5 es adecuado para curvar. Sino sale muy raro.
            pointStyle: 'rectRot', //tipo de punto (este es diamante).
            pointRadius: 10, //este controla el tamaño del punto.
        },
    ]
}; //aquí irán los datos de la gráfica

let opcionesLuz = { //las opciones de la gráfica.
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
        legend: false,

        title: { //titulo de la gráfica
            display: true,
            text: 'Datos de luminosidad',
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

let ctxLuz = document.getElementById('chart-luz'); //referencia al canvas.

let miGraficaLuz = new Chart(ctxLuz, { //le pasamos el canvas y un objeto con la configuración.
    type: 'line',
    data: datosLuz, //los datos
    options: opcionesLuz //las opciones
});

let botonDatosActualesHumedad = document.getElementById('boton-datos-actuales-humedad')
let botonDatosActualesSal = document.getElementById('boton-datos-actuales-sal')
let botonDatosActualesTemperatura = document.getElementById('boton-datos-actuales-temperatura')
let botonDatosActualespH = document.getElementById('boton-datos-actuales-ph')
let botonDatosActualesLuz = document.getElementById('boton-datos-actuales-luz')

let botonHistorialHumedad = document.getElementById('boton-historial-humedad');
let botonHistorialSal = document.getElementById('boton-historial-sal');
let botonHistorialTemperatura = document.getElementById('boton-historial-temperatura');
let botonHistorialpH = document.getElementById('boton-historial-ph');
let botonHistorialLuz = document.getElementById('boton-historial-luz');

let datosActualesHumedad = document.getElementById('Humedad');
let datosActualesSal = document.getElementById('Sal');
let datosActualesTemperatura = document.getElementById('Temperatura');
let datosActualespH = document.getElementById('pH');
let datosActualesLuz = document.getElementById('Luz');

let graficaHumedad = document.getElementById('chart-container-humedad');
let graficaSal = document.getElementById('chart-container-sal');
let graficaTemperatura = document.getElementById('chart-container-temperatura');
let graficapH = document.getElementById('chart-container-pH');
let graficaLuz = document.getElementById('chart-container-luz');


function verDatosActualesHumedad() {
    botonDatosActualesHumedad.classList.add('activo');
    botonHistorialHumedad.classList.remove('activo');

    datosActualesHumedad.style.display = 'block';
    graficaHumedad.style.display = 'none';
}

function verGraficaHumedad(){
    botonHistorialHumedad.classList.add('activo');
    botonDatosActualesHumedad.classList.add('activo');

    graficaHumedad.style.display = 'block';
    datosActualesHumedad.style.display = 'none';
}

function verDatosActualesSalinidad() {
    botonDatosActualesSal.classList.add('activo');
    botonHistorialSal.classList.remove('activo');

    datosActualesSal.style.display = 'block';
    graficaSal.style.display = 'none';
}

function verGraficaSalinidad(){
    botonHistorialSal.classList.add('activo');
    botonDatosActualesSal.classList.add('activo');

    graficaSal.style.display = 'block';
    datosActualesSal.style.display = 'none';
}

function verDatosActualespH() {
    botonDatosActualespH.classList.add('activo');
    botonHistorialpH.classList.remove('activo');

    datosActualespH.style.display = 'block';
    graficapH.style.display = 'none';
}

function verGraficapH(){
    botonHistorialpH.classList.add('activo');
    botonDatosActualespH.classList.add('activo');

    graficapH.style.display = 'block';
    datosActualespH.style.display = 'none';
}

function verDatosActualesTemperatura() {
    botonDatosActualesTemperatura.classList.add('activo');
    botonHistorialTemperatura.classList.remove('activo');

    datosActualesTemperatura.style.display = 'block';
    graficaTemperatura.style.display = 'none';
}

function verGraficaTemperatura(){
    botonHistorialTemperatura.classList.add('activo');
    botonDatosActualesTemperatura.classList.add('activo');

    graficaTemperatura.style.display = 'block';
    datosActualesTemperatura.style.display = 'none';
}

function verDatosActualesLuz() {
    botonDatosActualesLuz.classList.add('activo');
    botonHistorialLuz.classList.remove('activo');

    datosActualesLuz.style.display = 'block';
    graficaLuz.style.display = 'none';
}

function verGraficaLuz(){
    botonHistorialLuz.classList.add('activo');
    botonDatosActualesLuz.classList.add('activo');

    graficaLuz.style.display = 'block';
    datosActualesLuz.style.display = 'none';
}