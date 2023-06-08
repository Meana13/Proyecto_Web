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
        return datos;
    }
}

//función para conseguir los huertos del usuario, llama a
async function getHuertosUsuario(){
    let datosDeUsuario = await getSesionUsuario();
    let idUsuario = datosDeUsuario.id_usuario;

    const respuesta = await fetch('../../../api/huertos/' + '?idUsuario=' + idUsuario);
    if(respuesta.ok) {
        const datos = await respuesta.json();
        return datos;
    }
}

async function getDatosHuertoPorIdHuerto(idHuerto){
    const respuesta = await fetch('../../../api/huertos/' + '?idHuerto=' + idHuerto);
    if(respuesta.ok) {
        const datos = await respuesta.json();
        return datos;
    }
}
//función para modificar el html para que muestre los huertos del usuario en el selector
//de huertos y que cambie el nombre del huerto.
async function escribirNombreHuerto(){
    let huertosDelUsuario = await getHuertosUsuario();
    let nombreDeHuertos = huertosDelUsuario.map(function(huerto){
        return huerto.nombre_huerto;
    });

    let idHuertos = huertosDelUsuario.map(function(huerto){
        return huerto.id_huerto;
    });

    const selector = document.getElementById('seleccionar_huerto');
    for(let i=0; i<nombreDeHuertos.length; i++){
        const opcion = document.createElement('option');
        opcion.value = idHuertos[i];
        opcion.innerText = nombreDeHuertos[i];
        selector.appendChild(opcion);
    }

    const nombreDeHuerto = document.getElementById('nombreDeHuerto');
    nombreDeHuerto.innerText = "";
    nombreDeHuerto.innerText = nombreDeHuertos[0];

    selector.addEventListener('change', async function(){
        let idHuerto = selector.value;

        let datosHuerto = await getDatosHuertoPorIdHuerto(idHuerto);

        nombreDeHuerto.innerText = "";
        nombreDeHuerto.innerText = datosHuerto[0].nombre_huerto;
    });
}

//llamada de la función para que se escriba el nombre en el selector.
escribirNombreHuerto();

/*-----------------------------------------------Aquí acaban las funciones para el selector de huertos*/


                        /*
                           ========================
                                 DATO ACTUAL
                           ========================
                                                    */
async function getDatoActual(){
    //-------Cuando se abre la página por primera vez, está el primero huerto reflejado en la interfaz:-----//

    //conseguimos la id de los huertos del usuario y las metemos en un array:
    let huertosDelUsuario = await getHuertosUsuario();
    let idHuertos = huertosDelUsuario.map(function(huerto){
        return huerto.id_huerto;
    });

    //la primera casilla contendrá la id del primer huerto, el que aparecerá por defecto:
    const idPrimerHuerto = idHuertos[0];
    const respuesta = await fetch('../../../api/mediciones/' + '?idHuerto=' + idPrimerHuerto);
    if(respuesta.ok) {
        const mediciones = await respuesta.json();
        console.log(mediciones);

        //DATO ACTUAL SALINIDAD:
        let datoActualTabSalinidad = document.getElementById('dato_actual_tab_salinidad');
        let datoActualSalinidad = document.getElementById('dato_actual_salinidad');
        let datoActualAcordeonSalinidad = document.getElementById('dato_actual_acordeon_salinidad');

        datoActualTabSalinidad.innerText = "";
        datoActualTabSalinidad.innerText = mediciones[0].mediaSalinidad + "%";

        datoActualSalinidad.innerText = "";
        datoActualSalinidad.innerText = mediciones[0].mediaSalinidad + "%";

        datoActualAcordeonSalinidad.innerText = "";
        datoActualAcordeonSalinidad.innerText = mediciones[0].mediaSalinidad + "%";

        //DATO ACTUAL HUMEDAD:
        let datoActualTabHumedad = document.getElementById('dato_actual_tab_humedad');
        let datoActualHumedad = document.getElementById('dato_actual_humedad');
        let datoActualAcordeonHumedad = document.getElementById('dato_actual_acordeon_humedad');

        datoActualTabHumedad.innerText = "";
        datoActualTabHumedad.innerText = mediciones[0].mediaHumedad + "%";

        datoActualHumedad.innerText = "";
        datoActualHumedad.innerText = mediciones[0].mediaHumedad + "%";

        datoActualAcordeonHumedad.innerText = "";
        datoActualAcordeonHumedad.innerText = mediciones[0].mediaHumedad + "%";

        //DATO ACTUAL PH:
        let datoActualTabPh = document.getElementById('dato_actual_tab_pH');
        let datoActualPh = document.getElementById('dato_actual_pH');
        let datoActualAcordeonPh = document.getElementById('dato_actual_acordeon_pH');

        datoActualTabPh.innerText = "";
        datoActualTabPh.innerText = mediciones[0].mediapH;

        datoActualPh.innerText = "";
        datoActualPh.innerText = mediciones[0].mediapH;

        datoActualAcordeonPh.innerText = "";
        datoActualAcordeonPh.innerText = mediciones[0].mediapH;

        //DATO ACTUAL TEMPERATURA:
        let datoActualTabTemperatura = document.getElementById('dato_actual_tab_Temperatura');
        let datoActualTemperatura = document.getElementById('dato_actual_temperatura');
        let datoActualAcordeonTemperatura = document.getElementById('dato_actual_acordeon_temperatura');

        datoActualTabTemperatura.innerText = "";
        datoActualTabTemperatura.innerText = mediciones[0].mediaTemperatura + "ºC";

        datoActualTemperatura.innerText = "";
        datoActualTemperatura.innerText = mediciones[0].mediaTemperatura + "ºC";

        datoActualAcordeonTemperatura.innerText = "";
        datoActualAcordeonTemperatura.innerText = mediciones[0].mediaTemperatura + "ºC";

        //DATO ACTUAL LUZ:
        let datoActualTabLuz = document.getElementById('dato_actual_tab_luz');
        let datoActualLuz = document.getElementById('dato_actual_luz');
        let datoActualAcordeonLuz = document.getElementById('dato_actual_acordeon_luz');

        datoActualTabLuz.innerText = "";
        datoActualTabLuz.innerText = mediciones[0].mediaLuminosidad;

        datoActualLuz.innerText = "";
        datoActualLuz.innerText = mediciones[0].mediaLuminosidad;

        datoActualAcordeonLuz.innerText = "";
        datoActualAcordeonLuz.innerText = mediciones[0].mediaLuminosidad;

    }


    //----------------Cuando se selecciona una opción del selector:----------------------//

    const selector = document.getElementById('seleccionar_huerto');

    //conseguimos la id del huerto seleccionado
    selector.addEventListener('change', async function() {
        let idHuerto = selector.value;
        console.log(idHuerto);

        //pasamos la id en la query del fetch
        const respuesta = await fetch('../../../api/mediciones/' + '?idHuerto=' + idHuerto);
        if(respuesta.ok) {
            const mediciones = await respuesta.json();
            console.log(mediciones);

            //DATO ACTUAL SALINIDAD:
            let datoActualTabSalinidad = document.getElementById('dato_actual_tab_salinidad');
            let datoActualSalinidad = document.getElementById('dato_actual_salinidad');
            let datoActualAcordeonSalinidad = document.getElementById('dato_actual_acordeon_salinidad');

            datoActualTabSalinidad.innerText = "";
            datoActualTabSalinidad.innerText = mediciones[0].mediaSalinidad + "%";

            datoActualSalinidad.innerText = "";
            datoActualSalinidad.innerText = mediciones[0].mediaSalinidad + "%";

            datoActualAcordeonSalinidad.innerText = "";
            datoActualAcordeonSalinidad.innerText = mediciones[0].mediaSalinidad + "%";

            //DATO ACTUAL HUMEDAD:
            let datoActualTabHumedad = document.getElementById('dato_actual_tab_humedad');
            let datoActualHumedad = document.getElementById('dato_actual_humedad');
            let datoActualAcordeonHumedad = document.getElementById('dato_actual_acordeon_humedad');


            datoActualTabHumedad.innerText = "";
            datoActualTabHumedad.innerText = mediciones[0].mediaHumedad + "%";

            datoActualHumedad.innerText = "";
            datoActualHumedad.innerText = mediciones[0].mediaHumedad + "%";

            datoActualAcordeonHumedad.innerText = "";
            datoActualAcordeonHumedad.innerText = mediciones[0].mediaHumedad + "%";


            //DATO ACTUAL PH:
            let datoActualTabPh = document.getElementById('dato_actual_tab_pH');
            let datoActualPh = document.getElementById('dato_actual_pH');
            let datoActualAcordeonPh = document.getElementById('dato_actual_acordeon_pH');


            datoActualTabPh.innerText = "";
            datoActualTabPh.innerText = mediciones[0].mediapH;

            datoActualPh.innerText = "";
            datoActualPh.innerText = mediciones[0].mediapH;

            datoActualAcordeonPh.innerText = "";
            datoActualAcordeonPh.innerText = mediciones[0].mediapH;


            //DATO ACTUAL TEMPERATURA:
            let datoActualTabTemperatura = document.getElementById('dato_actual_tab_Temperatura');
            let datoActualTemperatura = document.getElementById('dato_actual_temperatura');
            let datoActualAcordeonTemperatura = document.getElementById('dato_actual_acordeon_temperatura');


            datoActualTabTemperatura.innerText = "";
            datoActualTabTemperatura.innerText = mediciones[0].mediaTemperatura + "ºC";

            datoActualTemperatura.innerText = "";
            datoActualTemperatura.innerText = mediciones[0].mediaTemperatura + "ºC";

            datoActualAcordeonTemperatura.innerText = "";
            datoActualAcordeonTemperatura.innerText = mediciones[0].mediaTemperatura + "ºC";


            //DATO ACTUAL LUZ:
            let datoActualTabLuz = document.getElementById('dato_actual_tab_luz');
            let datoActualLuz = document.getElementById('dato_actual_luz');
            let datoActualAcordeonLuz = document.getElementById('dato_actual_acordeon_luz');


            datoActualTabLuz.innerText = "";
            datoActualTabLuz.innerText = mediciones[0].mediaLuminosidad;

            datoActualLuz.innerText = "";
            datoActualLuz.innerText = mediciones[0].mediaLuminosidad;

            datoActualAcordeonLuz.innerText = "";
            datoActualAcordeonLuz.innerText = mediciones[0].mediaLuminosidad;
        }
    });
}

getDatoActual();


/*-----------------------------------------------Aquí acaban las funciones para obtener el dato actual*/


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