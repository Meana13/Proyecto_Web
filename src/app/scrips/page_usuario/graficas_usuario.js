//......................................................................................................................
/*                                       GRÁFICAS DEL USUARIO REGISTRADO                                           */
//......................................................................................................................
//......................................................................................................................
//......................................................................................................................
//DECLARACIÓN DE VARIABLES:
//VISUALIZADOR DE HUERTOS
let visualizador = document.getElementById('visualizador');
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
let seleccionarFecha = document.getElementById('seleccionar_fecha_salinidad');
let desdeInput = document.getElementById('desde-sal');
let hastaInput = document.getElementById('hasta-sal');
let enviarInput = document.getElementById('botonEnviarFiltroFechaSalinidad');
let errorFechas = document.getElementById('error-fechas');
//BOTONES
let tabSalinidad = document.getElementById('tab_salinidad');
let tabHumedad = document.getElementById('tab_humedad')
//ALERTAS
let alertasContainer = document.getElementById('alertas-container');
let alertaRojaSal = document.getElementById('alerta-roja-sal');
let alertaNaranjaSal = document.getElementById('alerta-naranja-sal');

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
let seleccionarFechaAcordeon = document.getElementById('seleccionar_fecha_acordeon_salinidad');
let enviarFechasAcordeon = document.getElementById('enviar-fechas-acordeon');
let desdeInputAcordeon = document.getElementById('desde-acordeon-sal');
let hastaInputAcordeon = document.getElementById('hasta-acordeon-sal');
let errorFechasAcordeon = document.getElementById('error-fechas-acordeon');
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

        buscarAlertas(mediciones, idHuerto);
    }



}
//......................................................................................................................
//......................................................................................................................
//------------------------------------------
/*
           mediciones, idHuerto --> buscarAlertas() --> [notificaciones]

                                                        ______notificaciones______
                                                        id_huerto: N
                                                        id_notificaciones: N
                                                        medicion_max_humedad: N
                                                        medicion_max_luminosidad: N
                                                        medicion_max_ph: N
                                                        medicion_max_salinidad: N
                                                        medicion_max_temperatura: N
                                                        medicion_min_humedad: N
                                                        medicion_min_luminosidad: N
                                                        medicion_min_ph: N
                                                        medicion_min_salinidad: N
                                                        medicion_min_temperatura: N
                                                        mediciones_continuas_maximos: N
                                                        mediciones_continuas_minimos: N
                                                        notificaciones: N
                                                        _______________________________
*/
//------------------------------------------
async function buscarAlertas(mediciones, idHuerto){
    const respuesta = await fetch('../../../api/notificaciones/' + '?idHuerto=' + idHuerto);
    if (respuesta.ok) {
        const notificaciones = await respuesta.json();
        console.log(mediciones);
        //si el usuario tiene las notificaciones activadas:
        if(notificaciones[0].notificaciones === "1"){
            //ALERTAS QUE SUPERAN LAS MÁXIMAS:
            if(parseInt(mediciones[0].mediaSalinidad) >= parseInt(notificaciones[0].medicion_max_salinidad)){
                alertasContainer.style.display = "block";
                alertaRojaSal.style.display = "block";
                alertaNaranjaSal.style.display = "none";
                alertaRojaSal.setAttribute("data-content", "¡Salinidad alta!");
            }
            else{
                alertasContainer.style.display = "none";
                alertaRojaSal.style.display = "none";
                alertaNaranjaSal.style.display = "none";
                alertaRojaSal.setAttribute("data-content", "¡Salinidad alta!");
            }

            //ALERTAS NARANJAS
            if(parseInt(mediciones[0].mediaSalinidad) === parseInt(notificaciones[0].medicion_max_salinidad - 1)){
                alertasContainer.style.display = "block";
                alertaRojaSal.style.display = "none";
                alertaNaranjaSal.style.display = "block";
                alertaNaranjaSal.setAttribute("data-content", "¡Cuidado, la salinidad está aumentando!");
            }
            if(mediciones[0].mediaSalinidad === (notificaciones[0].medicion_min_salinidad + 1)){
                alertasContainer.style.display = "block";
                alertaRojaSal.style.display = "none";
                alertaNaranjaSal.style.display = "block";
                alertaNaranjaSal.setAttribute("data-content", "¡Cuidado, la salinidad está disminuyendo!");
            }

            //ALERTAS POR DEBAJO DE LAS MÍNIMAS:
            if(mediciones[0].mediaSalinidad <= notificaciones[0].medicion_min_salinidad){
                alertasContainer.style.display = "block";
                alertaRojaSal.style.display = "block";
                alertaNaranjaSal.style.display = "none";
                alertaRojaSal.setAttribute("data-content", "¡Salinidad baja!");
            }
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

    if (getComputedStyle(seccionAcordeon).display !== "none") {
        construirGraficaSalinidad(idHuertos[0], "Hoy");
        construirGraficaHumedad(idHuertos[0], "Hoy");
    }

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
    if(!tabSalinidad.classList.contains('activo')){
        let idHuerto = selectorDeHuertos.value;
        if(filtro.value === "Hoy"){
            construirGraficaSalinidad(idHuerto, "Hoy");
        }
        if(filtro.value === "Semana"){
            construirGraficaSalinidad(idHuerto, "Semana");
        }
        if(filtro.value === "Seleccionar fecha"){
            construirGraficaSalinidad(idHuerto,"Fecha");
            console.log("sal");
        }
        cargarDatoActualSalinidad(idHuerto);
        tabSalinidad.classList.add("activo");
        tabHumedad.classList.remove("activo");
    }

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
    if(filtro.value === "Seleccionar fecha"){
        construirGraficaHumedad(idHuerto,"Fecha");
        console.log("hum")
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
    if(filtro.value === "Seleccionar fecha"){
        seleccionarFecha.style.display = "block";
    }
    else{
        seleccionarFecha.style.display = "none";
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

    if(filtroAcordeon.value === "Seleccionar fecha"){
        seleccionarFechaAcordeon.style.display = "block";
    }
    else{
        seleccionarFechaAcordeon.style.display = "none";
    }

})
//......................................................................................................................
//......................................................................................................................
//------------------------------------------
/*
        idHuerto --> getMedicionesHoy() --> [datos]
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
        idHuerto --> getMedicionesSemana() -->[datos]
*/
//------------------------------------------
async function getMedicionesSemana(idHuerto) {
    const respuesta = await fetch('../../../api/medicionesSemana/' + '?idHuerto=' + idHuerto);
    if (respuesta.ok) {
        const mediciones = await respuesta.json();
        return mediciones;
    }
}
//......................................................................................................................
//......................................................................................................................
//------------------------------------------
/*
   idHuerto, desde:txt, hasta:txt --> getMedicionesSeleccionarFecha() --> [datos]
*/
//------------------------------------------
async function getMedicionesSeleccionarFecha(idHuerto, desde, hasta, senyal) {
    const respuesta = await fetch('../../../api/medicionesFecha/' +
        '?idHuerto=' + idHuerto +
        '&desde=' + desde +
        '&hasta=' + hasta +
        '&senyal=' + senyal);

    if (respuesta.ok) {
        const mediciones = await respuesta.json();
        return mediciones;
    }
}
//......................................................................................................................
//......................................................................................................................
//------------------------------------------
/*
        limitesFechas()
*/
//------------------------------------------
async function limitesFechas(){
    let respuesta = await fetch('../../../api/fechasMediciones/');
    if(respuesta.ok){
        let datos = await respuesta.json();

        desdeInput.setAttribute("max", `${datos[0].fecha_medicion}`);
        desdeInput.setAttribute('min',`${datos[datos.length-1].fecha_medicion}`)

        hastaInput.setAttribute("max", `${datos[0].fecha_medicion}`);
        hastaInput.setAttribute('min',`${datos[datos.length-1].fecha_medicion}`)

        desdeInputAcordeon.setAttribute("max", `${datos[0].fecha_medicion}`);
        desdeInputAcordeon.setAttribute('min',`${datos[datos.length-1].fecha_medicion}`)

        hastaInputAcordeon.setAttribute("max", `${datos[0].fecha_medicion}`);
        hastaInputAcordeon.setAttribute('min',`${datos[datos.length-1].fecha_medicion}`)

    }
}

limitesFechas();
//......................................................................................................................
//......................................................................................................................
//------------------------------------------
/*
        verificarFechas()
*/
//------------------------------------------
function verificarFechas() {
    let desde = desdeInput.value;
    let hasta = hastaInput.value;

    let fechaDesde = new Date(desde);
    let fechaHasta = new Date(hasta);

    if (fechaDesde > fechaHasta) {
        if (getComputedStyle(visualizador).display !== "none") {
            errorFechas.style.display = "block";
            enviarInput.disabled = true;
        }
    } else {
        if (getComputedStyle(visualizador).display !== "none") {
            errorFechas.style.display = "none";
            enviarInput.disabled = false;
        }
    }
}

desdeInput.onchange = verificarFechas;
hastaInput.onchange = verificarFechas;
//......................................................................................................................
//......................................................................................................................
//------------------------------------------
/*
        verificarFechasAcordeon()
*/
//------------------------------------------
function verificarFechasAcordeon() {
    let desde = desdeInputAcordeon.value;
    let hasta = hastaInputAcordeon.value;

    let fechaDesde = new Date(desde);
    let fechaHasta = new Date(hasta);

    if (fechaDesde > fechaHasta) {
        if (getComputedStyle(seccionAcordeon).display !== "none") {
            errorFechasAcordeon.style.display = "block";
            enviarFechasAcordeon.disabled = true;
        }
    } else {
        if (getComputedStyle(seccionAcordeon).display !== "none") {
            errorFechasAcordeon.style.display = "none";
            enviarFechasAcordeon.disabled = false;
        }
    }
}

desdeInputAcordeon.onchange = verificarFechasAcordeon;
hastaInputAcordeon.onchange = verificarFechasAcordeon;
//......................................................................................................................
//......................................................................................................................
//------------------------------------------
/*
            obtenerFechas();
*/
//------------------------------------------
function obtenerFechas(){
    let desde = desdeInput.value;
    let hasta = hastaInput.value;
    let desdeAcordeon = desdeInputAcordeon.value;
    let hastaAcordeon = hastaInputAcordeon.value;

    return {
        desde: desde,
        hasta: hasta,
        desdeAcordeon: desdeAcordeon,
        hastaAcordeon: hastaAcordeon
    }
}
//......................................................................................................................
//......................................................................................................................
//------------------------------------------
/*
       BOTON ENVIAR FECHAS()
*/
//------------------------------------------
function enviarFechas(){
    let idHuerto = selectorDeHuertos.value;

    if(tabSalinidad.classList.contains('activo')){
        construirGraficaSalinidad(idHuerto,"Fecha");
    }
    if(tabHumedad.classList.contains('activo')){
        construirGraficaHumedad(idHuerto, "Fecha");
    }
    if (getComputedStyle(seccionAcordeon).display !== "none") {
        construirGraficaSalinidad(idHuerto, "Fecha");
        construirGraficaHumedad(idHuerto, "Fecha");
    }

}

enviarInput.addEventListener('click', enviarFechas);
enviarFechasAcordeon.addEventListener('click', enviarFechas);

//......................................................................................................................
//......................................................................................................................
//------------------------------------------
/*
       idHuerto --> ConstruirGraficaSalinidad()
*/
//------------------------------------------
async function construirGraficaSalinidad(idHuerto, senyal){

    let mediciones;
    let diferenciaDias = 0;
    let diferenciaDiasAcordeon = 0;

    if(senyal === "Hoy"){
        mediciones = await getMedicionesHoy(idHuerto);
    }

    if(senyal === "Semana"){
        mediciones = await getMedicionesSemana(idHuerto);
    }

    if(senyal === "Fecha"){
        let desde = obtenerFechas().desde;
        let hasta = obtenerFechas().hasta;
        let desdeAcordeon = obtenerFechas().desdeAcordeon;
        let hastaAcordeon = obtenerFechas().hastaAcordeon;

        let fechaDesde = new Date(desde);
        let fechaHasta = new Date(hasta);
        let fechaDesdeAcordeon = new Date(desdeAcordeon);
        let fechaHastaAcordeon = new Date(hastaAcordeon);

        let diferenciaMs = fechaHasta - fechaDesde;
        let diferenciaMsAcordeon = fechaHastaAcordeon - fechaDesdeAcordeon;

        diferenciaDias = Math.floor(diferenciaMs / (1000 * 60 * 60 * 24));
        diferenciaDiasAcordeon = Math.floor(diferenciaMsAcordeon / (1000 * 60 * 60 * 24));

        if (diferenciaDias <= 3 && getComputedStyle(visualizador).display !== "none") {
            console.log('3 o menos días');
            console.log(desde);
            mediciones = await getMedicionesSeleccionarFecha(idHuerto, desde, hasta, 1);

        }
        else if(diferenciaDias > 4 && getComputedStyle(visualizador).display !== "none"){
            console.log('4 o más días');
            mediciones = await getMedicionesSeleccionarFecha(idHuerto, desde, hasta, 0);
        }
        if (diferenciaDiasAcordeon <= 3 && getComputedStyle(seccionAcordeon).display !== "none") {
            console.log('3 o menos días');
            mediciones = await getMedicionesSeleccionarFecha(idHuerto, desdeAcordeon, hastaAcordeon, 1);

        }
        else if(diferenciaDiasAcordeon > 4 && getComputedStyle(seccionAcordeon).display !== "none"){
            console.log('4 o más días');
            mediciones = await getMedicionesSeleccionarFecha(idHuerto, desdeAcordeon, hastaAcordeon, 0);
        }
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

    if(senyal === "Fecha" && (diferenciaDias <= 3 || diferenciaDiasAcordeon <= 3)) {
        for (let i = horas.length - 1; i >= 0; i--) {
            datos.labels.push(horas[i]);
            datos.datasets[0].data.push(mediciones[i].mediaSalinidad);
        }
    }

    if(senyal === "Fecha" && (diferenciaDias > 4 || diferenciaDiasAcordeon > 4))
    for (let i = dias.length-1; i >= 0; i--) {
        datos.labels.push(dias[i]);
        datos.datasets[0].data.push(mediciones[i].mediaSalinidad);
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
    let diferenciaDias = 0;
    let diferenciaDiasAcordeon = 0;

    if(senyal === "Hoy"){
        mediciones = await getMedicionesHoy(idHuerto);
    }

    if(senyal === "Semana"){
        mediciones = await getMedicionesSemana(idHuerto);
    }

    if(senyal === "Fecha"){
        let desde = obtenerFechas().desde;
        let hasta = obtenerFechas().hasta;
        let desdeAcordeon = obtenerFechas().desdeAcordeon;
        let hastaAcordeon = obtenerFechas().hastaAcordeon;

        let fechaDesde = new Date(desde);
        let fechaHasta = new Date(hasta);
        let fechaDesdeAcordeon = new Date(desdeAcordeon);
        let fechaHastaAcordeon = new Date(hastaAcordeon);

        let diferenciaMs = fechaHasta - fechaDesde;
        let diferenciaMsAcordeon = fechaHastaAcordeon - fechaDesdeAcordeon;

        diferenciaDias = Math.floor(diferenciaMs / (1000 * 60 * 60 * 24));
        diferenciaDiasAcordeon = Math.floor(diferenciaMsAcordeon / (1000 * 60 * 60 * 24));

        if (diferenciaDias <= 3 && getComputedStyle(visualizador).display !== "none") {
            console.log('3 o menos días');
            console.log(desde);
            mediciones = await getMedicionesSeleccionarFecha(idHuerto, desde, hasta, 1);

        }
        else if(diferenciaDias > 4 && getComputedStyle(visualizador).display !== "none"){
            console.log('4 o más días');
            mediciones = await getMedicionesSeleccionarFecha(idHuerto, desde, hasta, 0);
        }
        if (diferenciaDiasAcordeon <= 3 && getComputedStyle(seccionAcordeon).display !== "none") {
            console.log('3 o menos días');
            mediciones = await getMedicionesSeleccionarFecha(idHuerto, desdeAcordeon, hastaAcordeon, 1);

        }
        else if(diferenciaDiasAcordeon > 4 && getComputedStyle(seccionAcordeon).display !== "none"){
            console.log('4 o más días');
            mediciones = await getMedicionesSeleccionarFecha(idHuerto, desdeAcordeon, hastaAcordeon, 0);
        }
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
            datos.datasets[0].data.push(mediciones[i].mediaHumedad);
        }
    }

    if(senyal === "Fecha" && (diferenciaDias <= 3 || diferenciaDiasAcordeon <= 3)) {
        for (let i = horas.length - 1; i >= 0; i--) {
            datos.labels.push(horas[i]);
            datos.datasets[0].data.push(mediciones[i].mediaHumedad);
        }
    }

    if(senyal === "Fecha" && (diferenciaDias > 4 || diferenciaDiasAcordeon > 4))
        for (let i = dias.length-1; i >= 0; i--) {
            datos.labels.push(dias[i]);
            datos.datasets[0].data.push(mediciones[i].mediaHumedad);
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

