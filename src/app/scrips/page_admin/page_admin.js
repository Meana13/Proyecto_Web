document.addEventListener('DOMContentLoaded', function () {
    const botonAdminUsuarios = document.getElementById("boton-administrar-usuarios");
    const secAdminUsuarios = document.getElementById("seccion-administrar-usuarios");

    const botonOpinion = document.getElementById("boton-opinion-del-personal");
    const secOpinion = document.getElementById("seccion-opinion-personal");


    let botonActivo = botonAdminUsuarios;
    let secActiva = secAdminUsuarios;
    botonAdminUsuarios.style.backgroundColor = "#790050";

    botonAdminUsuarios.addEventListener("click", () => {
        secActiva.style.display = "none";
        botonActivo.style.backgroundColor = "";
        secAdminUsuarios.style.display = "block";
        botonAdminUsuarios.style.backgroundColor = "#790050";
        botonActivo = botonAdminUsuarios;
        secActiva = secAdminUsuarios;
    });

    botonOpinion.addEventListener("click", () => {
        secActiva.style.display = "none";
        botonActivo.style.backgroundColor = "";
        secOpinion.style.display = "block";
        botonOpinion.style.backgroundColor = "#790050";
        botonActivo = botonOpinion;1
        secActiva = secOpinion;
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

    const desplegableTecnicos = document.getElementById("desplegable-tecnicos");
    //var tecnicoActual = desplegableTecnicos.AYUDAAAAAAAAAAAAAAAAAaaaa;
    const opinion1 = document.getElementById("opinion1");
    const opinion2 = document.getElementById("opinion2");
    const opinion3 = document.getElementById("opinion3");
    const opinion4 = document.getElementById("opinion4");
    const opinion5 = document.getElementById("opinion5");
    const opinion6 = document.getElementById("opinion6");
    const opinion7 = document.getElementById("opinion7");
    const opinion8 = document.getElementById("opinion8");
    const opinion9 = document.getElementById("opinion9");
    const opinion10 = document.getElementById("opinion10");
    const opinion11 = document.getElementById("opinion11");
    const opinion12 = document.getElementById("opinion12");

    var opinionActiva1 = opinion1;
    var opinionActiva2 = opinion5;
    var opinionActiva3 = opinion9;


    if (tecnicoActual == "tecnico1") {
        opinionActiva1.style.display = "none";
        opinionActiva2.style.display = "none";
        opinionActiva3.style.display = "none";
        opinionActiva1 = opinion1;
        opinionActiva2 = opinion5;
        opinionActiva3 = opinion9
        opinionActiva1.style.display = "flow";
        opinionActiva2.style.display = "flow";
        opinionActiva3.style.display = "flow";
    }

    if (tecnicoActual == "tecnico2") {
        opinionActiva1.style.display = "none";
        opinionActiva2.style.display = "none";
        opinionActiva3.style.display = "none";
        opinionActiva1 = opinion2;
        opinionActiva2 = opinion6;
        opinionActiva3 = opinion10;
        opinionActiva1.style.display = "flow";
        opinionActiva2.style.display = "flow";
        opinionActiva3.style.display = "flow";
    }

    if (tecnicoActual == "tecnico3") {
        opinionActiva1.style.display = "none";
        opinionActiva2.style.display = "none";
        opinionActiva3.style.display = "none";
        opinionActiva1 = opinion3;
        opinionActiva2 = opinion7;
        opinionActiva3 = opinion11;
        opinionActiva1.style.display = "flow";
        opinionActiva2.style.display = "flow";
        opinionActiva3.style.display = "flow";
    }

    if (tecnicoActual == "tecnico4") {
        opinionActiva1.style.display = "none";
        opinionActiva2.style.display = "none";
        opinionActiva3.style.display = "none";
        opinionActiva1 = opinion4;
        opinionActiva2 = opinion8;
        opinionActiva3 = opinion12;
        opinionActiva1.style.display = "flow";
        opinionActiva2.style.display = "flow";
        opinionActiva3.style.display = "flow";
    }
});