const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");

navToggle.addEventListener("click", () => {
  navMenu.classList.toggle("nav-menu_visible");

  if (navMenu.classList.contains("nav-menu_visible")) {
    navToggle.setAttribute("aria-label", "Cerrar menú");
  } else {
    navToggle.setAttribute("aria-label", "Abrir menú");
  }
});

const loginTab = document.querySelector('.login-tab');
const loginFormContainer = document.querySelector('.login-form-container');
const loginForm = document.querySelector('.login-form');

// Mostrar el formulario de inicio de sesión cuando se hace clic en la pestaña
loginTab.addEventListener('click', function(event) {
  event.preventDefault();
  loginFormContainer.style.display = 'flex';
});
// Ocultar el formulario de inicio de sesión cuando se hace clic en cualquier lugar fuera de él
