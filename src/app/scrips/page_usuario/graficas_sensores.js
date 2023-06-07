                        /*
                            ========================
                              SELECTOR DE HUERTOS
                            ========================
                                                      */

//funcion para conseguir la información de la sesión del usuario, para poder recoger el id
//y así poder buscar los huertos del usuario.
async function getSesionUsuario(){

    const respuesta = await fetch('../../../api/sesion/');
    if(respuesta.ok){
        const datos = await respuesta.json();
        console.log(datos);
        return datos;
    }
}

//función para conseguir los huertos del usuario, llama a
async function getHuertosUsuario(){
    let datosDeUsuario = await getSesionUsuario();
    let idUsuario = datosDeUsuario.id_usuario;

    const respuesta = await fetch('../../../api/huertos/');
    if(respuesta.ok) {
        const datos = await respuesta.json();
        console.log(datos);
    }
}

//función para modificar el html para que muestre los huertos del usuario en el selector
//de huertos y que cambie el nombre del huerto.?????????
async function escribirNombreHuerto(){
    getHuertosUsuario();

}

escribirNombreHuerto();




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

let graficaAcordeonSal = new Chart(ctxAcordeonSal,{
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
let ctxAcordeonHumedad = document.getElementById('chart-acordeon-humedad');

let miGraficaHumedad = new Chart(ctxHumedad, {
    type: 'line',
    data: datosHumedad,
    options: opcionesHumedad
});

let graficaAcordeonHumedad = new Chart(ctxAcordeonHumedad,{
    type: 'line',
    data: datosHumedad,
    options: opcionesHumedad
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
let ctxAcordeonTemperatura = document.getElementById('chart-acordeon-temperatura');

let miGraficaTemperatura = new Chart(ctxTemperatura, {
    type: 'line',
    data: datosTemperatura,
    options: opcionesTemperatura
});

let graficaAcordeonTemperatura = new Chart(ctxAcordeonTemperatura, {
    type: 'line',
    data: datosTemperatura,
    options: opcionesTemperatura
})

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
let ctxAcordeonPh = document.getElementById('chart-acordeon-pH')

let miGraficapH = new Chart(ctxpH, {
    type: 'line',
    data: datospH,
    options: opcionespH
});

let graficaAcordeonPh = new Chart(ctxAcordeonPh, {
    type: 'line',
    data: datospH,
    options: opcionespH
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
let ctxAcordeonLuz = document.getElementById('chart-acordeon-luz');

let miGraficaLuz = new Chart(ctxLuz, {
    type: 'line',
    data: datosLuz,
    options: opcionesLuz
});

let graficaAcordeonLuz = new Chart(ctxAcordeonLuz, {
    type: 'line',
    data: datosLuz,
    options: opcionesLuz
});