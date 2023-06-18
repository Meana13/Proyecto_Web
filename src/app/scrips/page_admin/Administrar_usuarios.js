

const url= "../../../api/cliente/";


async function getunCliente(id_cliente){
    const respuesta=await fetch(url + '?id='
        + id);
    if (respuesta.ok){
        const DatosUsuario = await respuesta.json();
        console.log(DatosUsuario)
        return DatosUsuario;
    }
}

async function Anyadir_usuario_manual(){
    //TODO Abre la ventana de añadir usuario y tras poner los datos crea un usuario
    // Obtener los valores de los campos del formulario
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
    const respuesta = await fetch(url, {
        method: 'post',
        body: JSON.stringify(datos)
    })
    return await respuesta.ok;

}
async function Permitir_editar() {
    const Nombre = document.getElementById('nombre_hoja');
    const Apellidos = document.getElementById('apellidos_hoja');
    const Email = document.getElementById('email');
    const Direccion = document.getElementById('direccion_hoja');
    const Usuario= document.getElementById('usuario');
    Usuario.disabled=false;
    Nombre.disabled = false;
    Apellidos.disabled = false;
    Email.disabled = false;
    Direccion.disabled = false;
}

async function Anyadir_usuario_de_la_tabla(id_cliente){
    //TODO Al pulsar el boton de aceptar añade automaticamente al cliente como usuario;
    const datos=await getunCliente(id)
}
async function Borrar_usuario(id_usuario){
    //TODO Abre la ventana de editar usuario y al pulsar el boton de eliminar lo elimina de la base de datos
    const respuesta = await fetch(url + id_usuario, {
        method: 'delete',
    })
    return await respuesta.ok;

}
async function Editar_usuario(){
    //TODO pulsar el boton de guardar cambios actualiza la base de datos
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
   const respuesta = await fetch(url, {
        method: 'put',
        body: JSON.stringify(usuario)
    })
    return await respuesta.ok;
};