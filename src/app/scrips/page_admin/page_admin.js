/**
 *Consigue los datos del usuario que ha hecho sesion
 */
async function getSesionUsuario(){
    const respuesta = await fetch('../../../api/sesion/');
    if(respuesta.ok){
        const datos = await respuesta.json();
        return datos;
    }
}

/**
 *Cambia el nombre del usuario arriba
 */
async function cambiarNombre(){
    const nombre=await getSesionUsuario();
    const label=document.getElementById("Nombre_usuario");
    console.log(nombre)
    label.textContent=nombre.nombre;

}
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
        /////////////////////////////

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

window.addEventListener("DOMContentLoaded", () => {
    cambiarNombre();
});