document.addEventListener('DOMContentLoaded', function () {
    const botonCitas = document.getElementById("boton-citas");
    const secCitas = document.getElementById("seccion-citas");

    const botonOpiniones = document.getElementById("boton-opiniones");
    const secOpiniones = document.getElementById("seccion-opiniones");

    const botonAdminHuertos = document.getElementById("boton-administrar-huertos");
    const secAdminHuertos = document.getElementById("seccion-administrar-huertos");

    const botonVerFicha = document.getElementById("boton-ver-cita");
    const secFicha = document.getElementById("seccion-hoja-cita");

    const botonVerHuerto = document.getElementById("boton-ver-huerto");
    const secHuerto = document.getElementById("seccion-ver-huerto");

    const botonAñadir = document.getElementById("boton-añadir-huerto");
    const secAñadir = document.getElementById("seccion-añadir-huerto");

    let botonActivo = botonCitas;
    let secActiva = secCitas;

    botonCitas.addEventListener("click", () => {
        secActiva.style.display = "none";
        botonActivo.style.backgroundColor = "";
        secActiva = secCitas;
        secActiva.style.display = "block";
        botonActivo = botonCitas;
        botonActivo.style.backgroundColor = "#790050";
    })

    botonOpiniones.addEventListener("click", () => {
        secActiva.style.display = "none";
        botonActivo.style.backgroundColor = "";
        secActiva = secOpiniones;
        secActiva.style.display = "block";
        botonActivo = botonOpiniones;
        botonActivo.style.backgroundColor = "#790050";
    })

    botonAdminHuertos.addEventListener("click", () =>{
        secActiva.style.display = "none";
        botonActivo.style.backgroundColor = "";
        secActiva = secAdminHuertos;
        secActiva.style.display = "block";
        botonActivo = botonAdminHuertos;
        botonActivo.style.backgroundColor = "#790050";
    })

    botonVerFicha.addEventListener("click", () => {
        secActiva.style.display = "none";
        botonActivo.style.backgroundColor = "";
        secActiva = secFicha;
        secActiva.style.display = "block";
        botonActivo = botonVerFicha;
        botonActivo.style.backgroundColor = "#790050";
    })
    
    botonVerHuerto.addEventListener("click", () => {
        secActiva.style.display = "none";
        botonActivo.style.backgroundColor = "";
        secActiva = secHuerto;
        secActiva.style.display = "block";
        botonActivo = botonVerHuerto;
        botonActivo.style.backgroundColor = "#790050";
    })

    botonAñadir.addEventListener("click", () => {
        secActiva.style.display = "none";
        botonActivo.style.backgroundColor = "";
        secActiva = secAñadir;
        secActiva.style.display = "block";
        botonActivo = botonAñadir;
        botonActivo.style.backgroundColor = "#790050";
    })

    const botonGuardar = document.getElementById("boton-guardar");

    botonGuardar.addEventListener("click", () => {
        secActiva.style.display = "none";
        botonActivo.style.backgroundColor = "";
        secActiva = secAdminHuertos;
        secActiva.style.display = "block";
        botonActivo = botonAdminHuertos;
        botonActivo.style.backgroundColor = "#790050";
    })

    const botonVolver = document.getElementById("boton-volver-atras");
    
    botonVolver.addEventListener("click", () => {
        secActiva.style.display = "none";
        botonActivo.style.backgroundColor = "";
        secActiva = secCitas;
        secActiva.style.display = "block";
        botonActivo = botonCitas;
        botonActivo.style.backgroundColor = "#790050";
    })

    const botonGuardar2 = document.getElementById("boton-guardar2");

    botonGuardar2.addEventListener("click", () => {
        secActiva.style.display = "none";
        botonActivo.style.backgroundColor = "";
        secActiva = secAdminHuertos;
        secActiva.style.display = "block";
        botonActivo = botonAdminHuertos;
        botonActivo.style.backgroundColor = "#790050";
    })
})