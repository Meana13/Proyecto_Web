//......................................................................................................................
/* SECCIÓN CITAS USUARIO REGISTRADO */
//......................................................................................................................

// DECLARACIÓN DE VARIABLES:
let tablaCitasTecnico = document.getElementById('tablaCitasTecnico');



//......................................................................................................................
/* getCitas() --> [datos] */
// .....................................................................................................................

async function getCitas() {
    const respuesta = await fetch('../../../api/citasTecnico/');
    if (respuesta.ok) {
        const datos = await respuesta.json();
        console.log('Prueba'+datos);
        return datos;
    }
}



//......................................................................................................................
// escribirTablaCitas() //
// .....................................................................................................................

async function escribirTablaCitasTecnico() {

    let datos = await getCitas();

    tablaCitasTecnico.innerHTML = "";

    // Si la cita tiene el estado de rechazada, no la mostraremos en la tabla
    datos.forEach(function (cita) {

            tablaCitasTecnico.innerHTML += `<tr>
        <td>${cita.nombre}</td>
        <td>${cita.fecha_cita}</td>
        <td>${cita.estado}</td>
        <td><button id="boton-ver-cita">Ver ficha</button></td>
        <td> <button class="boton-eliminar-cita" onclick='eliminarCita(${JSON.stringify(cita)})'></button></td>
      </tr>`;

    });
}



//......................................................................................................................
// rechazarCita(citaRechazada) //
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

            await fetch('../../../api/citasTecnico'+'?idCita='+ citaEliminada.id_cita, {
                method: 'delete'

            });

            break; // Rompemos el bucle ya que se ha eliminado la cita.
        }
    }
}

//......................................................................................................................
//......................................................................................................................

// Llamadas de funciones
escribirTablaCitasTecnico();