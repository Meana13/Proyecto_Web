/**
 * URL a la que se hacen las peticiones
 */
const url= "../../../api/usuarios/";
/**
 * Variables vacias
 */
let datosusuario=[];

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

async function getUsuarios(){
    const respuesta=await fetch("../../../api/usuarios/");
    if (respuesta.ok){
        const DatosUsuario = await respuesta.json();
        console.log(DatosUsuario);
        return DatosUsuario;
    }
}
async function generarTablas() {
    const datos = await getUsuarios();
    let tabla = document.getElementById("body-usuarios");
    tabla.innerHTML = "";
    datos.forEach((usuario) => {
        tabla.innerHTML += `<tr>
            <td>${usuario.nombre}</td>
            <td>${usuario.apellidos}</td>
            <td>${usuario.email}</td>
        </tr>`;
    });
    };
getSesionUsuario();
getUsuarios();
generarTablas();