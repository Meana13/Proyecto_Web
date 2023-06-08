
    /**
     * URL a la que se hacen las peticiones
     */
    const url= '../../../api/ajustes/';
    var ajustesusuario=[];
    var ajusteshuertos=[];

    async function getAjustesUsuario(id){
        const respuesta= await fetch(url+ '?idUsuario='+ id_huerto );
        if(!respuesta.ok){
            return false;
        }
        ajustesusuario=await respuesta.json();
        return this.ajustesusuario;
    }
    async function getAjustesHuerto(id_usuario,id_huerto){
        const respuesta= await fetch(url + '?idUsuario='+ id_huerto );
        if(!respuesta.ok){
            return false;
        }
        ajusteshuertos=await respuesta.json();
        return ajusteshuertos;
    }
    async function enviarEditarUsuario(id_usuario){
// Obtén una referencia al formulario por su ID
        const formulario = document.getElementById('formulario-ajustes');
// Añade el event listener para el evento 'submit'
        formulario.addEventListener('submit', async function(event) {
            event.preventDefault();
        const formData = new FormData(event.target);
        const usuario = {
            usuario: formData.get('usuario'),
            nombre: formData.get('nombre'),
            apellidos: formData.get('apellidos'),
            email: formData.get('email'),
        };
            updateUsuario(usuario);
        });
    }
    //Funcion encargada de enviar los datos a la base de datos
    async function enviarEditarUsuario(id_usuario){
// Obtén una referencia al formulario por su ID
        const formulario = document.getElementById('formulario-huerto');
// Añade el event listener para el evento 'submit'
        formulario.addEventListener('submit', async function(event) {
            event.preventDefault();
            const formData = new FormData(event.target);
            const usuario = {
                usuario: formData.get('usuario'),
                nombre: formData.get('nombre'),
                apellidos: formData.get('apellidos'),
                email: formData.get('email'),
            };
            updateHuerto(usuario);
        });
    }
    //Sub-funcion complementaria de la funcion EnviarDatos
    async function updateUsuario(datos) {
        const respuesta = await fetch(url + datos.id, {
            method: 'put',
            body: JSON.stringify(datos)
        })
        return await respuesta.ok;
    }
    async function updateHuerto(datos) {
        const respuesta = await fetch(url + datos.id, {
            method: 'put',
            body: JSON.stringify(datos)
        })
        return await respuesta.ok;
    }