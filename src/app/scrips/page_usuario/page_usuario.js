/*
    =========================================================================
                             NOMBRE USUARIO HEADER
    =========================================================================
                                                                                */
let nombreUsuario = document.getElementById('nombreUsuarioRegistrado');

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
            escribirNombreUsuario()
*/
//------------------------------------------

async function escribirNombreUsuario(){
    let datosUsuario = await getSesionUsuario();
    let nombre = datosUsuario.nombre;

    nombreUsuario.innerText = "";
    nombreUsuario.innerText = nombre;
}

//llamada:
escribirNombreUsuario();

/*-----------------------------------------------Aquí acaban las funciones para el nombre de usuario del header*/


/*
    =========================================================================
                                BOTONES MENÚ
    =========================================================================
                                                                                */

const btn_verhuertos = document.getElementById("boton_huertos");
const btn_citas = document.getElementById("boton_citas");
const btn_ajustesperfil = document.getElementById("boton_perfil");


const huertos = document.getElementById("huertos");
const ajustes = document.getElementById("ajustes-usuario")
const citas = document.getElementById("citas");

huertos.style.display = "block";
ajustes.style.display = "none";
citas.style.display = "none";

btn_verhuertos.addEventListener("click", function () {
    huertos.style.display = "block";
    ajustes.style.display = "none";
    citas.style.display = "none";
});

btn_citas.addEventListener("click", function () {
    huertos.style.display = "none";
    ajustes.style.display = "none";
    citas.style.display = "block";
});

btn_ajustesperfil.addEventListener("click", function () {
    huertos.style.display = "none";
    ajustes.style.display = "block";
    citas.style.display = "none";
});

/*-----------------------------------------------Aquí acaban las funciones para los botones de menú*/



/*
    =========================================================================
                                AJUSTES DE HUERTO
    =========================================================================
                                                                                */

const botonAbrirAjustesHuerto = document.getElementById('boton_abrir_ajustes_huerto');
const dialogoAjustesHuerto = document.getElementById('ajustes_de_huerto');
const botonCerrarAjustesHuerto = document.getElementById('cerrar_ajustes_huerto');
botonAbrirAjustesHuerto.addEventListener("click", ()=>{
    dialogoAjustesHuerto.classList.add('activo');
    dialogoAjustesHuerto.showModal();
});

function cerrarAjustesHuerto(){
    dialogoAjustesHuerto.classList.remove('activo');
    dialogoAjustesHuerto.close();
}

botonCerrarAjustesHuerto.addEventListener("click", cerrarAjustesHuerto);

/*-----------------------------------------------Aquí acaban las funciones para los ajustes del huerto*/


/*
    =========================================================================
              DIÁLOGO ATAJO PARA CAMBIAR LOS LÍMITES DE LAS MEDIDAS
    =========================================================================
                                                                                */

//Atajo cambiar límites de SALINIDAD:
const abrirAtajoSal = document.getElementById('atajo_limites_sal');
const dialogoAtajoSal = document.getElementById('dialogo_atajo_sal');
const guardarAtajoSal = document.getElementById('atajo_guardar_limites_sal');
const cancelarAtajoSal = document.getElementById('atajo_cancelar_limites_sal');

abrirAtajoSal.addEventListener("click", ()=>{
    dialogoAtajoSal.classList.add('activo');
    dialogoAtajoSal.showModal();
});

function cerrarDialogoSal(){
    dialogoAtajoSal.classList.remove('activo');
    dialogoAtajoSal.close();
}

guardarAtajoSal.addEventListener("click", cerrarDialogoSal);
cancelarAtajoSal.addEventListener("click", cerrarDialogoSal);

//------------------------------------------------------------------------

//Atajo cambiar límites de HUMEDAD:
const abrirAtajoHumedad = document.getElementById('atajo_limites_humedad');
const dialogoAtajoHumedad = document.getElementById('dialogo_atajo_humedad');
const guardarAtajoHumedad = document.getElementById('atajo_guardar_limites_humedad');
const cancelarAtajoHumedad = document.getElementById('atajo_cancelar_limites_humedad');

abrirAtajoHumedad.addEventListener("click", ()=>{
    dialogoAtajoHumedad.classList.add('activo');
    dialogoAtajoHumedad.showModal();
});

function cerrarDialogoHumedad(){
    dialogoAtajoHumedad.classList.remove('activo');
    dialogoAtajoHumedad.close();
}

guardarAtajoHumedad.addEventListener("click", cerrarDialogoHumedad);
cancelarAtajoHumedad.addEventListener("click", cerrarDialogoHumedad);

//------------------------------------------------------------------------

//Atajo cambiar límites de PH:
const abrirAtajoPh = document.getElementById('atajo_limites_ph');
const dialogoAtajoPh = document.getElementById('dialogo_atajo_ph');
const guardarAtajoPh = document.getElementById('atajo_guardar_limites_ph');
const cancelarAtajoPh = document.getElementById('atajo_cancelar_limites_ph');

abrirAtajoPh.addEventListener("click", ()=>{
    dialogoAtajoPh.classList.add('activo');
    dialogoAtajoPh.showModal();
});

function cerrarDialogoPh(){
    dialogoAtajoPh.classList.remove('activo');
    dialogoAtajoPh.close();
}

guardarAtajoPh.addEventListener("click", cerrarDialogoPh);
cancelarAtajoPh.addEventListener("click", cerrarDialogoPh);

//------------------------------------------------------------------------

//Atajo cambiar límites de TEMPERATURA:
const abrirAtajoTemperatura = document.getElementById('atajo_limites_temperatura');
const dialogoAtajoTemperatura = document.getElementById('dialogo_atajo_temperatura');
const guardarAtajoTemperatura = document.getElementById('atajo_guardar_limites_temperatura');
const cancelarAtajoTemperatura = document.getElementById('atajo_cancelar_limites_temperatura');

abrirAtajoTemperatura.addEventListener("click", ()=>{
    dialogoAtajoTemperatura.classList.add('activo');
    dialogoAtajoTemperatura.showModal();
});

function cerrarDialogoTemperatura(){
    dialogoAtajoTemperatura.classList.remove('activo');
    dialogoAtajoTemperatura.close();
}

guardarAtajoTemperatura.addEventListener("click", cerrarDialogoTemperatura);
cancelarAtajoTemperatura.addEventListener("click", cerrarDialogoTemperatura);

//------------------------------------------------------------------------

//Atajo cambiar límites de LUZ:
const abrirAtajoLuz = document.getElementById('atajo_limites_luz');
const dialogoAtajoLuz = document.getElementById('dialogo_atajo_luz');
const guardarAtajoLuz = document.getElementById('atajo_guardar_limites_luz');
const cancelarAtajoLuz = document.getElementById('atajo_cancelar_limites_luz');

abrirAtajoLuz.addEventListener("click", ()=>{
    dialogoAtajoLuz.classList.add('activo');
    dialogoAtajoLuz.showModal();
});

function cerrarDialogoLuz(){
    dialogoAtajoLuz.classList.remove('activo');
    dialogoAtajoLuz.close();
}

guardarAtajoLuz.addEventListener("click", cerrarDialogoLuz);
cancelarAtajoLuz.addEventListener("click", cerrarDialogoLuz);



/*-----------------------------------------------Aquí acaban las funciones para el diálogo de cambiar límites de medidas*/




/*
    =======================================================================
                        FUNCIONES PARA LAS ALERTAS
    =======================================================================
                                                                                */
/*Función de bootstrap para que el popover funcione:*/
$(function(){
    $('[data-toggle="popover"]').popover()
});

/*-----------------------------------------------Aquí acaban las funciones para las alertas*/


/*
    =========================================================================
    FUNCIONES PARA EL FUNCIONAMIENTO DEL VISUALIZADOR DE HUERTOS EN PESTAÑAS
    =========================================================================
                                                                                */
function activarElemento(elementos, posicion) {
    for (let i = 0; i < elementos.length; i++) {
        if (i === posicion - 1) {
            elementos[i].classList.add("activo");
        } else {
            elementos[i].classList.remove("activo");
        }
    }
}

function cambiarTab(tab) {
    let botones = document.getElementsByClassName("tab");
    activarElemento(botones, tab);
    let articulos = document.getElementsByClassName("grafica");
    activarElemento(articulos, tab);
}

/*-----------------------------------------------Aquí acaban las funciones para el visualizador de huertos en pestañas*/


