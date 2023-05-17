

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

/*Script para dialogo de Añadir huertos*/

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

/*Script para mensajes de cambios aceptados emergentes*/
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

/*Script para eliminar flias de citas*/
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