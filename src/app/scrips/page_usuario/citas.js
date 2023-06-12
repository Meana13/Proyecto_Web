

/*FUNCION PARA GENERAR LAS TABLAS DE CITAS DEL USUARIO*/

async function generarTablasCitasUsuario(){

    let respuesta = await fetch('../../../api/generarTablaDeCitasUsuario/');
    if(respuesta.ok){
        const datos = await respuesta.json();
        console.log(datos);
    }

}

//generarTablasCitasUsuario();