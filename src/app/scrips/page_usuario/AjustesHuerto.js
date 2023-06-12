//obtención de referencias
//VARIABLES GENERALES:
let dialogo = document.getElementById('ajustes_de_huerto');
let tituloSeccion = document.getElementById('titulo_ajustes_huerto');
let botonGuardar = document.getElementById('boton_guardar_ajustes_huerto');
let botonCancelar = document.getElementById('boton-cancelar-ajustes-huerto');
let botonEditar = document.getElementById('boton_editar_ajustes_huerto');
let selector = document.getElementById('seleccionar_huerto');

//VARIABLES EDITAR LOS CAMPOS:
let notasEditable = document.getElementById('notas_huerto');
let notas = document.getElementById('notas_huerto_ajustes');
let nombreHuerto = document.getElementById('nombre_huerto_ajustes');
let nombreHuertoEditable = document.getElementById('nombre_huerto');
let inputSubirFotoHuerto = document.getElementById('subir-foto-huerto');
let fotoHuerto = document.getElementById('foto-huerto');
let botonSubirFotoHuerto = document.getElementById('boton-subir-foto-huerto');
let vistaPrevia = document.getElementById('vista-previa');
let botonConfirmarFotoHuerto = document.getElementById('confirmar-foto-huerto');
let botonCancelarFotoHuerto = document.getElementById('cancelar-foto-huerto');
let formulario = document.getElementById('formulario-subir-foto');
let contador = document.getElementById('contador-notas-huerto');

//VARIABLES DE LAS NOTIFICACIONES:
let notificacionesBoton = document.getElementById('customSwitch3');
let formularioNotificaciones = document.getElementById('limites_medidas');
//los campos fijos:
let salinidadMinima = document.getElementById('salinidad-minima');
let salinidadMaxima = document.getElementById('salinidad-maxima');
let humedadMinima = document.getElementById('humedad-minima');
let humedadMaxima = document.getElementById('humedad-maxima');
let phMinimo = document.getElementById('pH-minimo');
let phMaximo = document.getElementById('pH-maximo');
let temperaturaMinima = document.getElementById('temperatura-minima');
let temperaturaMaxima = document.getElementById('temperatura-maxima');
let luzMinima = document.getElementById('luz-minimo');
let diasLuzMinima = document.getElementById('luz-minimo-dias');
let luzMaxima = document.getElementById('luz-maximo');
let diasLuzMaxima = document.getElementById('luz-maximo-dias');
//los campos editables:
let salinidadMinimaEditable = document.getElementById('salinidad-minima-editable');
let salinidadMaximaEditable = document.getElementById('salinidad-maxima-editable');
let humedadMinimaEditable = document.getElementById('humedad-minima-editable');
let humedadMaximaEditable = document.getElementById('humedad-maxima-editable');
let phMinimoEditable = document.getElementById('pH-minimo-editable');
let phMaximoEditable = document.getElementById('pH-maximo-editable');
let temperaturaMinimaEditable = document.getElementById('temperatura-minima-editable');
let temperaturaMaximaEditable = document.getElementById('temperatura-maxima-editable');
let luzMinimaEditable = document.getElementById('luz-minimo-editable');
let diasLuzMinimaEditable = document.getElementById('luz-minimo-dias-editable');
let luzMaximaEditable = document.getElementById('luz-maximo-editable');
let diasLuzMaximaEditable = document.getElementById('luz-maximo-dias-editable');




/*Estas funciones se ejecutarán cuando se pulse el botón de "Ajustes de huerto"*/
document.getElementById('boton_abrir_ajustes_huerto').addEventListener('click', function() {

    dialogo.addEventListener('close', function(){
        location.reload();
    });
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
            nombreHuertoEditable.style.display="none";
            nombreHuerto.style.display = "block";

            notas.innerText = "";
            notas.innerText = datosHuerto[0].notas;
            notasEditable.style.display = "none";
            notas.style.display = "block";
            contador.style.display = "none";




            if(datosHuerto[0].notificaciones === "1"){
                notificacionesBoton.checked = true;
                formularioNotificaciones.style.display = 'block';
                escribirValoresLimitesMedida();

            }
            else{
                notificacionesBoton.checked = false;
                formularioNotificaciones.style.display = 'none';

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
        //--Elementos generales:
        botonGuardar.style.display = "block";
        botonCancelar.style.display = "block";
        //--Elementos de texto:
        notasEditable.style.display = "block";
        nombreHuertoEditable.style.display = "block";
        contador.style.display="block";
        //--Notificaciones:
        salinidadMinimaEditable.style.display = "block";
        salinidadMaximaEditable.style.display = "block";
        humedadMinimaEditable.style.display = "block";
        humedadMaximaEditable.style.display = "block";
        phMinimoEditable.style.display = "block";
        phMaximoEditable.style.display = "block";
        temperaturaMinimaEditable.style.display = "block";
        temperaturaMaximaEditable.style.display = "block";
        luzMinimaEditable.style.display = "block";
        luzMaximaEditable.style.display = "block";
        diasLuzMinimaEditable.style.display = "block";
        diasLuzMaximaEditable.style.display = "block";

        //lo que escondemos:
        //--Elementos generales:
        botonEditar.style.display = "none";
        //--Elementos de texto:
        nombreHuerto.style.display = "none";
        notas.style.display = "none";
        //--Notificaciones:
        salinidadMinima.style.display = "none";
        salinidadMaxima.style.display = "none";
        humedadMinima.style.display = "none";
        humedadMaxima.style.display = "none";
        phMinimo.style.display = "none";
        phMaximo.style.display = "none";
        temperaturaMinima.style.display = "none";
        temperaturaMaxima.style.display = "none";
        luzMinima.style.display = "none";
        luzMaxima.style.display = "none";
        diasLuzMinima.style.display = "none";
        diasLuzMaxima.style.display = "none";

        //Asignamos el valor antiguo al input de texto que el usuario puede editar,
        // por si no lo edita, que se quede el valor original:
        //--Nombre y notas:
        let nombreAntiguo = nombreHuerto.textContent;
        nombreHuertoEditable.value = nombreAntiguo;
        let notasAntiguas = notas.textContent;
        notasEditable.value = notasAntiguas;
        //--Notificaciones:
        salinidadMinimaEditable.value = salinidadMinima.textContent;
        salinidadMaximaEditable.value = salinidadMaxima.textContent;
        humedadMinimaEditable.value = humedadMinima.textContent;
        humedadMaximaEditable.value = humedadMaxima.textContent;
        phMinimoEditable.value = phMinimo.textContent;
        phMaximoEditable.value = phMaximo.textContent;
        temperaturaMinimaEditable.value = temperaturaMinima.textContent;
        temperaturaMaximaEditable.value = temperaturaMaxima.textContent;
        luzMinimaEditable.value = luzMinima.textContent.toString();
        luzMaximaEditable.value = luzMaxima.textContent.toString();
    });

    //---------------------------------------------
    /*
                    BOTÓN GUARDAR:
    */
    //------------------------------------------

    //al clicar en el boton de guardar:
    botonGuardar.addEventListener('click', async function(){
        //------------------------------------------
        /*
                  EDITAR NOMBRE Y NOTAS:
        */
        //------------------------------------------
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

        //------------------------------------------
        /*
                 EDITAR LIMITES DE MEDIDA:
        */
        //------------------------------------------
        let salinidadMinNueva = salinidadMinimaEditable.value;
        let salinidadMaxNueva = salinidadMaximaEditable.value;
        if(salinidadMinNueva > salinidadMaxNueva){
            alert("El valor de salinidad mínimo no puede ser mayor que el valor de salinidad máximo");
            salinidadMinNueva = 0;
            salinidadMaxNueva = 0;
        }

        let humedadMinNueva = humedadMinimaEditable.value;
        let humedadMaxNueva = humedadMaximaEditable.value;
        if(humedadMinNueva > humedadMaxNueva){
            alert("El valor de humedad mínimo no puede ser mayor que el valor de humedad máximo");
            humedadMinNueva = 0;
            humedadMaxNueva = 0;
        }

        let phMinNuevo = phMinimoEditable.value;
        let phMaxNuevo = phMaximoEditable.value;
        let temperaturaMinNueva = temperaturaMinimaEditable.value;
        let temperaturaMaxNueva = temperaturaMaximaEditable.value;
        let luzMinNueva = luzMinimaEditable.value;
        let luzMaxNueva = luzMaximaEditable.value;



        let datosLimitesNuevos = {
            salinidadMinNueva: salinidadMinNueva,
            salinidadMaxNueva: salinidadMaxNueva,
            humedadMinNueva: humedadMinNueva,
            humedadMaxNueva: humedadMaxNueva,
            phMinNuevo: phMinNuevo,
            phMaxNuevo: phMaxNuevo,
            temperaturaMinNueva: temperaturaMinNueva,
            temperaturaMaxNueva: temperaturaMaxNueva,
            luzMinNueva: luzMinNueva,
            luzMaxNueva: luzMaxNueva
        }

        await fetch('../../../api/notificaciones/' + idHuerto, {
            method: 'put',
            body: JSON.stringify(datosLimitesNuevos)
        });


        await escribirDatosHuerto();
        await escribirValoresLimitesMedida();
        botonGuardar.style.display = "none";
        botonEditar.style.display = "block";
        botonCancelar.style.display = "none";
    });

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
        ACTIVAR Y DESACTIVAR LAS NOTIFICACIONES:
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
            if(respuesta.ok){
                formularioNotificaciones.style.display = "block";
                escribirValoresLimitesMedida();
            }
        }
        else{
            let idHuerto = selector.value;

            datos = {
                notif: 0
            }

            const respuesta = await fetch('../../../api/huertos/' + idHuerto, {
                method: 'put',
                body: JSON.stringify(datos)
            });
            if(respuesta.ok){
                formularioNotificaciones.style.display = "none";
            }
        }
    });

    //------------------------------------------
    /*
        ESCRIBIR VALORES DE LÍMITES DE MEDIDA:
    */
    //------------------------------------------
    async function escribirValoresLimitesMedida(){

        let idHuerto = selector.value;
        const respuesta = await fetch('../../../api/notificaciones/' + '?idHuerto=' + idHuerto);
        if(respuesta.ok){
            let datos = await respuesta.json();

            salinidadMinima.innerText = "";
            salinidadMinima.innerText = datos[0].medicion_min_salinidad;
            salinidadMinimaEditable.style.display = "none";
            salinidadMinima.style.display = "block";

            salinidadMaxima.innerText = "";
            salinidadMaxima.innerText = datos[0].medicion_max_salinidad;
            salinidadMaximaEditable.style.display = "none";
            salinidadMaxima.style.display = "block";

            humedadMinima.innerText = "";
            humedadMinima.innerText = datos[0].medicion_min_humedad;
            humedadMinimaEditable.style.display = "none";
            humedadMinima.style.display = "block";


            humedadMaxima.innerText = "";
            humedadMaxima.innerText = datos[0].medicion_max_humedad;
            humedadMaximaEditable.style.display = "none";
            humedadMaxima.style.display = "block";

            temperaturaMinima.innerText = "";
            temperaturaMinima.innerText = datos[0].medicion_min_temperatura;
            temperaturaMinimaEditable.style.display = "none";
            temperaturaMinima.style.display = "block";

            temperaturaMaxima.innerText = "";
            temperaturaMaxima.innerText = datos[0].medicion_max_temperatura;
            temperaturaMaximaEditable.style.display = "none";
            temperaturaMaxima.style.display = "block";

            phMinimo.innerText = "";
            phMinimo.innerText = datos[0].medicion_min_ph;
            phMinimoEditable.style.display = "none";
            phMinimo.style.display = "block";

            phMaximo.innerText = "";
            phMaximo.innerText = datos[0].medicion_max_ph;
            phMaximoEditable.style.display = "none";
            phMaximo.style.display = "block";

            luzMinima.innerText = "";
            luzMinima.innerText = datos[0].medicion_min_luminosidad;
            luzMinimaEditable.style.display = "none";
            luzMinima.style.display = "block";

            luzMaxima.innerText = "";
            luzMaxima.innerText = datos[0].medicion_max_luminosidad;
            luzMaximaEditable.style.display = "none";
            luzMaxima.style.display = "block";

            diasLuzMinimaEditable.style.display = "none";
            diasLuzMinima.style.display = "block";

            diasLuzMaximaEditable.style.display = "none";
            diasLuzMaxima.style.display = "block";
        }
    }




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
