//-----------------------------------
/*
SCRIPT PARA ENVIAR FORMULARIO Y PARA MOSTRAR DIÁLOGO DE ENVÍO
*/
//-----------------------------------
var url="../../../api/email/"
async function Comprobaremail() {
    var email = document.getElementById('email').value;

    const respuesta = await fetch(url + '?email=' + email);
    const data = await respuesta.text();

    if (data !== "") {
        // Redirigir a otra página con la variable 'email' como parámetro de consulta
        window.location.href = 'otra_pagina.html?email=' + encodeURIComponent(email);
    } else {
        // Mostrar un alert
        alert('No se encontró ninguna respuesta');
    }
}

