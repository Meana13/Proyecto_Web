//obtención de referencias
let tituloSeccion = document.getElementById('titulo_ajustes_huerto');
let botonGuardar = document.getElementById('boton_guardar_ajustes_huerto');
let botonCancelar = document.getElementById('boton-cancelar-ajustes-huerto');
let botonEditar = document.getElementById('boton_editar_ajustes_huerto');
let notasEditable = document.getElementById('notas_huerto');
let notas = document.getElementById('notas_huerto_ajustes');
let nombreHuerto = document.getElementById('nombre_huerto_ajustes');
let nombreHuertoEditable = document.getElementById('nombre_huerto');
let selector = document.getElementById('seleccionar_huerto');
let inputSubirFotoHuerto = document.getElementById('subir-foto-huerto');
let fotoHuerto = document.getElementById('foto-huerto');
let botonSubirFotoHuerto = document.getElementById('boton-subir-foto-huerto');
let vistaPrevia = document.getElementById('vista-previa');
let botonConfirmarFotoHuerto = document.getElementById('confirmar-foto-huerto');
let botonCancelarFotoHuerto = document.getElementById('cancelar-foto-huerto');
let formulario = document.getElementById('formulario-subir-foto');
let contador = document.getElementById('contador-notas-huerto');
let notificacionesBoton = document.getElementById('customSwitch3');


/*Estas funciones se ejecutarán cuando se pulse el botón de "Ajustes de huerto"*/
document.getElementById('boton_abrir_ajustes_huerto').addEventListener('click', function() {


    //---------------------------------------------
    /*
    getDatosHuertoPorIdHuerto() --> datos

    ____datos____
    id_huerto: N
    imagen: txt
    nombre_huerto: txt
    notas: txt
    notificaciones: VoF
    _____________
    */
    //------------------------------------------
    async function getDatosHuertoPorIdHuerto(idHuerto){
        const respuesta = await fetch('../../../api/huertos/' + '?idHuerto=' + idHuerto);
        if(respuesta.ok) {
            const datos = await respuesta.json();
            return datos;
        }
    }

    //---------------------------------------------
    /*
                escribirDatosHuerto()
    */
    //------------------------------------------

    async function escribirDatosHuerto(){

        let idHuerto = selector.value;
        let datosHuerto = await getDatosHuertoPorIdHuerto(idHuerto);

            tituloSeccion.innerText = "";
            tituloSeccion.innerText = "AJUSTES DE " + datosHuerto[0].nombre_huerto;

            nombreHuerto.innerText = "";
            nombreHuerto.innerText = datosHuerto[0].nombre_huerto;

            notas.innerText = "";
            notas.innerText = datosHuerto[0].notas;

            if(datosHuerto[0].notificaciones === "1"){
                notificacionesBoton.checked = true;
            }
            else{
                notificacionesBoton.checked = false;
            }
    }

    //---------------------------------------------
    /*
                    BOTÓN EDITAR:
    */
    //------------------------------------------

    //al clicar en el botón de editar:
    botonEditar.addEventListener('click', function(){
        //lo que mostramos:
        botonGuardar.style.display = "block";
        botonCancelar.style.display = "block";
        notasEditable.style.display = "block";
        nombreHuertoEditable.style.display = "block";

        //lo que escondemos:
        botonEditar.style.display = "none";
        nombreHuerto.style.display = "none";
        notas.style.display = "none";

        //Asignamos el valor antiguo al input de texto que el usuario puede editar,
        // por si no lo edita, que se quede el nombre original:
        let nombreAntiguo = nombreHuerto.textContent;
        nombreHuertoEditable.value = nombreAntiguo;

        let notasAntiguas = notas.textContent;
        notasEditable.value = notasAntiguas;
    });

    //---------------------------------------------
    /*
                    BOTÓN GUARDAR:
    */
    //------------------------------------------

    //al clicar en el boton de guardar:
    botonGuardar.addEventListener('click', async function(){
        let idHuerto = selector.value;
        let nombreNuevo = nombreHuertoEditable.value;
        let notasNuevas = notasEditable.value;

        let datos = {
            nombreNuevo: nombreNuevo,
            idHuerto: idHuerto,
            notasNuevas: notasNuevas
        }
        const respuesta = await fetch('../../../api/ajustesHuerto', {
            method: 'put',
            body: JSON.stringify(datos)
        });

        location.reload();
    })
    //------------------------------------------
    /*
             CONTADOR DE CARACTERES DE NOTAS:
    */
    //------------------------------------------
    notasEditable.addEventListener('input', function(){
        //contamos los caracteres que va escribiendo el usuario
        const contarCaracteres = notasEditable.value.length;

        //si son más de 1000, no lo guardamos en la nota
        if (contarCaracteres > 1000) {
            notasEditable.value = notasEditable.value.substring(0, 1000);
        }

        contador.textContent = `${contarCaracteres}/1000`;
    });

    //------------------------------------------
    /*
             ACTIVAR LAS NOTIFICACIONES:
    */
    //------------------------------------------
    notificacionesBoton.addEventListener('change', async function(){
        if (notificacionesBoton.checked){

            let idHuerto = selector.value;

            datos = {
                notif: 1
            }

            const respuesta = await fetch('../../../api/huertos/' + idHuerto, {
                method: 'put',
                body: JSON.stringify(datos)
            });
        }
        else{
            console.log('notificaciones desactivadas');
            let idHuerto = selector.value;

            datos = {
                notif: 0
            }

            const respuesta = await fetch('../../../api/huertos/' + idHuerto, {
                method: 'put',
                body: JSON.stringify(datos)
            });
        }
    });

    //------------------------------------------
    /*
              CAMBIAR FOTO DE HUERTO:
    */
    //------------------------------------------
    /*
    botonSubirFotoHuerto.addEventListener('click', function (){

        const fotoPorDefecto = '../../../images/foto_base.jpeg';

        inputSubirFotoHuerto.click();
        //cuando se vaya a elegir una foto, mostramos la vistra previa y escondemos la foto real:
        vistaPrevia.style.display = "block";
        fotoHuerto.style.display = "none";

        //y mostramos los botones de cancelar y confirmar:
        botonConfirmarFotoHuerto.style.display = 'block';
        botonCancelarFotoHuerto.style.display = 'block';

        //escondemos el boton de cambiar foto:
        botonSubirFotoHuerto.style.display = 'none';
        inputSubirFotoHuerto.addEventListener('change', function(event) {
            let fotoNueva = event.target.files[0];
            console.log(fotoNueva);

            if (fotoNueva) {
                const reader = new FileReader();
                reader.onload = function (event) {
                    vistaPrevia.src = event.target.result;
                }
                reader.readAsDataURL(fotoNueva);
            } else {
                vistaPrevia.src = fotoPorDefecto;
            }

            botonCancelarFotoHuerto.addEventListener('click', function () {
                vistaPrevia.style.display = 'none';
                fotoHuerto.style.display = 'block';

                botonCancelarFotoHuerto.style.display = 'none';
                botonConfirmarFotoHuerto.style.display = 'none';
                botonSubirFotoHuerto.style.display = 'block';
            });

            botonConfirmarFotoHuerto.addEventListener('click', async function () {
                let idHuerto = selector.value;

                let formData = new FormData(formulario);
                formData.append('imagen', fotoNueva, fotoNueva.name);
                formData.append('idHuerto', idHuerto);

                const respuesta = await fetch('../../../api/cambiarFotoHuerto', {
                    method: 'put',
                    body: formData
                });

                if (respuesta.ok) {
                    console.log('se ha actualizado la imagen');
                    /*
                    const respuesta = await fetch('../../../api/cambiarFotoHuerto/' + '?idHuerto=' + idHuerto);
                        if (respuesta.ok) {
                            const datos = await respuesta.blob();
                            const urlImagen = URL.createObjectURL(datos);
                            vistaPrevia.src = urlImagen;
                            fotoHuerto.src=urlImagen;
                        }
                        */

               // }

            //});
       // });
    //});

//llamadas de las funciones (main):
    escribirDatosHuerto();

});









/*

document.getElementById('boton_perfil').addEventListener('click', function(){
    /!**
     * URL a la que se hacen las peticiones
     *!/
    const url= '../../../api/ajustes/';



    /!**
     * Variables vacias
     *!/
    var ajustesusuario=[];
    var ajusteshuertos=[];

    /!**
     * Carga los datos del ajuste del usuario
     * @param id
     * @returns ajustesusuario
     *!/
    async function getAjustesUsuario(id){
        const respuesta= await fetch(url+ '?idUsuario='+ id );
        if(!respuesta.ok){
            return false;
        }
        ajustesusuario=await respuesta.json();
        return ajustesusuario;
    }

    /!**
     * Carga los datos del huerto del usuario
     * @param id_usuario
     * @param id_huerto
     * @returns ajusteshuertos
     *!/
    async function getAjustesHuerto(id_usuario,id_huerto){
        const respuesta= await fetch(url + '?idUsuario='+ id_huerto );
        if(!respuesta.ok){
            return false;
        }
        ajusteshuertos=await respuesta.json();
        return ajusteshuertos;
    }

    /!**
     * Envia los datos del usuario
     * @param id_usuario
     *
     *!/
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
*/
/*

    /!**
     * Envia los datos a la base de datos
     * @param id_usuario
     *!/
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

    /!**
     * Actualiza los datos del usuario
     * @param datos
     * @returns respuesta
     *!/
    async function updateUsuario(datos) {
        const respuesta = await fetch(url + datos.id, {
            method: 'put',
            body: JSON.stringify(datos)
        })
        return await respuesta.ok;
    }
    /!**
     * Actualiza los datos del huerto del usuario
     * @param datos
     * @returns respuesta
     *!/
    async function updateHuerto(datos) {
        const respuesta = await fetch(url + datos.id, {
            method: 'put',
            body: JSON.stringify(datos)
        })
        return await respuesta.ok;
    }

*/
