document.addEventListener('DOMContentLoaded', function () {
    const botonAdminUsuarios = document.getElementById("boton-administrar-usuarios");
    const secAdminUsuarios = document.getElementById("seccion-administrar-usuarios");

    const botonOpinion = document.getElementById("boton-opinion-del-personal");
    const secOpinion = document.getElementById("seccion-opinion-personal");


    let botonActivo = botonAdminUsuarios;
    let secActiva = secAdminUsuarios;
    botonAdminUsuarios.style.backgroundColor = "#790050";

    botonAdminUsuarios.addEventListener("click", function () {
        if (botonActivo !== null && secActiva !== null) {
            secActiva.style.display = "none";
            botonActivo.style.backgroundColor = "";
        }
        secAdminUsuarios.style.display = "block";
        botonAdminUsuarios.style.backgroundColor = "#790050";
        botonActivo = botonAdminUsuarios;
        secActiva = secAdminUsuarios;
    });

    botonOpinion.addEventListener("click", function () {
        if (botonActivo !== null && secActiva !== null) {
            secActiva.style.display = "none";
            botonActivo.style.backgroundColor = "";
        }
        secOpinion.style.display = "block";
        botonOpinion.style.backgroundColor = "#790050";
        botonActivo = botonOpinion;
        secActiva = secOpinion;
    });

    const botonAñadir = document.getElementById("boton-añadir-usuario");
    const seccionAñadir = document.getElementById("seccion-añadir-usuario");

    botonAñadir.addEventListener('click', () => {
        if (botonActivo !== null && secActiva !== null) {
            secActiva.style.display = "none";
            botonActivo.style.backgroundColor = "";
        }
        seccionAñadir.style.display = "block";
        secActiva = seccionAñadir;
    });

    const botonGenerarId = document.getElementById("boton-generar-id");
    const cajaId = document.getElementById("caja-id");

    botonGenerarId.addEventListener("click", () => {
        const nuevoId = Math.floor(Math.random() * 1000000).toString().padStart(6, "0");
        cajaId.textContent = nuevoId;
    });
});