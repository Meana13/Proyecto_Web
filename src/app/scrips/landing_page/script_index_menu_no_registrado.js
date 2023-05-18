//---------------------------------------
/*
ABRIR Y CERRAR MENÚ HAMBURGUESA
*/
//---------------------------------------

// Obtenemos referencias al icono del menú (navToggle) y a los botones del menú (navMenu)

const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");

//Cuando hacemos click en el icono del menú, se activa la clase "nav-menu_visible", si ya está presente y hacemos click, se elimina.

function desplegarMenu(){
    navMenu.classList.toggle("nav-menu_visible");

    if (navMenu.classList.contains("nav-menu_visible")) {
        navToggle.setAttribute("aria-label", "Cerrar menú");
    } else {
        navToggle.setAttribute("aria-label", "Abrir menú");
    }
}




