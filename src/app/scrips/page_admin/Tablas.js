/**
 * URL a la que se hacen las peticiones
 */
const url= "../../../api/usuarios/";
const urlPaginador= "../../../api/paginador/";
const urlfiltro= "../../../api/filtro/";
const urlClientes= "../../../api/cliente/";

/**
 * Variables vacias
 */
let limite=15;

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
    const respuesta=await fetch(urlClientes + '?id='
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

/**
 * Recibe el id del usuario y muestra los datos de su perfil
 */
 async function Abrir_ventana(id){
    /////Seccion para mostrar la zona y ocultar el resto
    const datos=await getunUsuario(id)
    const seccionHojaUsuario = document.getElementById("seccion-hoja-usuario");
    const seccionTablas=document.getElementById("seccion-administrar-usuarios");
    seccionHojaUsuario.style.display = "block";
    seccionTablas.style.display="none";
    ////////////////////////////////////
    //////////Seccion para mostrar los datos del usuario
    const Nombre = document.getElementById('nombre_hoja');
    const Apellidos = document.getElementById('apellidos_hoja');
    const Email = document.getElementById('email');
    const Direccion = document.getElementById('direccion_hoja');
    const ID=document.getElementById('id_usuario');
    Nombre.value=datos[0].nombre;
    Apellidos.value=datos[0].apellidos;
    Email.value=datos[0].email;
    Direccion.value=datos[0].direccion;
    ID.value=id;
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
    if (filtro!=="") {
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
            <td><button id="ver-hoja-usuario" onclick="Abrir_ventana(${usuario.id_usuario})"><img src="../../../images/ver-perfil.svg" alt="Boton ver perfil"
                                ></button>
        </tr>`;
        });
    }else{
        generarTablas();
    }
}
////////////////////////////////////////////
/**
 *Consigue la informacion de un cliente
 */
async function getunCliente(id_cliente){
    const respuesta=await fetch(urlClientes + '?id='
        + id);
    if (respuesta.ok){
        const DatosUsuario = await respuesta.json();
        console.log(DatosUsuario)
        return DatosUsuario;
    }
}
/**
 *Añade un usuario a la base de datos
 */
async function Anyadir_usuario_manual(){
    //TODO Abre la ventana de añadir usuario y tras poner los datos crea un usuario
    // Obtener los valores de los campos del formulario
    event.preventDefault();
    var tipoUsuario = document.getElementById("tipo-usuario").value;
    var nombre = document.getElementById("nombre").value;
    var apellidos = document.getElementById("apellidos").value;
    var email = document.getElementById("e-mail").value;
    var direccion = document.getElementById("direccion").value;
    var contrasenya=document.getElementById("contrasenya").value;
    const datos= {
        usuario: nombre +""+ apellidos,
        rol:tipoUsuario,
        nombre:nombre,
        apellidos:apellidos,
        email:email,
        direccion:direccion,
        clave:contrasenya
    };
    console.log(datos)
    const respuesta = await fetch(urlClientes, {
        method: 'post',
        body: JSON.stringify(datos)
    })
    console.log(datos)
    return await respuesta.ok;

}

/**
 *Quita los disable de los campos
 */
async function Permitir_editar() {
    const Nombre = document.getElementById('nombre_hoja');
    const Apellidos = document.getElementById('apellidos_hoja');
    const Email = document.getElementById('email');
    const Direccion = document.getElementById('direccion_hoja');
    Nombre.disabled = false;
    Apellidos.disabled = false;
    Email.disabled = false;
    Direccion.disabled = false;
}

async function Borrar_usuario(id_usuario){
    //TODO Abre la ventana de editar usuario y al pulsar el boton de eliminar lo elimina de la base de datos
    const respuesta = await fetch(urlClientes + id_usuario, {
        method: 'delete',
    })
    return await respuesta.ok;

}

/**
 *Envia los datos actualiazados a la base de datos
 */
async function Editar_usuario(){
    //TODO:AL pulsar el boton de guardar cambios actualiza la base de datos
    event.preventDefault();
    const nombre = document.getElementById('nombre_hoja').value;
    const id = document.getElementById('id_usuario').value;
    const apellidos = document.getElementById('apellidos_hoja').value;
    const email = document.getElementById('email').value;
    const direccion = document.getElementById('direccion_hoja').value;
    const usuario = {
        id:id,
        nombre:nombre,
        apellidos:apellidos,
        email:email,
        direccion:direccion
    };
    console.log(usuario);
    const respuesta = await fetch(urlClientes, {
        method: 'put',
        body: JSON.stringify(usuario)
    })
    if(respuesta.ok){
        alert("Se ha realizado el cambio")
    }
};
//////////////////////////////////////////
/**
 * Las funciones que se ejecutan nada mas comenzar
 */
window.addEventListener("DOMContentLoaded", () => {
    generarTablas();
});