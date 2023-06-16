//......................................................................................................................
/*                                       SECCIÓN CITAS USUARIO REGISTRADO                                             */
//......................................................................................................................
//......................................................................................................................
//......................................................................................................................
//DECLARACIÓN DE VARIABLES:
let tablaCitas = document.getElementById('tabla_citas');
let filas = tablaCitas.getElementsByTagName('tr');
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


    tablaCitas.innerHTML = "";

    datos.forEach(function(cita){
        tablaCitas.innerHTML += `<tr>
        <td>${cita.fecha_cita}</td>
        <td>${cita.hora_cita}</td>
        <td>Técnico</td>
        <td>${cita.asunto}</td>
        <td><button class="boton-aceptar-rechazar" onclick='aceptarCita(${JSON.stringify(cita)})'><i class="bi bi-check-lg"></i></button>
        <button class="boton-aceptar-rechazar" onclick='rechazarCita(${JSON.stringify(cita)})'>X</button></td>
    </tr>`;
    });
}
//......................................................................................................................
//......................................................................................................................
//.......................................................
/*
           cita --> aceptarCita()               ____cita____
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
Queremos que cuando se acepte una cita, se eliminen las demás filas que coincidan con el motivo.
*/
//.......................................................
async function aceptarCita(citaAceptada) {
    console.log(citaAceptada);
    //Recorremos las filas de la tabla empezando desde el final
    // (para asegurar que eliminamos de manera correcta las filas que no queremos)
    for (let i = filas.length - 1; i >= 0; i--) {
        let fila = filas[i];

        if (fila.innerHTML.includes(citaAceptada.fecha_cita) && fila.innerHTML.includes(citaAceptada.hora_cita) && fila.innerHTML.includes(citaAceptada.asunto)) {
            //si todos los datos coinciden, esta es la fila que se ha aceptado.
        } else if (fila.innerHTML.includes(citaAceptada.asunto)) {
            //Si coincide solo el asunto, la eliminamos:
            fila.remove();
        }
    }

    //para actualizar el servidor con las citas aceptadas y rechazadas:
    let datos = await getCitas();//recibimos todas las citas del usuario.

    console.log(datos);

    for (let i = 0; i < datos.length; i++) {
        let cita = datos[i];

        if (cita.fecha_cita === citaAceptada.fecha_cita && cita.hora_cita === citaAceptada.hora_cita && cita.asunto === citaAceptada.asunto) {
            //Si todos los datos coinciden, esta es la cita que se ha aceptado. Le asignaremos el estado de aceptada:
            let datos = {
                estado: 2,
                idCita: cita.id_cita
            }

            await fetch('../../../api/citas', {
                method: 'put',
                body: JSON.stringify(datos)
            });

        }
        else if(cita.asunto === citaAceptada.asunto){
            //Si coincide solo el asunto, significa que la hemos rechazado,
            // y, por tanto, le asignamos el estado de rechazada:
            let datos = {
                estado: 3,
                idCita: cita.id_cita
            }

            await fetch('../../../api/citas', {
                method: 'put',
                body: JSON.stringify(datos)
            });//fetch
        }//else
    }//for
}//aceptarCita()



//llamadas de funciones:
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
