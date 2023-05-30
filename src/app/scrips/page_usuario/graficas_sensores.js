                        /*
                            ========================
                              GRÁFICA DE SALINIDAD
                            ========================
                                                      */
let datosSal = {
    labels: ['lunes', 'martes', 'miércoles', 'jueves', 'viernes','sábado','domingo'],

    datasets: [
        {
            label: 'datosSal',
            data: [50, 55, 40, 45, 50, 55, 50],
            fill: false,
            backgroundColor: 'rgba(255,69,34,.5)',
            borderColor: 'rgb(255,110,86)',
            borderDash: [2,3],
            tension: 0,
            pointStyle: 'rectRot',
            pointRadius: 10,
        },
    ]
};

let opcionesSal = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
        y: {
            stacked: true
        }
    },
    plugins: {
        legend: false,

        title: {
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

let ctxSal = document.getElementById('chart-sal');
let ctxAcordeonSal = document.getElementById('chart-acordeon-sal');

let miGrafica = new Chart(ctxSal, {
    type: 'line',
    data: datosSal,
    options: opcionesSal
});

                        /*
                            ========================
                              GRÁFICA DE HUMEDAD
                            ========================
                                                      */
let datosHumedad = {
    labels: ['lunes', 'martes', 'miércoles', 'jueves', 'viernes','sábado','domingo'],

    datasets: [
        {
            label: 'datosHumedad',
            data: [50, 55, 40, 45, 50, 55, 50],
            fill: false,
            backgroundColor: 'rgba(255,69,34,.5)',
            borderColor: 'rgb(255,110,86)',
            borderDash: [2,3],
            tension: 0,
            pointStyle: 'rectRot',
            pointRadius: 10,
        },
    ]
};

let opcionesHumedad = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
        y: {
            stacked: true
        }
    },
    plugins: {
        legend: false,

        title: {
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

let ctxHumedad = document.getElementById('chart-humedad');

let miGraficaHumedad = new Chart(ctxHumedad, {
    type: 'line',
    data: datosHumedad, //los datos
    options: opcionesHumedad //las opciones
});

                        /*
                            ========================
                              GRÁFICA DE TEMPERATURA
                            ========================
                                                      */
let datosTemperatura = {
    labels: ['lunes', 'martes', 'miércoles', 'jueves', 'viernes','sábado','domingo'],

    datasets: [
        {
            label: 'datosTemperatura',
            data: [50, 55, 40, 45, 50, 55, 50],
            fill: false,
            backgroundColor: 'rgba(255,69,34,.5)',
            borderColor: 'rgb(255,110,86)',
            borderDash: [2,3],
            tension: 0,
            pointStyle: 'rectRot',
            pointRadius: 10,
        },
    ]
};

let opcionesTemperatura = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
        y: {
            stacked: true
        }
    },
    plugins: {
        legend: false,

        title: {
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

let ctxTemperatura = document.getElementById('chart-temperatura');

let miGraficaTemperatura = new Chart(ctxTemperatura, {
    type: 'line',
    data: datosTemperatura,
    options: opcionesTemperatura
});

                        /*
                            ========================
                                 GRÁFICA DE PH
                            ========================
                                                      */
let datospH = {
    labels: ['lunes', 'martes', 'miércoles', 'jueves', 'viernes','sábado','domingo'],

    datasets: [
        {
            label: 'datospH',
            data: [50, 55, 40, 45, 50, 55, 50],
            fill: false,
            backgroundColor: 'rgba(255,69,34,.5)',
            borderColor: 'rgb(255,110,86)',
            borderDash: [2,3],
            tension: 0,
            pointStyle: 'rectRot',
            pointRadius: 10,
        },
    ]
};

let opcionespH = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
        y: {
            stacked: true
        }
    },
    plugins: {
        legend: false,

        title: {
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

let ctxpH = document.getElementById('chart-pH');

let miGraficapH = new Chart(ctxpH, {
    type: 'line',
    data: datospH, //los datos
    options: opcionespH //las opciones
});

                        /*
                            ========================
                                 GRÁFICA DE LUZ
                            ========================
                                                      */
let datosLuz = {
    labels: ['lunes', 'martes', 'miércoles', 'jueves', 'viernes','sábado','domingo'],

    datasets: [
        {
            label: 'datosLuz',
            data: [50, 55, 40, 45, 50, 55, 50],
            fill: false,
            backgroundColor: 'rgba(255,69,34,.5)',
            borderColor: 'rgb(255,110,86)',
            borderDash: [2,3],
            tension: 0,
            pointStyle: 'rectRot',
            pointRadius: 10,
        },
    ]
};

let opcionesLuz = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
        y: {
            stacked: true
        }
    },
    plugins: {
        legend: false,

        title: {
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

let ctxLuz = document.getElementById('chart-luz');

let miGraficaLuz = new Chart(ctxLuz, {
    type: 'line',
    data: datosLuz, //los datos
    options: opcionesLuz //las opciones
});

/*
                ====================================================
                FUNCIONES PARA BOTONES DE HISTORIAL Y DATOS ACTUALES
                ====================================================
                                                                                */

/*Declaración de variables para realizar las funciones*/

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

/*Funciones:*/
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

function verGraficaSalinidad(){
    graficaSal.style.display = 'block';
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