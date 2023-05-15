//---------------------------------------
/*
Clicar en icono del menú y que salga el formulario:
*/
//---------------------------------------

// Obtenemos referencias al icono del menú (navToggle) y a los botones del menú (navMenu)

//const navToggle = document.querySelector(".nav-toggle");
//const navMenu = document.querySelector(".nav-menu");

//Cuando hacemos click en el icono del menú, se activa la clase "nav-menu_visible", si ya está presente y hacemos click, se elimina.
navToggle.addEventListener("click", () => {
    navMenu.classList.toggle("nav-menu_visible");

//Si la clase nav-menú_visible está activa o inactiva cambia el aria-label del icono del menú.

    if (navMenu.classList.contains("nav-menu_visible")) {
        navToggle.setAttribute("aria-label", "Cerrar menú");
    } else {
        navToggle.setAttribute("aria-label", "Abrir menú");
    }
});

//---------------------------------------
/*
Función login():
*/
//---------------------------------------

document.getElementById("login-form").addEventListener('submit', login);

/**
 * Se ejecutará cuando se envíe el formulario.
 * Puesto que se usa fetch, es una función asíncrona
 * @param event Objeto con información del evento.
 */
async function login(event) {
    // eliminamos el mensaje de error previo, si lo hay
    const output = document.getElementById("output");
    output.classList.remove("error");

    event.preventDefault();
    const formData = new FormData(event.target);

    const respuesta = await fetch('api/sesion/', {
        method: 'post',
        body: formData
    })
    // si el resultado de la petición es OK (i.e. código HTTP 200)
    if (respuesta.ok) {
        // redirigimos a la página correspondiente
        location.href = 'app/scrips/landing_page/ejemplo.html';
    } else {
        // si no, mostramos un mensaje de error
        output.innerText = "Credenciales no válidas";
        output.classList.add("error");
    }
}

