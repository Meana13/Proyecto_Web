//......................................................................................................................
/*                                              PÁGINA DE HUERTOS DEL USUARIO                                         */
//......................................................................................................................
//......................................................................................................................
//......................................................................................................................
//DECLARACIÓN DE VARIABLES:
const selectorDeHuertos = document.getElementById('seleccionar_huerto');
//......................................................................................................................
//......................................................................................................................

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
async function getDatosHuertoPorIdHuerto(idHuerto){
    const respuesta = await fetch('../../../api/huertos/' + '?idHuerto=' + idHuerto);
    if(respuesta.ok) {
        const datos = await respuesta.json();
        return datos;
    }
}
//------------------------------------------
/*
            escribirNombreHuerto()
*/
//función para modificar el html para que muestre los huertos del usuario en el selector
//de huertos y que cambie el nombre del huerto.
//------------------------------------------
async function escribirNombreHuerto(){
    let huertosDelUsuario = await getHuertosUsuario();
    let nombreDeHuertos = huertosDelUsuario.map(function(huerto){
        return huerto.nombre_huerto;
    });

    let idHuertos = huertosDelUsuario.map(function(huerto){
        return huerto.id_huerto;
    });

    for(let i=0; i<nombreDeHuertos.length; i++){
        const opcion = document.createElement('option');
        opcion.value = idHuertos[i];
        opcion.innerText = nombreDeHuertos[i];
        selector.appendChild(opcion);
    }

    const nombreDeHuerto = document.getElementById('nombreDeHuerto');
    nombreDeHuerto.innerText = "";
    nombreDeHuerto.innerText = nombreDeHuertos[0];

    selectorDeHuertos.addEventListener('change', async function(){
        let idHuerto = selectorDeHuertos.value;

        let datosHuerto = await getDatosHuertoPorIdHuerto(idHuerto);

        nombreDeHuerto.innerText = "";
        nombreDeHuerto.innerText = datosHuerto[0].nombre_huerto;
    });
}

//llamada de la función para que se escriba el nombre en el selector.
escribirNombreHuerto();

/*-----------------------------------------------Aquí acaban las funciones para el selector de huertos*/

