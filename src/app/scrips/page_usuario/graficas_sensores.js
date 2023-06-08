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
    const respuesta = await fetch('../../../api/medicionesDatoActual/' + '?idHuerto=' + idPrimerHuerto);
    if(respuesta.ok) {
        const mediciones = await respuesta.json();

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

        //pasamos la id en la query del fetch
        const respuesta = await fetch('../../../api/medicionesDatoActual/' + '?idHuerto=' + idHuerto);
        if(respuesta.ok) {
            const mediciones = await respuesta.json();

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

let ctxSal = document.getElementById('chart-sal');
let ctxAcordeonSal = document.getElementById('chart-acordeon-sal');

let miGraficaSal = new Chart(ctxSal, {
    type: 'line'
});

let graficaAcordeonSal = new Chart(ctxAcordeonSal,{
    type: 'line'
});
                        /*
                            ========================
                              GRÁFICA DE HUMEDAD
                            ========================
                                                      */

let ctxHumedad = document.getElementById('chart-humedad');
let ctxAcordeonHumedad = document.getElementById('chart-acordeon-humedad');

let miGraficaHumedad = new Chart(ctxHumedad, {
    type: 'line',
});

let graficaAcordeonHumedad = new Chart(ctxAcordeonHumedad,{
    type: 'line',
});

                        /*
                            ========================
                                 GRÁFICA DE PH
                            ========================
                                                      */

let ctxpH = document.getElementById('chart-pH');
let ctxAcordeonPh = document.getElementById('chart-acordeon-pH')

let miGraficapH = new Chart(ctxpH, {
      type: 'line'
});

let graficaAcordeonPh = new Chart(ctxAcordeonPh, {
      type: 'line'
});


                        /*
                            ========================
                              GRÁFICA DE TEMPERATURA
                            ========================
                                                      */

let ctxTemperatura = document.getElementById('chart-temperatura');
let ctxAcordeonTemperatura = document.getElementById('chart-acordeon-temperatura');

let miGraficaTemperatura = new Chart(ctxTemperatura, {
    type: 'line'
});

let graficaAcordeonTemperatura = new Chart(ctxAcordeonTemperatura, {
    type: 'line'
});

                        /*
                            ========================
                                 GRÁFICA DE LUZ
                            ========================
                                                      */

let ctxLuz = document.getElementById('chart-luz');
let ctxAcordeonLuz = document.getElementById('chart-acordeon-luz');

let miGraficaLuz = new Chart(ctxLuz, {
    type: 'line'
});

let graficaAcordeonLuz = new Chart(ctxAcordeonLuz, {
    type: 'line'
});

                /*
                    =========================================================================
                                               FILTRO DE FECHA: HOY
                    =========================================================================
                                                                                                */

async function getDatosHoy() {

    //los datos que se mostrarán por defecto son los de Hoy: -----------------POR DEFECTO: SIN PULSAR NINGÚN BOTÓN

    //conseguimos la id de los huertos del usuario y las metemos en un array:
    let huertosDelUsuario = await getHuertosUsuario();
    let idHuertos = huertosDelUsuario.map(function (huerto) {
        return huerto.id_huerto;
    });

    //la primera casilla contendrá la id del primer huerto, el que aparecerá por defecto:
    const idPrimerHuerto = idHuertos[0];
    const respuesta = await fetch('../../../api/medicionesHoy/' + '?idHuerto=' + idPrimerHuerto);
    if (respuesta.ok) {
        const mediciones = await respuesta.json();

        let horas = mediciones.map(function (medicion) {
            return medicion.hora + ":" + medicion.minutos;
        });

        let dias = mediciones.map(function (medicion) {
            let fecha = medicion.fecha_medicion;

            let partes = fecha.split("-");
            var anio = partes[0];
            var mes = partes[1];
            var dia = partes[2];

            var fechaFormateada = dia + "/" + mes + "/" + anio;

            return fechaFormateada;
        });

        //GRÁFICA SALINIDAD - DATOS HOY -----------------------------------------------------------------------
        let datosSalinidadHoy = {
            labels: [],
            datasets: [
                {
                    label: "Salinidad (%)",
                    data: [],
                    tension: 0.2,
                    fill: false,
                    backgroundColor: 'rgba(121,0,80,.8)',
                    borderColor: '#790050',
                    pointStyle: 'circle',
                    pointRadius: 7,
                    borderWidth: 2,
                }
            ]
        };

        let opcionesSalinidadHoy = {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    grid: {
                        drawOnChartArea: false
                    }
                },
                y: {
                    stacked: true
                }
            },
            plugins: {
                legend: false,
                title: {
                    display: true,
                    text: 'Salinidad (%)',
                    position: 'top',
                    align: 'start',
                    padding: {
                        bottom: 10
                    },
                    font: {
                        size: 15
                    }
                },
                tooltip: {
                    backgroundColor: '#fff',
                    titleColor: '#000',
                    titleAlign: 'center',
                    bodyColor: '#333',
                    borderColor: '#666',
                    borderWidth: 1,
                    yAlign: 'top',
                    displayColors: false,
                }
            }//plugins
        }

        for (let i = 3; i >= 0; i--) {
            datosSalinidadHoy.labels.push(horas[i]);
            datosSalinidadHoy.datasets[0].data.push(mediciones[i].mediaSalinidad);
        }

        miGraficaSal.options = opcionesSalinidadHoy;
        miGraficaSal.data = datosSalinidadHoy;
        miGraficaSal.update();

        graficaAcordeonSal.options = opcionesSalinidadHoy;
        graficaAcordeonSal.data = datosSalinidadHoy;
        graficaAcordeonSal.update();


        //GRAFICA HUMEDAD - DATOS HOY ---------------------------------------------------------------------
        let datosHumedadHoy = {
            labels: [],
            datasets: [
                {
                    label: "Humedad (%)",
                    data: [],
                    tension: 0.2,
                    fill: false,
                    backgroundColor: 'rgba(121,0,80,.8)',
                    borderColor: '#790050',
                    pointStyle: 'circle',
                    pointRadius: 7,
                    borderWidth: 2,
                }
            ]
        };

        let opcionesHumedadHoy = {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    grid: {
                        drawOnChartArea: false
                    }
                },
                y: {
                    stacked: true
                }
            },
            plugins: {
                legend: false,
                title: {
                    display: true,
                    text: 'Humedad (%)',
                    position: 'top',
                    align: 'start',
                    padding: {
                        bottom: 10
                    },
                    font: {
                        size: 15
                    }
                },
                tooltip: {
                    backgroundColor: '#fff',
                    titleColor: '#000',
                    titleAlign: 'center',
                    bodyColor: '#333',
                    borderColor: '#666',
                    borderWidth: 1,
                    yAlign: 'top',
                    displayColors: false,
                }
            }//plugins
        }

        for (let i = 3; i >= 0; i--) {
            datosHumedadHoy.labels.push(horas[i]);
            datosHumedadHoy.datasets[0].data.push(mediciones[i].mediaHumedad);
        }

        miGraficaHumedad.options = opcionesHumedadHoy;
        miGraficaHumedad.data = datosHumedadHoy;
        miGraficaHumedad.update();

        graficaAcordeonHumedad.options = opcionesHumedadHoy;
        graficaAcordeonHumedad.data = datosHumedadHoy;
        graficaAcordeonHumedad.update();


        //GRAFICA PH - DATOS HOY ---------------------------------------------------------------------
        let datosPhHoy = {
            labels: [],
            datasets: [
                {
                    label: "pH",
                    data: [],
                    tension: 0.2,
                    fill: false,
                    backgroundColor: 'rgba(121,0,80,.8)',
                    borderColor: '#790050',
                    pointStyle: 'circle',
                    pointRadius: 7,
                    borderWidth: 2,
                }
            ]
        };

        let opcionesPhHoy = {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    grid: {
                        drawOnChartArea: false
                    }
                },
                y: {
                    stacked: true
                }
            },
            plugins: {
                legend: false,
                title: {
                    display: true,
                    text: 'pH',
                    position: 'top',
                    align: 'start',
                    padding: {
                        bottom: 10
                    },
                    font: {
                        size: 15
                    }
                },
                tooltip: {
                    backgroundColor: '#fff',
                    titleColor: '#000',
                    titleAlign: 'center',
                    bodyColor: '#333',
                    borderColor: '#666',
                    borderWidth: 1,
                    yAlign: 'top',
                    displayColors: false,
                }
            }//plugins
        }

        for (let i = 3; i >= 0; i--) {
            datosPhHoy.labels.push(horas[i]);
            datosPhHoy.datasets[0].data.push(mediciones[i].mediapH);
        }

        miGraficapH.options = opcionesPhHoy;
        miGraficapH.data = datosPhHoy;
        miGraficapH.update();

        graficaAcordeonPh.options = opcionesPhHoy;
        graficaAcordeonPh.data = datosPhHoy;
        graficaAcordeonPh.update();


        //GRAFICA TEMPERATURA - DATOS HOY ---------------------------------------------------------------------
        let datosTemperaturaHoy = {
            labels: [],
            datasets: [
                {
                    label: "Temperatura (ºC)",
                    data: [],
                    tension: 0.2,
                    fill: false,
                    backgroundColor: 'rgba(121,0,80,.8)',
                    borderColor: '#790050',
                    pointStyle: 'circle',
                    pointRadius: 7,
                    borderWidth: 2,
                }
            ]
        };

        let opcionesTemperaturaHoy = {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    grid: {
                        drawOnChartArea: false
                    }
                },
                y: {
                    stacked: true
                }
            },
            plugins: {
                legend: false,
                title: {
                    display: true,
                    text: 'Temperatura (ºC)',
                    position: 'top',
                    align: 'start',
                    padding: {
                        bottom: 10
                    },
                    font: {
                        size: 15
                    }
                },
                tooltip: {
                    backgroundColor: '#fff',
                    titleColor: '#000',
                    titleAlign: 'center',
                    bodyColor: '#333',
                    borderColor: '#666',
                    borderWidth: 1,
                    yAlign: 'top',
                    displayColors: false,
                }
            }//plugins
        }

        for (let i = 3; i >= 0; i--) {
            datosTemperaturaHoy.labels.push(horas[i]);
            datosTemperaturaHoy.datasets[0].data.push(mediciones[i].mediaTemperatura);
        }

        miGraficaTemperatura.options = opcionesTemperaturaHoy;
        miGraficaTemperatura.data = datosTemperaturaHoy;
        miGraficaTemperatura.update();

        graficaAcordeonTemperatura.options = opcionesTemperaturaHoy;
        graficaAcordeonTemperatura.data = datosTemperaturaHoy;
        graficaAcordeonTemperatura.update();


        //GRAFICA LUZ - DATOS HOY ---------------------------------------------------------------------
        let datosLuzHoy = {
            labels: [],
            datasets: [
                {
                    label: "Luz",
                    data: [],
                    tension: 0.2,
                    fill: false,
                    backgroundColor: 'rgba(121,0,80,.8)',
                    borderColor: '#790050',
                    pointStyle: 'circle',
                    pointRadius: 7,
                    borderWidth: 2,
                }
            ]
        };

        let opcionesLuzHoy = {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    grid: {
                        drawOnChartArea: false
                    }
                },
                y: {
                    stacked: true
                }
            },
            plugins: {
                legend: false,
                title: {
                    display: true,
                    text: 'Luz: 0 - Oscuridad, 1 - Poco iluminado, 2 - Sombra, 3 - Luz directa',
                    position: 'top',
                    align: 'start',
                    padding: {
                        bottom: 10
                    },
                    font: {
                        size: 15
                    }
                },
                tooltip: {
                    backgroundColor: '#fff',
                    titleColor: '#000',
                    titleAlign: 'center',
                    bodyColor: '#333',
                    borderColor: '#666',
                    borderWidth: 1,
                    yAlign: 'top',
                    displayColors: false,
                }
            }//plugins
        }

        for (let i = 3; i >= 0; i--) {
            datosLuzHoy.labels.push(horas[i]);
            datosLuzHoy.datasets[0].data.push(mediciones[i].mediaLuminosidad);
        }

        miGraficaLuz.options = opcionesLuzHoy;
        miGraficaLuz.data = datosLuzHoy;
        miGraficaLuz.update();

        graficaAcordeonLuz.options = opcionesLuzHoy;
        graficaAcordeonLuz.data = datosLuzHoy;
        graficaAcordeonLuz.update();
    }
//------------------------------------------------------------------------------Aquí acaban los datos por defecto


// ----------------Cuando se selecciona una opción del selector:----------------------------------SELECTOR

    const selector = document.getElementById('seleccionar_huerto');

    //conseguimos la id del huerto seleccionado
    selector.addEventListener('change', async function () {
        let idHuerto = selector.value;

        //pasamos la id en la query del fetch
        const respuesta = await fetch('../../../api/medicionesHoy/' + '?idHuerto=' + idHuerto);
        if (respuesta.ok) {
            const mediciones = await respuesta.json();

            let horas = mediciones.map(function (medicion) {
                return medicion.hora + ":" + medicion.minutos;
            });


            //GRÁFICA SALINIDAD - DATOS HOY -----------------------------------------------------------------------
            let datosSalinidadHoy = {
                labels: [],
                datasets: [
                    {
                        label: "Salinidad (%)",
                        data: [],
                        tension: 0.2,
                        fill: false,
                        backgroundColor: 'rgba(121,0,80,.8)',
                        borderColor: '#790050',
                        pointStyle: 'circle',
                        pointRadius: 7,
                        borderWidth: 2,
                    }
                ]
            };

            let opcionesSalinidadHoy = {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        grid: {
                            drawOnChartArea: false
                        }
                    },
                    y: {
                        stacked: true
                    }
                },
                plugins: {
                    legend: false,
                    title: {
                        display: true,
                        text: 'Salinidad (%)',
                        position: 'top',
                        align: 'start',
                        padding: {
                            bottom: 10
                        },
                        font: {
                            size: 15
                        }
                    },
                    tooltip: {
                        backgroundColor: '#fff',
                        titleColor: '#000',
                        titleAlign: 'center',
                        bodyColor: '#333',
                        borderColor: '#666',
                        borderWidth: 1,
                        yAlign: 'top',
                        displayColors: false,
                    }
                }//plugins
            }

            for (let i = 3; i >= 0; i--) {
                datosSalinidadHoy.labels.push(horas[i]);
                datosSalinidadHoy.datasets[0].data.push(mediciones[i].mediaSalinidad);
            }

            miGraficaSal.options = opcionesSalinidadHoy;
            miGraficaSal.data = datosSalinidadHoy;
            miGraficaSal.update();

            graficaAcordeonSal.options = opcionesSalinidadHoy;
            graficaAcordeonSal.data = datosSalinidadHoy;
            graficaAcordeonSal.update();


            //GRAFICA HUMEDAD - DATOS HOY ---------------------------------------------------------------------
            let datosHumedadHoy = {
                labels: [],
                datasets: [
                    {
                        label: "Humedad (%)",
                        data: [],
                        tension: 0.2,
                        fill: false,
                        backgroundColor: 'rgba(121,0,80,.8)',
                        borderColor: '#790050',
                        pointStyle: 'circle',
                        pointRadius: 7,
                        borderWidth: 2,
                    }
                ]
            };

            let opcionesHumedadHoy = {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        grid: {
                            drawOnChartArea: false
                        }
                    },
                    y: {
                        stacked: true
                    }
                },
                plugins: {
                    legend: false,
                    title: {
                        display: true,
                        text: 'Humedad (%)',
                        position: 'top',
                        align: 'start',
                        padding: {
                            bottom: 10
                        },
                        font: {
                            size: 15
                        }
                    },
                    tooltip: {
                        backgroundColor: '#fff',
                        titleColor: '#000',
                        titleAlign: 'center',
                        bodyColor: '#333',
                        borderColor: '#666',
                        borderWidth: 1,
                        yAlign: 'top',
                        displayColors: false,
                    }
                }//plugins
            }

            for (let i = 3; i >= 0; i--) {
                datosHumedadHoy.labels.push(horas[i]);
                datosHumedadHoy.datasets[0].data.push(mediciones[i].mediaHumedad);
            }

            miGraficaHumedad.options = opcionesHumedadHoy;
            miGraficaHumedad.data = datosHumedadHoy;
            miGraficaHumedad.update();

            graficaAcordeonHumedad.options = opcionesHumedadHoy;
            graficaAcordeonHumedad.data = datosHumedadHoy;
            graficaAcordeonHumedad.update();


            //GRAFICA PH - DATOS HOY ---------------------------------------------------------------------
            let datosPhHoy = {
                labels: [],
                datasets: [
                    {
                        label: "pH",
                        data: [],
                        tension: 0.2,
                        fill: false,
                        backgroundColor: 'rgba(121,0,80,.8)',
                        borderColor: '#790050',
                        pointStyle: 'circle',
                        pointRadius: 7,
                        borderWidth: 2,
                    }
                ]
            };

            let opcionesPhHoy = {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        grid: {
                            drawOnChartArea: false
                        }
                    },
                    y: {
                        stacked: true
                    }
                },
                plugins: {
                    legend: false,
                    title: {
                        display: true,
                        text: 'pH',
                        position: 'top',
                        align: 'start',
                        padding: {
                            bottom: 10
                        },
                        font: {
                            size: 15
                        }
                    },
                    tooltip: {
                        backgroundColor: '#fff',
                        titleColor: '#000',
                        titleAlign: 'center',
                        bodyColor: '#333',
                        borderColor: '#666',
                        borderWidth: 1,
                        yAlign: 'top',
                        displayColors: false,
                    }
                }//plugins
            }

            for (let i = 3; i >= 0; i--) {
                datosPhHoy.labels.push(horas[i]);
                datosPhHoy.datasets[0].data.push(mediciones[i].mediapH);
            }

            miGraficapH.options = opcionesPhHoy;
            miGraficapH.data = datosPhHoy;
            miGraficapH.update();

            graficaAcordeonPh.options = opcionesPhHoy;
            graficaAcordeonPh.data = datosPhHoy;
            graficaAcordeonPh.update();


            //GRAFICA TEMPERATURA - DATOS HOY ---------------------------------------------------------------------
            let datosTemperaturaHoy = {
                labels: [],
                datasets: [
                    {
                        label: "Temperatura (ºC)",
                        data: [],
                        tension: 0.2,
                        fill: false,
                        backgroundColor: 'rgba(121,0,80,.8)',
                        borderColor: '#790050',
                        pointStyle: 'circle',
                        pointRadius: 7,
                        borderWidth: 2,
                    }
                ]
            };

            let opcionesTemperaturaHoy = {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        grid: {
                            drawOnChartArea: false
                        }
                    },
                    y: {
                        stacked: true
                    }
                },
                plugins: {
                    legend: false,
                    title: {
                        display: true,
                        text: 'Temperatura (ºC)',
                        position: 'top',
                        align: 'start',
                        padding: {
                            bottom: 10
                        },
                        font: {
                            size: 15
                        }
                    },
                    tooltip: {
                        backgroundColor: '#fff',
                        titleColor: '#000',
                        titleAlign: 'center',
                        bodyColor: '#333',
                        borderColor: '#666',
                        borderWidth: 1,
                        yAlign: 'top',
                        displayColors: false,
                    }
                }//plugins
            }

            for (let i = 3; i >= 0; i--) {
                datosTemperaturaHoy.labels.push(horas[i]);
                datosTemperaturaHoy.datasets[0].data.push(mediciones[i].mediaTemperatura);
            }

            miGraficaTemperatura.options = opcionesTemperaturaHoy;
            miGraficaTemperatura.data = datosTemperaturaHoy;
            miGraficaTemperatura.update();

            graficaAcordeonTemperatura.options = opcionesTemperaturaHoy;
            graficaAcordeonTemperatura.data = datosTemperaturaHoy;
            graficaAcordeonTemperatura.update();


            //GRAFICA LUZ - DATOS HOY ---------------------------------------------------------------------
            let datosLuzHoy = {
                labels: [],
                datasets: [
                    {
                        label: "Luz",
                        data: [],
                        tension: 0.2,
                        fill: false,
                        backgroundColor: 'rgba(121,0,80,.8)',
                        borderColor: '#790050',
                        pointStyle: 'circle',
                        pointRadius: 7,
                        borderWidth: 2,
                    }
                ]
            };

            let opcionesLuzHoy = {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        grid: {
                            drawOnChartArea: false
                        }
                    },
                    y: {
                        stacked: true
                    }
                },
                plugins: {
                    legend: false,
                    title: {
                        display: true,
                        text: 'Luz: 0 - Oscuridad, 1 - Poco iluminado, 2 - Sombra, 3 - Luz directa',
                        position: 'top',
                        align: 'start',
                        padding: {
                            bottom: 10
                        },
                        font: {
                            size: 15
                        }
                    },
                    tooltip: {
                        backgroundColor: '#fff',
                        titleColor: '#000',
                        titleAlign: 'center',
                        bodyColor: '#333',
                        borderColor: '#666',
                        borderWidth: 1,
                        yAlign: 'top',
                        displayColors: false,
                    }
                }//plugins
            }

            for (let i = 3; i >= 0; i--) {
                datosLuzHoy.labels.push(horas[i]);
                datosLuzHoy.datasets[0].data.push(mediciones[i].mediaLuminosidad);
            }

            miGraficaLuz.options = opcionesLuzHoy;
            miGraficaLuz.data = datosLuzHoy;
            miGraficaLuz.update();

            graficaAcordeonLuz.options = opcionesLuzHoy;
            graficaAcordeonLuz.data = datosLuzHoy;
            graficaAcordeonLuz.update();

        }
    });

}
getDatosHoy();








