//-----------------------------------
/*
SCRIPT PARA ENVIAR FORMULARIO Y PARA MOSTRAR DIÁLOGO DE ENVÍO
*/
//-----------------------------------
 let url="../../../api/contrasenya/"
    // Obtener el valor del parámetro de consulta "email"
    var queryString = window.location.search;
    var urlParams = new URLSearchParams(queryString);
    var emailUsuario = urlParams.get('email');

/*Para que cuando se envíe el formulario, se muestre el diálogo: ¡Se ha enviado el formulario correctamente!*/
document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita que el formulario se envíe de forma predeterminada

    // Validar los campos antes de mostrar el diálogo
    var nombre = document.getElementById('name').value;
    var apellidos = document.getElementById('apellidos').value;


    if (nombre.trim() !== '' && apellidos.trim() !== '') {
        // Si los campos están completos, mostrar el diálogo
        document.getElementById('dialog-container').style.display = 'block';
    }
});

/**
 *La función comprueba si las contraseñas coinciden o están vacías,en caso afirmativo realiza el cambio de contraseña
 */
async function Actualizarcontraseña(){
    event.preventDefault();
    const contrasenya2=document.getElementById("contrasenya2").value;
    const contrasenya1=document.getElementById("contrasenya1").value;

    if (contrasenya2!=contrasenya1 || contrasenya1 =="" || contrasenya2==""){
        alert("Las contraseñas no coinciden");
    }
    else {
        const datos = {
            clave: contrasenya1,
            email: emailUsuario
        };
        const respuesta = await fetch(url, {
            method: 'put',
            body: JSON.stringify(datos)
        })
        return await respuesta.ok;
    }
}

