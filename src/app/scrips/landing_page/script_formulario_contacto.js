const form = document.getElementById('contact-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
const submitButton = document.getElementById('submit-button');

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