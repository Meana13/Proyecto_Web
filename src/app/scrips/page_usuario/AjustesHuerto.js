//obtención de referencias
//VARIABLES GENERALES:
let dialogo = document.getElementById('ajustes_de_huerto');
let tituloSeccion = document.getElementById('titulo_ajustes_huerto');
let botonGuardar = document.getElementById('boton_guardar_ajustes_huerto');
let botonCancelar = document.getElementById('boton-cancelar-ajustes-huerto');
let botonEditar = document.getElementById('boton_editar_ajustes_huerto');
let selector = document.getElementById('seleccionar_huerto');
let dialogoMensaje = document.getElementById('dialogo-mensaje-usuario-ajustes-huerto');
let mensajeUsuario = document.getElementById('mensaje-usuario-ajustes-huerto');
let botonAceptarMensaje = document.getElementById('boton-aceptar-mensaje-ajustes-huerto');

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

//VARIABLES DE MENSAJES DE ERROR:
//Nombre:
let errorNombreHuerto = document.getElementById('errorNombreHuerto');
//Salinidad:
let errorSalinidadMinMax = document.getElementById('salinidadMinMayorQueMax');
let errorSalMenorCero = document.getElementById('ValorSalMenorQueCero');
let errorSalMayorCien = document.getElementById('ValorSalMayorQueCien');
//Humedad:
let errorHumedadMinMax = document.getElementById('humedadMinMayorQueMax');
let errorHumedadMenorCero = document.getElementById('ValorHumedadMenorQueCero');
let errorHumedadMayorCien = document.getElementById('ValorHumedadMayorQueCien');
//pH
let errorPhMinMax = document.getElementById('pHMinMayorQueMax');
let errorPhMenorCero = document.getElementById('ValorPhMenorQueCero');
let errorPhMayorCatorce = document.getElementById('ValorPhMayorQueCatorce');
//temperatura
let errorTemperaturaMinMax = document.getElementById('temperaturaMinMayorQueMax');
let errorTemperaturaMenorTreinta = document.getElementById('ValorTemperaturaMenorQueTreinta');
let errorTemperaturaMayorCincuenta = document.getElementById('ValorTemperaturaMayorQueCincuenta');
//Días de luz
let errorDiaMin = document.getElementById('ValorDiaMinMenorQueCero');
let errorDiaMax = document.getElementById('ValorDiaMaxMenorQueCero');


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

        if(luzMinima.textContent === "0 - Oscuridad"){
            luzMinimaEditable.value = 0;
        }
        if(luzMinima.textContent === "1 - Poco iluminado"){
            luzMinimaEditable.value = 1;
        }
        if(luzMinima.textContent === "2 - Sombra"){
            luzMinimaEditable.value = 2;
        }
        if(luzMinima.textContent === "3 - Luz directa"){
            luzMinimaEditable.value = 3;
        }

        if(luzMaxima.textContent === "0 - Oscuridad"){
            luzMaximaEditable.value = 0;
        }
        if(luzMaxima.textContent === "1 - Poco iluminado"){
            luzMaximaEditable.value = 1;
        }
        if(luzMaxima.textContent === "2 - Sombra"){
            luzMaximaEditable.value = 2;
        }
        if(luzMaxima.textContent === "3 - Luz directa"){
            luzMaximaEditable.value = 3;
        }
        
        diasLuzMinimaEditable.value = diasLuzMinima.textContent;
        diasLuzMaximaEditable.value = diasLuzMaxima.textContent;
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
        let senyalMinMax = 0;
        let senyalMenor = 0;
        let senyalMayor = 0;
        let senyalNombre = 0;

        let idHuerto = selector.value;
        let nombreNuevo = nombreHuertoEditable.value;
        let notasNuevas = notasEditable.value;

        //si el input de nombre está vacío, mostramos un mensaje de error y no dejamos que se envíe al servidor:
        if(nombreNuevo.length === 0){
            senyalNombre = 1;
            errorNombreHuerto.style.display = "block";
        }
        //en caso contrario, ocultamos el mensaje y lo enviamos al servidor
        else{
            senyalNombre = 0;
            errorNombreHuerto.style.display = "none";
        }

        let datos = {
            nombreNuevo: nombreNuevo,
            idHuerto: idHuerto,
            notasNuevas: notasNuevas
        }
        await fetch('../../../api/ajustesHuerto', {
            method: 'put',
            body: JSON.stringify(datos)
        });

        //------------------------------------------
        /*
                 EDITAR LIMITES DE MEDIDA:
        */
        //------------------------------------------
        //los valores de los inputs se transforman a número y se recogen en variables para enviarlas al servidor:
        let salinidadMinNueva = parseInt(salinidadMinimaEditable.value);
        let salinidadMaxNueva = parseInt(salinidadMaximaEditable.value);
        let humedadMinNueva = parseInt(humedadMinimaEditable.value);
        let humedadMaxNueva = parseInt(humedadMaximaEditable.value);
        let phMinNuevo = parseInt(phMinimoEditable.value);
        let phMaxNuevo = parseInt(phMaximoEditable.value);
        let temperaturaMinNueva = parseInt(temperaturaMinimaEditable.value);
        let temperaturaMaxNueva = parseInt(temperaturaMaximaEditable.value);
        let luzMinNueva = luzMinimaEditable.value;
        let luzMaxNueva = luzMaximaEditable.value;
        let diasLuzMinNueva = parseInt(diasLuzMinimaEditable.value);
        let diasLuzMaxNueva = parseInt(diasLuzMaximaEditable.value);


        //PARA EVITAR LOS ERRORES EN LOS DATOS:
        //para no enviar la información al servidor si está mal introducida:
        if(
            salinidadMinNueva > salinidadMaxNueva ||
            humedadMinNueva > humedadMaxNueva ||
            phMinNuevo > phMaxNuevo ||
            temperaturaMinNueva > temperaturaMaxNueva
        ){
            senyalMinMax = 1;
        }
        else if(salinidadMinNueva < salinidadMaxNueva &&
            humedadMinNueva < humedadMaxNueva &&
            phMinNuevo < phMaxNuevo &&
            temperaturaMinNueva < temperaturaMaxNueva
        ){
            senyalMinMax = 0;
        }

        if(
            salinidadMinNueva < 0 || salinidadMaxNueva < 0 ||
            humedadMinNueva < 0 || humedadMaxNueva < 0 ||
            phMinNuevo < 0 || phMaxNuevo < 0 ||
            temperaturaMinNueva < -30 || temperaturaMaxNueva < -30 ||
            diasLuzMinNueva < 0 || diasLuzMaxNueva < 0
        ){
            senyalMenor = 1;
        }
        else if(
            salinidadMinNueva >= 0 && salinidadMaxNueva >= 0 &&
            humedadMinNueva >= 0 && humedadMaxNueva >= 0 &&
            phMinNuevo >= 0 && phMaxNuevo >= 0 &&
            temperaturaMinNueva >= -30 && temperaturaMaxNueva >= -30 &&
            diasLuzMinNueva >= 0 && diasLuzMaxNueva >= 0
        ){
            senyalMenor = 0;
        }

        if(
            salinidadMinNueva > 100 || salinidadMaxNueva > 100 ||
            humedadMinNueva > 100 || humedadMaxNueva > 100 ||
            phMinNuevo > 14 || phMaxNuevo > 14 ||
            temperaturaMinNueva > 50 || temperaturaMaxNueva > 50
        ){
            senyalMayor = 1;
        }
        else if(
            salinidadMinNueva <= 100 && salinidadMaxNueva <= 100 &&
            humedadMinNueva <= 100 && humedadMaxNueva <= 100 &&
            phMinNuevo <= 14 && phMaxNuevo <= 14 &&
            temperaturaMinNueva <= 50 && temperaturaMaxNueva <= 50
        ){
            senyalMayor = 0;
        }



        //para mostrar u ocultar los mensajes de error de cada sensor:
        //SALINIDAD
        //si el valor mínimo es mayor que el máximo:
        if(salinidadMinNueva > salinidadMaxNueva){
            errorSalinidadMinMax.style.display = "block";
        }
        else {
            errorSalinidadMinMax.style.display = "none";
        }
        //si algún valor es menor que el límite mínimo:
        if(salinidadMinNueva < 0 || salinidadMaxNueva < 0){
            errorSalMenorCero.style.display="block";
        }
        else {
            errorSalMenorCero.style.display = "none";
        }
        //si algún valor es mayor que el límite máximo:
        if(salinidadMinNueva > 100 || salinidadMaxNueva > 100){
            errorSalMayorCien.style.display="block";
        }
        else{
            errorSalMayorCien.style.display = "none";
        }

        //HUMEDAD
        //si el valor mínimo es mayor que el máximo:
        if(humedadMinNueva > humedadMaxNueva){
            errorHumedadMinMax.style.display = "block";
        }
        else{
            errorHumedadMinMax.style.display = "none";
        }
        //si algún valor es menor que el límite mínimo:
        if(humedadMinNueva < 0 || humedadMaxNueva < 0){
            errorHumedadMenorCero.style.display="block";
        }
        else {
            errorHumedadMenorCero.style.display = "none";
        }
        //si algún valor es mayor que el límite máximo:
        if(humedadMinNueva > 100 || humedadMaxNueva > 100){
            errorHumedadMayorCien.style.display="block";
        }
        else{
            errorHumedadMayorCien.style.display = "none";
        }

        //PH
        //si el valor mínimo es mayor que el máximo:
        if(phMinNuevo > phMaxNuevo){
            errorPhMinMax.style.display = "block";
        }
        else{
            errorPhMinMax.style.display = "none";
        }
        //si algún valor es menor que el límite mínimo:
        if(phMinNuevo < 0 || phMaxNuevo < 0){
            errorPhMenorCero.style.display="block";
        }
        else{
            errorPhMenorCero.style.display = "none";
        }
        //si algún valor es mayor que el límite máximo:
        if(phMinNuevo > 14 || phMaxNuevo > 14){
            errorPhMayorCatorce.style.display="block";
        }
        else {
            errorPhMayorCatorce.style.display = "none";
        }

        //TEMPERATURA
        //si el valor mínimo es mayor que el máximo:
        if(temperaturaMinNueva > temperaturaMaxNueva){
            errorTemperaturaMinMax.style.display = "block";
        }
        else{
            errorTemperaturaMinMax.style.display = "none";
        }
        //si algún valor es menor que el límite mínimo:
        if(temperaturaMinNueva < -30 || temperaturaMaxNueva < -30){
            errorTemperaturaMenorTreinta.style.display="block";
        }
        else{
            errorTemperaturaMenorTreinta.style.display = "none";
        }
        //si algún valor es mayor que el límite máximo:
        if(temperaturaMinNueva > 50 || temperaturaMaxNueva > 50){
            errorTemperaturaMayorCincuenta.style.display="block";
        }
        else if(temperaturaMinNueva <= 50 && temperaturaMaxNueva <= 50 ){
            errorTemperaturaMayorCincuenta.style.display = "none";
        }

        //DÍAS DE NIVEL DE LUZ
        if(diasLuzMinNueva < 0){
            errorDiaMin.style.display="block";
        }
        else{
            errorDiaMin.style.display = "none";
        }
        if(diasLuzMaxNueva < 0){
            errorDiaMax.style.display="block";
        }
        else{
            errorDiaMax.style.display = "none";
        }


        if(senyalMinMax === 1 || senyalMenor === 1 || senyalMayor === 1 || senyalNombre === 1){

            dialogoMensaje.showModal();
            mensajeUsuario.innerText = "";
            mensajeUsuario.innerText = "Hay datos que son incorrectos, por favor revísalos antes de continuar"
            botonAceptarMensaje.addEventListener('click', function(event){
                dialogoMensaje.close();
            });
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
        }
        else if(senyalMinMax === 0 && senyalMenor === 0 && senyalMayor === 0 && senyalNombre === 0){

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
                luzMaxNueva: luzMaxNueva,
                diasLuzMinNueva: diasLuzMinNueva,
                diasLuzMaxNueva: diasLuzMinNueva
            }

            await fetch('../../../api/notificaciones/' + idHuerto, {
                method: 'put',
                body: JSON.stringify(datosLimitesNuevos)
            });

            dialogoMensaje.showModal();
            mensajeUsuario.innerText = "";
            mensajeUsuario.innerText = "Se han editado los campos con éxito."
            botonAceptarMensaje.addEventListener('click', async function(){
                dialogoMensaje.close();
                await escribirDatosHuerto();
                await escribirValoresLimitesMedida();
                botonGuardar.style.display = "none";
                botonEditar.style.display = "block";
                botonCancelar.style.display = "none";
            })




        }


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

            const respuesta = await fetch('../../../api/estadoNotificaciones/' + idHuerto, {
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

            const respuesta = await fetch('../../../api/estadoNotificaciones/' + idHuerto, {
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

            if(datos[0].notificaciones === "1"){
                notificacionesBoton.checked = true;
                formularioNotificaciones.style.display = 'block';

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
                if(datos[0].medicion_min_luminosidad === "0"){
                    luzMinima.innerText = "0 - Oscuridad";
                }
                if(datos[0].medicion_min_luminosidad === "1"){
                    luzMinima.innerText = "1 - Poco iluminado";
                }
                if(datos[0].medicion_min_luminosidad === "2"){
                    luzMinima.innerText = "2 - Sombra";
                }
                if(datos[0].medicion_min_luminosidad === "3"){
                    luzMinima.innerText = "3 - Luz directa";
                }
                luzMinimaEditable.style.display = "none";
                luzMinima.style.display = "block";


                luzMaxima.innerText = "";
                if(datos[0].medicion_max_luminosidad === "0"){
                    luzMaxima.innerText = "0 - Oscuridad";
                }
                if(datos[0].medicion_max_luminosidad === "1"){
                    luzMaxima.innerText = "1 - Poco iluminado";
                }
                if(datos[0].medicion_max_luminosidad === "2"){
                    luzMaxima.innerText = "2 - Sombra";
                }
                if(datos[0].medicion_max_luminosidad === "3"){
                    luzMaxima.innerText = "3 - Luz directa";
                }
                luzMaximaEditable.style.display = "none";
                luzMaxima.style.display = "block";

                diasLuzMinima.innerText = "";
                diasLuzMinima.innerText = datos[0].mediciones_continuas_minimos;
                diasLuzMinimaEditable.style.display = "none";
                diasLuzMinima.style.display = "block";

                diasLuzMaxima.innerText = "";
                diasLuzMaxima.innerText = datos[0].mediciones_continuas_maximos;
                diasLuzMaximaEditable.style.display = "none";
                diasLuzMaxima.style.display = "block";
            }
            else{
                notificacionesBoton.checked = false;
                formularioNotificaciones.style.display = 'none';
            }
        }
    }


/*


    //------------------------------------------
    /!*
              CAMBIAR FOTO DE HUERTO:
    *!/
    //------------------------------------------

    botonSubirFotoHuerto.addEventListener('click', function () {

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


        inputSubirFotoHuerto.addEventListener('change', function (event) {
            let fotoNueva = event.target.files[0];

            if (fotoNueva) {
                const reader = new FileReader();
                reader.onload = function (event) {
                    vistaPrevia.src = event.target.result;
                    console.log(event.target.result);

                    botonConfirmarFotoHuerto.addEventListener('click', async function () {
                        let idHuerto = selector.value;

                        let imagen = {
                            imagenNueva: event.target.result
                        }

                        /!*
                        let formData = new FormData(formulario);
                        formData.append('imagen', fotoNueva, fotoNueva.name);
        *!/
                        const respuesta = await fetch('../../../api/cambiarFotoHuerto' + idHuerto, {
                            method: 'put',
                            body: imagen
                        });
                    });
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



            });
        });
    });
*/

                /*
                let imagen = {
                    imagenNueva: fotoNueva
                }
                /*
                let formData = new FormData(formulario);
                formData.append('imagen', fotoNueva, fotoNueva.name);
*//*
                const respuesta = await fetch('../../../api/cambiarFotoHuerto' + idHuerto, {
                    method: 'put',
                    body: imagen.blob()
                    //body: formData
                });


                if (respuesta.ok) {
                    console.log('se ha actualizado la imagen');

                    const respuesta = await fetch('../../../api/cambiarFotoHuerto/' + '?idHuerto=' + idHuerto);
                        if (respuesta.ok) {
                            const datos = await respuesta.blob();
                            const urlImagen = URL.createObjectURL(datos);
                            vistaPrevia.src = urlImagen;
                            fotoHuerto.src=urlImagen;
                        }
                }

            });
        });
    });
*/
//llamadas de las funciones (main):
    escribirDatosHuerto();
    escribirValoresLimitesMedida();

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
