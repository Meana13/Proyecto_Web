//-----------------------------------
/*
SCRIPT PARA ENVIAR FORMULARIO Y PARA MOSTRAR DIÁLOGO DE ENVÍO
*/
//-----------------------------------
var url="../../../api/email/"

/**
 * Comprueba el email y redirige a la pagina de nueva contraseña(Para el Sprint,de normal enviaria un correo y pondria un aviso en pantalla)
 */
async function Comprobaremail() {
    event.preventDefault()
    var email = document.getElementById('email').value;
    console.log(email);
    const respuesta = await fetch(url + '?email=' + email);
    const data = await respuesta.text();

    if (data != "") {
        // Redirigir a otra página con la variable 'email' como parámetro de consulta
        window.location.href = 'formulario_contacto_nueva_contraseña.html?email=' + encodeURIComponent(email);
    } else {
        // Mostrar un alert
        alert('No se encontró ninguna respuesta');
    }
}

