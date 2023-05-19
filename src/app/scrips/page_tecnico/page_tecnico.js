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
    
    let secActiva = secCitas;

    botonCitas.addEventListener("click", () => {
        secActiva.style.display = "none";
        secActiva = secCitas;
        secActiva.style.display = "block";
    })

    botonOpiniones.addEventListener("click", () => {
        secActiva.style.display = "none";
        secActiva = secOpiniones;
        secActiva.style.display = "block";
    })

    botonAdminHuertos.addEventListener("click", () =>{
        secActiva.style.display = "none";
        secActiva = secAdminHuertos;
        secActiva.style.display = "block";
    })

    botonVerFicha.addEventListener("click", () => {
        secActiva.style.display = "none";
        secActiva = secFicha;
        secActiva.style.display = "block";
    })
    
    botonVerHuerto.addEventListener("click", () => {
        secActiva.style.display = "none";
        secActiva = secHuerto;
        secActiva.style.display = "block";
    })

    botonAñadir.addEventListener("click", () => {
        secActiva.style.display = "none";
        secActiva = secAñadir;
        secActiva.style.display = "block";
    })

    const botonGuardar = document.getElementById("boton-guardar");

    botonGuardar.addEventListener("click", () => {
        secActiva.style.display = "none";
        secActiva = secAdminHuertos;
        secActiva.style.display = "block";
    })

    const botonVolver = document.getElementById("boton-volver-atras");
    
    botonVolver.addEventListener("click", () => {
        secActiva.style.display = "none";
        secActiva = secCitas;
        secActiva.style.display = "block";
    })

    const botonGuardar2 = document.getElementById("boton-guardar2");

    botonGuardar2.addEventListener("click", () => {
        secActiva.style.display = "none";
        secActiva = secAdminHuertos;
        secActiva.style.display = "block";
    })
})