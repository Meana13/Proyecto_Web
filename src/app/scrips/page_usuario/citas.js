//......................................................................................................................
/*                                       SECCIÓN CITAS USUARIO REGISTRADO                                             */
//......................................................................................................................
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
                    getCitas() --> datos        ____datos____
                                                anotaciones: txt
                                                asunto: N
                                                estado: N
                                                fecha_cita: txt
                                                hora_cita: txt
                                                direccion_cita: txt
                                                id_cita: N
                                                id_cliente: N
                                                productos: N
                                                _____________

*/
//.......................................................
async function getCitas(){
    let datosCliente = await getDatosCliente();
    let idCliente = datosCliente[0].id_cliente;

    const respuesta = await fetch('../../../api/citas/' + '?idCliente=' + idCliente);
    if(respuesta.ok){
        const datos = await respuesta.json();
        return datos;
    }
}
//......................................................................................................................
//......................................................................................................................
//.......................................................
/*
                    escribirTablaCitas()
*/
//.......................................................
async function escribirTablaCitas(){

    let datos = await getCitas();

    let tablaCitas = document.getElementById('tabla_citas');
    tablaCitas.innerHTML = "";

    datos.forEach(function(cita){
        tablaCitas.innerHTML += `<tr>
        <td>${cita.fecha_cita}</td>
        <td>${cita.hora_cita}</td>
        <td>${cita.asunto}</td>
        <td><button class="boton-aceptar-rechazar"><i class="bi bi-check-lg"></i></button>
        <button class="boton-aceptar-rechazar">X</button></td>
    </tr>`;
    });
    
}

escribirTablaCitas();










/*
/!*FUNCION PARA GENERAR LAS TABLAS DE CITAS DEL USUARIO*!/

async function generarTablasCitasUsuario(){

    let respuesta = await fetch('../../../api/generarTablaDeCitasUsuario/');
    if(respuesta.ok){
        const datos = await respuesta.json();
        console.log(datos);
    }

}

//generarTablasCitasUsuario();*/
