

url="../../../api/usuarios/";
async function Conseguir_usuario(id_usuario){
    //TODO:A partir del usuario devuelve los datos del usuario para editarlos
    const datos = await fetch(url + id_usuario)
    return(datos);
};
async function Anyadir_usuario_manual(){
    //TODO Abre la ventana de añadir usuario y tras poner los datos crea un usuario

}
async function Anyadir_usuario_de_la_tabla(){
    //TODO Al pulsar el boton de aceptar añade automaticamente al cliente como usuario;
}
async function Borrar_usuario(id_usuario){
    //TODO Abre la ventana de editar usuario y al pulsar el boton de eliminar lo elimina de la base de datos
    const respuesta = await fetch(url + id_usuario, {
        method: 'delete',
    })
    return await respuesta.ok;

}
async function Editar_usuario(event){
    //TODO Abre la ventana de editar usuario y al pulsar el boton de guardar cambios actualiza la base de datos
    event.preventDefault();
    const nombre = document.getElementById('nombre').value;
    const nombreUsuario = document.getElementById('usuario').value;
    const apellidos = document.getElementById('apellidos').value;
    const email = document.getElementById('email').value;
    const direccion = document.getElementById('direccion').value;
    const usuario = {
        nombre:nombre,
        usuario: nombreUsuario,
        apellidos:apellidos,
        email:email,
        direccion:direccion
    };
    console.log(usuario);
   const respuesta = await fetch(url + usuario.id, {
        method: 'put',
        body: JSON.stringify(datos)
    })
    return await respuesta.ok;
};