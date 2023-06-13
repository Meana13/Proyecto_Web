
document.addEventListener('DOMContentLoaded', function () {
    const botonAdminUsuarios = document.getElementById("boton-administrar-usuarios");
    const secAdminUsuarios = document.getElementById("seccion-administrar-usuarios");

    let botonActivo = botonAdminUsuarios;
    let secActiva = secAdminUsuarios;

    // si se hace click a botonAdminUsuarios hacemos que aparezca su seccion y desaparezcan las demas
    botonAdminUsuarios.addEventListener("click", () => {
        secActiva.style.display = "none";
        botonActivo.style.backgroundColor = "";
        secAdminUsuarios.style.display = "block";
        botonActivo = botonAdminUsuarios;
        secActiva = secAdminUsuarios;
    });

    const botonAnyadir = document.getElementById("boton-añadir-usuario");
    const seccionAnyadir = document.getElementById("seccion-añadir-usuario");

    // si se hace click a botonAnyadir hacemos que aparezca su seccion y desaparezcan las demas
    botonAnyadir.addEventListener('click', () => {
        secActiva.style.display = "none";
        botonActivo.style.backgroundColor = "";
        seccionAnyadir.style.display = "block";
        secActiva = seccionAnyadir;
    });

    const botonGenerarId = document.getElementById("boton-generar-id");
    const cajaId = document.getElementById("caja-id");

    // si se hace click a botonGenerarId hacemos que aparezca su seccion y desaparezcan las demas
    botonGenerarId.addEventListener("click", () => {
        const nuevoId = Math.floor(Math.random() * 1000000).toString().padStart(6, "0");
        cajaId.textContent = nuevoId;
    });

    const botonHojaUsuario = document.getElementById("ver-hoja-usuario");
    const seccionHojaUsuario = document.getElementById("seccion-hoja-usuario");

    // si se hace click a botonHojaUsuario hacemos que aparezca su seccion y desaparezcan las demas
    botonHojaUsuario.addEventListener("click", () => {
        secActiva.style.display = "none";
        botonActivo.style.backgroundColor = "";
        seccionHojaUsuario.style.display = "block";
        secActiva = seccionHojaUsuario;
    })

    const botonGuardarCambios = document.getElementById("boton-guardar-cambios");
    const botonCancelar = document.getElementById("boton-cancelar");

    // si se hace click a botonCancelar hacemos que aparezca su seccion y desaparezcan las demas
    botonCancelar.addEventListener("click", () => {
        secActiva.style.display = "none";
        botonActivo.style.backgroundColor = "";
        secAdminUsuarios.style.display = "block";
        botonAdminUsuarios.style.backgroundColor = "#790050";
        botonActivo = botonAdminUsuarios;
        secActiva = secAdminUsuarios;
    });
});

let datosUsuario = {
    nombre:"",
    apellidos: "",
    email:"",
    direccion:"",
}

function crearTablaUsuarios(solicitud) {
    let fila = document.createElement('tr');

    let celdaNombre = document.createElement('td');
    celdaNombre.textContent = solicitud.nombre;

    let celdaApellidos = document.createElement('td');
    celdaApellidos.textContent = solicitud.apellidos;

    let celdaEmail = document.createElement('td');
    celdaEmail.textContent = solicitud.email;

    let celdaDireccion

    let celdaBoton = document.createElement("td");
    let botonHojaUsuario = document.createElement("button");

    celdaBoton.appendChild(botonHojaUsuario);


    fila.append(celdaNombre, celdaApellidos, celdaEmail, celdaBoton);
}
function quitarDisable(elemento) {

    var inputSelect = elemento.previousElementSibling;
    if (inputSelect && (inputSelect.tagName === "INPUT" || inputSelect.tagName === "SELECT")) {
        inputSelect.removeAttribute("disabled");
    }
}