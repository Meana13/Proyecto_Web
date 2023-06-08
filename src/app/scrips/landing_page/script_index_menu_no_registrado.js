//---------------------------------------
/*
ABRIR Y CERRAR MENÚ HAMBURGUESA
*/
//---------------------------------------

// Obtenemos referencias al icono del menú (navToggle) y al menú desplegable (navMenu)
const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");

// Agregamos el evento 'click' al icono del menú para alternar la visibilidad del menú desplegable
navToggle.addEventListener("click", desplegarMenu);

// Función para desplegar o ocultar el menú
function desplegarMenu() {
  navMenu.classList.toggle("nav-menu_visible");

  if (navMenu.classList.contains("nav-menu_visible")) {
    navToggle.setAttribute("aria-label", "Cerrar menú");
  } else {
    navToggle.setAttribute("aria-label", "Abrir menú");
  }
}

// Obtener referencias a los enlaces del menú
const enlacesMenu = document.querySelectorAll(".boton_menu");

// Agregar evento 'click' a cada enlace del menú
enlacesMenu.forEach((enlace) => {
  enlace.addEventListener("click", () => {
    // Ocultar el menú desplegable al hacer clic en un enlace
    desplegarMenu();
  });
});