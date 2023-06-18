//......................................................................................................................
/*                                       GRÁFICAS DEL USUARIO REGISTRADO                                           */
//......................................................................................................................
//......................................................................................................................
//......................................................................................................................
//DECLARACIÓN DE VARIABLES:
//VISUALIZADOR DE HUERTOS
//--Dato Actual
//----Salinidad
let datoActualTabSalinidad = document.getElementById('dato_actual_tab_salinidad');
let datoActualSalinidad = document.getElementById('dato_actual_salinidad');
//----Humedad
let datoActualTabHumedad = document.getElementById('dato_actual_tab_humedad');
let datoActualHumedad = document.getElementById('dato_actual_humedad');
//----pH
let datoActualTabPh = document.getElementById('dato_actual_tab_pH');
let datoActualPh = document.getElementById('dato_actual_pH');
//----Temperatura
let datoActualTabTemperatura = document.getElementById('dato_actual_tab_Temperatura');
let datoActualTemperatura = document.getElementById('dato_actual_temperatura');
//----Luz
let datoActualTabLuz = document.getElementById('dato_actual_tab_luz');
let datoActualLuz = document.getElementById('dato_actual_luz');
//GRAFICAS
let grafica = document.getElementById('chart-sal');
let filtro = document.getElementById('filtro_salinidad');
//BOTONES
let tabSalinidad = document.getElementById('tab_salinidad');
let tabHumedad = document.getElementById('tab_humedad')

//ACORDEON
let seccionAcordeon = document.getElementById('acordeon');
//--Dato Actual
//----Salinidad
let datoActualAcordeonSalinidad = document.getElementById('dato_actual_acordeon_salinidad');
//----Humedad
let datoActualAcordeonHumedad = document.getElementById('dato_actual_acordeon_humedad');
//----pH
let datoActualAcordeonPh = document.getElementById('dato_actual_acordeon_pH');
//----Temperatura
let datoActualAcordeonTemperatura = document.getElementById('dato_actual_acordeon_temperatura');
//----Luz
let datoActualAcordeonLuz = document.getElementById('dato_actual_acordeon_luz');
//GRAFICAS
let filtroAcordeon = document.getElementById('filtro_acordeon_salinidad');
let graficaAcordeonSalinidad = document.getElementById('chart-acordeon-sal');
let graficaAcordeonHum = document.getElementById('chart-acordeon-humedad');




//......................................................................................................................
//......................................................................................................................
//.......................................................
/*
            getSesionUsuario() --> datos
                                            ____datos____
                                            id_usuario: N
                                            nombre: txt
                                            idRol: N
                                            rol: txt
                                            _____________
*/
//.......................................................
async function getSesionUsuario(){
    const respuesta = await fetch('../../../api/sesion/');
    if(respuesta.ok){
        const datos = await respuesta.json();
        return datos;
    }
}
//......................................................................................................................
//......................................................................................................................
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
//......................................................................................................................
//......................................................................................................................
//------------------------------------------
/*
idHuerto: N --> getDatosHuertoPorIdHuerto() --> [datos]

____datos____
id_huerto: N
imagen: txt
nombre_huerto: txt
notas: txt
notificaciones: VoF
_____________
*/
//------------------------------------------
//......................................................................................................................
//......................................................................................................................
async function getDatosHuertoPorIdHuerto(idHuerto){
    const respuesta = await fetch('../../../api/huertos/' + '?idHuerto=' + idHuerto);
    if(respuesta.ok) {
        const datos = await respuesta.json();
        return datos;
    }
}
//......................................................................................................................
//......................................................................................................................
//.......................................................
/*
               Grafica base
*/
//.......................................................
let graficaBase = new Chart (grafica, {
    type: 'line'
})
//......................................................................................................................
//......................................................................................................................
//.......................................................
/*
               Graficaa Acordeon Salinidad
*/
//.......................................................
let graficaAcordeonSal = new Chart (graficaAcordeonSalinidad, {
    type: 'line'
})
//......................................................................................................................
//......................................................................................................................
//.......................................................
/*
               Grafica Acordeon Humedad
*/
//.......................................................
let graficaAcordeonHumedad = new Chart (graficaAcordeonHum, {
    type: 'line'
})


                                        /*
                                           ========================
                                                 DATO ACTUAL
                                           ========================
                                                                    */
//......................................................................................................................
//......................................................................................................................
//------------------------------------------
/*
    idHuerto --> cargarDatoActualTabs()
*/
//------------------------------------------
async function cargarDatoActualTabs(idHuerto) {
    const respuesta = await fetch('../../../api/medicionesDatoActual/' + '?idHuerto=' + idHuerto);
    if (respuesta.ok) {
        const mediciones = await respuesta.json();

        console.log(mediciones);

        //para quitarle los decimales a la medida si los decimales son "0":
        mediciones.forEach(function (objeto) {
            var parteDecimalHumedad = objeto.mediaHumedad % 1;
            var parteDecimalpH = objeto.mediapH % 1;
            var parteDecimalLuz = objeto.mediaLuminosidad % 1;
            var parteDecimalTemperatura = objeto.mediaTemperatura % 1;
            var parteDecimalSalinidad = objeto.mediaSalinidad % 1;

            if (parteDecimalSalinidad === 0) {
                objeto.mediaSalinidad = Math.floor(objeto.mediaSalinidad);
            }
            if(parteDecimalHumedad === 0){
                objeto.mediaHumedad = Math.floor(objeto.mediaHumedad);
            }
            if (parteDecimalpH === 0) {
                objeto.mediapH = Math.floor(objeto.mediapH);
            }
            if(parteDecimalLuz === 0){
                objeto.mediaLuminosidad = Math.floor(objeto.mediaLuminosidad);
            }
            if (parteDecimalTemperatura === 0) {
                objeto.mediaTemperatura = Math.floor(objeto.mediaTemperatura);
            }
        });

        //DATO ACTUAL SALINIDAD:
        datoActualTabSalinidad.innerText = "";
        datoActualTabSalinidad.innerText = mediciones[0].mediaSalinidad + "%";
        datoActualAcordeonSalinidad.innerText = "";
        datoActualAcordeonSalinidad.innerText = mediciones[0].mediaSalinidad + "%";


        //DATO ACTUAL HUMEDAD:
        datoActualTabHumedad.innerText = "";
        datoActualTabHumedad.innerText = mediciones[0].mediaHumedad + "%";
        datoActualAcordeonHumedad.innerText = "";
        datoActualAcordeonHumedad.innerText = mediciones[0].mediaHumedad + "%";

        //DATO ACTUAL PH:
        datoActualTabPh.innerText = "";
        datoActualTabPh.innerText = mediciones[0].mediapH;

                        /*datoActualPh.innerText = "";
                        datoActualPh.innerText = mediciones[0].mediapH;*/

        datoActualAcordeonPh.innerText = "";
        datoActualAcordeonPh.innerText = mediciones[0].mediapH;

        //DATO ACTUAL TEMPERATURA:
        datoActualTabTemperatura.innerText = "";
        datoActualTabTemperatura.innerText = mediciones[0].mediaTemperatura + "ºC";

                        /*datoActualTemperatura.innerText = "";
                        datoActualTemperatura.innerText = mediciones[0].mediaTemperatura + "ºC";*/

        datoActualAcordeonTemperatura.innerText = "";
        datoActualAcordeonTemperatura.innerText = mediciones[0].mediaTemperatura + "ºC";

        datoActualTabLuz.innerText = "";
                        //datoActualLuz.innerText = "";
        datoActualAcordeonLuz.innerText = "";

        if(mediciones[0].mediaLuminosidad === 1){
            datoActualTabLuz.innerText = "Oscuridad";
                            //datoActualLuz.innerText = "Oscuridad";
            datoActualAcordeonLuz.innerText = "Oscuridad";
        }
        if(mediciones[0].mediaLuminosidad === 2){
            datoActualTabLuz.innerText = "Poco iluminado";
                            //datoActualLuz.innerText = "Poco iluminado";
            datoActualAcordeonLuz.innerText = "Poco iluminado";
        }
        if(mediciones[0].mediaLuminosidad === 3){
            datoActualTabLuz.innerText = "Sombra";
                            //datoActualLuz.innerText = "Sombra";
            datoActualAcordeonLuz.innerText = "Sombra";
        }
        if(mediciones[0].mediaLuminosidad === 4){
            datoActualTabLuz.innerText = "Luz directa";
                            //datoActualLuz.innerText = "Luz directa";
            datoActualAcordeonLuz.innerText = "Luz directa";
        }
    }

}

//......................................................................................................................
//......................................................................................................................
//------------------------------------------
/*
    idHuerto --> cargarDatoActualSalinidad()
*/
//------------------------------------------
async function cargarDatoActualSalinidad(idHuerto) {
    const respuesta = await fetch('../../../api/medicionesDatoActual/' + '?idHuerto=' + idHuerto);
    if (respuesta.ok) {
        const mediciones = await respuesta.json();

        //para quitarle los decimales a la medida si los decimales son "0":
        mediciones.forEach(function (objeto) {
            var parteDecimalSalinidad = objeto.mediaSalinidad % 1;

            if (parteDecimalSalinidad === 0) {
                objeto.mediaSalinidad = Math.floor(objeto.mediaSalinidad);
            }
        });

        //DATO ACTUAL SALINIDAD:
        datoActualTabSalinidad.innerText = "";
        datoActualTabSalinidad.innerText = mediciones[0].mediaSalinidad + "%";

        datoActualSalinidad.innerText = "";
        datoActualSalinidad.innerText = mediciones[0].mediaSalinidad + "%";

        datoActualAcordeonSalinidad.innerText = "";
        datoActualAcordeonSalinidad.innerText = mediciones[0].mediaSalinidad + "%";
    }
}
//......................................................................................................................
//......................................................................................................................
//------------------------------------------
/*
    idHuerto --> cargarDatoActualHumedad()
*/
//------------------------------------------
async function cargarDatoActualHumedad(idHuerto) {
    const respuesta = await fetch('../../../api/medicionesDatoActual/' + '?idHuerto=' + idHuerto);
    if (respuesta.ok) {
        const mediciones = await respuesta.json();

        //para quitarle los decimales a la medida si los decimales son "0":
        mediciones.forEach(function (objeto) {
            var parteDecimalHumedad = objeto.mediaHumedad % 1;
            var parteDecimalpH = objeto.mediapH % 1;
            var parteDecimalLuz = objeto.mediaLuminosidad % 1;
            var parteDecimalTemperatura = objeto.mediaTemperatura % 1;

            if(parteDecimalHumedad === 0){
                objeto.mediaHumedad = Math.floor(objeto.mediaHumedad);
            }
            /*if (parteDecimalpH === 0) {
                objeto.mediapH = Math.floor(objeto.mediapH);
            }
            if(parteDecimalLuz === 0){
                objeto.mediaLuminosidad = Math.floor(objeto.mediaLuminosidad);
            }if (parteDecimalTemperatura === 0) {
                objeto.mediaTemperatura = Math.floor(objeto.mediaTemperatura);
            }*/
        });

        //DATO ACTUAL HUMEDAD:
        datoActualTabHumedad.innerText = "";
        datoActualTabHumedad.innerText = mediciones[0].mediaHumedad + "%";

        datoActualSalinidad.innerText = "";
        datoActualSalinidad.innerText = mediciones[0].mediaHumedad + "%";

        datoActualAcordeonHumedad.innerText = "";
        datoActualAcordeonHumedad.innerText = mediciones[0].mediaHumedad + "%";
        /*
                        //DATO ACTUAL PH:
                        datoActualTabPh.innerText = "";
                        datoActualTabPh.innerText = mediciones[0].mediapH;

                        datoActualPh.innerText = "";
                        datoActualPh.innerText = mediciones[0].mediapH;

                        datoActualAcordeonPh.innerText = "";
                        datoActualAcordeonPh.innerText = mediciones[0].mediapH;

                        //DATO ACTUAL TEMPERATURA:
                        datoActualTabTemperatura.innerText = "";
                        datoActualTabTemperatura.innerText = mediciones[0].mediaTemperatura + "ºC";

                        datoActualTemperatura.innerText = "";
                        datoActualTemperatura.innerText = mediciones[0].mediaTemperatura + "ºC";

                        datoActualAcordeonTemperatura.innerText = "";
                        datoActualAcordeonTemperatura.innerText = mediciones[0].mediaTemperatura + "ºC";

                        datoActualTabLuz.innerText = "";
                        datoActualLuz.innerText = "";
                        datoActualAcordeonLuz.innerText = "";

                        if(mediciones[0].mediaLuminosidad === 1){
                            datoActualTabLuz.innerText = "Oscuridad";
                            datoActualLuz.innerText = "Oscuridad";
                            datoActualAcordeonLuz.innerText = "Oscuridad";
                        }
                        if(mediciones[0].mediaLuminosidad === 2){
                            datoActualTabLuz.innerText = "Poco iluminado";
                            datoActualLuz.innerText = "Poco iluminado";
                            datoActualAcordeonLuz.innerText = "Poco iluminado";
                        }
                        if(mediciones[0].mediaLuminosidad === 3){
                            datoActualTabLuz.innerText = "Sombra";
                            datoActualLuz.innerText = "Sombra";
                            datoActualAcordeonLuz.innerText = "Sombra";
                        }
                        if(mediciones[0].mediaLuminosidad === 4){
                            datoActualTabLuz.innerText = "Luz directa";
                            datoActualLuz.innerText = "Luz directa";
                            datoActualAcordeonLuz.innerText = "Luz directa";
                        }
                    }*/
    }
}

//......................................................................................................................
//......................................................................................................................
//------------------------------------------
    /*
                getHuertoPorDefecto()
    */

//------------------------------------------
async function getHuertoPorDefecto() {
    //conseguimos la id de los huertos del usuario y las metemos en un array:
    let huertosDelUsuario = await getHuertosUsuario();
    let idHuertos = huertosDelUsuario.map(function (huerto) {
        return huerto.id_huerto;
    });
    //la primera casilla contendrá la id del primer huerto, el que aparecerá por defecto:
    cargarDatoActualSalinidad(idHuertos[0]);
    cargarDatoActualTabs(idHuertos[0]);
    construirGraficaSalinidad(idHuertos[0], "Hoy");

    window.addEventListener('resize', function(){
        if (getComputedStyle(seccionAcordeon).display !== "none") {
            construirGraficaSalinidad(idHuertos[0], "Hoy");
            construirGraficaHumedad(idHuertos[0], "Hoy");
        }
    })

}

//......................................................................................................................
//......................................................................................................................
//------------------------------------------
/*
                SELECTOR DE HUERTOS
*/
//------------------------------------------
selectorDeHuertos.addEventListener('change', function () {
    let idHuerto = selectorDeHuertos.value; //conseguimos la id del huerto seleccionado
    cargarDatoActualTabs(idHuerto);
    tabSalinidad.click();
    
    if (getComputedStyle(seccionAcordeon).display !== "none") {
        construirGraficaSalinidad(idHuerto, "Hoy");
        construirGraficaHumedad(idHuerto, "Hoy");
    }
});
//......................................................................................................................
//......................................................................................................................
//------------------------------------------
/*
                TAB SALINIDAD
*/
//------------------------------------------
tabSalinidad.addEventListener('click',function () {
    let idHuerto = selectorDeHuertos.value;
    if(filtro.value === "Hoy"){
        construirGraficaSalinidad(idHuerto, "Hoy");
    }
    if(filtro.value === "Semana"){
        construirGraficaSalinidad(idHuerto, "Semana");
    }
    cargarDatoActualSalinidad(idHuerto);
    tabSalinidad.classList.add("activo");
    tabHumedad.classList.remove("activo");
});
//......................................................................................................................
//......................................................................................................................
//------------------------------------------
/*
                TAB HUMEDAD
*/
//------------------------------------------
tabHumedad.addEventListener('click',function(){
    let idHuerto = selectorDeHuertos.value;
    if(filtro.value ==="Hoy"){
        construirGraficaHumedad(idHuerto, "Hoy");
    }
    if(filtro.value === "Semana"){
        construirGraficaHumedad(idHuerto, "Semana");
    }
    cargarDatoActualHumedad(idHuerto);
    tabSalinidad.classList.remove("activo");
    tabHumedad.classList.add("activo");
})
//......................................................................................................................
//......................................................................................................................
//------------------------------------------
/*
         FILTRO FECHAS VISUALIZADOR
*/
//------------------------------------------
filtro.addEventListener('change',function () {
    let idHuerto = selectorDeHuertos.value;
    if (filtro.value === 'Hoy' && tabSalinidad.classList.contains('activo')) {
        construirGraficaSalinidad(idHuerto, "Hoy");
        console.log(idHuerto + "sal");
    }
    if(filtro.value === 'Hoy' && tabHumedad.classList.contains('activo')){
        construirGraficaHumedad(idHuerto, "Hoy");
        console.log(idHuerto + "hum");
    }
    if(filtro.value === 'Semana' && tabSalinidad.classList.contains('activo')){
        construirGraficaSalinidad(idHuerto, "Semana");
    }
    if(filtro.value === 'Semana' && tabHumedad.classList.contains('activo')){
        construirGraficaHumedad(idHuerto, "Semana");
    }

});
//......................................................................................................................
//......................................................................................................................
//------------------------------------------
/*
         FILTRO FECHAS ACORDEON
*/
//------------------------------------------
filtroAcordeon.addEventListener('change', function(){
    let idHuerto = selectorDeHuertos.value;

    if (filtroAcordeon.value === 'Hoy') {
        construirGraficaSalinidad(idHuerto, "Hoy");
        console.log(idHuerto + "sal");
        construirGraficaHumedad(idHuerto, "Hoy");
        console.log(idHuerto + "hum");
    }
    if(filtroAcordeon.value === "Semana"){
        construirGraficaSalinidad(idHuerto, "Semana");
        construirGraficaHumedad(idHuerto, "Semana");
    }

})
//......................................................................................................................
//......................................................................................................................
//------------------------------------------
/*
        idHuerto --> getMedicionesHoy()
*/
//------------------------------------------
async function getMedicionesHoy(idHuerto) {
    const respuesta = await fetch('../../../api/medicionesHoy/' + '?idHuerto=' + idHuerto);
    if (respuesta.ok) {
        const mediciones = await respuesta.json();
        return mediciones;
    }
}
//......................................................................................................................
//......................................................................................................................
//------------------------------------------
/*
        idHuerto --> getMedicionesSemana()
*/
//------------------------------------------
async function getMedicionesSemana(idHuerto) {
    const respuesta = await fetch('../../../api/medicionesSemana/' + '?idHuerto=' + idHuerto);
    if (respuesta.ok) {
        const mediciones = await respuesta.json();
        console.log(mediciones);
        return mediciones;
    }
}

//......................................................................................................................
//......................................................................................................................
//------------------------------------------
/*
       idHuerto --> ConstruirGraficaSalinidad()
*/
//------------------------------------------
async function construirGraficaSalinidad(idHuerto, senyal){

    let mediciones;

    if(senyal === "Hoy"){
        mediciones = await getMedicionesHoy(idHuerto);
    }

    if(senyal === "Semana"){
        mediciones = await getMedicionesSemana(idHuerto);
    }

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

    let datos = {
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

    let opciones = {
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

    if(senyal === "Hoy"){
        for (let i = 3; i >= 0; i--) {
            datos.labels.push(horas[i]);
            datos.datasets[0].data.push(mediciones[i].mediaSalinidad);
        }
    }

    if(senyal === "Semana") {
        for (let i = 6; i >= 0; i--) {
            datos.labels.push(dias[i]);
            datos.datasets[0].data.push(mediciones[i].mediaSalinidad);
        }
    }

    graficaBase.options = opciones;
    graficaBase.data = datos;
    graficaBase.update();

    graficaAcordeonSal.options = opciones;
    graficaAcordeonSal.data = datos;
    graficaAcordeonSal.update();


}
//......................................................................................................................
//......................................................................................................................
//------------------------------------------
/*
       idHuerto --> ConstruirGraficaHumedad()
*/
//------------------------------------------
async function construirGraficaHumedad(idHuerto, senyal) {
    let mediciones;

    if(senyal === "Hoy"){
        mediciones = await getMedicionesHoy(idHuerto);
    }
    if(senyal === "Semana"){
        mediciones = await getMedicionesSemana(idHuerto);
    }

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


    let datos = {
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

    let opciones = {
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

    if(senyal === "Hoy"){
        for (let i = 3; i >= 0; i--) {
            datos.labels.push(horas[i]);
            datos.datasets[0].data.push(mediciones[i].mediaHumedad);
        }
    }


    if(senyal === "Semana") {
        for (let i = 6; i >= 0; i--) {
            datos.labels.push(dias[i]);
            datos.datasets[0].data.push(mediciones[i].mediaSalinidad);
        }
    }

    graficaBase.options = opciones;
    graficaBase.data = datos;
    graficaBase.update();

    graficaAcordeonHumedad.options = opciones;
    graficaAcordeonHumedad.data = datos;
    graficaAcordeonHumedad.update();
}
//LLAMADA DE FUNCIONES:
getHuertoPorDefecto();

