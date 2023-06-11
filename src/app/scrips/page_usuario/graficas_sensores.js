                        /*
                            ========================
                              SELECTOR DE HUERTOS
                            ========================
                                                      */

//funcion para conseguir la información de la sesión del usuario, para poder recoger el id
//y así poder buscar los huertos del usuario.
//------------------------------------------
/*
getSesionUsuario() --> datos

____datos____
id_usuario: N
nombre: txt
idRol: N
rol: txt
_____________

*/
//------------------------------------------
async function getSesionUsuario(){

    const respuesta = await fetch('../../../api/sesion/');
    if(respuesta.ok){
        const datos = await respuesta.json();
        return datos;
    }
}

//------------------------------------------
/*
getHuertosUsuario() --> [datos]

____datos____
id_huerto: N
imagen: txt
nombre_huerto: txt
notas: txt
notificaciones: VoF
_____________
*/
//------------------------------------------
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


// ----------------Cuando se selecciona una opción del selector de huerto:----------------------------------SELECTOR HUERTO

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
        //-----------------------------------------------------Aquí acaban los datos cuando se usa el selector de huerto

    });
}


getDatosHoy(); //llamada de la función para que se ejecute por defecto cuando cargue la página

//Para que se ejecute la anterior función cuando se pulse la opción de "Hoy" en el filtro de la gráfica:
function filtroHoyPulsado() {

    //--------------------------------------------------------------------------------------------FILTROS VISUALIZADOR
    let filtroSalinidad = document.getElementById('filtro_salinidad');
    let filtroHumedad = document.getElementById('filtro_humedad');
    let filtroPh = document.getElementById('filtro_pH');
    let filtroTemperatura = document.getElementById('filtro_temperatura');
    let filtroLuz = document.getElementById('filtro_luz');


    filtroSalinidad.addEventListener('change', async function () {
        if (filtroSalinidad.value === 'Hoy') {
            getDatosHoy();
        }
    });

    filtroHumedad.addEventListener('change', async function () {
        if (filtroHumedad.value === 'Hoy') {
            getDatosHoy();
        }
    });

    filtroPh.addEventListener('change', async function () {
        if (filtroPh.value === 'Hoy') {
            getDatosHoy();
        }
    });

    filtroTemperatura.addEventListener('change', async function () {
        if (filtroTemperatura.value === 'Hoy') {
            getDatosHoy();
        }
    });

    filtroLuz.addEventListener('change', async function () {
        if (filtroLuz.value === 'Hoy') {
            getDatosHoy();
        }
    });


    //--------------------------------------------------------------------------------------------FILTROS ACORDEON
    let filtroAcordeonSalinidad = document.getElementById('filtro_acordeon_salinidad');
    let filtroAcordeonHumedad = document.getElementById('filtro_acordeon_humedad');
    let filtroAcordeonPh = document.getElementById('filtro_acordeon_pH');
    let filtroAcordeonTemperatura = document.getElementById('filtro_acordeon_temperatura');
    let filtroAcordeonLuz = document.getElementById('filtro_acordeon_luz');

    filtroAcordeonSalinidad.addEventListener('change', async function () {
        if (filtroAcordeonSalinidad.value === 'Hoy') {
            getDatosHoy();
        }
    });

    filtroAcordeonHumedad.addEventListener('change', async function () {
        if (filtroAcordeonHumedad.value === 'Hoy') {
            getDatosHoy();
        }
    });

    filtroAcordeonPh.addEventListener('change', async function () {
        if (filtroAcordeonPh.value === 'Hoy') {
            getDatosHoy();
        }
    });

    filtroAcordeonTemperatura.addEventListener('change', async function () {
        if (filtroAcordeonTemperatura.value === 'Hoy') {
            getDatosHoy();
        }
    });

    filtroAcordeonLuz.addEventListener('change', async function () {
        if (filtroAcordeonLuz.value === 'Hoy') {
            getDatosHoy();
        }
    });

}

filtroHoyPulsado();

//-----------------------------------------------------Aquí acaban las funciones de los datos de hoy de la gráfica.


                        /*
                            =========================================================================
                                                       FILTRO DE FECHA: SEMANA
                            =========================================================================
                                                                                                        */

/*Los datos de la semana no se mostrarán por defecto, por tanto solo se mostrarán cuando se escoja la opción del selector:*/
async function getDatosSemana() {


    //Para que se carguen los datos del huerto que se muestre por defecto:

    //---------------------------------------------------------------------------GRAFICA SALINIDAD

    let filtroSalinidad = document.getElementById('filtro_salinidad');
    let filtroAcordeonSalinidad = document.getElementById('filtro_acordeon_salinidad');

    filtroSalinidad.addEventListener('change', async function () {

        if (filtroSalinidad.value === 'Semana') {

            //conseguimos la id de los huertos del usuario y las metemos en un array:
            let huertosDelUsuario = await getHuertosUsuario();
            let idHuertos = huertosDelUsuario.map(function (huerto) {
                return huerto.id_huerto;
            });

            //la primera casilla contendrá la id del primer huerto, el que aparecerá por defecto:
            const idPrimerHuerto = idHuertos[0];
            const respuesta = await fetch('../../../api/medicionesSemana/' + '?idHuerto=' + idPrimerHuerto);
            if (respuesta.ok) {
                const mediciones = await respuesta.json();
                console.log(mediciones);

                let dias = mediciones.map(function (medicion) {
                    let fecha = medicion.fecha_medicion;

                    let partes = fecha.split("-");
                    var anio = partes[0];
                    var mes = partes[1];
                    var dia = partes[2];

                    var fechaFormateada = dia + "/" + mes + "/" + anio;

                    return fechaFormateada;
                });


                let datosSalinidadSemana = {
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

                let opcionesSalinidadSemana = {
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

                for (let i = 6; i >= 0; i--) {
                    datosSalinidadSemana.labels.push(dias[i]);
                    datosSalinidadSemana.datasets[0].data.push(mediciones[i].mediaSalinidad);
                }

                miGraficaSal.options = opcionesSalinidadSemana;
                miGraficaSal.data = datosSalinidadSemana;
                miGraficaSal.update();


            }
//------------------------------------------------------------------------------------------SELECTOR DE HUERTO
            const selector = document.getElementById('seleccionar_huerto');

            //conseguimos la id del huerto seleccionado
            selector.addEventListener('change', async function () {
                let idHuerto = selector.value;

                //pasamos la id en la query del fetch
                const respuesta = await fetch('../../../api/medicionesSemana/' + '?idHuerto=' + idHuerto);
                if (respuesta.ok) {
                    const mediciones = await respuesta.json();


                    console.log(mediciones);

                    let dias = mediciones.map(function (medicion) {
                        let fecha = medicion.fecha_medicion;

                        let partes = fecha.split("-");
                        var anio = partes[0];
                        var mes = partes[1];
                        var dia = partes[2];

                        var fechaFormateada = dia + "/" + mes + "/" + anio;

                        return fechaFormateada;
                    });


                    //GRÁFICA SALINIDAD - DATOS SEMANA -----------------------------------------------------------------------
                    let datosSalinidadSemana = {
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

                    let opcionesSalinidadSemana = {
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

                    for (let i = 6; i >= 0; i--) {
                        datosSalinidadSemana.labels.push(dias[i]);
                        datosSalinidadSemana.datasets[0].data.push(mediciones[i].mediaSalinidad);
                    }

                    miGraficaSal.options = opcionesSalinidadSemana;
                    miGraficaSal.data = datosSalinidadSemana;
                    miGraficaSal.update();
                }

            });
        }
    });

    filtroAcordeonSalinidad.addEventListener('change', async function () {

        if (filtroAcordeonSalinidad.value === 'Semana') {
            //conseguimos la id de los huertos del usuario y las metemos en un array:
            let huertosDelUsuario = await getHuertosUsuario();
            let idHuertos = huertosDelUsuario.map(function (huerto) {
                return huerto.id_huerto;
            });

            //la primera casilla contendrá la id del primer huerto, el que aparecerá por defecto:
            const idPrimerHuerto = idHuertos[0];
            const respuesta = await fetch('../../../api/medicionesSemana/' + '?idHuerto=' + idPrimerHuerto);
            if (respuesta.ok) {
                const mediciones = await respuesta.json();


                let dias = mediciones.map(function (medicion) {
                    let fecha = medicion.fecha_medicion;

                    let partes = fecha.split("-");
                    var anio = partes[0];
                    var mes = partes[1];
                    var dia = partes[2];

                    var fechaFormateada = dia + "/" + mes + "/" + anio;

                    return fechaFormateada;
                });


                //GRÁFICA SALINIDAD - DATOS SEMANA -----------------------------------------------------------------------
                let datosSalinidadSemana = {
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

                let opcionesSalinidadSemana = {
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

                for (let i = 6; i >= 0; i--) {
                    datosSalinidadSemana.labels.push(dias[i]);
                    datosSalinidadSemana.datasets[0].data.push(mediciones[i].mediaSalinidad);
                }

                graficaAcordeonSal.options = opcionesSalinidadSemana;
                graficaAcordeonSal.data = datosSalinidadSemana;
                graficaAcordeonSal.update();
            }
            const selector = document.getElementById('seleccionar_huerto');

            //conseguimos la id del huerto seleccionado
            selector.addEventListener('change', async function () {
                let idHuerto = selector.value;

                //pasamos la id en la query del fetch
                const respuesta = await fetch('../../../api/medicionesSemana/' + '?idHuerto=' + idHuerto);
                if (respuesta.ok) {
                    const mediciones = await respuesta.json();


                    console.log(mediciones);

                    let dias = mediciones.map(function (medicion) {
                        let fecha = medicion.fecha_medicion;

                        let partes = fecha.split("-");
                        var anio = partes[0];
                        var mes = partes[1];
                        var dia = partes[2];

                        var fechaFormateada = dia + "/" + mes + "/" + anio;

                        return fechaFormateada;
                    });


                    //GRÁFICA SALINIDAD - DATOS SEMANA -----------------------------------------------------------------------
                    let datosSalinidadSemana = {
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

                    let opcionesSalinidadSemana = {
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

                    for (let i = 6; i >= 0; i--) {
                        datosSalinidadSemana.labels.push(dias[i]);
                        datosSalinidadSemana.datasets[0].data.push(mediciones[i].mediaSalinidad);
                    }

                    graficaAcordeonSal.options = opcionesSalinidadSemana;
                    graficaAcordeonSal.data = datosSalinidadSemana;
                    graficaAcordeonSal.update();
                }

            });
        }
    });




    //-----------------------------------------------------------------------SEMANA----GRAFICA PH

    //-------------------------------------------------------------------------------VISUALIZADOR
    let filtroPh = document.getElementById('filtro_pH');
    let filtroAcordeonPh = document.getElementById('filtro_acordeon_pH');

    filtroPh.addEventListener('change', async function () {

        if (filtroPh.value === 'Semana') {

            //-----------------------------------------------------------------------------HUERTO POR DEFECTO
            //conseguimos la id de los huertos del usuario y las metemos en un array:
            let huertosDelUsuario = await getHuertosUsuario();
            let idHuertos = huertosDelUsuario.map(function (huerto) {
                return huerto.id_huerto;
            });

            //la primera casilla contendrá la id del primer huerto, el que aparecerá por defecto:
            const idPrimerHuerto = idHuertos[0];
            const respuesta = await fetch('../../../api/medicionesSemana/' + '?idHuerto=' + idPrimerHuerto);
            if (respuesta.ok) {
                const mediciones = await respuesta.json();
                console.log(mediciones);

                let dias = mediciones.map(function (medicion) {
                    let fecha = medicion.fecha_medicion;

                    let partes = fecha.split("-");
                    var anio = partes[0];
                    var mes = partes[1];
                    var dia = partes[2];

                    var fechaFormateada = dia + "/" + mes + "/" + anio;

                    return fechaFormateada;
                });


                let datosPhSemana = {
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

                let opcionesPhSemana = {
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

                for (let i = 6; i >= 0; i--) {
                    datosPhSemana.labels.push(dias[i]);
                    datosPhSemana.datasets[0].data.push(mediciones[i].mediapH);
                }

                miGraficapH.options = opcionesPhSemana;
                miGraficapH.data = datosPhSemana;
                miGraficapH.update();


            }
//------------------------------------------------------------------------------------------SELECTOR DE HUERTO
            const selector = document.getElementById('seleccionar_huerto');

            //conseguimos la id del huerto seleccionado
            selector.addEventListener('change', async function () {
                let idHuerto = selector.value;

                //pasamos la id en la query del fetch
                const respuesta = await fetch('../../../api/medicionesSemana/' + '?idHuerto=' + idHuerto);
                if (respuesta.ok) {
                    const mediciones = await respuesta.json();


                    let dias = mediciones.map(function (medicion) {
                        let fecha = medicion.fecha_medicion;

                        let partes = fecha.split("-");
                        var anio = partes[0];
                        var mes = partes[1];
                        var dia = partes[2];

                        var fechaFormateada = dia + "/" + mes + "/" + anio;

                        return fechaFormateada;
                    });


                    let datosPhSemana = {
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

                    let opcionesPhSemana = {
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

                    for (let i = 6; i >= 0; i--) {
                        datosPhSemana.labels.push(dias[i]);
                        datosPhSemana.datasets[0].data.push(mediciones[i].mediapH);
                    }

                    miGraficapH.options = opcionesPhSemana;
                    miGraficapH.data = datosPhSemana;
                    miGraficapH.update();
                }

            });
        }
    });

    //------------------------------------------------------------------------------------ACORDEÓN

    filtroAcordeonPh.addEventListener('change', async function () {

        if (filtroAcordeonPh.value === 'Semana') {
            //----------------------------------------------------------------------------HUERTO POR DEFECTO
            //conseguimos la id de los huertos del usuario y las metemos en un array:
            let huertosDelUsuario = await getHuertosUsuario();
            let idHuertos = huertosDelUsuario.map(function (huerto) {
                return huerto.id_huerto;
            });

            //la primera casilla contendrá la id del primer huerto, el que aparecerá por defecto:
            const idPrimerHuerto = idHuertos[0];
            const respuesta = await fetch('../../../api/medicionesSemana/' + '?idHuerto=' + idPrimerHuerto);
            if (respuesta.ok) {
                const mediciones = await respuesta.json();

                let dias = mediciones.map(function (medicion) {
                    let fecha = medicion.fecha_medicion;

                    let partes = fecha.split("-");
                    var anio = partes[0];
                    var mes = partes[1];
                    var dia = partes[2];

                    var fechaFormateada = dia + "/" + mes + "/" + anio;

                    return fechaFormateada;
                });


                let datosPhSemana = {
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

                let opcionesPhSemana = {
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

                for (let i = 6; i >= 0; i--) {
                    datosPhSemana.labels.push(dias[i]);
                    datosPhSemana.datasets[0].data.push(mediciones[i].mediapH);
                }

                graficaAcordeonPh.options = opcionesPhSemana;
                graficaAcordeonPh.data = datosPhSemana;
                graficaAcordeonPh.update();
            }

            //--------------------------------------------------------------------------------------SELECTOR
            const selector = document.getElementById('seleccionar_huerto');

            //conseguimos la id del huerto seleccionado
            selector.addEventListener('change', async function () {
                let idHuerto = selector.value;

                //pasamos la id en la query del fetch
                const respuesta = await fetch('../../../api/medicionesSemana/' + '?idHuerto=' + idHuerto);
                if (respuesta.ok) {
                    const mediciones = await respuesta.json();


                    let dias = mediciones.map(function (medicion) {
                        let fecha = medicion.fecha_medicion;

                        let partes = fecha.split("-");
                        var anio = partes[0];
                        var mes = partes[1];
                        var dia = partes[2];

                        var fechaFormateada = dia + "/" + mes + "/" + anio;

                        return fechaFormateada;
                    });


                    let datospHSemana = {
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

                    let opcionesPhSemana = {
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

                    for (let i = 6; i >= 0; i--) {
                        datospHSemana.labels.push(dias[i]);
                        datospHSemana.datasets[0].data.push(mediciones[i].mediapH);
                    }

                    graficaAcordeonPh.options = opcionesPhSemana;
                    graficaAcordeonPh.data = datospHSemana;
                    graficaAcordeonPh.update();
                }

            });
        }
    });


    //---------------------------------------------------------------------------GRAFICA HUMEDAD

    let filtroHumedad = document.getElementById('filtro_humedad');
    let filtroAcordeonHumedad = document.getElementById('filtro_acordeon_humedad');

    filtroHumedad.addEventListener('change', async function () {

        if (filtroHumedad.value === 'Semana') {

            //conseguimos la id de los huertos del usuario y las metemos en un array:
            let huertosDelUsuario = await getHuertosUsuario();
            let idHuertos = huertosDelUsuario.map(function (huerto) {
                return huerto.id_huerto;
            });

            //la primera casilla contendrá la id del primer huerto, el que aparecerá por defecto:
            const idPrimerHuerto = idHuertos[0];
            const respuesta = await fetch('../../../api/medicionesSemana/' + '?idHuerto=' + idPrimerHuerto);
            if (respuesta.ok) {
                const mediciones = await respuesta.json();
                console.log(mediciones);

                let dias = mediciones.map(function (medicion) {
                    let fecha = medicion.fecha_medicion;

                    let partes = fecha.split("-");
                    var anio = partes[0];
                    var mes = partes[1];
                    var dia = partes[2];

                    var fechaFormateada = dia + "/" + mes + "/" + anio;

                    return fechaFormateada;
                });


                let datosHumedadSemana = {
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

                let opcionesHumedadSemana = {
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

                for (let i = 6; i >= 0; i--) {
                    datosHumedadSemana.labels.push(dias[i]);
                    datosHumedadSemana.datasets[0].data.push(mediciones[i].mediaHumedad);
                }

                miGraficaHumedad.options = opcionesHumedadSemana;
                miGraficaHumedad.data = datosHumedadSemana;
                miGraficaHumedad.update();


            }
//------------------------------------------------------------------------------------------SELECTOR DE HUERTO
            const selector = document.getElementById('seleccionar_huerto');

            //conseguimos la id del huerto seleccionado
            selector.addEventListener('change', async function () {
                let idHuerto = selector.value;

                //pasamos la id en la query del fetch
                const respuesta = await fetch('../../../api/medicionesSemana/' + '?idHuerto=' + idHuerto);
                if (respuesta.ok) {
                    const mediciones = await respuesta.json();


                    let dias = mediciones.map(function (medicion) {
                        let fecha = medicion.fecha_medicion;

                        let partes = fecha.split("-");
                        var anio = partes[0];
                        var mes = partes[1];
                        var dia = partes[2];

                        var fechaFormateada = dia + "/" + mes + "/" + anio;

                        return fechaFormateada;
                    });


                    let datosHumedadSemana = {
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

                    let opcionesHumedadSemana = {
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

                    for (let i = 6; i >= 0; i--) {
                        datosHumedadSemana.labels.push(dias[i]);
                        datosHumedadSemana.datasets[0].data.push(mediciones[i].mediaHumedad);
                    }

                    miGraficaHumedad.options = opcionesHumedadSemana;
                    miGraficaHumedad.data = datosHumedadSemana;
                    miGraficaHumedad.update();
                }

            });
        }
    });

    filtroAcordeonHumedad.addEventListener('change', async function () {

        if (filtroAcordeonHumedad.value === 'Semana') {
            //conseguimos la id de los huertos del usuario y las metemos en un array:
            let huertosDelUsuario = await getHuertosUsuario();
            let idHuertos = huertosDelUsuario.map(function (huerto) {
                return huerto.id_huerto;
            });

            //la primera casilla contendrá la id del primer huerto, el que aparecerá por defecto:
            const idPrimerHuerto = idHuertos[0];
            const respuesta = await fetch('../../../api/medicionesSemana/' + '?idHuerto=' + idPrimerHuerto);
            if (respuesta.ok) {
                const mediciones = await respuesta.json();

                let dias = mediciones.map(function (medicion) {
                    let fecha = medicion.fecha_medicion;

                    let partes = fecha.split("-");
                    var anio = partes[0];
                    var mes = partes[1];
                    var dia = partes[2];

                    var fechaFormateada = dia + "/" + mes + "/" + anio;

                    return fechaFormateada;
                });


                let datosHumedadSemana = {
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

                let opcionesHumedadSemana = {
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

                for (let i = 6; i >= 0; i--) {
                    datosHumedadSemana.labels.push(dias[i]);
                    datosHumedadSemana.datasets[0].data.push(mediciones[i].mediaHumedad);
                }

                graficaAcordeonHumedad.options = opcionesHumedadSemana;
                graficaAcordeonHumedad.data = datosHumedadSemana;
                graficaAcordeonHumedad.update();
            }

            //--------------------------------------------------------------------------------------SELECTOR
            const selector = document.getElementById('seleccionar_huerto');

            //conseguimos la id del huerto seleccionado
            selector.addEventListener('change', async function () {
                let idHuerto = selector.value;

                //pasamos la id en la query del fetch
                const respuesta = await fetch('../../../api/medicionesSemana/' + '?idHuerto=' + idHuerto);
                if (respuesta.ok) {
                    const mediciones = await respuesta.json();


                    console.log(mediciones);

                    let dias = mediciones.map(function (medicion) {
                        let fecha = medicion.fecha_medicion;

                        let partes = fecha.split("-");
                        var anio = partes[0];
                        var mes = partes[1];
                        var dia = partes[2];

                        var fechaFormateada = dia + "/" + mes + "/" + anio;

                        return fechaFormateada;
                    });


                    let datosHumedadSemana = {
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

                    let opcionesHumedadSemana = {
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

                    for (let i = 6; i >= 0; i--) {
                        datosHumedadSemana.labels.push(dias[i]);
                        datosHumedadSemana.datasets[0].data.push(mediciones[i].mediaHumedad);
                    }

                    graficaAcordeonHumedad.options = opcionesHumedadSemana;
                    graficaAcordeonHumedad.data = datosHumedadSemana;
                    graficaAcordeonHumedad.update();
                }

            });
        }
    });

    //-----------------------------------------------------------------------SEMANA----GRAFICA TEMPERATURA

    //-------------------------------------------------------------------------------VISUALIZADOR
    let filtroTemperatura = document.getElementById('filtro_temperatura');
    let filtroAcordeonTemperatura = document.getElementById('filtro_acordeon_temperatura');

    filtroTemperatura.addEventListener('change', async function () {

        if (filtroTemperatura.value === 'Semana') {

            //-----------------------------------------------------------------------------HUERTO POR DEFECTO
            //conseguimos la id de los huertos del usuario y las metemos en un array:
            let huertosDelUsuario = await getHuertosUsuario();
            let idHuertos = huertosDelUsuario.map(function (huerto) {
                return huerto.id_huerto;
            });

            //la primera casilla contendrá la id del primer huerto, el que aparecerá por defecto:
            const idPrimerHuerto = idHuertos[0];
            const respuesta = await fetch('../../../api/medicionesSemana/' + '?idHuerto=' + idPrimerHuerto);
            if (respuesta.ok) {
                const mediciones = await respuesta.json();
                console.log(mediciones);

                let dias = mediciones.map(function (medicion) {
                    let fecha = medicion.fecha_medicion;

                    let partes = fecha.split("-");
                    var anio = partes[0];
                    var mes = partes[1];
                    var dia = partes[2];

                    var fechaFormateada = dia + "/" + mes + "/" + anio;

                    return fechaFormateada;
                });


                let datosTemperaturaSemana = {
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

                let opcionesTemperaturaSemana = {
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

                for (let i = 6; i >= 0; i--) {
                    datosTemperaturaSemana.labels.push(dias[i]);
                    datosTemperaturaSemana.datasets[0].data.push(mediciones[i].mediaTemperatura);
                }

                miGraficaTemperatura.options = opcionesTemperaturaSemana;
                miGraficaTemperatura.data = datosTemperaturaSemana;
                miGraficaTemperatura.update();


            }
//------------------------------------------------------------------------------------------SELECTOR DE HUERTO
            const selector = document.getElementById('seleccionar_huerto');

            //conseguimos la id del huerto seleccionado
            selector.addEventListener('change', async function () {
                let idHuerto = selector.value;

                //pasamos la id en la query del fetch
                const respuesta = await fetch('../../../api/medicionesSemana/' + '?idHuerto=' + idHuerto);
                if (respuesta.ok) {
                    const mediciones = await respuesta.json();


                    let dias = mediciones.map(function (medicion) {
                        let fecha = medicion.fecha_medicion;

                        let partes = fecha.split("-");
                        var anio = partes[0];
                        var mes = partes[1];
                        var dia = partes[2];

                        var fechaFormateada = dia + "/" + mes + "/" + anio;

                        return fechaFormateada;
                    });


                    let datosTemperaturaSemana = {
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

                    let opcionesTemperaturaSemana = {
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

                    for (let i = 6; i >= 0; i--) {
                        datosTemperaturaSemana.labels.push(dias[i]);
                        datosTemperaturaSemana.datasets[0].data.push(mediciones[i].mediaTemperatura);
                    }

                    miGraficaTemperatura.options = opcionesTemperaturaSemana;
                    miGraficaTemperatura.data = datosTemperaturaSemana;
                    miGraficaTemperatura.update();
                }

            });
        }
    });

    //------------------------------------------------------------------------------------ACORDEÓN

    filtroAcordeonTemperatura.addEventListener('change', async function () {

        if (filtroAcordeonTemperatura.value === 'Semana') {
            //----------------------------------------------------------------------------HUERTO POR DEFECTO
            //conseguimos la id de los huertos del usuario y las metemos en un array:
            let huertosDelUsuario = await getHuertosUsuario();
            let idHuertos = huertosDelUsuario.map(function (huerto) {
                return huerto.id_huerto;
            });

            //la primera casilla contendrá la id del primer huerto, el que aparecerá por defecto:
            const idPrimerHuerto = idHuertos[0];
            const respuesta = await fetch('../../../api/medicionesSemana/' + '?idHuerto=' + idPrimerHuerto);
            if (respuesta.ok) {
                const mediciones = await respuesta.json();

                let dias = mediciones.map(function (medicion) {
                    let fecha = medicion.fecha_medicion;

                    let partes = fecha.split("-");
                    var anio = partes[0];
                    var mes = partes[1];
                    var dia = partes[2];

                    var fechaFormateada = dia + "/" + mes + "/" + anio;

                    return fechaFormateada;
                });


                let datosTemperaturaSemana = {
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

                let opcionesTemperaturaSemana = {
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

                for (let i = 6; i >= 0; i--) {
                    datosTemperaturaSemana.labels.push(dias[i]);
                    datosTemperaturaSemana.datasets[0].data.push(mediciones[i].mediaTemperatura);
                }

                graficaAcordeonTemperatura.options = opcionesTemperaturaSemana;
                graficaAcordeonTemperatura.data = datosTemperaturaSemana;
                graficaAcordeonTemperatura.update();
            }

            //--------------------------------------------------------------------------------------SELECTOR
            const selector = document.getElementById('seleccionar_huerto');

            //conseguimos la id del huerto seleccionado
            selector.addEventListener('change', async function () {
                let idHuerto = selector.value;

                //pasamos la id en la query del fetch
                const respuesta = await fetch('../../../api/medicionesSemana/' + '?idHuerto=' + idHuerto);
                if (respuesta.ok) {
                    const mediciones = await respuesta.json();


                    let dias = mediciones.map(function (medicion) {
                        let fecha = medicion.fecha_medicion;

                        let partes = fecha.split("-");
                        var anio = partes[0];
                        var mes = partes[1];
                        var dia = partes[2];

                        var fechaFormateada = dia + "/" + mes + "/" + anio;

                        return fechaFormateada;
                    });


                    let datosTemperaturaSemana = {
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

                    let opcionesTemperaturaSemana = {
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

                    for (let i = 6; i >= 0; i--) {
                        datosTemperaturaSemana.labels.push(dias[i]);
                        datosTemperaturaSemana.datasets[0].data.push(mediciones[i].mediaTemperatura);
                    }

                    graficaAcordeonTemperatura.options = opcionesTemperaturaSemana;
                    graficaAcordeonTemperatura.data = datosTemperaturaSemana;
                    graficaAcordeonTemperatura.update();
                }

            });
        }
    });


    //-----------------------------------------------------------------------SEMANA----GRAFICA LUZ

    //-------------------------------------------------------------------------------VISUALIZADOR
    let filtroLuz = document.getElementById('filtro_luz');
    let filtroAcordeonLuz = document.getElementById('filtro_acordeon_luz');

    filtroLuz.addEventListener('change', async function () {

        if (filtroLuz.value === 'Semana') {

            //-----------------------------------------------------------------------------HUERTO POR DEFECTO
            //conseguimos la id de los huertos del usuario y las metemos en un array:
            let huertosDelUsuario = await getHuertosUsuario();
            let idHuertos = huertosDelUsuario.map(function (huerto) {
                return huerto.id_huerto;
            });

            //la primera casilla contendrá la id del primer huerto, el que aparecerá por defecto:
            const idPrimerHuerto = idHuertos[0];
            const respuesta = await fetch('../../../api/medicionesSemana/' + '?idHuerto=' + idPrimerHuerto);
            if (respuesta.ok) {
                const mediciones = await respuesta.json();
                console.log(mediciones);

                let dias = mediciones.map(function (medicion) {
                    let fecha = medicion.fecha_medicion;

                    let partes = fecha.split("-");
                    var anio = partes[0];
                    var mes = partes[1];
                    var dia = partes[2];

                    var fechaFormateada = dia + "/" + mes + "/" + anio;

                    return fechaFormateada;
                });


                let datosLuzSemana = {
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

                let opcionesLuzSemana = {
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

                for (let i = 6; i >= 0; i--) {
                    datosLuzSemana.labels.push(dias[i]);
                    datosLuzSemana.datasets[0].data.push(mediciones[i].mediaLuminosidad);
                }

                miGraficaLuz.options = opcionesLuzSemana;
                miGraficaLuz.data = datosLuzSemana;
                miGraficaLuz.update();


            }
//------------------------------------------------------------------------------------------SELECTOR DE HUERTO
            const selector = document.getElementById('seleccionar_huerto');

            //conseguimos la id del huerto seleccionado
            selector.addEventListener('change', async function () {
                let idHuerto = selector.value;

                //pasamos la id en la query del fetch
                const respuesta = await fetch('../../../api/medicionesSemana/' + '?idHuerto=' + idHuerto);
                if (respuesta.ok) {
                    const mediciones = await respuesta.json();


                    let dias = mediciones.map(function (medicion) {
                        let fecha = medicion.fecha_medicion;

                        let partes = fecha.split("-");
                        var anio = partes[0];
                        var mes = partes[1];
                        var dia = partes[2];

                        var fechaFormateada = dia + "/" + mes + "/" + anio;

                        return fechaFormateada;
                    });


                    let datosLuzSemana = {
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

                    let opcionesLuzSemana = {
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

                    for (let i = 6; i >= 0; i--) {
                        datosLuzSemana.labels.push(dias[i]);
                        datosLuzSemana.datasets[0].data.push(mediciones[i].mediaLuminosidad);
                    }

                    miGraficaLuz.options = opcionesLuzSemana;
                    miGraficaLuz.data = datosLuzSemana;
                    miGraficaLuz.update();
                }

            });
        }
    });

    //------------------------------------------------------------------------------------ACORDEÓN

    filtroAcordeonLuz.addEventListener('change', async function () {

        if (filtroAcordeonLuz.value === 'Semana') {
            //----------------------------------------------------------------------------HUERTO POR DEFECTO
            //conseguimos la id de los huertos del usuario y las metemos en un array:
            let huertosDelUsuario = await getHuertosUsuario();
            let idHuertos = huertosDelUsuario.map(function (huerto) {
                return huerto.id_huerto;
            });

            //la primera casilla contendrá la id del primer huerto, el que aparecerá por defecto:
            const idPrimerHuerto = idHuertos[0];
            const respuesta = await fetch('../../../api/medicionesSemana/' + '?idHuerto=' + idPrimerHuerto);
            if (respuesta.ok) {
                const mediciones = await respuesta.json();

                let dias = mediciones.map(function (medicion) {
                    let fecha = medicion.fecha_medicion;

                    let partes = fecha.split("-");
                    var anio = partes[0];
                    var mes = partes[1];
                    var dia = partes[2];

                    var fechaFormateada = dia + "/" + mes + "/" + anio;

                    return fechaFormateada;
                });


                let datosLuzSemana = {
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

                let opcionesLuzSemana = {
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

                for (let i = 6; i >= 0; i--) {
                    datosLuzSemana.labels.push(dias[i]);
                    datosLuzSemana.datasets[0].data.push(mediciones[i].mediaLuminosidad);
                }

                graficaAcordeonLuz.options = opcionesLuzSemana;
                graficaAcordeonLuz.data = datosLuzSemana;
                graficaAcordeonLuz.update();
            }

            //--------------------------------------------------------------------------------------SELECTOR
            const selector = document.getElementById('seleccionar_huerto');

            //conseguimos la id del huerto seleccionado
            selector.addEventListener('change', async function () {
                let idHuerto = selector.value;

                //pasamos la id en la query del fetch
                const respuesta = await fetch('../../../api/medicionesSemana/' + '?idHuerto=' + idHuerto);
                if (respuesta.ok) {
                    const mediciones = await respuesta.json();

                    let dias = mediciones.map(function (medicion) {
                        let fecha = medicion.fecha_medicion;

                        let partes = fecha.split("-");
                        var anio = partes[0];
                        var mes = partes[1];
                        var dia = partes[2];

                        var fechaFormateada = dia + "/" + mes + "/" + anio;

                        return fechaFormateada;
                    });


                    let datosLuzSemana = {
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

                    let opcionesLuzSemana = {
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

                    for (let i = 6; i >= 0; i--) {
                        datosLuzSemana.labels.push(dias[i]);
                        datosLuzSemana.datasets[0].data.push(mediciones[i].mediaLuminosidad);
                    }

                    graficaAcordeonLuz.options = opcionesLuzSemana;
                    graficaAcordeonLuz.data = datosLuzSemana;
                    graficaAcordeonLuz.update();
                }

            });
        }
    });

}


getDatosSemana();

//-----------------------------------------------------Aquí acaban las funciones de los datos de semana de la gráfica.


            /*
                =========================================================================
                                   FILTRO DE FECHA: SELECCIONAR FECHA
                =========================================================================
                                                                                            */
async function getDatosPorFecha(){

    //------------------------------------------------------------SELECCIONAR FECHA-------------GRÁFICA SALINIDAD
    //Cuando se selecciona "Seleccionar fecha" aparecen los inputs:
    let filtroSalinidad = document.getElementById('filtro_salinidad');
    let formularioFechaSalinidad = document.getElementById('seleccionar_fecha_salinidad');

    let filtroAcordeonSalinidad = document.getElementById('filtro_acordeon_salinidad');
    let formularioFechaAcordeonSalinidad = document.getElementById('seleccionar_fecha_acordeon_salinidad')

    filtroSalinidad.addEventListener('change', function(){
        if(filtroSalinidad.value === 'Seleccionar fecha'){
            formularioFechaSalinidad.style.display = "block";
        }
        if(filtroSalinidad.value !== 'Seleccionar fecha'){
            formularioFechaSalinidad.style.display = "none";
        }
    });

    filtroAcordeonSalinidad.addEventListener('change', function(){
        if(filtroAcordeonSalinidad.value ==='Seleccionar fecha'){
            formularioFechaAcordeonSalinidad.style.display = "block";
        }
        if(filtroAcordeonSalinidad.value !=='Seleccionar fecha'){
            formularioFechaAcordeonSalinidad.style.display = "none";
        }
    });

//-------------------------------------VISUALIZADOR DE HUERTOS--------------------------------------------------
    formularioFechaSalinidad.addEventListener('submit', async function(event) {
        event.preventDefault();

        let desde = document.getElementById('desde-sal').value;
        let hasta = document.getElementById('hasta-sal').value;

        let fechaDesde = new Date(desde);
        let fechaHasta = new Date(hasta);

        let diferenciaMs = fechaHasta - fechaDesde;

        let diferenciaDias = Math.floor(diferenciaMs / (1000 * 60 * 60 * 24));

        console.log(diferenciaDias);

        if (diferenciaDias <= 3) {
            console.log('3 o menos días');

            //---------------------------------------------------------------HUERTO CARGADO POR DEFECTO
            let huertosDelUsuario = await getHuertosUsuario();
            let idHuertos = huertosDelUsuario.map(function (huerto) {
                return huerto.id_huerto;
            });

            const idHuerto = idHuertos[0];
            const respuesta = await fetch('../../../api/medicionesFecha/' +
                '?idHuerto=' + idHuerto +
                '&desde=' + desde +
                '&hasta=' + hasta +
                '&senyal=' + 1);

            if (respuesta.ok) {
                const mediciones = await respuesta.json();
                console.log(mediciones);

                let horas = mediciones.map(function (medicion) {
                    return medicion.hora + ":" + medicion.minutos;
                });

                //GRÁFICA SALINIDAD - DATOS HOY -----------------------------------------------------------------------
                let datosSalinidadFecha = {
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

                let opcionesSalinidadFecha = {
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

                for (let i = horas.length-1; i >= 0; i--) {
                    datosSalinidadFecha.labels.push(horas[i]);
                    datosSalinidadFecha.datasets[0].data.push(mediciones[i].mediaSalinidad);
                }


                miGraficaSal.options = opcionesSalinidadFecha;
                miGraficaSal.data = datosSalinidadFecha;
                miGraficaSal.update();
            }



            //---------------------------------------------------------------SELECTOR DE HUERTOS

            const selector = document.getElementById('seleccionar_huerto');

            //conseguimos la id del huerto seleccionado
            selector.addEventListener('change', async function () {
                let idHuerto = selector.value;

                const respuesta = await fetch('../../../api/medicionesFecha/' +
                    '?idHuerto=' + idHuerto +
                    '&desde=' + desde +
                    '&hasta=' + hasta +
                    '&senyal=' + 1);

                if (respuesta.ok) {
                    const mediciones = await respuesta.json();
                    console.log(mediciones);

                    let horas = mediciones.map(function (medicion) {
                        return medicion.hora + ":" + medicion.minutos;
                    });

                    //GRÁFICA SALINIDAD - DATOS HOY -----------------------------------------------------------------------
                    let datosSalinidadFecha = {
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

                    let opcionesSalinidadFecha = {
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

                    for (let i = horas.length-1; i >= 0; i--) {
                        datosSalinidadFecha.labels.push(horas[i]);
                        datosSalinidadFecha.datasets[0].data.push(mediciones[i].mediaSalinidad);
                    }


                    miGraficaSal.options = opcionesSalinidadFecha;
                    miGraficaSal.data = datosSalinidadFecha;
                    miGraficaSal.update();
                }
            });



        }//si son 3 o menos días
        else{
            console.log('4 o más días');

            let huertosDelUsuario = await getHuertosUsuario();
            let idHuertos = huertosDelUsuario.map(function (huerto) {
                return huerto.id_huerto;
            });

            const idHuerto = idHuertos[0];
            const respuesta = await fetch('../../../api/medicionesFecha/' +
                '?idHuerto=' + idHuerto +
                '&desde=' + desde +
                '&hasta=' + hasta +
                '&senyal=' + 0);

            if (respuesta.ok) {
                const mediciones = await respuesta.json();
                console.log(mediciones);

                let dias = mediciones.map(function (medicion) {
                    let fecha = medicion.fecha_medicion;

                    let partes = fecha.split("-");
                    var anio = partes[0];
                    var mes = partes[1];
                    var dia = partes[2];

                    var fechaFormateada = dia + "/" + mes + "/" + anio;

                    return fechaFormateada;
                });


                //GRÁFICA SALINIDAD - DATOS SEMANA -----------------------------------------------------------------------
                let datosSalinidadFecha = {
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

                let opcionesSalinidadFecha = {
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

                for (let i = dias.length-1; i >= 0; i--) {
                    datosSalinidadFecha.labels.push(dias[i]);
                    datosSalinidadFecha.datasets[0].data.push(mediciones[i].mediaSalinidad);
                }

                miGraficaSal.options = opcionesSalinidadFecha;
                miGraficaSal.data = datosSalinidadFecha;
                miGraficaSal.update();

                //------------------------------------------------------------------------SELECTOR
                const selector = document.getElementById('seleccionar_huerto');

                //conseguimos la id del huerto seleccionado
                selector.addEventListener('change', async function () {
                    let idHuerto = selector.value;

                    const respuesta = await fetch('../../../api/medicionesFecha/' +
                        '?idHuerto=' + idHuerto +
                        '&desde=' + desde +
                        '&hasta=' + hasta +
                        '&senyal=' + 0);

                    if (respuesta.ok) {
                        const mediciones = await respuesta.json();
                        console.log(mediciones);

                        let dias = mediciones.map(function (medicion) {
                            let fecha = medicion.fecha_medicion;

                            let partes = fecha.split("-");
                            var anio = partes[0];
                            var mes = partes[1];
                            var dia = partes[2];

                            var fechaFormateada = dia + "/" + mes + "/" + anio;

                            return fechaFormateada;
                        });


                        //GRÁFICA SALINIDAD - DATOS SEMANA -----------------------------------------------------------------------
                        let datosSalinidadFecha = {
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

                        let opcionesSalinidadFecha = {
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

                        for (let i = dias.length - 1; i >= 0; i--) {
                            datosSalinidadFecha.labels.push(dias[i]);
                            datosSalinidadFecha.datasets[0].data.push(mediciones[i].mediaSalinidad);
                        }

                        miGraficaSal.options = opcionesSalinidadFecha;
                        miGraficaSal.data = datosSalinidadFecha;
                        miGraficaSal.update();

                    }

                });
            }
        }//si son 4 o más días

//--------------------------------------------ACORDEÓN--------------------------------------------------


        formularioFechaAcordeonSalinidad.addEventListener('submit', async function(event) {
            event.preventDefault();

            let desde = document.getElementById('desde-acordeon-sal').value;
            let hasta = document.getElementById('hasta-acordeon-sal').value;

            let fechaDesde = new Date(desde);
            let fechaHasta = new Date(hasta);

            let diferenciaMs = fechaHasta - fechaDesde;

            let diferenciaDias = Math.floor(diferenciaMs / (1000 * 60 * 60 * 24));

            console.log(diferenciaDias);

            if (diferenciaDias <= 3) {
                console.log('3 o menos días');

                //---------------------------------------------------------------HUERTO CARGADO POR DEFECTO
                let huertosDelUsuario = await getHuertosUsuario();
                let idHuertos = huertosDelUsuario.map(function (huerto) {
                    return huerto.id_huerto;
                });

                const idHuerto = idHuertos[0];
                const respuesta = await fetch('../../../api/medicionesFecha/' +
                    '?idHuerto=' + idHuerto +
                    '&desde=' + desde +
                    '&hasta=' + hasta +
                    '&senyal=' + 1);

                if (respuesta.ok) {
                    const mediciones = await respuesta.json();
                    console.log(mediciones);

                    let horas = mediciones.map(function (medicion) {
                        return medicion.hora + ":" + medicion.minutos;
                    });

                    //GRÁFICA SALINIDAD - DATOS HOY -----------------------------------------------------------------------
                    let datosSalinidadFecha = {
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

                    let opcionesSalinidadFecha = {
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

                    for (let i = horas.length-1; i >= 0; i--) {
                        datosSalinidadFecha.labels.push(horas[i]);
                        datosSalinidadFecha.datasets[0].data.push(mediciones[i].mediaSalinidad);
                    }


                    graficaAcordeonSal.options = opcionesSalinidadFecha;
                    graficaAcordeonSal.data = datosSalinidadFecha;
                    graficaAcordeonSal.update();
                }



                //---------------------------------------------------------------SELECTOR DE HUERTOS

                const selector = document.getElementById('seleccionar_huerto');

                //conseguimos la id del huerto seleccionado
                selector.addEventListener('change', async function () {
                    let idHuerto = selector.value;

                    const respuesta = await fetch('../../../api/medicionesFecha/' +
                        '?idHuerto=' + idHuerto +
                        '&desde=' + desde +
                        '&hasta=' + hasta +
                        '&senyal=' + 1);

                    if (respuesta.ok) {
                        const mediciones = await respuesta.json();
                        console.log(mediciones);

                        let horas = mediciones.map(function (medicion) {
                            return medicion.hora + ":" + medicion.minutos;
                        });

                        //GRÁFICA SALINIDAD - DATOS HOY -----------------------------------------------------------------------
                        let datosSalinidadFecha = {
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

                        let opcionesSalinidadFecha = {
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

                        for (let i = horas.length-1; i >= 0; i--) {
                            datosSalinidadFecha.labels.push(horas[i]);
                            datosSalinidadFecha.datasets[0].data.push(mediciones[i].mediaSalinidad);
                        }


                        graficaAcordeonSal.options = opcionesSalinidadFecha;
                        graficaAcordeonSal.data = datosSalinidadFecha;
                        graficaAcordeonSal.update();
                    }
                });



            }//si son 3 o menos días

            else{
                console.log('4 o más días');

                let huertosDelUsuario = await getHuertosUsuario();
                let idHuertos = huertosDelUsuario.map(function (huerto) {
                    return huerto.id_huerto;
                });

                const idHuerto = idHuertos[0];
                const respuesta = await fetch('../../../api/medicionesFecha/' +
                    '?idHuerto=' + idHuerto +
                    '&desde=' + desde +
                    '&hasta=' + hasta +
                    '&senyal=' + 0);

                if (respuesta.ok) {
                    const mediciones = await respuesta.json();
                    console.log(mediciones);

                    let dias = mediciones.map(function (medicion) {
                        let fecha = medicion.fecha_medicion;

                        let partes = fecha.split("-");
                        var anio = partes[0];
                        var mes = partes[1];
                        var dia = partes[2];

                        var fechaFormateada = dia + "/" + mes + "/" + anio;

                        return fechaFormateada;
                    });


                    let datosSalinidadFecha = {
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

                    let opcionesSalinidadFecha = {
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

                    for (let i = dias.length-1; i >= 0; i--) {
                        datosSalinidadFecha.labels.push(dias[i]);
                        datosSalinidadFecha.datasets[0].data.push(mediciones[i].mediaSalinidad);
                    }

                    graficaAcordeonSal.options = opcionesSalinidadFecha;
                    graficaAcordeonSal.data = datosSalinidadFecha;
                    graficaAcordeonSal.update();

                    //------------------------------------------------------------------------SELECTOR
                    const selector = document.getElementById('seleccionar_huerto');

                    //conseguimos la id del huerto seleccionado
                    selector.addEventListener('change', async function () {
                        let idHuerto = selector.value;

                        const respuesta = await fetch('../../../api/medicionesFecha/' +
                            '?idHuerto=' + idHuerto +
                            '&desde=' + desde +
                            '&hasta=' + hasta +
                            '&senyal=' + 0);

                        if (respuesta.ok) {
                            const mediciones = await respuesta.json();
                            console.log(mediciones);

                            let dias = mediciones.map(function (medicion) {
                                let fecha = medicion.fecha_medicion;

                                let partes = fecha.split("-");
                                var anio = partes[0];
                                var mes = partes[1];
                                var dia = partes[2];

                                var fechaFormateada = dia + "/" + mes + "/" + anio;

                                return fechaFormateada;
                            });

                            let datosSalinidadFecha = {
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

                            let opcionesSalinidadFecha = {
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

                            for (let i = dias.length - 1; i >= 0; i--) {
                                datosSalinidadFecha.labels.push(dias[i]);
                                datosSalinidadFecha.datasets[0].data.push(mediciones[i].mediaSalinidad);
                            }

                            graficaAcordeonSal.options = opcionesSalinidadFecha;
                            graficaAcordeonSal.data = datosSalinidadFecha;
                            graficaAcordeonSal.update();

                        }

                    });
                }
            }//si son 4 o más días
        });
    });


        //------------------------------------------------------------SELECCIONAR FECHA-------------GRÁFICA HUMEDAD
        //Cuando se selecciona "Seleccionar fecha" aparecen los inputs:
        let filtroHumedad = document.getElementById('filtro_humedad');
        let formularioFechaHumedad = document.getElementById('seleccionar_fecha_humedad');

        let filtroAcordeonHumedad = document.getElementById('filtro_acordeon_humedad');
        let formularioFechaAcordeonHumedad = document.getElementById('seleccionar_fecha_acordeon_humedad')

        filtroHumedad.addEventListener('change', function(){
            if(filtroHumedad.value === 'Seleccionar fecha'){
                formularioFechaHumedad.style.display = "block";
            }
            if(filtroHumedad.value !== 'Seleccionar fecha'){
                formularioFechaHumedad.style.display = "none";
            }
        });

        filtroAcordeonHumedad.addEventListener('change', function(){
            if(filtroAcordeonHumedad.value ==='Seleccionar fecha'){
                formularioFechaAcordeonHumedad.style.display = "block";
            }
            if(filtroAcordeonHumedad.value !=='Seleccionar fecha'){
                formularioFechaAcordeonHumedad.style.display = "none";
            }
        });

//-------------------------------------VISUALIZADOR DE HUERTOS--------------------------------------------------
        formularioFechaHumedad.addEventListener('submit', async function(event) {
            event.preventDefault();

            let desde = document.getElementById('desde-humedad').value;
            let hasta = document.getElementById('hasta-humedad').value;

            let fechaDesde = new Date(desde);
            let fechaHasta = new Date(hasta);

            let diferenciaMs = fechaHasta - fechaDesde;

            let diferenciaDias = Math.floor(diferenciaMs / (1000 * 60 * 60 * 24));

            console.log(diferenciaDias);

            if (diferenciaDias <= 3) {
                console.log('3 o menos días');

                //---------------------------------------------------------------HUERTO CARGADO POR DEFECTO
                let huertosDelUsuario = await getHuertosUsuario();
                let idHuertos = huertosDelUsuario.map(function (huerto) {
                    return huerto.id_huerto;
                });

                const idHuerto = idHuertos[0];
                const respuesta = await fetch('../../../api/medicionesFecha/' +
                    '?idHuerto=' + idHuerto +
                    '&desde=' + desde +
                    '&hasta=' + hasta +
                    '&senyal=' + 1);

                if (respuesta.ok) {
                    const mediciones = await respuesta.json();
                    console.log(mediciones);

                    let horas = mediciones.map(function (medicion) {
                        return medicion.hora + ":" + medicion.minutos;
                    });

                    let datosHumedadFecha = {
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

                    let opcionesHumedadFecha = {
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

                    for (let i = horas.length-1; i >= 0; i--) {
                        datosHumedadFecha.labels.push(horas[i]);
                        datosHumedadFecha.datasets[0].data.push(mediciones[i].mediaHumedad);
                    }


                    miGraficaHumedad.options = opcionesHumedadFecha;
                    miGraficaHumedad.data = datosHumedadFecha;
                    miGraficaHumedad.update();
                }



                //---------------------------------------------------------------SELECTOR DE HUERTOS

                const selector = document.getElementById('seleccionar_huerto');

                //conseguimos la id del huerto seleccionado
                selector.addEventListener('change', async function () {
                    let idHuerto = selector.value;

                    const respuesta = await fetch('../../../api/medicionesFecha/' +
                        '?idHuerto=' + idHuerto +
                        '&desde=' + desde +
                        '&hasta=' + hasta +
                        '&senyal=' + 1);

                    if (respuesta.ok) {
                        const mediciones = await respuesta.json();
                        console.log(mediciones);

                        let horas = mediciones.map(function (medicion) {
                            return medicion.hora + ":" + medicion.minutos;
                        });

                        let datosHumedadFecha = {
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

                        let opcionesHumedadFecha = {
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

                        for (let i = horas.length-1; i >= 0; i--) {
                            datosHumedadFecha.labels.push(horas[i]);
                            datosHumedadFecha.datasets[0].data.push(mediciones[i].mediaHumedad);
                        }


                        miGraficaHumedad.options = opcionesHumedadFecha;
                        miGraficaHumedad.data = datosHumedadFecha;
                        miGraficaHumedad.update();
                    }
                });



            }//si son 3 o menos días
            else{
                console.log('4 o más días');

                let huertosDelUsuario = await getHuertosUsuario();
                let idHuertos = huertosDelUsuario.map(function (huerto) {
                    return huerto.id_huerto;
                });

                const idHuerto = idHuertos[0];
                const respuesta = await fetch('../../../api/medicionesFecha/' +
                    '?idHuerto=' + idHuerto +
                    '&desde=' + desde +
                    '&hasta=' + hasta +
                    '&senyal=' + 0);

                if (respuesta.ok) {
                    const mediciones = await respuesta.json();
                    console.log(mediciones);

                    let dias = mediciones.map(function (medicion) {
                        let fecha = medicion.fecha_medicion;

                        let partes = fecha.split("-");
                        var anio = partes[0];
                        var mes = partes[1];
                        var dia = partes[2];

                        var fechaFormateada = dia + "/" + mes + "/" + anio;

                        return fechaFormateada;
                    });


                    let datosHumedadFecha = {
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

                    let opcionesHumedadFecha = {
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

                    for (let i = dias.length-1; i >= 0; i--) {
                        datosHumedadFecha.labels.push(dias[i]);
                        datosHumedadFecha.datasets[0].data.push(mediciones[i].mediaSalinidad);
                    }

                    miGraficaHumedad.options = opcionesHumedadFecha;
                    miGraficaHumedad.data = datosHumedadFecha;
                    miGraficaHumedad.update();

                    //------------------------------------------------------------------------SELECTOR
                    const selector = document.getElementById('seleccionar_huerto');

                    //conseguimos la id del huerto seleccionado
                    selector.addEventListener('change', async function () {
                        let idHuerto = selector.value;

                        const respuesta = await fetch('../../../api/medicionesFecha/' +
                            '?idHuerto=' + idHuerto +
                            '&desde=' + desde +
                            '&hasta=' + hasta +
                            '&senyal=' + 0);

                        if (respuesta.ok) {
                            const mediciones = await respuesta.json();
                            console.log(mediciones);

                            let dias = mediciones.map(function (medicion) {
                                let fecha = medicion.fecha_medicion;

                                let partes = fecha.split("-");
                                var anio = partes[0];
                                var mes = partes[1];
                                var dia = partes[2];

                                var fechaFormateada = dia + "/" + mes + "/" + anio;

                                return fechaFormateada;
                            });


                            let datosHumedadFecha = {
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

                            let opcionesHumedadFecha = {
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

                            for (let i = dias.length - 1; i >= 0; i--) {
                                datosSalinidadFecha.labels.push(dias[i]);
                                datosSalinidadFecha.datasets[0].data.push(mediciones[i].mediaSalinidad);
                            }

                            miGraficaHumedad.options = opcionesHumedadFecha;
                            miGraficaHumedad.data = datosHumedadFecha;
                            miGraficaHumedad.update();

                        }

                    });
                }
            }//si son 4 o más días

//--------------------------------------------ACORDEÓN--------------------------------------------------


            formularioFechaAcordeonHumedad.addEventListener('submit', async function(event) {
                event.preventDefault();

                let desde = document.getElementById('desde-acordeon-humedad').value;
                let hasta = document.getElementById('hasta-acordeon-humedad').value;

                let fechaDesde = new Date(desde);
                let fechaHasta = new Date(hasta);

                let diferenciaMs = fechaHasta - fechaDesde;

                let diferenciaDias = Math.floor(diferenciaMs / (1000 * 60 * 60 * 24));

                console.log(diferenciaDias);

                if (diferenciaDias <= 3) {
                    console.log('3 o menos días');

                    //---------------------------------------------------------------HUERTO CARGADO POR DEFECTO
                    let huertosDelUsuario = await getHuertosUsuario();
                    let idHuertos = huertosDelUsuario.map(function (huerto) {
                        return huerto.id_huerto;
                    });

                    const idHuerto = idHuertos[0];
                    const respuesta = await fetch('../../../api/medicionesFecha/' +
                        '?idHuerto=' + idHuerto +
                        '&desde=' + desde +
                        '&hasta=' + hasta +
                        '&senyal=' + 1);

                    if (respuesta.ok) {
                        const mediciones = await respuesta.json();

                        let horas = mediciones.map(function (medicion) {
                            return medicion.hora + ":" + medicion.minutos;
                        });

                        let datosHumedadFecha = {
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

                        let opcionesHumedadFecha = {
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

                        for (let i = horas.length-1; i >= 0; i--) {
                            datosHumedadFecha.labels.push(horas[i]);
                            datosHumedadFecha.datasets[0].data.push(mediciones[i].mediaHumedad);
                        }


                        graficaAcordeonHumedad.options = opcionesHumedadFecha;
                        graficaAcordeonHumedad.data = datosHumedadFecha;
                        graficaAcordeonHumedad.update();
                    }



                    //---------------------------------------------------------------SELECTOR DE HUERTOS

                    const selector = document.getElementById('seleccionar_huerto');

                    //conseguimos la id del huerto seleccionado
                    selector.addEventListener('change', async function () {
                        let idHuerto = selector.value;

                        const respuesta = await fetch('../../../api/medicionesFecha/' +
                            '?idHuerto=' + idHuerto +
                            '&desde=' + desde +
                            '&hasta=' + hasta +
                            '&senyal=' + 1);

                        if (respuesta.ok) {
                            const mediciones = await respuesta.json();
                            console.log(mediciones);

                            let horas = mediciones.map(function (medicion) {
                                return medicion.hora + ":" + medicion.minutos;
                            });

                            let datosHumedadFecha = {
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

                            let opcionesHumedadFecha = {
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

                            for (let i = horas.length-1; i >= 0; i--) {
                                datosHumedadFecha.labels.push(horas[i]);
                                datosHumedadFecha.datasets[0].data.push(mediciones[i].mediaHumedad);
                            }


                            graficaAcordeonHumedad.options = opcionesHumedadFecha;
                            graficaAcordeonHumedad.data = datosHumedadFecha;
                            graficaAcordeonHumedad.update();
                        }
                    });



                }//si son 3 o menos días

                else{
                    console.log('4 o más días');

                    let huertosDelUsuario = await getHuertosUsuario();
                    let idHuertos = huertosDelUsuario.map(function (huerto) {
                        return huerto.id_huerto;
                    });

                    const idHuerto = idHuertos[0];
                    const respuesta = await fetch('../../../api/medicionesFecha/' +
                        '?idHuerto=' + idHuerto +
                        '&desde=' + desde +
                        '&hasta=' + hasta +
                        '&senyal=' + 0);

                    if (respuesta.ok) {
                        const mediciones = await respuesta.json();

                        let dias = mediciones.map(function (medicion) {
                            let fecha = medicion.fecha_medicion;

                            let partes = fecha.split("-");
                            var anio = partes[0];
                            var mes = partes[1];
                            var dia = partes[2];

                            var fechaFormateada = dia + "/" + mes + "/" + anio;

                            return fechaFormateada;
                        });


                        let datosHumedadFecha = {
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

                        let opcionesHumedadFecha = {
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

                        for (let i = dias.length-1; i >= 0; i--) {
                            datosHumedadFecha.labels.push(dias[i]);
                            datosHumedadFecha.datasets[0].data.push(mediciones[i].mediaHumedad);
                        }

                        graficaAcordeonHumedad.options = opcionesHumedadFecha;
                        graficaAcordeonHumedad.data = datosHumedadFecha;
                        graficaAcordeonHumedad.update();

                        //------------------------------------------------------------------------SELECTOR
                        const selector = document.getElementById('seleccionar_huerto');

                        //conseguimos la id del huerto seleccionado
                        selector.addEventListener('change', async function () {
                            let idHuerto = selector.value;

                            const respuesta = await fetch('../../../api/medicionesFecha/' +
                                '?idHuerto=' + idHuerto +
                                '&desde=' + desde +
                                '&hasta=' + hasta +
                                '&senyal=' + 0);

                            if (respuesta.ok) {
                                const mediciones = await respuesta.json();

                                let dias = mediciones.map(function (medicion) {
                                    let fecha = medicion.fecha_medicion;

                                    let partes = fecha.split("-");
                                    var anio = partes[0];
                                    var mes = partes[1];
                                    var dia = partes[2];

                                    var fechaFormateada = dia + "/" + mes + "/" + anio;

                                    return fechaFormateada;
                                });

                                let datosHumedadFecha = {
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

                                let opcionesHumedadFecha = {
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

                                for (let i = dias.length - 1; i >= 0; i--) {
                                    datosHumedadFecha.labels.push(dias[i]);
                                    datosHumedadFecha.datasets[0].data.push(mediciones[i].mediaHumedad);
                                }

                                graficaAcordeonHumedad.options = opcionesHumedadFecha;
                                graficaAcordeonHumedad.data = datosHumedadFecha;
                                graficaAcordeonHumedad.update();

                            }

                        });
                    }
                }//si son 4 o más días
            });
        });




    //------------------------------------------------------------SELECCIONAR FECHA-------------GRÁFICA PH
    //Cuando se selecciona "Seleccionar fecha" aparecen los inputs:
    let filtroPh = document.getElementById('filtro_pH');
    let formularioFechaPh = document.getElementById('seleccionar_fecha_pH');

    let filtroAcordeonPh = document.getElementById('filtro_acordeon_pH');
    let formularioFechaAcordeonPh = document.getElementById('seleccionar_fecha_acordeon_pH')

    filtroPh.addEventListener('change', function(){
        if(filtroPh.value === 'Seleccionar fecha'){
            formularioFechaPh.style.display = "block";
        }
        if(filtroPh.value !== 'Seleccionar fecha'){
            formularioFechaPh.style.display = "none";
        }
    });

    filtroAcordeonPh.addEventListener('change', function(){
        if(filtroAcordeonPh.value ==='Seleccionar fecha'){
            formularioFechaAcordeonPh.style.display = "block";
        }
        if(filtroAcordeonPh.value !=='Seleccionar fecha'){
            formularioFechaAcordeonPh.style.display = "none";
        }
    });

//-------------------------------------VISUALIZADOR DE HUERTOS--------------------------------------------------
    formularioFechaPh.addEventListener('submit', async function(event) {
        event.preventDefault();

        let desde = document.getElementById('desde-ph').value;
        let hasta = document.getElementById('hasta-ph').value;

        let fechaDesde = new Date(desde);
        let fechaHasta = new Date(hasta);

        let diferenciaMs = fechaHasta - fechaDesde;

        let diferenciaDias = Math.floor(diferenciaMs / (1000 * 60 * 60 * 24));

        console.log(diferenciaDias);

        if (diferenciaDias <= 3) {
            console.log('3 o menos días');

            //---------------------------------------------------------------HUERTO CARGADO POR DEFECTO
            let huertosDelUsuario = await getHuertosUsuario();
            let idHuertos = huertosDelUsuario.map(function (huerto) {
                return huerto.id_huerto;
            });

            const idHuerto = idHuertos[0];
            const respuesta = await fetch('../../../api/medicionesFecha/' +
                '?idHuerto=' + idHuerto +
                '&desde=' + desde +
                '&hasta=' + hasta +
                '&senyal=' + 1);

            if (respuesta.ok) {
                const mediciones = await respuesta.json();
                console.log(mediciones);

                let horas = mediciones.map(function (medicion) {
                    return medicion.hora + ":" + medicion.minutos;
                });

                let datosPhFecha = {
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

                let opcionesPhFecha = {
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

                for (let i = horas.length-1; i >= 0; i--) {
                    datosPhFecha.labels.push(horas[i]);
                    datosPhFecha.datasets[0].data.push(mediciones[i].mediapH);
                }


                miGraficapH.options = opcionesPhFecha;
                miGraficapH.data = datosPhFecha;
                miGraficapH.update();
            }



            //---------------------------------------------------------------SELECTOR DE HUERTOS

            const selector = document.getElementById('seleccionar_huerto');

            //conseguimos la id del huerto seleccionado
            selector.addEventListener('change', async function () {
                let idHuerto = selector.value;

                const respuesta = await fetch('../../../api/medicionesFecha/' +
                    '?idHuerto=' + idHuerto +
                    '&desde=' + desde +
                    '&hasta=' + hasta +
                    '&senyal=' + 1);

                if (respuesta.ok) {
                    const mediciones = await respuesta.json();
                    console.log(mediciones);

                    let horas = mediciones.map(function (medicion) {
                        return medicion.hora + ":" + medicion.minutos;
                    });

                    let datosPhFecha = {
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

                    let opcionesPhFecha = {
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

                    for (let i = horas.length-1; i >= 0; i--) {
                        datosPhFecha.labels.push(horas[i]);
                        datosPhFecha.datasets[0].data.push(mediciones[i].mediapH);
                    }


                    miGraficapH.options = opcionesPhFecha;
                    miGraficapH.data = datosPhFecha;
                    miGraficapH.update();
                }
            });



        }//si son 3 o menos días
        else{
            console.log('4 o más días');

            let huertosDelUsuario = await getHuertosUsuario();
            let idHuertos = huertosDelUsuario.map(function (huerto) {
                return huerto.id_huerto;
            });

            const idHuerto = idHuertos[0];
            const respuesta = await fetch('../../../api/medicionesFecha/' +
                '?idHuerto=' + idHuerto +
                '&desde=' + desde +
                '&hasta=' + hasta +
                '&senyal=' + 0);

            if (respuesta.ok) {
                const mediciones = await respuesta.json();
                console.log(mediciones);

                let dias = mediciones.map(function (medicion) {
                    let fecha = medicion.fecha_medicion;

                    let partes = fecha.split("-");
                    var anio = partes[0];
                    var mes = partes[1];
                    var dia = partes[2];

                    var fechaFormateada = dia + "/" + mes + "/" + anio;

                    return fechaFormateada;
                });


                let datosPhFecha = {
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

                let opcionesPhFecha = {
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

                for (let i = dias.length-1; i >= 0; i--) {
                    datosPhFecha.labels.push(dias[i]);
                    datosPhFecha.datasets[0].data.push(mediciones[i].mediapH);
                }

                miGraficapH.options = opcionesPhFecha;
                miGraficapH.data = datosPhFecha;
                miGraficapH.update();

                //------------------------------------------------------------------------SELECTOR
                const selector = document.getElementById('seleccionar_huerto');

                //conseguimos la id del huerto seleccionado
                selector.addEventListener('change', async function () {
                    let idHuerto = selector.value;

                    const respuesta = await fetch('../../../api/medicionesFecha/' +
                        '?idHuerto=' + idHuerto +
                        '&desde=' + desde +
                        '&hasta=' + hasta +
                        '&senyal=' + 0);

                    if (respuesta.ok) {
                        const mediciones = await respuesta.json();
                        console.log(mediciones);

                        let dias = mediciones.map(function (medicion) {
                            let fecha = medicion.fecha_medicion;

                            let partes = fecha.split("-");
                            var anio = partes[0];
                            var mes = partes[1];
                            var dia = partes[2];

                            var fechaFormateada = dia + "/" + mes + "/" + anio;

                            return fechaFormateada;
                        });


                        let datosPhFecha = {
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

                        let opcionesPhFecha = {
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

                        for (let i = dias.length - 1; i >= 0; i--) {
                            datosPhFecha.labels.push(dias[i]);
                            datosPhFecha.datasets[0].data.push(mediciones[i].mediapH);
                        }

                        miGraficapH.options = opcionesPhFecha;
                        miGraficapH.data = datosPhFecha;
                        miGraficapH.update();

                    }

                });
            }
        }//si son 4 o más días

//--------------------------------------------ACORDEÓN--------------------------------------------------


        formularioFechaAcordeonPh.addEventListener('submit', async function(event) {
            event.preventDefault();

            let desde = document.getElementById('desde-acordeon-ph').value;
            let hasta = document.getElementById('hasta-acordeon-ph').value;

            let fechaDesde = new Date(desde);
            let fechaHasta = new Date(hasta);

            let diferenciaMs = fechaHasta - fechaDesde;

            let diferenciaDias = Math.floor(diferenciaMs / (1000 * 60 * 60 * 24));

            console.log(diferenciaDias);

            if (diferenciaDias <= 3) {
                console.log('3 o menos días');

                //---------------------------------------------------------------HUERTO CARGADO POR DEFECTO
                let huertosDelUsuario = await getHuertosUsuario();
                let idHuertos = huertosDelUsuario.map(function (huerto) {
                    return huerto.id_huerto;
                });

                const idHuerto = idHuertos[0];
                const respuesta = await fetch('../../../api/medicionesFecha/' +
                    '?idHuerto=' + idHuerto +
                    '&desde=' + desde +
                    '&hasta=' + hasta +
                    '&senyal=' + 1);

                if (respuesta.ok) {
                    const mediciones = await respuesta.json();

                    let horas = mediciones.map(function (medicion) {
                        return medicion.hora + ":" + medicion.minutos;
                    });

                    let datosPhFecha = {
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

                    let opcionesPhFecha = {
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

                    for (let i = horas.length-1; i >= 0; i--) {
                        datosPhFecha.labels.push(horas[i]);
                        datosPhFecha.datasets[0].data.push(mediciones[i].mediapH);
                    }


                    graficaAcordeonPh.options = opcionesPhFecha;
                    graficaAcordeonPh.data = datosPhFecha;
                    graficaAcordeonPh.update();
                }



                //---------------------------------------------------------------SELECTOR DE HUERTOS

                const selector = document.getElementById('seleccionar_huerto');

                //conseguimos la id del huerto seleccionado
                selector.addEventListener('change', async function () {
                    let idHuerto = selector.value;

                    const respuesta = await fetch('../../../api/medicionesFecha/' +
                        '?idHuerto=' + idHuerto +
                        '&desde=' + desde +
                        '&hasta=' + hasta +
                        '&senyal=' + 1);

                    if (respuesta.ok) {
                        const mediciones = await respuesta.json();

                        let horas = mediciones.map(function (medicion) {
                            return medicion.hora + ":" + medicion.minutos;
                        });

                        let datosPhFecha = {
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

                        let opcionesPhFecha = {
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

                        for (let i = horas.length-1; i >= 0; i--) {
                            datosPhFecha.labels.push(horas[i]);
                            datosPhFecha.datasets[0].data.push(mediciones[i].mediapH);
                        }


                        graficaAcordeonPh.options = opcionesPhFecha;
                        graficaAcordeonPh.data = datosPhFecha;
                        graficaAcordeonPh.update();
                    }
                });



            }//si son 3 o menos días

            else{
                console.log('4 o más días');

                let huertosDelUsuario = await getHuertosUsuario();
                let idHuertos = huertosDelUsuario.map(function (huerto) {
                    return huerto.id_huerto;
                });

                const idHuerto = idHuertos[0];
                const respuesta = await fetch('../../../api/medicionesFecha/' +
                    '?idHuerto=' + idHuerto +
                    '&desde=' + desde +
                    '&hasta=' + hasta +
                    '&senyal=' + 0);

                if (respuesta.ok) {
                    const mediciones = await respuesta.json();

                    let dias = mediciones.map(function (medicion) {
                        let fecha = medicion.fecha_medicion;

                        let partes = fecha.split("-");
                        var anio = partes[0];
                        var mes = partes[1];
                        var dia = partes[2];

                        var fechaFormateada = dia + "/" + mes + "/" + anio;

                        return fechaFormateada;
                    });


                    let datosPhFecha = {
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

                    let opcionesPhFecha = {
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

                    for (let i = dias.length-1; i >= 0; i--) {
                        datosPhFecha.labels.push(dias[i]);
                        datosPhFecha.datasets[0].data.push(mediciones[i].mediapH);
                    }

                    graficaAcordeonPh.options = opcionesPhFecha;
                    graficaAcordeonPh.data = datosPhFecha;
                    graficaAcordeonPh.update();

                    //------------------------------------------------------------------------SELECTOR
                    const selector = document.getElementById('seleccionar_huerto');

                    //conseguimos la id del huerto seleccionado
                    selector.addEventListener('change', async function () {
                        let idHuerto = selector.value;

                        const respuesta = await fetch('../../../api/medicionesFecha/' +
                            '?idHuerto=' + idHuerto +
                            '&desde=' + desde +
                            '&hasta=' + hasta +
                            '&senyal=' + 0);

                        if (respuesta.ok) {
                            const mediciones = await respuesta.json();

                            let dias = mediciones.map(function (medicion) {
                                let fecha = medicion.fecha_medicion;

                                let partes = fecha.split("-");
                                var anio = partes[0];
                                var mes = partes[1];
                                var dia = partes[2];

                                var fechaFormateada = dia + "/" + mes + "/" + anio;

                                return fechaFormateada;
                            });

                            let datosPhFecha = {
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

                            let opcionesPhFecha = {
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

                            for (let i = dias.length - 1; i >= 0; i--) {
                                datosPhFecha.labels.push(dias[i]);
                                datosPhFecha.datasets[0].data.push(mediciones[i].mediapH);
                            }

                            graficaAcordeonPh.options = opcionesPhFecha;
                            graficaAcordeonPh.data = datosPhFecha;
                            graficaAcordeonPh.update();

                        }

                    });
                }
            }//si son 4 o más días
        });
    });



    //------------------------------------------------------------SELECCIONAR FECHA----------GRÁFICA TEMPERATURA
    //Cuando se selecciona "Seleccionar fecha" aparecen los inputs:
    let filtroTemperatura = document.getElementById('filtro_temperatura');
    let formularioFechaTemperatura = document.getElementById('seleccionar_fecha_temperatura');

    let filtroAcordeonTemperatura = document.getElementById('filtro_acordeon_temperatura');
    let formularioFechaAcordeonTemperatura = document.getElementById('seleccionar_fecha_acordeon_temperatura')

    filtroTemperatura.addEventListener('change', function(){
        if(filtroTemperatura.value === 'Seleccionar fecha'){
            formularioFechaTemperatura.style.display = "block";
        }
        if(filtroTemperatura.value !== 'Seleccionar fecha'){
            formularioFechaTemperatura.style.display = "none";
        }
    });

    filtroAcordeonTemperatura.addEventListener('change', function(){
        if(filtroAcordeonTemperatura.value ==='Seleccionar fecha'){
            formularioFechaAcordeonTemperatura.style.display = "block";
        }
        if(filtroAcordeonTemperatura.value !=='Seleccionar fecha'){
            formularioFechaAcordeonTemperatura.style.display = "none";
        }
    });

//-------------------------------------VISUALIZADOR DE HUERTOS--------------------------------------------------
    formularioFechaTemperatura.addEventListener('submit', async function(event) {
        event.preventDefault();

        let desde = document.getElementById('desde-temperatura').value;
        let hasta = document.getElementById('hasta-temperatura').value;

        let fechaDesde = new Date(desde);
        let fechaHasta = new Date(hasta);

        let diferenciaMs = fechaHasta - fechaDesde;

        let diferenciaDias = Math.floor(diferenciaMs / (1000 * 60 * 60 * 24));

        console.log(diferenciaDias);

        if (diferenciaDias <= 3) {
            console.log('3 o menos días');

            //---------------------------------------------------------------HUERTO CARGADO POR DEFECTO
            let huertosDelUsuario = await getHuertosUsuario();
            let idHuertos = huertosDelUsuario.map(function (huerto) {
                return huerto.id_huerto;
            });

            const idHuerto = idHuertos[0];
            const respuesta = await fetch('../../../api/medicionesFecha/' +
                '?idHuerto=' + idHuerto +
                '&desde=' + desde +
                '&hasta=' + hasta +
                '&senyal=' + 1);

            if (respuesta.ok) {
                const mediciones = await respuesta.json();
                console.log(mediciones);

                let horas = mediciones.map(function (medicion) {
                    return medicion.hora + ":" + medicion.minutos;
                });

                let datosTemperaturaFecha = {
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

                let opcionesTemperaturaFecha = {
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

                for (let i = horas.length-1; i >= 0; i--) {
                    datosTemperaturaFecha.labels.push(horas[i]);
                    datosTemperaturaFecha.datasets[0].data.push(mediciones[i].mediaTemperatura);
                }


                miGraficaTemperatura.options = opcionesTemperaturaFecha;
                miGraficaTemperatura.data = datosTemperaturaFecha;
                miGraficaTemperatura.update();
            }



            //---------------------------------------------------------------SELECTOR DE HUERTOS

            const selector = document.getElementById('seleccionar_huerto');

            //conseguimos la id del huerto seleccionado
            selector.addEventListener('change', async function () {
                let idHuerto = selector.value;

                const respuesta = await fetch('../../../api/medicionesFecha/' +
                    '?idHuerto=' + idHuerto +
                    '&desde=' + desde +
                    '&hasta=' + hasta +
                    '&senyal=' + 1);

                if (respuesta.ok) {
                    const mediciones = await respuesta.json();

                    let horas = mediciones.map(function (medicion) {
                        return medicion.hora + ":" + medicion.minutos;
                    });

                    let datosTemperaturaFecha = {
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

                    let opcionesTemperaturaFecha = {
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

                    for (let i = horas.length-1; i >= 0; i--) {
                        datosTemperaturaFecha.labels.push(horas[i]);
                        datosTemperaturaFecha.datasets[0].data.push(mediciones[i].mediaTemperatura);
                    }


                    miGraficaTemperatura.options = opcionesTemperaturaFecha;
                    miGraficaTemperatura.data = datosTemperaturaFecha;
                    miGraficaTemperatura.update();
                }
            });



        }//si son 3 o menos días
        else{
            console.log('4 o más días');

            let huertosDelUsuario = await getHuertosUsuario();
            let idHuertos = huertosDelUsuario.map(function (huerto) {
                return huerto.id_huerto;
            });

            const idHuerto = idHuertos[0];
            const respuesta = await fetch('../../../api/medicionesFecha/' +
                '?idHuerto=' + idHuerto +
                '&desde=' + desde +
                '&hasta=' + hasta +
                '&senyal=' + 0);

            if (respuesta.ok) {
                const mediciones = await respuesta.json();

                let dias = mediciones.map(function (medicion) {
                    let fecha = medicion.fecha_medicion;

                    let partes = fecha.split("-");
                    var anio = partes[0];
                    var mes = partes[1];
                    var dia = partes[2];

                    var fechaFormateada = dia + "/" + mes + "/" + anio;

                    return fechaFormateada;
                });


                let datosTemperaturaFecha = {
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

                let opcionesTemperaturaFecha = {
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

                for (let i = dias.length-1; i >= 0; i--) {
                    datosTemperaturaFecha.labels.push(dias[i]);
                    datosTemperaturaFecha.datasets[0].data.push(mediciones[i].mediaTemperatura);
                }

                miGraficaTemperatura.options = opcionesTemperaturaFecha;
                miGraficaTemperatura.data = datosTemperaturaFecha;
                miGraficaTemperatura.update();

                //------------------------------------------------------------------------SELECTOR
                const selector = document.getElementById('seleccionar_huerto');

                //conseguimos la id del huerto seleccionado
                selector.addEventListener('change', async function () {
                    let idHuerto = selector.value;

                    const respuesta = await fetch('../../../api/medicionesFecha/' +
                        '?idHuerto=' + idHuerto +
                        '&desde=' + desde +
                        '&hasta=' + hasta +
                        '&senyal=' + 0);

                    if (respuesta.ok) {
                        const mediciones = await respuesta.json();

                        let dias = mediciones.map(function (medicion) {
                            let fecha = medicion.fecha_medicion;

                            let partes = fecha.split("-");
                            var anio = partes[0];
                            var mes = partes[1];
                            var dia = partes[2];

                            var fechaFormateada = dia + "/" + mes + "/" + anio;

                            return fechaFormateada;
                        });


                        let datosTemperaturaFecha = {
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

                        let opcionesTemperaturaFecha = {
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

                        for (let i = dias.length - 1; i >= 0; i--) {
                            datosTemperaturaFecha.labels.push(dias[i]);
                            datosTemperaturaFecha.datasets[0].data.push(mediciones[i].mediaTemperatura);
                        }

                        miGraficaTemperatura.options = opcionesTemperaturaFecha;
                        miGraficaTemperatura.data = datosTemperaturaFecha;
                        miGraficaTemperatura.update();

                    }

                });
            }
        }//si son 4 o más días

//--------------------------------------------ACORDEÓN--------------------------------------------------


        formularioFechaAcordeonTemperatura.addEventListener('submit', async function(event) {
            event.preventDefault();

            let desde = document.getElementById('desde-acordeon-temperatura').value;
            let hasta = document.getElementById('hasta-acordeon-temperatura').value;

            let fechaDesde = new Date(desde);
            let fechaHasta = new Date(hasta);

            let diferenciaMs = fechaHasta - fechaDesde;

            let diferenciaDias = Math.floor(diferenciaMs / (1000 * 60 * 60 * 24));

            console.log(diferenciaDias);

            if (diferenciaDias <= 3) {
                console.log('3 o menos días');

                //---------------------------------------------------------------HUERTO CARGADO POR DEFECTO
                let huertosDelUsuario = await getHuertosUsuario();
                let idHuertos = huertosDelUsuario.map(function (huerto) {
                    return huerto.id_huerto;
                });

                const idHuerto = idHuertos[0];
                const respuesta = await fetch('../../../api/medicionesFecha/' +
                    '?idHuerto=' + idHuerto +
                    '&desde=' + desde +
                    '&hasta=' + hasta +
                    '&senyal=' + 1);

                if (respuesta.ok) {
                    const mediciones = await respuesta.json();

                    let horas = mediciones.map(function (medicion) {
                        return medicion.hora + ":" + medicion.minutos;
                    });

                    let datosTemperaturaFecha = {
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

                    let opcionesTemperaturaFecha = {
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

                    for (let i = horas.length-1; i >= 0; i--) {
                        datosTemperaturaFecha.labels.push(horas[i]);
                        datosTemperaturaFecha.datasets[0].data.push(mediciones[i].mediaTemperatura);
                    }


                    graficaAcordeonTemperatura.options = opcionesTemperaturaFecha;
                    graficaAcordeonTemperatura.data = datosTemperaturaFecha;
                    graficaAcordeonTemperatura.update();
                }



                //---------------------------------------------------------------SELECTOR DE HUERTOS

                const selector = document.getElementById('seleccionar_huerto');

                //conseguimos la id del huerto seleccionado
                selector.addEventListener('change', async function () {
                    let idHuerto = selector.value;

                    const respuesta = await fetch('../../../api/medicionesFecha/' +
                        '?idHuerto=' + idHuerto +
                        '&desde=' + desde +
                        '&hasta=' + hasta +
                        '&senyal=' + 1);

                    if (respuesta.ok) {
                        const mediciones = await respuesta.json();

                        let horas = mediciones.map(function (medicion) {
                            return medicion.hora + ":" + medicion.minutos;
                        });

                        let datosTemperaturaFecha = {
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

                        let opcionesTemperaturaFecha = {
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

                        for (let i = horas.length-1; i >= 0; i--) {
                            datosTemperaturaFecha.labels.push(horas[i]);
                            datosTemperaturaFecha.datasets[0].data.push(mediciones[i].mediaTemperatura);
                        }


                        graficaAcordeonTemperatura.options = opcionesTemperaturaFecha;
                        graficaAcordeonTemperatura.data = datosTemperaturaFecha;
                        graficaAcordeonTemperatura.update();
                    }
                });



            }//si son 3 o menos días

            else{
                console.log('4 o más días');

                let huertosDelUsuario = await getHuertosUsuario();
                let idHuertos = huertosDelUsuario.map(function (huerto) {
                    return huerto.id_huerto;
                });

                const idHuerto = idHuertos[0];
                const respuesta = await fetch('../../../api/medicionesFecha/' +
                    '?idHuerto=' + idHuerto +
                    '&desde=' + desde +
                    '&hasta=' + hasta +
                    '&senyal=' + 0);

                if (respuesta.ok) {
                    const mediciones = await respuesta.json();

                    let dias = mediciones.map(function (medicion) {
                        let fecha = medicion.fecha_medicion;

                        let partes = fecha.split("-");
                        var anio = partes[0];
                        var mes = partes[1];
                        var dia = partes[2];

                        var fechaFormateada = dia + "/" + mes + "/" + anio;

                        return fechaFormateada;
                    });


                    let datosTemperaturaFecha = {
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

                    let opcionesTemperaturaFecha = {
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

                    for (let i = dias.length-1; i >= 0; i--) {
                        datosTemperaturaFecha.labels.push(dias[i]);
                        datosTemperaturaFecha.datasets[0].data.push(mediciones[i].mediaTemperatura);
                    }

                    graficaAcordeonTemperatura.options = opcionesTemperaturaFecha;
                    graficaAcordeonTemperatura.data = datosTemperaturaFecha;
                    graficaAcordeonTemperatura.update();

                    //------------------------------------------------------------------------SELECTOR
                    const selector = document.getElementById('seleccionar_huerto');

                    //conseguimos la id del huerto seleccionado
                    selector.addEventListener('change', async function () {
                        let idHuerto = selector.value;

                        const respuesta = await fetch('../../../api/medicionesFecha/' +
                            '?idHuerto=' + idHuerto +
                            '&desde=' + desde +
                            '&hasta=' + hasta +
                            '&senyal=' + 0);

                        if (respuesta.ok) {
                            const mediciones = await respuesta.json();

                            let dias = mediciones.map(function (medicion) {
                                let fecha = medicion.fecha_medicion;

                                let partes = fecha.split("-");
                                var anio = partes[0];
                                var mes = partes[1];
                                var dia = partes[2];

                                var fechaFormateada = dia + "/" + mes + "/" + anio;

                                return fechaFormateada;
                            });

                            let datosTemperaturaFecha = {
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

                            let opcionesTemperaturaFecha = {
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

                            for (let i = dias.length - 1; i >= 0; i--) {
                                datosTemperaturaFecha.labels.push(dias[i]);
                                datosTemperaturaFecha.datasets[0].data.push(mediciones[i].mediaTemperatura);
                            }

                            graficaAcordeonTemperatura.options = opcionesTemperaturaFecha;
                            graficaAcordeonTemperatura.data = datosTemperaturaFecha;
                            graficaAcordeonTemperatura.update();

                        }

                    });
                }
            }//si son 4 o más días
        });
    });





    //------------------------------------------------------------SELECCIONAR FECHA-------------GRÁFICA LUZ
    //Cuando se selecciona "Seleccionar fecha" aparecen los inputs:
    let filtroLuz = document.getElementById('filtro_luz');
    let formularioFechaLuz = document.getElementById('seleccionar_fecha_luz');

    let filtroAcordeonLuz = document.getElementById('filtro_acordeon_luz');
    let formularioFechaAcordeonLuz = document.getElementById('seleccionar_fecha_acordeon_luz')

    filtroLuz.addEventListener('change', function(){
        if(filtroLuz.value === 'Seleccionar fecha'){
            formularioFechaLuz.style.display = "block";
        }
        if(filtroLuz.value !== 'Seleccionar fecha'){
            formularioFechaLuz.style.display = "none";
        }
    });

    filtroAcordeonLuz.addEventListener('change', function(){
        if(filtroAcordeonLuz.value ==='Seleccionar fecha'){
            formularioFechaAcordeonLuz.style.display = "block";
        }
        if(filtroAcordeonLuz.value !=='Seleccionar fecha'){
            formularioFechaAcordeonLuz.style.display = "none";
        }
    });

//-------------------------------------VISUALIZADOR DE HUERTOS--------------------------------------------------
    formularioFechaLuz.addEventListener('submit', async function(event) {
        event.preventDefault();

        let desde = document.getElementById('desde-luz').value;
        let hasta = document.getElementById('hasta-luz').value;

        let fechaDesde = new Date(desde);
        let fechaHasta = new Date(hasta);

        let diferenciaMs = fechaHasta - fechaDesde;

        let diferenciaDias = Math.floor(diferenciaMs / (1000 * 60 * 60 * 24));

        console.log(diferenciaDias);

        if (diferenciaDias <= 3) {
            console.log('3 o menos días');

            //---------------------------------------------------------------HUERTO CARGADO POR DEFECTO
            let huertosDelUsuario = await getHuertosUsuario();
            let idHuertos = huertosDelUsuario.map(function (huerto) {
                return huerto.id_huerto;
            });

            const idHuerto = idHuertos[0];
            const respuesta = await fetch('../../../api/medicionesFecha/' +
                '?idHuerto=' + idHuerto +
                '&desde=' + desde +
                '&hasta=' + hasta +
                '&senyal=' + 1);

            if (respuesta.ok) {
                const mediciones = await respuesta.json();
                console.log(mediciones);

                let horas = mediciones.map(function (medicion) {
                    return medicion.hora + ":" + medicion.minutos;
                });

                let datosLuzFecha = {
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

                let opcionesLuzFecha = {
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

                for (let i = horas.length-1; i >= 0; i--) {
                    datosLuzFecha.labels.push(horas[i]);
                    datosLuzFecha.datasets[0].data.push(mediciones[i].mediaLuminosidad);
                }


                miGraficaLuz.options = opcionesLuzFecha;
                miGraficaLuz.data = datosLuzFecha;
                miGraficaLuz.update();
            }



            //---------------------------------------------------------------SELECTOR DE HUERTOS

            const selector = document.getElementById('seleccionar_huerto');

            //conseguimos la id del huerto seleccionado
            selector.addEventListener('change', async function () {
                let idHuerto = selector.value;

                const respuesta = await fetch('../../../api/medicionesFecha/' +
                    '?idHuerto=' + idHuerto +
                    '&desde=' + desde +
                    '&hasta=' + hasta +
                    '&senyal=' + 1);

                if (respuesta.ok) {
                    const mediciones = await respuesta.json();
                    console.log(mediciones);

                    let horas = mediciones.map(function (medicion) {
                        return medicion.hora + ":" + medicion.minutos;
                    });

                    let datosLuzFecha = {
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

                    let opcionesLuzFecha = {
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

                    for (let i = horas.length-1; i >= 0; i--) {
                        datosLuzFecha.labels.push(horas[i]);
                        datosLuzFecha.datasets[0].data.push(mediciones[i].mediaLuminosidad);
                    }


                    miGraficaLuz.options = opcionesLuzFecha;
                    miGraficaLuz.data = datosLuzFecha;
                    miGraficaLuz.update();
                }
            });



        }//si son 3 o menos días
        else{
            console.log('4 o más días');

            let huertosDelUsuario = await getHuertosUsuario();
            let idHuertos = huertosDelUsuario.map(function (huerto) {
                return huerto.id_huerto;
            });

            const idHuerto = idHuertos[0];
            const respuesta = await fetch('../../../api/medicionesFecha/' +
                '?idHuerto=' + idHuerto +
                '&desde=' + desde +
                '&hasta=' + hasta +
                '&senyal=' + 0);

            if (respuesta.ok) {
                const mediciones = await respuesta.json();

                let dias = mediciones.map(function (medicion) {
                    let fecha = medicion.fecha_medicion;

                    let partes = fecha.split("-");
                    var anio = partes[0];
                    var mes = partes[1];
                    var dia = partes[2];

                    var fechaFormateada = dia + "/" + mes + "/" + anio;

                    return fechaFormateada;
                });


                let datosLuzFecha = {
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

                let opcionesLuzFecha = {
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

                for (let i = dias.length-1; i >= 0; i--) {
                    datosLuzFecha.labels.push(dias[i]);
                    datosLuzFecha.datasets[0].data.push(mediciones[i].mediaLuminosidad);
                }

                miGraficaLuz.options = opcionesLuzFecha;
                miGraficaLuz.data = datosLuzFecha;
                miGraficaLuz.update();

                //------------------------------------------------------------------------SELECTOR
                const selector = document.getElementById('seleccionar_huerto');

                //conseguimos la id del huerto seleccionado
                selector.addEventListener('change', async function () {
                    let idHuerto = selector.value;

                    const respuesta = await fetch('../../../api/medicionesFecha/' +
                        '?idHuerto=' + idHuerto +
                        '&desde=' + desde +
                        '&hasta=' + hasta +
                        '&senyal=' + 0);

                    if (respuesta.ok) {
                        const mediciones = await respuesta.json();

                        let dias = mediciones.map(function (medicion) {
                            let fecha = medicion.fecha_medicion;

                            let partes = fecha.split("-");
                            var anio = partes[0];
                            var mes = partes[1];
                            var dia = partes[2];

                            var fechaFormateada = dia + "/" + mes + "/" + anio;

                            return fechaFormateada;
                        });


                        let datosLuzFecha = {
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

                        let opcionesLuzFecha = {
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

                        for (let i = dias.length - 1; i >= 0; i--) {
                            datosLuzFecha.labels.push(dias[i]);
                            datosLuzFecha.datasets[0].data.push(mediciones[i].mediaLuminosidad);
                        }

                        miGraficaLuz.options = opcionesLuzFecha;
                        miGraficaLuz.data = datosLuzFecha;
                        miGraficaLuz.update();

                    }

                });
            }
        }//si son 4 o más días

//--------------------------------------------ACORDEÓN--------------------------------------------------


        formularioFechaAcordeonLuz.addEventListener('submit', async function(event) {
            event.preventDefault();

            let desde = document.getElementById('desde-acordeon-luz').value;
            let hasta = document.getElementById('hasta-acordeon-luz').value;

            let fechaDesde = new Date(desde);
            let fechaHasta = new Date(hasta);

            let diferenciaMs = fechaHasta - fechaDesde;

            let diferenciaDias = Math.floor(diferenciaMs / (1000 * 60 * 60 * 24));

            console.log(diferenciaDias);

            if (diferenciaDias <= 3) {
                console.log('3 o menos días');

                //---------------------------------------------------------------HUERTO CARGADO POR DEFECTO
                let huertosDelUsuario = await getHuertosUsuario();
                let idHuertos = huertosDelUsuario.map(function (huerto) {
                    return huerto.id_huerto;
                });

                const idHuerto = idHuertos[0];
                const respuesta = await fetch('../../../api/medicionesFecha/' +
                    '?idHuerto=' + idHuerto +
                    '&desde=' + desde +
                    '&hasta=' + hasta +
                    '&senyal=' + 1);

                if (respuesta.ok) {
                    const mediciones = await respuesta.json();

                    let horas = mediciones.map(function (medicion) {
                        return medicion.hora + ":" + medicion.minutos;
                    });

                    let datosLuzFecha = {
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

                    let opcionesLuzFecha = {
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

                    for (let i = horas.length-1; i >= 0; i--) {
                        datosLuzFecha.labels.push(horas[i]);
                        datosLuzFecha.datasets[0].data.push(mediciones[i].mediaLuminosidad);
                    }


                    graficaAcordeonLuz.options = opcionesLuzFecha;
                    graficaAcordeonLuz.data = datosLuzFecha;
                    graficaAcordeonLuz.update();
                }



                //---------------------------------------------------------------SELECTOR DE HUERTOS

                const selector = document.getElementById('seleccionar_huerto');

                //conseguimos la id del huerto seleccionado
                selector.addEventListener('change', async function () {
                    let idHuerto = selector.value;

                    const respuesta = await fetch('../../../api/medicionesFecha/' +
                        '?idHuerto=' + idHuerto +
                        '&desde=' + desde +
                        '&hasta=' + hasta +
                        '&senyal=' + 1);

                    if (respuesta.ok) {
                        const mediciones = await respuesta.json();

                        let horas = mediciones.map(function (medicion) {
                            return medicion.hora + ":" + medicion.minutos;
                        });

                        let datosLuzFecha = {
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

                        let opcionesLuzFecha = {
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

                        for (let i = horas.length-1; i >= 0; i--) {
                            datosLuzFecha.labels.push(horas[i]);
                            datosLuzFecha.datasets[0].data.push(mediciones[i].mediaLuminosidad);
                        }


                        graficaAcordeonLuz.options = opcionesLuzFecha;
                        graficaAcordeonLuz.data = datosLuzFecha;
                        graficaAcordeonLuz.update();
                    }
                });



            }//si son 3 o menos días

            else{
                console.log('4 o más días');

                let huertosDelUsuario = await getHuertosUsuario();
                let idHuertos = huertosDelUsuario.map(function (huerto) {
                    return huerto.id_huerto;
                });

                const idHuerto = idHuertos[0];
                const respuesta = await fetch('../../../api/medicionesFecha/' +
                    '?idHuerto=' + idHuerto +
                    '&desde=' + desde +
                    '&hasta=' + hasta +
                    '&senyal=' + 0);

                if (respuesta.ok) {
                    const mediciones = await respuesta.json();

                    let dias = mediciones.map(function (medicion) {
                        let fecha = medicion.fecha_medicion;

                        let partes = fecha.split("-");
                        var anio = partes[0];
                        var mes = partes[1];
                        var dia = partes[2];

                        var fechaFormateada = dia + "/" + mes + "/" + anio;

                        return fechaFormateada;
                    });


                    let datosLuzFecha = {
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

                    let opcionesLuzFecha = {
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

                    for (let i = dias.length-1; i >= 0; i--) {
                        datosLuzFecha.labels.push(dias[i]);
                        datosLuzFecha.datasets[0].data.push(mediciones[i].mediaLuminosidad);
                    }

                    graficaAcordeonLuz.options = opcionesLuzFecha;
                    graficaAcordeonLuz.data = datosLuzFecha;
                    graficaAcordeonLuz.update();

                    //------------------------------------------------------------------------SELECTOR
                    const selector = document.getElementById('seleccionar_huerto');

                    //conseguimos la id del huerto seleccionado
                    selector.addEventListener('change', async function () {
                        let idHuerto = selector.value;

                        const respuesta = await fetch('../../../api/medicionesFecha/' +
                            '?idHuerto=' + idHuerto +
                            '&desde=' + desde +
                            '&hasta=' + hasta +
                            '&senyal=' + 0);

                        if (respuesta.ok) {
                            const mediciones = await respuesta.json();

                            let dias = mediciones.map(function (medicion) {
                                let fecha = medicion.fecha_medicion;

                                let partes = fecha.split("-");
                                var anio = partes[0];
                                var mes = partes[1];
                                var dia = partes[2];

                                var fechaFormateada = dia + "/" + mes + "/" + anio;

                                return fechaFormateada;
                            });

                            let datosLuzFecha = {
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

                            let opcionesLuzFecha = {
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

                            for (let i = dias.length - 1; i >= 0; i--) {
                                datosLuzFecha.labels.push(dias[i]);
                                datosLuzFecha.datasets[0].data.push(mediciones[i].mediaLuminosidad);
                            }

                            graficaAcordeonLuz.options = opcionesLuzFecha;
                            graficaAcordeonLuz.data = datosLuzFecha;
                            graficaAcordeonLuz.update();

                        }

                    });
                }
            }//si son 4 o más días
        });
    });
}

getDatosPorFecha();