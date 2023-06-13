/**
 * URL a la que se hacen las peticiones
 */
const url= "../../../api/usuarios/";
/**
 * Variables vacias
 */
let datosusuario=[];
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
 * Filtra la lista de usuarios y la devuelve
 */
async function getUsuariosFiltrados(npag,limite,rol,filtro){
    console.log("Llega al get filtrados");
    const respuesta=await fetch(url + '?cantidad='
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
};

/**
 * Recibe la pagina seleccionada en el paginador
 */
    async function conseguirPagina(){
        let paginador= document.getElementById('paginadorAdmin');
        let pagina=paginador.value;
        console.log(pagina);
        return pagina;
};

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
            <td>${usuario.nombre}</td>
            <td>${usuario.apellidos}</td>
            <td>${usuario.email}</td>
            <td><button id="ver-hoja-usuario" onclick="Editar_usuario(${usuario.id_usuario})"><img src="../../../images/ver-perfil.svg" alt="Hoja de usuario"></button>
            </td>
        </tr>`;
    });
    }

/**
 *Filtra la tabla y la muestra
 */
async function generarTablasFiltrada() {
    let filtro= document.getElementById("buscador-admin")
    let rol= await conseguirRol();
    let pag= await conseguirPagina();
    const datos = await getUsuariosFiltrados(pag,limite,rol,filtro);
    console.log(datos);
    let tabla = document.getElementById("body-usuarios");
    tabla.innerHTML = "";
    datos.forEach((usuario) => {
        tabla.innerHTML += `<tr>
            <td>${usuario.nombre}</td>
            <td>${usuario.apellidos}</td>
            <td>${usuario.email}</td>
            <td><button id="ver-hoja-usuario"><img src="../../../images/ver-perfil.svg"
                                alt="Hoja de usuario"></button>
            </td>
        </tr>`;
    });
}
window.addEventListener("DOMContentLoaded", () => {
    generarTablas();
});