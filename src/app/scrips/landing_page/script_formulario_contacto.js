const form = document.getElementById('contact-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
const submitButton = document.getElementById('submit-button');

/*
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'send-email.php'); // Cambia "send-email.php" por la ruta del archivo PHP que procesará el formulario
    xhr.onload = () => {
        console.log(xhr.responseText); // Muestra la respuesta del servidor en la consola
    };
    xhr.send(formData);
});

 */


/*Para que cuando se envíe el formulario, se muestre el diálogo: ¡Se ha enviado el formulario correctamente!*/
document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita que el formulario se envíe de forma predeterminada

    // Validar los campos antes de mostrar el diálogo
    var nombre = document.getElementById('name').value;
    var apellidos = document.getElementById('apellidos').value;
    var email = document.getElementById('email').value;
    var mensaje = document.getElementById('mensaje').value;

    if (nombre.trim() !== '' && apellidos.trim() !== '' && email.trim() !== '' && mensaje.trim() !== '') {
        // Si los campos están completos, mostrar el diálogo
        document.getElementById('dialog-container').style.display = 'block';
    }
});

