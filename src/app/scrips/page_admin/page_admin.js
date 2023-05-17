document.addEventListener('DOMContentLoaded', function () {
    const botonAdminUsuarios = document.getElementById("boton-administrar-usuarios");
    const secAdminUsuarios = document.getElementById("seccion-administrar-usuarios");


    let botonActivo = botonAdminUsuarios;
    let secActiva = secAdminUsuarios;

    botonAdminUsuarios.addEventListener("click", () => {
        secActiva.style.display = "none";
        botonActivo.style.backgroundColor = "";
        secAdminUsuarios.style.display = "block";
        botonActivo = botonAdminUsuarios;
        secActiva = secAdminUsuarios;
    });

    const botonAñadir = document.getElementById("boton-añadir-usuario");
    const seccionAñadir = document.getElementById("seccion-añadir-usuario");

    botonAñadir.addEventListener('click', () => {
        secActiva.style.display = "none";
        botonActivo.style.backgroundColor = "";
        seccionAñadir.style.display = "block";
        secActiva = seccionAñadir;
    });

    const botonGenerarId = document.getElementById("boton-generar-id");
    const cajaId = document.getElementById("caja-id");

    botonGenerarId.addEventListener("click", () => {
        const nuevoId = Math.floor(Math.random() * 1000000).toString().padStart(6, "0");
        cajaId.textContent = nuevoId;
    });

    const botonHojaUsuario = document.getElementById("ver-hoja-usuario");
    const seccionHojaUsuario = document.getElementById("seccion-hoja-usuario");

    botonHojaUsuario.addEventListener("click", () => {
        secActiva.style.display = "none";
        botonActivo.style.backgroundColor = "";
        seccionHojaUsuario.style.display = "block";
        secActiva = seccionHojaUsuario;
    })

    const botonGuardarCambios = document.getElementById("boton-guardar-cambios");
    const botonCancelar = document.getElementById("boton-cancelar");

    botonCancelar.addEventListener("click", () => {
        secActiva.style.display = "none";
        botonActivo.style.backgroundColor = "";
        secAdminUsuarios.style.display = "block";
        botonAdminUsuarios.style.backgroundColor = "#790050";
        botonActivo = botonAdminUsuarios;
        secActiva = secAdminUsuarios;
    })
});