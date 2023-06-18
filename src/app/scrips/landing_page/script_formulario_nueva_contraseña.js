//-----------------------------------
/*
SCRIPT PARA ENVIAR FORMULARIO Y PARA MOSTRAR DIÁLOGO DE ENVÍO
*/
//-----------------------------------
 let url="../../../api/contrasenya/"
    // Obtener el valor del parámetro de consulta "email"
    var queryString = window.location.search;
    var urlParams = new URLSearchParams(queryString);
    var email = urlParams.get('email');

console.log(email); // Mostrar el valor del parámetro de consulta "email"


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

async function Actualizarcontraseña(){
    const contrasenya=document.getElementById("contrasenya2");
    const datos= {
        clave:contrasenya
    };
    const respuesta = await fetch(url, {
        method: 'put',
        body: JSON.stringify(datos)
    })
    return await respuesta.ok;
}

