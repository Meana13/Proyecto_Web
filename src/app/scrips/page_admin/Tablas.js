/**
 * URL a la que se hacen las peticiones
 */
const url= "../../../api/usuarios/";
const urlUNICA= "../../../api/usuario/";
const urlPaginador= "../../../api/paginador/";
const urlfiltro= "../../../api/filtro/";

/**
 * Variables vacias
 */
let limite=15;

/**
 * Carga los datos del ajuste del usuario
 * @returns ajustesusuario
 */
async function getSesionUsuario(){
    const respuesta=await fetch("../../../api/sesion/");
    if (respuesta.ok){
        const DatosUsuario = await respuesta.json();
        console.log(DatosUsuario);
        return DatosUsuario;
    }
}

/**
 * Cargar Usuarios (limitados a 15 por página)
 */

async function getUsuarios(npag,limite,rol){
    const respuesta=await fetch(url + '?cantidad='
        + limite + '&pagina=' +npag+'&rol='+rol);
    if (respuesta.ok){
        console.log("Ha entrado en el if")
        const DatosUsuario = await respuesta.json();
        console.log(DatosUsuario)
        return DatosUsuario;
    }
}

/**
 * Cargar un Usuario
 */

async function getunUsuario(id){
    const respuesta=await fetch(urlUNICA + '?id='
        + id);
    if (respuesta.ok){
        console.log("Ha entrado en el if")
        const DatosUsuario = await respuesta.json();
        console.log(DatosUsuario)
        return DatosUsuario;
    }
}

/**
 * Filtra la lista de usuarios y la devuelve
 */
async function getUsuariosFiltrados(npag,limite,rol,filtro){
    console.log("Llega al get filtrados");
    const respuesta=await fetch(urlfiltro + '?cantidad='
        + limite + '&pagina=' +npag+'&rol='+rol +'&filtro='+filtro);
    if (respuesta.ok){
        const DatosUsuario = await respuesta.json();
        console.log(DatosUsuario);
        return DatosUsuario;
    }
}

/**
 *Recibe el rol seleccionado en el selector
 */
async function conseguirRol(){
    let selector= document.getElementById('selector_rol');
    let rol=selector.value;
    console.log(rol);
    return rol;
}

/**
 * Genera el paginador dependiendo de todos los usuarios
 */

    async function GenerarPaginador(){
    let rol =document.getElementById("selector_rol").value;
    let filtro=document.getElementById("buscador-admin");
    let paginas =await fetch(urlPaginador + '?cantidad='
            + limite + '&rol=?'+rol +'&filtro='+filtro);
    const paginador = document.getElementById('paginadorAdmin');
    for (let i = 1; i <= paginas; i++) {
        const opt = document.createElement('option');
        opt.value = i;
        opt.innerText = i;
        paginador.appendChild(opt);
    }
}

/**
 * Devuelve la pagina seleccionada en el Paginador
 */
    async function conseguirPagina(){
        GenerarPaginador();
        let paginador= document.getElementById('paginadorAdmin');
        let pagina=paginador.value;
        console.log(pagina);
        return pagina;
}
 async function Abrir_ventana(id){
    const datos=await getunUsuario(id)
    const seccionHojaUsuario = document.getElementById("seccion-hoja-usuario");
    const seccionTablas=document.getElementById("seccion-administrar-usuarios");
    seccionHojaUsuario.style.display = "block";
    seccionTablas.style.display="none";
    const Nombre = document.getElementById('nombre_hoja');
    const Apellidos = document.getElementById('apellidos_hoja');
    const Email = document.getElementById('email');
    const Direccion = document.getElementById('direccion_hoja');
    Nombre.value=datos[0].nombre;
    Apellidos.value=datos[0].apellidos;
    Email.value=datos[0].email;
    Direccion.value=datos[0].direccion;
}
/**
 *Genera tablas basadas en tres parametros:paginador,limite de usuario por pagina y rol;
 */
async function generarTablas() {
    let rol= await conseguirRol();
    let pag= 1;
    const datos = await getUsuarios(pag,limite,rol);
    console.log("Ha recibido los datos")
    let tabla = document.getElementById("body-usuarios");
    tabla.innerHTML = "";
    datos.forEach((usuario) => {
        tabla.innerHTML += `<tr>
             <td style="display: none">${usuario.id_cliente}</td>
            <td style="display: none">${usuario.id_usuario}</td>
            <td>${usuario.nombre}</td>
            <td>${usuario.apellidos}</td>
            <td>${usuario.email}</td>
            <td><button id="ver-hoja-usuario" onclick="Abrir_ventana(${usuario.id_usuario})"><img src="../../../images/ver-perfil.svg" alt="Boton ver perfil"
                                ></button>
            </td>
        </tr>`;
    });
    }

/**
 *Filtra la tabla y la muestra
 */
async function generarTablasFiltrada() {
    let filtro= document.getElementById("buscador-admin").value
    let rol= await conseguirRol();
    let pag= 0;
    console.log(filtro)
    if (filtro!="") {
        const datos = await getUsuariosFiltrados(pag, limite, rol, filtro);
        console.log(datos);
        let tabla = document.getElementById("body-usuarios");
        tabla.innerHTML = "";
        datos.forEach((usuario) => {
            tabla.innerHTML += `<tr>
            <td style="display: none">${usuario.id_cliente}</td>
            <td style="display: none">${usuario.id_usuario}</td>
            <td>${usuario.nombre}</td>
            <td>${usuario.apellidos}</td>
            <td>${usuario.email}</td>
            <td><button><img src="../../../images/ver-perfil.svg" alt="Boton ver perfil"
                                ></button>
            </td>
        </tr>`;
        });
    }else{
        generarTablas();
    }
}
window.addEventListener("DOMContentLoaded", () => {
    generarTablas();
});