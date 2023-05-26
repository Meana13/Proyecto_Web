
/*Script para navegar botones de menu*/
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
/*Script para navegar botones de menu*/



/*
    =========================================================================
                                AJUSTES DE HUERTO
    =========================================================================
                                                                                */

const botonAbrirAjustesHuerto = document.getElementById('boton_abrir_ajustes_huerto');
const dialogoAjustesHuerto = document.getElementById('ajustes_de_huerto');
const botonGuardarAjustesHuerto = document.getElementById('boton_guardar_ajustes_huerto');
const botonCerrarAjustesHuerto = document.getElementById('cerrar_ajustes_huerto');
botonAbrirAjustesHuerto.addEventListener("click", ()=>{
    dialogoAjustesHuerto.classList.add('activo');
    dialogoAjustesHuerto.showModal();
});

function cerrarAjustesHuerto(){
    dialogoAjustesHuerto.classList.remove('activo');
    dialogoAjustesHuerto.close();
}

botonGuardarAjustesHuerto.addEventListener("click", cerrarAjustesHuerto);
botonCerrarAjustesHuerto.addEventListener("click", cerrarAjustesHuerto);





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


/*
    =========================================================================
              DIÁLOGO ATAJO PARA CAMBIAR LOS LÍMITES DE LAS MEDIDAS
    =========================================================================
                                                                                */
const botonAbrirDialogo = document.getElementById('boton_dialogo_atajo_limites_medidas');
const dialogo = document.querySelector('dialog');
const guardar = document.getElementById('boton_guardar_limites_medidas_dialogo');
const cancelar = document.getElementById('boton_cancelar_limites_medidas_dialogo');

botonAbrirDialogo.addEventListener("click", ()=>{
    dialogo.classList.add('activo');
    dialogo.showModal();
});

function cerrarDialogo(){
    dialogo.classList.remove('activo');
    dialogo.close();
}

guardar.addEventListener("click", cerrarDialogo);
cancelar.addEventListener("click", cerrarDialogo);

/*-----------------------------------------------Aquí acaban las funciones para el diálogo de cambiar límites de medidas*/







/*Script para cambiar entre medidas e historial*//*
const btn_graficas = document.getElementsByClassName("historial");
const btn_actual = document.getElementsByClassName("actual");

//const graficas =document.getElementsByClassName("chart-container");
const humedad =document.getElementById("Humedad");
const temperatura =document.getElementById("Temperatura");
const sal =document.getElementById("Sal");
const luz =document.getElementById("Luz");
const pH =document.getElementById("pH");
/*

//graficas.style.display = "none";
humedad.style.display = "block";
temperatura.display = "block";
sal.style.display = "block";
luz.style.display = "block";
pH.style.display = "block";
btn_graficas.addEventListener('click',function (){
    graficas.style.display = "block";
    circulo.style.display = "none";
})

btn_actual.addEventListener('click',function (){
    graficas.style.display = "none";
    circulo.style.display = "block";
})

/*Script para cambiar entre medidas e historial*/

/*Script para dialogo de Añadir huertos*//*

const boton = document.getElementById('entrada');
const enviar = document.getElementById('enviar');
const cancelar = document.getElementById('cancelar');
const popup = document.querySelector("dialog");


boton.addEventListener('click', () => {
    nombre.value = ""
    popup.showModal();
});
enviar.addEventListener('click', cerrar);

cancelar.addEventListener('click', cerrar);
function cerrar() {
    console.log(nombre.value)
    popup.close(nombre.value);
}
enviar.addEventListener('click', cerrar);
cancelar.addEventListener('click', cerrar);
popup.addEventListener('close', () => {
    console.log('Valor devuelto', popup.returnValue)
})
/*Script para dialogo de Añadir huertos*/

/*Script para mensajes de cambios aceptados emergentes*//*
const dialogoCambiosPerfil = document.querySelector('#dialogo_cambios_perfil');
const btnAceptar = document.querySelector('#btn_aceptar');

document.getElementById('cambios_perfil').addEventListener('click', function () {
    event.preventDefault();
    dialogoCambiosPerfil.show();
});

btnAceptar.addEventListener('click', function () {
    dialogoCambiosPerfil.close();
});
/*Script para mensajes de cambios aceptados emergentes*/

/*Script para eliminar flias de citas*//*
const botonesAceptar = document.querySelectorAll('button img[alt="Aceptar"]');
const botonesRechazar = document.querySelectorAll('button img[alt="Rechazar"]');

// Agrega el event listener para cada botón de Aceptar
botonesAceptar.forEach(botonAceptar => {
    botonAceptar.addEventListener("click", () => {
        const fila = botonAceptar.closest('tr'); // Obtiene el tr que contiene el botón Aceptar
        fila.remove(); // Elimina la fila de la tabla
    });
});

// Agrega el event listener para cada botón de Rechazar
botonesRechazar.forEach(botonRechazar => {
    botonRechazar.addEventListener("click", () => {
        const fila = botonRechazar.closest('tr'); // Obtiene el tr que contiene el botón Rechazar
        fila.remove(); // Elimina la fila de la tabla
    });
});
*/

