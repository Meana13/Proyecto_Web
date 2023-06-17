//......................................................................................................................
/*                                       SECCIÓN AJUSTES USUARIO REGISTRADO                                           */
//......................................................................................................................
//......................................................................................................................
//......................................................................................................................
//DECLARACIÓN DE VARIABLES:
//Campos:
let nombreUsuarioEditable = document.getElementById('nombre');
let nombreUsuarioAjustes = document.getElementById('nombre-usuario-ajustes');
let apellidosUsuarioEditable = document.getElementById('apellidos');
let apellidosUsuario = document.getElementById('apellidos-usuario-ajustes');
let emailUsuarioEditable = document.getElementById('email');
let emailUsuario = document.getElementById('email-usuario-ajustes');
let passEditable = document.getElementById('password-ajustes');
let pass = document.getElementById('pass-usuario-ajustes');
let nombreUsuarioHeader = document.getElementById('nombreUsuarioRegistrado');
//Botones:
let botonEditarPerfil = document.getElementById('boton-editar-ajustes-perfil');
let botonAplicarCambiosPerfil = document.getElementById('aplicar_cambios-ajustes-perfil');
let botonCancelarPerfil = document.getElementById('boton-cancelar-ajustes-perfil');
let botonCambiarPass = document.getElementById('cambiar_pass');
//mensajes de error
let errorNombreVacio = document.getElementById('error-nombre-usuario-vacio');
let errorApellidosVacio = document.getElementById('error-apellidos-usuario-vacio');
let errorEmailVacio = document.getElementById('error-email-usuario-vacio');
let errorFormatoEmail = document.getElementById('error-formato-email');
//dialogo de mensaje de éxito
let dialogoMensajeExito = document.getElementById('dialogo_cambios_perfil');
let botonAceptarDialogoExito = document.getElementById('boton_aceptar-dialogo-exito-perfil');
//cambio de contraseña:
let dialogoCambiarPass = document.getElementById('dialogo-cambio-pass');
let campoAntiguaPass = document.getElementById('antigua_contrasenya');
let campoNuevaPass = document.getElementById('nueva_contrasenya');
let campoRepetirPass = document.getElementById('repetir_contrasenya');
let botonEnviarNuevaPass = document.getElementById('btn-enviar');
let botonCancelarNuevaPass = document.getElementById('btn-cancelar');
//......................................................................................................................
//......................................................................................................................
//.......................................................
/*
            getSesionUsuario() --> datos
                                            ____datos____
                                            id_usuario: N
                                            nombre: txt
                                            idRol: N
                                            rol: txt
                                            _____________
*/
//.......................................................
async function getSesionUsuario(){
    const respuesta = await fetch('../../../api/sesion/');
    if(respuesta.ok){
        const datos = await respuesta.json();
        return datos;
    }
}
//......................................................................................................................
//......................................................................................................................
//.......................................................
/*
            getDatosCliente() --> datos
                                            ____datos____
                                            id_usuario: N
                                            id_cliente: N
                                            nombre: txt
                                            apellidos: txt
                                            email: txt
                                            direccion: txt
                                            _____________
*/
//.......................................................
async function getDatosCliente(){
    let datosSesion = await getSesionUsuario();
    let idUsuario = datosSesion.id_usuario;

    const respuesta = await fetch('../../../api/clientes/' + '?idUsuario=' + idUsuario);
    if(respuesta.ok){
        const datos = await respuesta.json();
        return datos;
    }
}
//......................................................................................................................
//......................................................................................................................
//.......................................................
/*
            getDatosUsuario() --> datos
                                            ____datos____
                                            id_usuario: N
                                            rol: N
                                            nombre: txt
                                            password: txt
                                            _____________
*/
//.......................................................
async function getDatosUsuario(){
    let datosSesion = await getSesionUsuario();
    let idUsuario = datosSesion.id_usuario;

    const respuesta = await fetch('../../../api/usuario/' + '?idUsuario=' + idUsuario);
    if(respuesta.ok){
        const datos = await respuesta.json();
        return datos;
    }
}

//......................................................................................................................
//......................................................................................................................
//.......................................................
/*
                    escribirDatos()
*/
//.......................................................

async function escribirDatos(){
    let datosCliente = await getDatosCliente();
    let datosUsuario = await getDatosUsuario();
    //nombreusuario del header, para que se cambie sin tener que recargar la página:
    nombreUsuarioHeader.innerText = "";
    nombreUsuarioHeader.innerText = datosUsuario[0].nombre;
    //nombre:
    nombreUsuarioAjustes.innerText = "";
    nombreUsuarioAjustes.innerText = datosCliente[0].nombre;
    nombreUsuarioEditable.style.display = "none";
    nombreUsuarioAjustes.style.display = "block";
    //apellidos:
    apellidosUsuario.innerText = "";
    apellidosUsuario.innerText = datosCliente[0].apellidos;
    apellidosUsuarioEditable.style.display = "none";
    apellidosUsuario.style.display = "block";
    //e-mail:
    emailUsuario.innerText = "";
    emailUsuario.innerText = datosCliente[0].email;
    emailUsuarioEditable.style.display = "none";
    emailUsuario.style.display = "block";

    //contraseña, la mostramos oculta:
    let textoOculto = textoParaOcultar(datosUsuario[0].password);

    pass.innerText = "";
    pass.innerText = textoOculto;
    passEditable.style.display = "none";
    pass.style.display = "block";
}
//......................................................................................................................
//......................................................................................................................
//.......................................................
/*
    palabra: txt -->  textoParaOcultar() --> txt

Para construir una cadena de "*" según el length de una palabra
*/
//.......................................................
function textoParaOcultar(palabra) {
    var cadena = "";

    for (var i = 0; i < palabra.length; i++) {
        cadena += "*";
    }

    return cadena;
}
//......................................................................................................................
//......................................................................................................................
//.......................................................
/*
                       BOTON DE EDITAR
*/
//.......................................................
botonEditarPerfil.addEventListener('click', function(){
    //ocultamos los campos fijos y mostramos los campos editables:
    nombreUsuarioAjustes.style.display = "none";
    nombreUsuarioEditable.style.display = "block";

    apellidosUsuario.style.display = "none";
    apellidosUsuarioEditable.style.display = "block";

    emailUsuario.style.display = "none";
    emailUsuarioEditable.style.display = "block";
    //mostramos los botones de cancelar y aplicar cambios y ocultamos el de editar.
    botonCancelarPerfil.style.display = "block";
    botonAplicarCambiosPerfil.style.display = "block";
    botonEditarPerfil.style.display = "none";

    //Asignamos el valor antiguo al input de texto que el usuario puede editar,
    // por si no lo edita, que se quede el valor original:
    nombreUsuarioEditable.value = nombreUsuarioAjustes.textContent;
    apellidosUsuarioEditable.value = apellidosUsuario.textContent;
    emailUsuarioEditable.value = emailUsuario.textContent;

    //llamamo a detectarErrores para no poder enviar la información si hay algún error:
    nombreUsuarioEditable.addEventListener('input', detectarErrores);
    apellidosUsuarioEditable.addEventListener('input', detectarErrores);
    emailUsuarioEditable.addEventListener('input', detectarErrores);
});
//......................................................................................................................
//......................................................................................................................
//.......................................................
/*
                  detectarErrores() --> VoF

que detecte error si algún campo está vacío o no cumple con el formato del campo:
*/
//.......................................................
function detectarErrores(){

    const formatoValidoEmail = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(emailUsuarioEditable.value);

    //para mostrar los mensajes de error:
    //nombre:
    if(nombreUsuarioEditable.value.length === 0){
        errorNombreVacio.style.display = "block";
    }
    else{
        errorNombreVacio.style.display = "none";
    }
    //apellidos:
    if(apellidosUsuarioEditable.value.length === 0){
        errorApellidosVacio.style.display = "block";
    }
    else{
        errorApellidosVacio.style.display = "none";
    }
    //e-mail:
    if(emailUsuarioEditable.value.length === 0){
        errorEmailVacio.style.display = "block";
    }
    else{
        errorEmailVacio.style.display = "none";
    }

    if(!formatoValidoEmail){
        errorFormatoEmail.style.display = "block";
    }
    else{
        errorFormatoEmail.style.display = "none";
    }

    //para deshabilitar el botón de aplicar cambios:
    if(
        nombreUsuarioEditable.value.length === 0 ||
        apellidosUsuarioEditable.value.length === 0 ||
        emailUsuarioEditable.value.length === 0 ||
        !formatoValidoEmail
    ){
        botonAplicarCambiosPerfil.disabled = true;
        return true;
    }
    else if(
        nombreUsuarioEditable.value.length > 0 &&
        apellidosUsuarioEditable.value.length > 0 &&
        emailUsuarioEditable.value.length > 0 &&
        formatoValidoEmail
    ){
        botonAplicarCambiosPerfil.disabled = false;
        return false;
    }
}
//......................................................................................................................
//......................................................................................................................
//.......................................................
/*
               BOTON DE APLICAR CAMBIOS
*/
//.......................................................
botonAplicarCambiosPerfil.addEventListener('click', async function(){
    //mostramos los campos fijos y ocultamos los campos editables:
    nombreUsuarioAjustes.style.display = "block";
    nombreUsuarioEditable.style.display = "none";

    apellidosUsuario.style.display = "block";
    apellidosUsuarioEditable.style.display = "none";

    emailUsuario.style.display = "block";
    emailUsuarioEditable.style.display = "none";
    //ocultamos los botones de cancelar y aplicar cambios y mostramos el de editar.
    botonCancelarPerfil.style.display = "none";
    botonAplicarCambiosPerfil.style.display = "none";
    botonEditarPerfil.style.display = "block";

    //Si podemos pulsar el botón de validar, es que no hay ningún error, por tanto,
    //podemos hacer el fetch al servidor:
    let datosCliente = await getDatosCliente();
    let datosUsuario = await getDatosUsuario();
    let idCliente = datosCliente[0].id_cliente;
    let idUsuario = datosUsuario[0].id_usuario;

    let datosACliente = {
        nombre: nombreUsuarioEditable.value,
        apellidos: apellidosUsuarioEditable.value,
        email: emailUsuarioEditable.value
    }

    await fetch('../../../api/clientes/' + idCliente, {
        method: 'put',
        body: JSON.stringify(datosACliente)
    });

    let datosAUsuario = {
        nombre: nombreUsuarioEditable.value + " " + apellidosUsuarioEditable.value
    }

    await fetch('../../../api/usuario/' + idUsuario, {
        method: 'put',
        body: JSON.stringify(datosAUsuario)
    });

    //se muestra el mensaje de éxito y se rellenan los campos con los datos nuevos:
    dialogoMensajeExito.showModal();
    await escribirDatos();

});
//......................................................................................................................
//......................................................................................................................
//.......................................................
/*
         BOTON DE ACEPTAR DIÁLOGO MENSAJE
*/
//.......................................................
botonAceptarDialogoExito.addEventListener('click', async function() {
    dialogoMensajeExito.close();
});
//......................................................................................................................
//......................................................................................................................
//.......................................................
/*
               BOTON DE CANCELAR
*/
//.......................................................
botonCancelarPerfil.addEventListener('click', function(){
    //mostramos los campos fijos y ocultamos los campos editables:
    nombreUsuarioAjustes.style.display = "block";
    nombreUsuarioEditable.style.display = "none";

    apellidosUsuario.style.display = "block";
    apellidosUsuarioEditable.style.display = "none";

    emailUsuario.style.display = "block";
    emailUsuarioEditable.style.display = "none";
    //ocultamos los botones de cancelar y aplicar cambios y mostramos el de editar.
    botonCancelarPerfil.style.display = "none";
    botonAplicarCambiosPerfil.style.display = "none";
    botonEditarPerfil.style.display = "block";
    //ocultamos todos los mensajes de error:
    errorNombreVacio.style.display = "none";
    errorApellidosVacio.style.display = "none";
    errorEmailVacio.style.display = "none";
    errorFormatoEmail.style.display = "none";
});
//......................................................................................................................
//......................................................................................................................
//.......................................................
/*
               BOTÓN CAMBIAR CONTRASEÑA
*/
//.......................................................
botonCambiarPass.addEventListener('click', async function(){
    dialogoCambiarPass.showModal();
    //para que no deje validar si los campos están en blanco:
    validarCamposPass();
    campoAntiguaPass.addEventListener('input', validarCamposPass);
    campoNuevaPass.addEventListener('input', validarCamposPass);
    campoRepetirPass.addEventListener('input', validarCamposPass);
})
//......................................................................................................................
//......................................................................................................................
//.......................................................
/*
               BOTÓN CANCELAR CAMBIO CONTRASEÑA
*/
//.......................................................
botonCancelarNuevaPass.addEventListener('click', function(){
   dialogoCambiarPass.close();
   campoAntiguaPass.value="";
   campoNuevaPass.value = "";
   campoRepetirPass.value = "";
});
//......................................................................................................................
//......................................................................................................................
//.......................................................
/*
               BOTÓN VALIDAR CAMBIO CONTRASEÑA
*/
//.......................................................
botonEnviarNuevaPass.addEventListener('click', async function(){
    let datosUsuario = await getDatosUsuario();
    let idUsuario = datosUsuario[0].id_usuario

    let datos = {
        password : campoNuevaPass.value
    }

    await fetch('../../../api/usuario/' + idUsuario, {
        method: 'put',
        body: JSON.stringify(datos)
    });

    dialogoMensajeExito.showModal();
    dialogoCambiarPass.close();
    campoAntiguaPass.value="";
    campoNuevaPass.value = "";
    campoRepetirPass.value = "";
})
//......................................................................................................................
//......................................................................................................................
//.......................................................
/*
               validarCamposPass()
*/
//.......................................................
async function validarCamposPass(){
    let datos = await getDatosUsuario();
    let passAntigua = datos[0].password;
    //El campo de contraseña antigua ha de coincidir con la contraseña de la sesión actual.
    //El campo de nueva contraseña y el de repetir contraseña han de coincidir.
    //La constraseña nueva ha de tener 6 caracteres o más.
    if(
        campoAntiguaPass.value === passAntigua &&
        campoNuevaPass.value === campoRepetirPass.value &&
        campoNuevaPass.value.length > 5 &&
        campoRepetirPass.value.length > 5
    ){
        botonEnviarNuevaPass.disabled = false;
    }
    else if (
        campoAntiguaPass.value !== passAntigua ||
        campoNuevaPass.value !== campoRepetirPass.value ||
        campoNuevaPass.value.length <=5  ||
        campoRepetirPass.value.length <= 5
    ){
        botonEnviarNuevaPass.disabled = true;
    }
}
//......................................................................................................................
//......................................................................................................................
//LLAMADAS DE FUNCIONES:
escribirDatos();
