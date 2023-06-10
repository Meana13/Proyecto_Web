
    /**
     * URL a la que se hacen las peticiones
     */
    const url= '../../../api/ajustes/';
    /**
     * Variables vacias
     */
    var ajustesusuario=[];
    var ajusteshuertos=[];

    /**
     * Carga los datos del ajuste del usuario
     * @param id
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
    async function getHuertosUsuario(){
        let datosDeUsuario = await getSesionUsuario();
        let idUsuario = datosDeUsuario.id_usuario;

        const respuesta = await fetch('../../../api/huertos/' + '?idUsuario=' + idUsuario);
        if(respuesta.ok) {
            const datos = await respuesta.json();
            console.log(datos);
            return datos;
        }
    }
    async function getAjustesUsuario(){
        const respuesta= await fetch(url+ '?idUsuario='+ id_huerto );
        if(!respuesta.ok){
            return false;
        }
        ajustesusuario=await respuesta.json();
        return ajustesusuario;
    }

    /**
     * Carga los datos del huerto del usuario
     * @param id_usuario
     * @param id_huerto
     * @returns ajusteshuertos
     */
    async function getAjustesHuerto(id_usuario,id_huerto){
        const respuesta= await fetch(url + '?idUsuario='+ id_huerto+"&idHuerto="+id_huerto);
        if(!respuesta.ok){
            return false;
        }
        ajusteshuertos=await respuesta.json();
        return ajusteshuertos;
    }

    /**
     * Envia los datos del usuario
     * @param id_usuario
     *
     */
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

    /**
     * Envia los datos a la base de datos
     * @param id_usuario
     */
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

    /**
     * Actualiza los datos del usuario
     * @param datos
     * @returns respuesta
     */
    async function updateUsuario(datos) {
        const respuesta = await fetch(url + datos.id, {
            method: 'put',
            body: JSON.stringify(datos)
        })
        return await respuesta.ok;
    }
    /**
     * Actualiza los datos del huerto del usuario
     * @param datos
     * @returns respuesta
     */
    async function updateHuerto(datos) {
        const respuesta = await fetch(url + datos.id, {
            method: 'put',
            body: JSON.stringify(datos)
        })
        return await respuesta.ok;
    }
    getHuertosUsuario();