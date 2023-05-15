//---------------------------------------
/*
MENÚ
*/
//---------------------------------------

// Obtenemos referencias al icono del menú (navToggle) y a los botones del menú (navMenu)

const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");

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
INICIO DE SESIÓN
*/
//---------------------------------------
/*
//Obtenemos las referencias:

const loginTab = document.querySelector('.login-tab'); //logo de iniciar sesión
const loginFormContainer = document.querySelector('.login-form-container'); //contenedor del formulario de login
const loginForm = document.querySelector('.login-form'); //formulario de login

// Mostrar el formulario de inicio de sesión cuando se hace clic en el icono
loginTab.addEventListener('click', function (event) {
    event.preventDefault();
    loginForm.classList.add("activo");
    loginFormContainer.style.display = 'flex';
});

// Ocultar el formulario de inicio de sesión cuando se hace clic en cualquier lugar fuera de él
if(loginForm.classList.contains("activo")){
    loginFormContainer.addEventListener('click', function(event) {
        if (!loginForm.contains(event.target) && event.target !== loginTab) {
            loginForm.classList.remove("activo");
            loginFormContainer.style.display = 'none';
        }
    });
}
*/

//Obtenemos las referencias:
const loginTab = document.querySelector('.login-tab'); //logo de iniciar sesión
const loginFormContainer = document.querySelector('.login-form-container'); //contenedor del formulario de login
const loginForm = document.querySelector('.login-form'); //formulario de login
const botonCerrarFormulario = document.querySelector(".cerrar-formulario");

// Mostrar el formulario de inicio de sesión cuando se hace clic en el icono
loginTab.addEventListener('click', function (event) {
    event.preventDefault();
    loginFormContainer.classList.add("activo");
});

if(loginFormContainer.classList.contains("activo")){
    botonCerrarFormulario.addEventListener('click', function(event) {
            loginFormContainer.classList.remove("activo");

    });
}


// Ocultar el formulario de inicio de sesión cuando se hace clic en cualquier lugar fuera de él
/*document.addEventListener('click', function(event) {
    if (!loginForm.contains(event.target) && event.target !== loginTab) {
        loginForm.classList.remove("activo");
        loginFormContainer.style.display = 'none';
    }
});

*/