//......................................................................................................................
/*                                       GRÁFICAS DEL USUARIO REGISTRADO                                           */
//......................................................................................................................
//......................................................................................................................
//......................................................................................................................
//DECLARACIÓN DE VARIABLES:
//VISUALIZADOR DE HUERTOS
let visualizador = document.getElementById('visualizador');
//--Dato Actual
let datoActual = document.getElementById('dato_actual');
//----Salinidad
let datoActualTabSalinidad = document.getElementById('dato_actual_tab_salinidad');
//----Humedad
let datoActualTabHumedad = document.getElementById('dato_actual_tab_humedad');
//----pH
let datoActualTabPh = document.getElementById('dato_actual_tab_pH');
//----Temperatura
let datoActualTabTemperatura = document.getElementById('dato_actual_tab_Temperatura');
//----Luz
let datoActualTabLuz = document.getElementById('dato_actual_tab_luz');
//GRAFICAS
let grafica = document.getElementById('chart');
let filtro = document.getElementById('filtro_graficas');
let seleccionarFecha = document.getElementById('seleccionar_fecha');
let desdeInput = document.getElementById('desde');
let hastaInput = document.getElementById('hasta');
let enviarInput = document.getElementById('botonEnviarFiltroFecha');
let errorFechas = document.getElementById('error-fechas');
//BOTONES
let tabSalinidad = document.getElementById('tab_salinidad');
let tabHumedad = document.getElementById('tab_humedad');
let tabPh = document.getElementById('tab_pH');
let tabTemperatura = document.getElementById('tab_temperatura');
let tabLuz = document.getElementById('tab_luz');
//ALERTAS
let alertasContainerSal = document.getElementById('alertas-container');
let alertaRojaSal = document.getElementById('alerta-roja-sal');
let alertaNaranjaSal = document.getElementById('alerta-naranja-sal');
let alertasContainerHumedad = document.getElementById('alertas-container-humedad');
let alertaRojaHumedad = document.getElementById('alerta-roja-humedad');
let alertaNaranjaHumedad = document.getElementById('alerta-naranja-humedad');
let alertasContainerPh = document.getElementById('alertas-container-pH');
let alertaRojaPh = document.getElementById('alerta-roja-pH');
let alertaNaranjaPh = document.getElementById('alerta-naranja-pH');
let alertasContainerTemperatura = document.getElementById('alertas-container-temperatura');
let alertaRojaTemperatura = document.getElementById('alerta-roja-temperatura');
let alertaNaranjaTemperatura = document.getElementById('alerta-naranja-temperatura');
let alertasContainerLuz = document.getElementById('alertas-container-luz');
let alertaRojaLuz = document.getElementById('alerta-roja-luz');
let alertaNaranjaLuz = document.getElementById('alerta-naranja-luz');
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
let graficaAcordeonSalinidad = document.getElementById('chart-acordeon-sal');
let graficaAcordeonHum = document.getElementById('chart-acordeon-humedad');
let graficaAcordeonpH = document.getElementById('chart-acordeon-pH');
let graficaAcordeonTemp = document.getElementById('chart-acordeon-temperatura');
let graficaAcordeonluz = document.getElementById('chart-acordeon-luz');
//Filtro fecha
let filtroAcordeon = document.getElementById('filtro_acordeon');
let seleccionarFechaAcordeon = document.getElementById('seleccionar_fecha_acordeon');
let enviarFechasAcordeon = document.getElementById('enviar-fechas-acordeon');
let desdeInputAcordeon = document.getElementById('desde-acordeon');
let hastaInputAcordeon = document.getElementById('hasta-acordeon');
let errorFechasAcordeon = document.getElementById('error-fechas-acordeon');
//ALERTAS
let alertasContainerAcordeonSal = document.getElementById('alertas-container-acordeon-sal');
let alertaRojaAcordeonSal = document.getElementById('alerta-roja-acordeon-sal');
let alertaNaranjaAcordeonSal = document.getElementById('alerta-naranja-acordeon-sal');
let alertasContainerAcordeonHum = document.getElementById('alertas-container-acordeon-humedad');
let alertaRojaAcordeonHum = document.getElementById('alerta-roja-acordeon-humedad');
let alertaNaranjaAcordeonHum = document.getElementById('alerta-naranja-acordeon-humedad');
let alertasContainerAcordeonPh = document.getElementById('alertas-container-acordeon-pH');
let alertaRojaAcordeonPh = document.getElementById('alerta-roja-acordeon-pH');
let alertaNaranjaAcordeonPh = document.getElementById('alerta-naranja-acordeon-pH');
let alertasContainerAcordeonTemp = document.getElementById('alertas-container-acordeon-temperatura');
let alertaRojaAcordeonTemp = document.getElementById('alerta-roja-acordeon-temperatura');
let alertaNaranjaAcordeonTemp = document.getElementById('alerta-naranja-acordeon-temperatura');
let alertasContainerAcordeonLuz = document.getElementById('alertas-container-acordeon-luz');
let alertaRojaAcordeonLuz = document.getElementById('alerta-roja-acordeon-luz');
let alertaNaranjaAcordeonLuz = document.getElementById('alerta-naranja-acordeon-luz');
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
//.......................................................
/*
               Grafica Acordeon pH
*/
//.......................................................
let graficaAcordeonPh = new Chart (graficaAcordeonpH, {
    type: 'line'
})
//......................................................................................................................
//......................................................................................................................
//.......................................................
/*
               Grafica Acordeon Temperatura
*/
//.......................................................
let graficaAcordeonTemperatura = new Chart (graficaAcordeonTemp, {
    type: 'line'
})
//......................................................................................................................
//......................................................................................................................
//.......................................................
/*
               Grafica Acordeon Luz
*/
//.......................................................
let graficaAcordeonLuminosidad = new Chart (graficaAcordeonluz, {
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
        datoActualAcordeonPh.innerText = "";
        datoActualAcordeonPh.innerText = mediciones[0].mediapH;

        //DATO ACTUAL TEMPERATURA:
        datoActualTabTemperatura.innerText = "";
        datoActualTabTemperatura.innerText = mediciones[0].mediaTemperatura + "ºC";
        datoActualAcordeonTemperatura.innerText = "";
        datoActualAcordeonTemperatura.innerText = mediciones[0].mediaTemperatura + "ºC";

        datoActualTabLuz.innerText = "";
        datoActualAcordeonLuz.innerText = "";

        if(mediciones[0].mediaLuminosidad === 1){
            datoActualTabLuz.innerText = "Oscuridad";
            datoActualAcordeonLuz.innerText = "Oscuridad";
        }
        if(mediciones[0].mediaLuminosidad === 2){
            datoActualTabLuz.innerText = "Poco iluminado";
            datoActualAcordeonLuz.innerText = "Poco iluminado";
        }
        if(mediciones[0].mediaLuminosidad === 3){
            datoActualTabLuz.innerText = "Sombra";
            datoActualAcordeonLuz.innerText = "Sombra";
        }
        if(mediciones[0].mediaLuminosidad === 4){
            datoActualTabLuz.innerText = "Luz directa";
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
async function buscarAlertas(mediciones, idHuerto) {
    const respuesta = await fetch('../../../api/notificaciones/' + '?idHuerto=' + idHuerto);
    if (respuesta.ok) {
        const notificaciones = await respuesta.json();
        console.log(mediciones);
        //si el huerto tiene las notificaciones activadas:
        if (notificaciones[0].notificaciones === "1") {
            //ALERTAS QUE SUPERAN LAS MÁXIMAS:
            //Salinidad:
            if (parseInt(mediciones[0].mediaSalinidad) >= parseInt(notificaciones[0].medicion_max_salinidad)) {
                alertasContainerSal.style.display = "block";
                alertaRojaSal.style.display = "block";
                alertaNaranjaSal.style.display = "none";
                alertaRojaSal.setAttribute("data-content", "¡Salinidad alta!");
            }
            //Salinidad acordeon:
            if (parseInt(mediciones[0].mediaSalinidad) >= parseInt(notificaciones[0].medicion_max_salinidad)) {
                alertasContainerAcordeonSal.style.display = "block";
                alertaRojaAcordeonSal.style.display = "block";
                alertaNaranjaAcordeonSal.style.display = "none";
                alertaRojaAcordeonSal.setAttribute("data-content", "¡Salinidad alta!");
            }
            //Humedad:
            if (parseInt(mediciones[0].mediaHumedad) >= parseInt(notificaciones[0].medicion_max_humedad)) {
                alertasContainerHumedad.style.display = "block";
                alertaRojaHumedad.style.display = "block";
                alertaNaranjaHumedad.style.display = "none";
                alertaRojaHumedad.setAttribute("data-content", "¡Humedad alta!");
            }
            //Humedad acordeon:
            if (parseInt(mediciones[0].mediaHumedad) >= parseInt(notificaciones[0].medicion_max_humedad)) {
                alertasContainerAcordeonHum.style.display = "block";
                alertaRojaAcordeonHum.style.display = "block";
                alertaNaranjaAcordeonHum.style.display = "none";
                alertaRojaAcordeonHum.setAttribute("data-content", "¡Humedad alta!");
            }
            //pH:
            if (parseInt(mediciones[0].mediapH) >= parseInt(notificaciones[0].medicion_max_ph)) {
                alertasContainerPh.style.display = "block";
                alertaRojaPh.style.display = "block";
                alertaNaranjaPh.style.display = "none";
                alertaRojaPh.setAttribute("data-content", "¡pH alto!");
            }
            //pH acordeon:
            if (parseInt(mediciones[0].mediapH) >= parseInt(notificaciones[0].medicion_max_ph)) {
                alertasContainerAcordeonPh.style.display = "block";
                alertaRojaAcordeonPh.style.display = "block";
                alertaNaranjaAcordeonPh.style.display = "none";
                alertaRojaAcordeonPh.setAttribute("data-content", "¡pH alto!");
            }
            //Temperatura:
            if (parseInt(mediciones[0].mediaTemperatura) >= parseInt(notificaciones[0].medicion_max_temperatura)) {
                alertasContainerTemperatura.style.display = "block";
                alertaRojaTemperatura.style.display = "block";
                alertaNaranjaTemperatura.style.display = "none";
                alertaRojaTemperatura.setAttribute("data-content", "¡Temperatura alta!");
            }
            //Temperatura acordeon:
            if (parseInt(mediciones[0].mediaTemperatura) >= parseInt(notificaciones[0].medicion_max_temperatura)) {
                alertasContainerAcordeonTemp.style.display = "block";
                alertaRojaAcordeonTemp.style.display = "block";
                alertaNaranjaAcordeonTemp.style.display = "none";
                alertaRojaAcordeonTemp.setAttribute("data-content", "¡Temperatura alta!");
            }
            //Luz:
            if (parseInt(mediciones[0].mediaLuminosidad) >= parseInt(notificaciones[0].medicion_max_luminosidad)) {
                alertasContainerLuz.style.display = "block";
                alertaRojaLuz.style.display = "block";
                alertaNaranjaLuz.style.display = "none";
                alertaRojaLuz.setAttribute("data-content", "¡Luminosidad alta!");
            }
            //Luz acordeon:
            if (parseInt(mediciones[0].mediaLuminosidad) >= parseInt(notificaciones[0].medicion_max_luminosidad)) {
                alertasContainerAcordeonLuz.style.display = "block";
                alertaRojaAcordeonLuz.style.display = "block";
                alertaNaranjaAcordeonLuz.style.display = "none";
                alertaRojaAcordeonLuz.setAttribute("data-content", "¡Luminosidad alta!");
            }

            //ALERTAS NARANJAS
            //Salinidad:
            if (parseInt(mediciones[0].mediaSalinidad) >= parseInt(notificaciones[0].medicion_max_salinidad) - 3 &&
                parseInt(mediciones[0].mediaSalinidad) < parseInt(notificaciones[0].medicion_max_salinidad)) {
                alertasContainerSal.style.display = "block";
                alertaRojaSal.style.display = "none";
                alertaNaranjaSal.style.display = "block";
                alertaNaranjaSal.setAttribute("data-content", "¡Cuidado, la salinidad está aumentando!");
            }
            else if (parseInt(mediciones[0].mediaSalinidad) <= parseInt(notificaciones[0].medicion_min_salinidad) + 3 &&
                parseInt(mediciones[0].mediaSalinidad) > parseInt(notificaciones[0].medicion_min_salinidad)) {
                alertasContainerSal.style.display = "block";
                alertaRojaSal.style.display = "none";
                alertaNaranjaSal.style.display = "block";
                alertaNaranjaSal.setAttribute("data-content", "¡Cuidado, la salinidad está disminuyendo!");
            }
            //Salinidad Acordeon:
            if (parseInt(mediciones[0].mediaSalinidad) >= parseInt(notificaciones[0].medicion_max_salinidad) - 3 &&
                parseInt(mediciones[0].mediaSalinidad) < parseInt(notificaciones[0].medicion_max_salinidad)) {
                alertasContainerAcordeonSal.style.display = "block";
                alertaRojaAcordeonSal.style.display = "none";
                alertaNaranjaAcordeonSal.style.display = "block";
                alertaNaranjaAcordeonSal.setAttribute("data-content", "¡Cuidado, la salinidad está aumentando!");
            }
            else if (parseInt(mediciones[0].mediaSalinidad) <= parseInt(notificaciones[0].medicion_min_salinidad) + 3 &&
                parseInt(mediciones[0].mediaSalinidad) > parseInt(notificaciones[0].medicion_min_salinidad)) {
                alertasContainerAcordeonSal.style.display = "block";
                alertaRojaAcordeonSal.style.display = "none";
                alertaNaranjaAcordeonSal.style.display = "block";
                alertaNaranjaAcordeonSal.setAttribute("data-content", "¡Cuidado, la salinidad está disminuyendo!");
            }
            //Humedad:
            if (parseInt(mediciones[0].mediaHumedad) >= parseInt(notificaciones[0].medicion_max_humedad) - 3 &&
                parseInt(mediciones[0].mediaHumedad) < parseInt(notificaciones[0].medicion_max_humedad)) {
                alertasContainerHumedad.style.display = "block";
                alertaRojaHumedad.style.display = "none";
                alertaNaranjaHumedad.style.display = "block";
                alertaNaranjaHumedad.setAttribute("data-content", "¡Cuidado, la humedad está aumentando!");
            }
            else if (parseInt(mediciones[0].mediaHumedad) <= parseInt(notificaciones[0].medicion_min_humedad) + 3 &&
                parseInt(mediciones[0].mediaHumedad) > parseInt(notificaciones[0].medicion_min_humedad)) {
                alertasContainerHumedad.style.display = "block";
                alertaRojaHumedad.style.display = "none";
                alertaNaranjaHumedad.style.display = "block";
                alertaNaranjaHumedad.setAttribute("data-content", "¡Cuidado, la humedad está disminuyendo!");
            }
            //Humedad Acordeon:
            if (parseInt(mediciones[0].mediaHumedad) >= parseInt(notificaciones[0].medicion_max_humedad) - 3 &&
                parseInt(mediciones[0].mediaHumedad) < parseInt(notificaciones[0].medicion_max_humedad)) {
                alertasContainerAcordeonHum.style.display = "block";
                alertaRojaAcordeonHum.style.display = "none";
                alertaNaranjaAcordeonHum.style.display = "block";
                alertaNaranjaAcordeonHum.setAttribute("data-content", "¡Cuidado, la humedad está aumentando!");
            }
            else if (parseInt(mediciones[0].mediaHumedad) <= parseInt(notificaciones[0].medicion_min_humedad) + 3 &&
                parseInt(mediciones[0].mediaHumedad) > parseInt(notificaciones[0].medicion_min_humedad)) {
                alertasContainerAcordeonHum.style.display = "block";
                alertaRojaAcordeonHum.style.display = "none";
                alertaNaranjaAcordeonHum.style.display = "block";
                alertaNaranjaAcordeonHum.setAttribute("data-content", "¡Cuidado, la humedad está disminuyendo!");
            }
            //pH:
            if (parseInt(mediciones[0].mediapH) >= parseInt(notificaciones[0].medicion_max_ph) - 3 &&
                parseInt(mediciones[0].mediapH) < parseInt(notificaciones[0].medicion_max_ph)) {
                alertasContainerPh.style.display = "block";
                alertaRojaPh.style.display = "none";
                alertaNaranjaPh.style.display = "block";
                alertaNaranjaPh.setAttribute("data-content", "¡Cuidado, el pH está aumentando!");
            }
            else if (parseInt(mediciones[0].mediapH) <= parseInt(notificaciones[0].medicion_min_ph) + 3 &&
                parseInt(mediciones[0].mediapH) > parseInt(notificaciones[0].medicion_min_ph)) {
                alertasContainerPh.style.display = "block";
                alertaRojaPh.style.display = "none";
                alertaNaranjaPh.style.display = "block";
                alertaNaranjaPh.setAttribute("data-content", "¡Cuidado, el pH está disminuyendo!");
            }
            //pH acordeon:
            if (parseInt(mediciones[0].mediapH) >= parseInt(notificaciones[0].medicion_max_ph) - 3 &&
                parseInt(mediciones[0].mediapH) < parseInt(notificaciones[0].medicion_max_ph)) {
                alertasContainerAcordeonPh.style.display = "block";
                alertaRojaAcordeonPh.style.display = "none";
                alertaNaranjaAcordeonPh.style.display = "block";
                alertaNaranjaAcordeonPh.setAttribute("data-content", "¡Cuidado, el pH está aumentando!");
            }
            else if (parseInt(mediciones[0].mediapH) <= parseInt(notificaciones[0].medicion_min_ph) + 3 &&
                parseInt(mediciones[0].mediapH) > parseInt(notificaciones[0].medicion_min_ph)) {
                alertasContainerAcordeonPh.style.display = "block";
                alertaRojaAcordeonPh.style.display = "none";
                alertaNaranjaAcordeonPh.style.display = "block";
                alertaNaranjaAcordeonPh.setAttribute("data-content", "¡Cuidado, el pH está disminuyendo!");
            }
            //Temperatura:
            if (parseInt(mediciones[0].mediaTemperatura) >= parseInt(notificaciones[0].medicion_max_temperatura) - 3 &&
                parseInt(mediciones[0].mediaTemperatura) < parseInt(notificaciones[0].medicion_max_temperatura)) {
                alertasContainerTemperatura.style.display = "block";
                alertaRojaTemperatura.style.display = "none";
                alertaNaranjaTemperatura.style.display = "block";
                alertaNaranjaTemperatura.setAttribute("data-content", "¡Cuidado, la temperatura está aumentando!");
            }
            else if (parseInt(mediciones[0].mediaTemperatura) <= parseInt(notificaciones[0].medicion_min_temperatura) + 3 &&
                parseInt(mediciones[0].mediaTemperatura) > parseInt(notificaciones[0].medicion_min_temperatura)) {
                alertasContainerTemperatura.style.display = "block";
                alertaRojaTemperatura.style.display = "none";
                alertaNaranjaTemperatura.style.display = "block";
                alertaNaranjaTemperatura.setAttribute("data-content", "¡Cuidado, la temperatura está disminuyendo!");
            }
            //Temperatura acordeon:
            if (parseInt(mediciones[0].mediaTemperatura) >= parseInt(notificaciones[0].medicion_max_temperatura) - 3 &&
                parseInt(mediciones[0].mediaTemperatura) < parseInt(notificaciones[0].medicion_max_temperatura)) {
                alertasContainerAcordeonTemp.style.display = "block";
                alertaRojaAcordeonTemp.style.display = "none";
                alertaNaranjaAcordeonTemp.style.display = "block";
                alertaNaranjaAcordeonTemp.setAttribute("data-content", "¡Cuidado, la temperatura está aumentando!");
            }
            else if (parseInt(mediciones[0].mediaTemperatura) <= parseInt(notificaciones[0].medicion_min_temperatura) + 3 &&
                parseInt(mediciones[0].mediaTemperatura) > parseInt(notificaciones[0].medicion_min_temperatura)) {
                alertasContainerAcordeonTemp.style.display = "block";
                alertaRojaAcordeonTemp.style.display = "none";
                alertaNaranjaAcordeonTemp.style.display = "block";
                alertaNaranjaAcordeonTemp.setAttribute("data-content", "¡Cuidado, la temperatura está disminuyendo!");
            }
            //Luz:
            if (parseInt(mediciones[0].mediaLuminosidad) >= parseInt(notificaciones[0].medicion_max_luminosidad) - 1 &&
                parseInt(mediciones[0].mediaLuminosidad) < parseInt(notificaciones[0].medicion_max_luminosidad)) {
                alertasContainerLuz.style.display = "block";
                alertaRojaLuz.style.display = "none";
                alertaNaranjaLuz.style.display = "block";
                alertaNaranjaLuz.setAttribute("data-content", "¡Cuidado, el nivel de luz está aumentando!");
            }
            else if (parseInt(mediciones[0].mediaLuminosidad) <= parseInt(notificaciones[0].medicion_min_luminosidad) + 1 &&
                parseInt(mediciones[0].mediaLuminosidad) > parseInt(notificaciones[0].medicion_min_luminosidad)) {
                alertasContainerLuz.style.display = "block";
                alertaRojaLuz.style.display = "none";
                alertaNaranjaLuz.style.display = "block";
                alertaNaranjaLuz.setAttribute("data-content", "¡Cuidado, el nivel de luz está disminuyendo!");
            }
            //Luz:
            if (parseInt(mediciones[0].mediaLuminosidad) >= parseInt(notificaciones[0].medicion_max_luminosidad) - 1 &&
                parseInt(mediciones[0].mediaLuminosidad) < parseInt(notificaciones[0].medicion_max_luminosidad)) {
                alertasContainerAcordeonLuz.style.display = "block";
                alertaRojaAcordeonLuz.style.display = "none";
                alertaNaranjaAcordeonLuz.style.display = "block";
                alertaNaranjaAcordeonLuz.setAttribute("data-content", "¡Cuidado, el nivel de luz está aumentando!");
            }
            else if (parseInt(mediciones[0].mediaLuminosidad) <= parseInt(notificaciones[0].medicion_min_luminosidad) + 1 &&
                parseInt(mediciones[0].mediaLuminosidad) > parseInt(notificaciones[0].medicion_min_luminosidad)) {
                alertasContainerAcordeonLuz.style.display = "block";
                alertaRojaAcordeonLuz.style.display = "none";
                alertaNaranjaAcordeonLuz.style.display = "block";
                alertaNaranjaAcordeonLuz.setAttribute("data-content", "¡Cuidado, el nivel de luz está disminuyendo!");
            }

            //ALERTAS POR DEBAJO DE LAS MÍNIMAS:
            //Salinidad:
            if (parseInt(mediciones[0].mediaSalinidad) <= parseInt(notificaciones[0].medicion_min_salinidad)) {
                alertasContainerSal.style.display = "block";
                alertaRojaSal.style.display = "block";
                alertaNaranjaSal.style.display = "none";
                alertaRojaSal.setAttribute("data-content", "¡Salinidad baja!");
            }
            //Salinidad acordeon:
            if (parseInt(mediciones[0].mediaSalinidad) <= parseInt(notificaciones[0].medicion_min_salinidad)) {
                alertasContainerAcordeonSal.style.display = "block";
                alertaRojaAcordeonSal.style.display = "block";
                alertaNaranjaAcordeonSal.style.display = "none";
                alertaRojaAcordeonSal.setAttribute("data-content", "¡Salinidad baja!");
            }
            //Humedad:
            if (parseInt(mediciones[0].mediaHumedad) <= parseInt(notificaciones[0].medicion_min_humedad)) {
                alertasContainerHumedad.style.display = "block";
                alertaRojaHumedad.style.display = "block";
                alertaNaranjaHumedad.style.display = "none";
                alertaRojaHumedad.setAttribute("data-content", "¡Humedad baja!");
            }
            //Humedad acordeon:
            if (parseInt(mediciones[0].mediaHumedad) <= parseInt(notificaciones[0].medicion_min_humedad)) {
                alertasContainerAcordeonHum.style.display = "block";
                alertaRojaAcordeonHum.style.display = "block";
                alertaNaranjaAcordeonHum.style.display = "none";
                alertaRojaAcordeonHum.setAttribute("data-content", "¡Humedad baja!");
            }
            //pH:
            if (parseInt(mediciones[0].mediapH) <= parseInt(notificaciones[0].medicion_min_ph)) {
                alertasContainerPh.style.display = "block";
                alertaRojaPh.style.display = "block";
                alertaNaranjaPh.style.display = "none";
                alertaRojaPh.setAttribute("data-content", "¡pH bajo!");
            }
            //pH acordeon:
            if (parseInt(mediciones[0].mediapH) <= parseInt(notificaciones[0].medicion_min_ph)) {
                alertasContainerAcordeonPh.style.display = "block";
                alertaRojaAcordeonPh.style.display = "block";
                alertaNaranjaAcordeonPh.style.display = "none";
                alertaRojaAcordeonPh.setAttribute("data-content", "¡pH bajo!");
            }
            //temperatura:
            if (parseInt(mediciones[0].mediaTemperatura) <= parseInt(notificaciones[0].medicion_min_temperatura)) {
                alertasContainerTemperatura.style.display = "block";
                alertaRojaTemperatura.style.display = "block";
                alertaNaranjaTemperatura.style.display = "none";
                alertaRojaTemperatura.setAttribute("data-content", "¡Temperatura baja!");
            }
            //temperatura acordeon:
            if (parseInt(mediciones[0].mediaTemperatura) <= parseInt(notificaciones[0].medicion_min_temperatura)) {
                alertasContainerAcordeonTemp.style.display = "block";
                alertaRojaAcordeonTemp.style.display = "block";
                alertaNaranjaAcordeonTemp.style.display = "none";
                alertaRojaAcordeonTemp.setAttribute("data-content", "¡Temperatura baja!");
            }
            //luz:
            if (parseInt(mediciones[0].mediaLuminosidad) <= parseInt(notificaciones[0].medicion_min_luminosidad)) {
                alertasContainerLuz.style.display = "block";
                alertaRojaLuz.style.display = "block";
                alertaNaranjaLuz.style.display = "none";
                alertaRojaLuz.setAttribute("data-content", "¡Nivel de luz bajo!");
            }
            //luz acordeon:
            if (parseInt(mediciones[0].mediaLuminosidad) <= parseInt(notificaciones[0].medicion_min_luminosidad)) {
                alertasContainerAcordeonLuz.style.display = "block";
                alertaRojaAcordeonLuz.style.display = "block";
                alertaNaranjaAcordeonLuz.style.display = "none";
                alertaRojaAcordeonLuz.setAttribute("data-content", "¡Nivel de luz bajo!");
            }

            // Verificar si todas las medidas están dentro de un rango normal
            //Salinidad:
            if (parseInt(mediciones[0].mediaSalinidad) >= parseInt(notificaciones[0].medicion_min_salinidad) + 3 &&
                parseInt(mediciones[0].mediaSalinidad) <= parseInt(notificaciones[0].medicion_max_salinidad) - 3) {
                alertasContainerSal.style.display = "none";
                alertaRojaSal.style.display = "none";
                alertaNaranjaSal.style.display = "none";
            }
            //Salinidad acordeon:
            if (parseInt(mediciones[0].mediaSalinidad) >= parseInt(notificaciones[0].medicion_min_salinidad) + 3 &&
                parseInt(mediciones[0].mediaSalinidad) <= parseInt(notificaciones[0].medicion_max_salinidad) - 3) {
                alertasContainerAcordeonSal.style.display = "none";
                alertaRojaAcordeonSal.style.display = "none";
                alertaNaranjaAcordeonSal.style.display = "none";
            }
            //Humedad:
            if (parseInt(mediciones[0].mediaHumedad) >= parseInt(notificaciones[0].medicion_min_humedad) + 3 &&
                parseInt(mediciones[0].mediaHumedad) <= parseInt(notificaciones[0].medicion_max_humedad) - 3) {
                alertasContainerHumedad.style.display = "none";
                alertaRojaHumedad.style.display = "none";
                alertaNaranjaHumedad.style.display = "none";
            }
            //Humedad acordeon:
            if (parseInt(mediciones[0].mediaHumedad) >= parseInt(notificaciones[0].medicion_min_humedad) + 3 &&
                parseInt(mediciones[0].mediaHumedad) <= parseInt(notificaciones[0].medicion_max_humedad) - 3) {
                alertasContainerAcordeonHum.style.display = "none";
                alertaRojaAcordeonHum.style.display = "none";
                alertaNaranjaAcordeonHum.style.display = "none";
            }
            //pH:
            if (parseInt(mediciones[0].mediapH) >= parseInt(notificaciones[0].medicion_min_ph) + 3 &&
                parseInt(mediciones[0].mediapH) <= parseInt(notificaciones[0].medicion_max_ph) - 3) {
                alertasContainerPh.style.display = "none";
                alertaRojaPh.style.display = "none";
                alertaNaranjaPh.style.display = "none";
            }
            //pH acordeon:
            if (parseInt(mediciones[0].mediapH) >= parseInt(notificaciones[0].medicion_min_ph) + 3 &&
                parseInt(mediciones[0].mediapH) <= parseInt(notificaciones[0].medicion_max_ph) - 3) {
                alertasContainerAcordeonPh.style.display = "none";
                alertaRojaAcordeonPh.style.display = "none";
                alertaNaranjaAcordeonPh.style.display = "none";
            }
            //Temperatura:
            if (parseInt(mediciones[0].mediaTemperatura) >= parseInt(notificaciones[0].medicion_min_temperatura) + 3 &&
                parseInt(mediciones[0].mediaTemperatura) <= parseInt(notificaciones[0].medicion_max_temperatura) - 3) {
                alertasContainerTemperatura.style.display = "none";
                alertaRojaTemperatura.style.display = "none";
                alertaNaranjaTemperatura.style.display = "none";
            }
            //Temperatura acordeon:
            if (parseInt(mediciones[0].mediaTemperatura) >= parseInt(notificaciones[0].medicion_min_temperatura) + 3 &&
                parseInt(mediciones[0].mediaTemperatura) <= parseInt(notificaciones[0].medicion_max_temperatura) - 3) {
                alertasContainerAcordeonTemp.style.display = "none";
                alertaRojaAcordeonTemp.style.display = "none";
                alertaNaranjaAcordeonTemp.style.display = "none";
            }
            //luz:
            if (parseInt(mediciones[0].mediaLuminosidad) >= parseInt(notificaciones[0].medicion_min_luminosidad) + 1 &&
                parseInt(mediciones[0].mediaLuminosidad) <= parseInt(notificaciones[0].medicion_max_luminosidad) - 1) {
                alertasContainerLuz.style.display = "none";
                alertaRojaLuz.style.display = "none";
                alertaNaranjaLuz.style.display = "none";
            }
            //luz acordeon:
            if (parseInt(mediciones[0].mediaLuminosidad) >= parseInt(notificaciones[0].medicion_min_luminosidad) + 1 &&
                parseInt(mediciones[0].mediaLuminosidad) <= parseInt(notificaciones[0].medicion_max_luminosidad) - 1) {
                alertasContainerAcordeonLuz.style.display = "none";
                alertaRojaAcordeonLuz.style.display = "none";
                alertaNaranjaAcordeonLuz.style.display = "none";
            }
        }
        //Si no tiene las notificaciones activadas:
        else{
            alertasContainerSal.style.display = "none";
            alertasContainerAcordeonSal.style.display = "none";
            alertasContainerHumedad.style.display = "none";
            alertasContainerAcordeonHum.style.display = "none";
            alertasContainerPh.style.display = "none";
            alertasContainerAcordeonPh.style.display = "none";
            alertasContainerTemperatura.style.display = "none";
            alertasContainerAcordeonTemp.style.display = "none";
            alertasContainerLuz.style.display = "none";
            alertasContainerAcordeonLuz.style.display = "none";
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

        datoActual.innerText = "";
        datoActual.innerText = mediciones[0].mediaSalinidad + "%";

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

           if (parteDecimalHumedad === 0) {
               objeto.mediaHumedad = Math.floor(objeto.mediaHumedad);
           }
       });
       
        //DATO ACTUAL HUMEDAD:
        datoActualTabHumedad.innerText = "";
        datoActualTabHumedad.innerText = mediciones[0].mediaHumedad + "%";

        datoActual.innerText = "";
        datoActual.innerText = mediciones[0].mediaHumedad + "%";

        datoActualAcordeonHumedad.innerText = "";
        datoActualAcordeonHumedad.innerText = mediciones[0].mediaHumedad + "%";
    }
}
//......................................................................................................................
//......................................................................................................................
//------------------------------------------
/*
    idHuerto --> cargarDatoActualPh()
*/
//------------------------------------------
async function cargarDatoActualPh(idHuerto) {

    const respuesta = await fetch('../../../api/medicionesDatoActual/' + '?idHuerto=' + idHuerto);
    if (respuesta.ok) {
        const mediciones = await respuesta.json();

        //para quitarle los decimales a la medida si los decimales son "0":
        mediciones.forEach(function (objeto) {
            var parteDecimalpH = objeto.mediapH % 1;

            if (parteDecimalpH === 0) {
                objeto.mediapH = Math.floor(objeto.mediapH);
            }
        });

        //DATO ACTUAL PH:
        datoActualTabPh.innerText = "";
        datoActualTabPh.innerText = mediciones[0].mediapH;

        datoActual.innerText = "";
        datoActual.innerText = mediciones[0].mediapH;

        datoActualAcordeonPh.innerText = "";
        datoActualAcordeonPh.innerText = mediciones[0].mediapH;
    }
}
//......................................................................................................................
//......................................................................................................................
//------------------------------------------
/*
    idHuerto --> cargarDatoActualTemperatura()
*/
//------------------------------------------
async function cargarDatoActualTemperatura(idHuerto) {

    const respuesta = await fetch('../../../api/medicionesDatoActual/' + '?idHuerto=' + idHuerto);
    if (respuesta.ok) {
        const mediciones = await respuesta.json();

        //para quitarle los decimales a la medida si los decimales son "0":
        mediciones.forEach(function (objeto) {
            var parteDecimalTemperatura = objeto.mediaTemperatura % 1;

            if (parteDecimalTemperatura === 0) {
                objeto.mediaTemperatura = Math.floor(objeto.mediaTemperatura);
            }
        });

        //DATO ACTUAL TEMPERATURA:
        datoActualTabTemperatura.innerText = "";
        datoActualTabTemperatura.innerText = mediciones[0].mediaTemperatura + "ºC";

        datoActual.innerText = "";
        datoActual.innerText = mediciones[0].mediaTemperatura + "ºC";

        datoActualAcordeonTemperatura.innerText = "";
        datoActualAcordeonTemperatura.innerText = mediciones[0].mediaTemperatura + "ºC";
    }
}

//......................................................................................................................
//......................................................................................................................
//------------------------------------------
/*
    idHuerto --> cargarDatoActualLuz()
*/
//------------------------------------------
async function cargarDatoActualLuz(idHuerto) {

    const respuesta = await fetch('../../../api/medicionesDatoActual/' + '?idHuerto=' + idHuerto);
    if (respuesta.ok) {
        const mediciones = await respuesta.json();

        //para quitarle los decimales a la medida si los decimales son "0":
        mediciones.forEach(function (objeto) {
            var parteDecimalLuz = objeto.mediaLuminosidad % 1;

            if (parteDecimalLuz === 0) {
                objeto.mediaLuminosidad = Math.floor(objeto.mediaLuminosidad);
            }
        });

        //DATO ACTUAL LUZ
        datoActualTabLuz.innerText = "";
        datoActual.innerText = "";
        datoActualAcordeonLuz.innerText = "";

        if(mediciones[0].mediaLuminosidad === 1){
            datoActualTabLuz.innerText = "Oscuridad";
            datoActual.innerText = "Oscuridad";
            datoActualAcordeonLuz.innerText = "Oscuridad";
        }
        if(mediciones[0].mediaLuminosidad === 2){
            datoActualTabLuz.innerText = "Poco iluminado";
            datoActual.innerText = "Poco iluminado";
            datoActualAcordeonLuz.innerText = "Poco iluminado";
        }
        if(mediciones[0].mediaLuminosidad === 3){
            datoActualTabLuz.innerText = "Sombra";
            datoActual.innerText = "Sombra";
            datoActualAcordeonLuz.innerText = "Sombra";
        }
        if(mediciones[0].mediaLuminosidad === 4){
            datoActualTabLuz.innerText = "Luz directa";
            datoActual.innerText = "Luz directa";
            datoActualAcordeonLuz.innerText = "Luz directa";
        }
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
        construirGraficaPh(idHuertos[0], "Hoy");
        construirGraficaTemperatura(idHuertos[0], "Hoy");
        construirGraficaLuz(idHuertos[0], "Hoy");
    }

    window.addEventListener('resize', function(){
        if (getComputedStyle(seccionAcordeon).display !== "none") {
            construirGraficaSalinidad(idHuertos[0], "Hoy");
            construirGraficaHumedad(idHuertos[0], "Hoy");
            construirGraficaPh(idHuertos[0], "Hoy");
            construirGraficaTemperatura(idHuertos[0], "Hoy");
            construirGraficaLuz(idHuertos[0], "Hoy");
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
        construirGraficaPh(idHuerto, "Hoy");
        construirGraficaTemperatura(idHuerto, "Hoy");
        construirGraficaLuz(idHuerto, "Hoy");
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
        if(filtro.value === "Seleccionar fecha"){
            construirGraficaSalinidad(idHuerto,"Fecha");
        }
        cargarDatoActualSalinidad(idHuerto);
        tabSalinidad.classList.add("activo");
        tabHumedad.classList.remove("activo");
        tabPh.classList.remove('activo');
        tabTemperatura.classList.remove('activo');
        tabLuz.classList.remove('activo');
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
    }
    cargarDatoActualHumedad(idHuerto);
    tabSalinidad.classList.remove("activo");
    tabHumedad.classList.add("activo");
    tabPh.classList.remove('activo');
    tabTemperatura.classList.remove('activo');
    tabLuz.classList.remove('activo');
})
//......................................................................................................................
//......................................................................................................................
//------------------------------------------
/*
                TAB PH
*/
//------------------------------------------
tabPh.addEventListener('click',function(){
    let idHuerto = selectorDeHuertos.value;
    if(filtro.value ==="Hoy"){
        construirGraficaPh(idHuerto, "Hoy");
    }
    if(filtro.value === "Semana"){
        construirGraficaPh(idHuerto, "Semana");
    }
    if(filtro.value === "Seleccionar fecha"){
        construirGraficaPh(idHuerto,"Fecha");
    }
    cargarDatoActualPh(idHuerto);
    tabSalinidad.classList.remove("activo");
    tabHumedad.classList.remove("activo");
    tabPh.classList.add('activo');
    tabTemperatura.classList.remove('activo');
    tabLuz.classList.remove('activo');
})
//......................................................................................................................
//......................................................................................................................
//------------------------------------------
/*
                TAB TEMPERATURA
*/
//------------------------------------------
tabTemperatura.addEventListener('click',function(){
    let idHuerto = selectorDeHuertos.value;
    if(filtro.value ==="Hoy"){
        construirGraficaTemperatura(idHuerto, "Hoy");
    }
    if(filtro.value === "Semana"){
        construirGraficaTemperatura(idHuerto, "Semana");
    }
    if(filtro.value === "Seleccionar fecha"){
        construirGraficaTemperatura(idHuerto,"Fecha");
    }
    cargarDatoActualTemperatura(idHuerto);
    tabSalinidad.classList.remove("activo");
    tabHumedad.classList.remove("activo");
    tabPh.classList.remove('activo');
    tabTemperatura.classList.add('activo');
    tabLuz.classList.remove('activo');
})
//......................................................................................................................
//......................................................................................................................
//------------------------------------------
/*
                TAB LUZ
*/
//------------------------------------------
tabLuz.addEventListener('click',function(){
    let idHuerto = selectorDeHuertos.value;
    if(filtro.value ==="Hoy"){
        construirGraficaLuz(idHuerto, "Hoy");
    }
    if(filtro.value === "Semana"){
        construirGraficaLuz(idHuerto, "Semana");
    }
    if(filtro.value === "Seleccionar fecha"){
        construirGraficaLuz(idHuerto,"Fecha");
    }
    cargarDatoActualLuz(idHuerto);
    tabSalinidad.classList.remove("activo");
    tabHumedad.classList.remove("activo");
    tabPh.classList.remove('activo');
    tabTemperatura.classList.remove('activo');
    tabLuz.classList.add('activo');
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
    //HOY:
    if (filtro.value === 'Hoy' && tabSalinidad.classList.contains('activo')) {
        construirGraficaSalinidad(idHuerto, "Hoy");
    }
    if(filtro.value === 'Hoy' && tabHumedad.classList.contains('activo')){
        construirGraficaHumedad(idHuerto, "Hoy");
    }
    if (filtro.value === 'Hoy' && tabPh.classList.contains('activo')) {
        construirGraficaPh(idHuerto, "Hoy");
    }
    if (filtro.value === 'Hoy' && tabTemperatura.classList.contains('activo')) {
        construirGraficaTemperatura(idHuerto, "Hoy");
    }
    if (filtro.value === 'Hoy' && tabLuz.classList.contains('activo')) {
        construirGraficaLuz(idHuerto, "Hoy");
    }
    //SEMANA:
    if(filtro.value === 'Semana' && tabSalinidad.classList.contains('activo')){
        construirGraficaSalinidad(idHuerto, "Semana");
    }
    if(filtro.value === 'Semana' && tabHumedad.classList.contains('activo')){
        construirGraficaHumedad(idHuerto, "Semana");
    }
    if (filtro.value === 'Semana' && tabPh.classList.contains('activo')) {
        construirGraficaPh(idHuerto, "Semana");
    }
    if (filtro.value === 'Semana' && tabTemperatura.classList.contains('activo')) {
        construirGraficaTemperatura(idHuerto, "Semana");
    }
    if (filtro.value === 'Semana' && tabLuz.classList.contains('activo')) {
        construirGraficaLuz(idHuerto, "Semana");
    }
    //SELECCIONAR FECHA:
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
        construirGraficaHumedad(idHuerto, "Hoy");
        construirGraficaPh(idHuerto, "Hoy");
        construirGraficaTemperatura(idHuerto, "Hoy");
        construirGraficaLuz(idHuerto, "Hoy");
    }
    if(filtroAcordeon.value === "Semana"){
        construirGraficaSalinidad(idHuerto, "Semana");
        construirGraficaHumedad(idHuerto, "Semana");
        construirGraficaPh(idHuerto, "Semana");
        construirGraficaTemperatura(idHuerto, "Semana");
        construirGraficaLuz(idHuerto, "Semana");
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
    if(tabPh.classList.contains('activo')){
        construirGraficaPh(idHuerto, "Fecha");
    }
    if(tabTemperatura.classList.contains('activo')){
        construirGraficaTemperatura(idHuerto, "Fecha");
    }
    if(tabLuz.classList.contains('activo')){
        construirGraficaLuz(idHuerto, "Fecha");
    }

    if (getComputedStyle(seccionAcordeon).display !== "none") {
        construirGraficaSalinidad(idHuerto, "Fecha");
        construirGraficaHumedad(idHuerto, "Fecha");
        construirGraficaPh(idHuerto, "Fecha");
        construirGraficaTemperatura(idHuerto, "Fecha");
        construirGraficaLuz(idHuerto, "Fecha");
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

