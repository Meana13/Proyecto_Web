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
//.......................................................
/*
            getDatosUsuario() --> datos
                                            ____datos____
                                            id_usuario: N
                                            rol: N
                                            nombre: txt
                                            password: txt
                                            _____________
*/
//.......................................................
async function getDatosUsuario(){
    let datosSesion = await getSesionUsuario();
    let idUsuario = datosSesion.id_usuario;

    const respuesta = await fetch('../../../api/usuario/' + '?idUsuario=' + idUsuario);
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
    let datosUsuario = await getDatosUsuario();
    let nombre = datosUsuario[0].nombre;

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
    =======================================================================
                        FUNCIONES PARA LAS ALERTAS
    =======================================================================
                                                                                */
/*Función de bootstrap para que el popover funcione:*/
$(function(){
    $('[data-toggle="popover"]').popover()
});

/*-----------------------------------------------Aquí acaban las funciones para las alertas*/




