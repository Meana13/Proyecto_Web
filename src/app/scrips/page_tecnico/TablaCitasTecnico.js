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

async function getUsuarios(npag,limite){
    const respuesta=await fetch(url + '?cantidad='
        + limite + '&pagina=' +npag);
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
async function getUsuariosFiltrados(npag,limite,filtro){
    console.log("Llega al get filtrados");
    const respuesta=await fetch(url + '?cantidad='
        + limite + '&pagina=' +npag+'&filtro='+filtro);
    if (respuesta.ok){
        const DatosUsuario = await respuesta.json();
        console.log(DatosUsuario);
        return DatosUsuario;
    }
}

/**
 * Recibe la pagina seleccionada en el paginador
 */
async function conseguirPagina(){
    let paginador= document.getElementById('paginadorCitasTecnico');
    let pagina=paginador.value;
    console.log(pagina);
    return pagina;
};

/**
 *Genera tablas basadas en tres parametros:paginador,limite de usuario por pagina ;
 */
async function generarTablas() {
    let pag= 1;
    const datos = await getUsuarios(pag,limite);
    console.log("Ha recibido los datos")
    let tabla = document.getElementById("body-citas-tecnico");
    tabla.innerHTML = "";
    datos.forEach((usuario) => {
        tabla.innerHTML += `<tr>
            <td>${usuario.nombre}</td>
            <td>${usuario.fechas}</td>
            <td><button id="boton-ver-cita">Ver ficha</button></td>
        </tr>`;
    });
}

/**
 *Filtra la tabla y la muestra
 */
async function generarTablasFiltrada() {
    let filtro= document.getElementById("buscadorCitasTecnico")
    let pag= await conseguirPagina();
    const datos = await getUsuariosFiltrados(pag,limite,filtro);
    console.log(datos);
    let tabla = document.getElementById("body-citas-tecnico");
    tabla.innerHTML = "";
    datos.forEach((usuario) => {
        tabla.innerHTML += `<tr>
            <td>${usuario.nombre}</td>
            <td>${usuario.fechas}</td>
            <td><button id="boton-ver-cita">Ver ficha</button></td>
            </td>
        </tr>`;
    });
}
window.addEventListener("DOMContentLoaded", () => {
    generarTablas();
});