//......................................................................................................................
/*                                            SECCIÓN GRÁFICAS VENTAS COMERCIAL                                           */
//......................................................................................................................
//......................................................................................................................
//......................................................................................................................
//DECLARACIÓN DE VARIABLES:
//selector:
let selector = document.getElementById('selector-opciones-graficas');
//grafica:
let grafica = document.getElementById('chart');
//......................................................................................................................
//......................................................................................................................
//.......................................................
/*
               senyal--> getVentasParaGrafica() --> datos
                                                       _____datos_____
                                                       id_venta: N
                                                       id_cliente: N
                                                       productos: N
                                                       fecha: txt
                                                       id_usuario: N
                                                       nombre: txt
                                                       apellidos: txt
                                                       email: txt
                                                       id_producto: N
                                                       nombre_producto:txt
                                                       descripcion_producto: txt
                                                       precio: txt
                                                       _______________
*/
//.......................................................
async function getVentasParaGrafica(senyal){
    console.log("ventas: " + senyal);
    const respuesta = await fetch('../../../api/ventas/' + '?senyal=' + senyal);
    if(respuesta.ok){
        const datos = await respuesta.json();
        return datos;
    }
}
//.......................................................
/*
               crearGraficaSemana()
*/
//.......................................................
async function crearGraficaSemana(){
    let datos = await getVentasParaGrafica(1);
    console.log(datos);
}

crearGraficaSemana();

