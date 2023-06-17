//......................................................................................................................
/* SECCIÓN CITAS USUARIO REGISTRADO */
//......................................................................................................................

// DECLARACIÓN DE VARIABLES:
let tablaCitasTecnico = document.getElementById('tablaCitasTecnico');
let filas= document.getElementsByTagName('tr')
//......................................................................................................................
/* getSesionUsuario() --> datos */
// .....................................................................................................................

async function getSesionUsuario() {
    const respuesta = await fetch('../../../api/sesion/');
    if (respuesta.ok) {
        const datos = await respuesta.json();
        return datos;
    }
}

//......................................................................................................................
/* getDatosCliente() --> datos */
// .....................................................................................................................

async function getDatosCliente() {
    let datosSesion = await getSesionUsuario();
    let idUsuario = datosSesion.id_usuario;

    const respuesta = await fetch('../../../api/clientes/' + '?idUsuario=' + idUsuario);
    if (respuesta.ok) {
        const datos = await respuesta.json();
        return datos;
    }
}

//......................................................................................................................
/* getCitas() --> [datos] */
// .....................................................................................................................

async function getCitas() {
    let datosCliente = await getDatosCliente();
    let idCliente = datosCliente[0].id_cliente;

    const respuesta = await fetch('../../../api/citas/' + '?idCliente=' + idCliente);
    if (respuesta.ok) {
        const datos = await respuesta.json();
        return datos;
    }
}

//......................................................................................................................
/* escribirTablaCitas() */
// .....................................................................................................................

async function escribirTablaCitasTecnico() {

    let datos = await getCitas();

    tablaCitasTecnico.innerHTML = "";

    // Si la cita tiene el estado de rechazada, no la mostraremos en la tabla
    datos.forEach(function (cita, index) {
        if (cita.estado !== "3") {
            tablaCitasTecnico.innerHTML += `<tr>
        <td>${cita.clientes.nombre}</td>
        <td>${cita.fecha_cita}</td>
        <td>${cita.estado}</td>
        <td><button id="boton-ver-cita">Ver ficha</button></td>
        <td> <button class="boton-eliminar-cita" onclick='eliminarCita(${JSON.stringify(cita)})'></button></td>
      </tr>`;
        }
    });
}



//......................................................................................................................
/* rechazarCita(citaRechazada) */
// .....................................................................................................................

async function eliminarCita(citaEliminada) {
    let filas = tablaCitasTecnico.getElementsByTagName('tr');

    for (let i = filas.length - 1; i >= 0; i--) {
        let fila = filas[i];

        if (
            fila.innerHTML.includes(citaEliminada.nombre) &&
            fila.innerHTML.includes(citaEliminada.fecha_cita)
        ) {
            // Si todos los datos coinciden, esta es la fila que se ha eliminado.
            fila.remove();

            let datos = {
                estado: 3,
                idCita: citaEliminada.id_cita,
            };

            await fetch('../../../api/citas', {
                method: 'delete',
                body: JSON.stringify(datos),
            });

            break; // Rompemos el bucle ya que se ha eliminado la cita.
        }
    }
}

//......................................................................................................................
//......................................................................................................................

// Llamadas de funciones:
escribirTablaCitasTecnico();