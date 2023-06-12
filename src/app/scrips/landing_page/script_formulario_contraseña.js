//-----------------------------------
/*
SCRIPT PARA ENVIAR FORMULARIO Y PARA MOSTRAR DIÁLOGO DE ENVÍO
*/
//-----------------------------------

const form = document.getElementById('contact-form');

/*Para que cuando se envíe el formulario, se muestre el diálogo: ¡Se ha enviado el formulario correctamente!*/
document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita que el formulario se envíe de forma predeterminada

    // Validar los campos antes de mostrar el diálogo
    var nombre = document.getElementById('name').value;


    if (nombre.trim() !== '' ) {
        // Si los campos están completos, mostrar el diálogo
        document.getElementById('dialog-container').style.display = 'block';
    }
});

