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


//ACORDEON
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

                                        /*
                                           ========================
                                                 DATO ACTUAL
                                           ========================
                                                                    */

//......................................................................................................................
//......................................................................................................................
//------------------------------------------
/*
    idHuerto --> cargarDatoActual()
*/
//------------------------------------------
async function cargarDatoActual(idHuerto) {

    const respuesta = await fetch('../../../api/medicionesDatoActual/' + '?idHuerto=' + idHuerto);
    if (respuesta.ok) {
        const mediciones = await respuesta.json();

        mediciones.forEach(function(objeto) {
            var parteDecimalSalinidad = objeto.mediaSalinidad % 1;
            var parteDecimalHumedad = objeto.mediaHumedad % 1;
            var parteDecimalpH = objeto.mediapH % 1;
            var parteDecimalLuz = objeto.mediaLuminosidad % 1;
            var parteDecimalTemperatura = objeto.mediaTemperatura % 1;


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
            }if (parteDecimalTemperatura === 0) {
                objeto.mediaTemperatura = Math.floor(objeto.mediaTemperatura);
            }
        });
        
        //DATO ACTUAL SALINIDAD:
        datoActualTabSalinidad.innerText = "";
        datoActualTabSalinidad.innerText = mediciones[0].mediaSalinidad + "%";

        datoActualSalinidad.innerText = "";
        datoActualSalinidad.innerText = mediciones[0].mediaSalinidad + "%";

        datoActualAcordeonSalinidad.innerText = "";
        datoActualAcordeonSalinidad.innerText = mediciones[0].mediaSalinidad + "%";

        //DATO ACTUAL HUMEDAD:
        datoActualTabHumedad.innerText = "";
        datoActualTabHumedad.innerText = mediciones[0].mediaHumedad + "%";

        datoActualHumedad.innerText = "";
        datoActualHumedad.innerText = mediciones[0].mediaHumedad + "%";

        datoActualAcordeonHumedad.innerText = "";
        datoActualAcordeonHumedad.innerText = mediciones[0].mediaHumedad + "%";

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

        //DATO ACTUAL LUZ:
        datoActualTabLuz.innerText = "";
        datoActualTabLuz.innerText = mediciones[0].mediaLuminosidad;

        datoActualLuz.innerText = "";
        datoActualLuz.innerText = mediciones[0].mediaLuminosidad;

        datoActualAcordeonLuz.innerText = "";
        datoActualAcordeonLuz.innerText = mediciones[0].mediaLuminosidad;
    }
}
//......................................................................................................................
//......................................................................................................................
//------------------------------------------
/*
            getHuertoPorDefecto()
*/
//------------------------------------------

async function getHuertoPorDefecto(){
    //conseguimos la id de los huertos del usuario y las metemos en un array:
    let huertosDelUsuario = await getHuertosUsuario();
    let idHuertos = huertosDelUsuario.map(function(huerto){
        return huerto.id_huerto;
    });

    //la primera casilla contendrá la id del primer huerto, el que aparecerá por defecto:
    cargarDatoActual(idHuertos[0]);
    return idHuertos[0];
}
//......................................................................................................................
//......................................................................................................................
//------------------------------------------
/*
            SELECTOR DE HUERTOS
*/
//------------------------------------------
selectorDeHuertos.addEventListener('change', function() {
    let idHuerto = selector.value; //conseguimos la id del huerto seleccionado
    cargarDatoActual(idHuerto);
});

/*-----------------------------------------------Aquí acaban las funciones para obtener el dato actual*/

//LLAMADA DE FUNCIONES:
getHuertoPorDefecto();