//......................................................................................................................
/*                                            SECCIÓN VENTAS COMERCIAL                                           */
//......................................................................................................................
//......................................................................................................................
//......................................................................................................................
//DECLARACIÓN DE VARIABLES:
//secciones:
let seccionSolicitudesGnral = document.getElementById('solicitudes');
let seccionVentasGnral = document.getElementById('ventas');
let seccionListaVentas = document.getElementById('lista-ventas');
let seccionGraficas = document.getElementById('graficas-ventas');
let seccionVerVenta = document.getElementById('ver-venta');
//Botones:
let botonVentasHeader = document.getElementById('boton-ventas');
let botonGraficas = document.getElementById('boton-graficas');
let botonListaVentas = document.getElementById('boton-lista-ventas');
//Tablas:
let tablaVentas = document.getElementById('tabla-ventas');
let paginadorVentas = document.getElementById('paginadorVentas');
//Sección ver Venta:
let botonVolverAVentas = document.getElementById('boton-volver-a-lista-ventas');
let verVentaFecha = document.getElementById('fecha-venta');
let verVentaNombre = document.getElementById('nombre-venta');
let verVentaApellidos = document.getElementById('apellidos-venta');
let verVentaEmail = document.getElementById('email-venta');
let verVentaProducto = document.getElementById('producto-venta');
let verVentaImporte = document.getElementById('importe-venta');

//......................................................................................................................
//......................................................................................................................
//.......................................................
/*
            getSesionComercial()
*/
//.......................................................
async function getSesionComercial(){
    const respuesta = await fetch('../../../api/sesion/');
    if(respuesta.ok){
        const datos = await respuesta.json();
        console.log(datos);
        return datos;
    }
}
//......................................................................................................................
//......................................................................................................................
//.......................................................
/*
            escribirNombreComercial()
*/
//.......................................................
async function escribirNombreComercial(){
   let datos = await getSesionComercial();
   document.getElementById('nombre_comercial_header').innerText = "";
   document.getElementById('nombre_comercial_header').innerText = datos.nombre;
}
escribirNombreComercial();

//......................................................................................................................
//......................................................................................................................
//.......................................................
/*
          BOTÓN VENTAS HEADER
*/
//.......................................................
botonVentasHeader.addEventListener('click', function(){
    escribirTablaVentas();
    seccionSolicitudesGnral.style.display = "none";
    seccionVentasGnral.style.display = "block";
})
//......................................................................................................................
//......................................................................................................................
//.......................................................
/*
                    BOTÓN VENTAS
*/
//.......................................................
botonListaVentas.addEventListener('click', function(){
    escribirTablaVentas();
    seccionListaVentas.style.display = "block";
    seccionGraficas.style.display = "none";
})
//......................................................................................................................
//......................................................................................................................
//.......................................................
/*
                    BOTÓN GRÁFICAS
*/
//.......................................................
botonGraficas.addEventListener('click', function(){
    seccionGraficas.style.display = "block";
    seccionListaVentas.style.display = "none";
})
//......................................................................................................................
//......................................................................................................................
//.......................................................
/*
                getVentas() --> datos
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
async function getVentas(pagina ){
    console.log("pagina:" + pagina)
    const respuesta = await fetch('../../../api/ventas/'
        + '?senyal=' + 3
        + '&pagina=' + pagina
        + '&cantidad=' + 10);

    if(respuesta.ok){
        const datos = await respuesta.json();
        return datos;
    }
}
//......................................................................................................................
//......................................................................................................................
//.......................................................
/*
                getPaginadorVentas()

*/
//.......................................................
async function getPaginadorVentas(){

    const respuesta = await fetch('../../../api/ventas/'
        + '?senyal=' + 2
        + '&cantidad=' + 10);

    if(respuesta.ok){
        const datos = await respuesta.json();
        console.log("paginadorVentas: " + datos);
        for (let i = 1; i <= datos.paginas; i++) {
            const opt = document.createElement('option');
            opt.value = i;
            opt.innerText = i;
            paginadorVentas.appendChild(opt);
        }
    }
    paginadorVentas.addEventListener('change', async () => {
        let datos = await getVentas(paginadorVentas.value);
        console.log(datos);

    })
}




getPaginadorVentas();

//......................................................................................................................
//......................................................................................................................
//.......................................................
/*
                escribirTablaVentas()
*/
//.......................................................
async function escribirTablaVentas() {
    let pagina = 1;
    let datos = await getVentas(pagina);

    tablaVentas.innerHTML = "";

    datos.forEach(function(venta){
        let fecha = formatearFecha(venta.fecha);
        tablaVentas.innerHTML += `<tr>
            <td>${venta.email}</td>
            <td>${venta.nombre_producto}</td>
            <td>${venta.precio}</td>
            <td>${fecha}</td>
            <td><button onclick='verVenta(${JSON.stringify(venta)})'>VER VENTA</button></td>
        </tr>`
    })
}
//......................................................................................................................
//......................................................................................................................
//.......................................................
/*
         fecha:txt --> formatearFecha() --> txt
*/
//.......................................................
function formatearFecha(fechaMal) {
    let partes = fechaMal.split("-");
    var anio = partes[0];
    var mes = partes[1];
    var dia = partes[2];

    var fechaBien = dia + "/" + mes + "/" + anio;
    return fechaBien;
}
//......................................................................................................................
//......................................................................................................................
//.......................................................
/*
         venta --> verVenta()
*/
//.......................................................
function verVenta(venta) {
    seccionVentasGnral.style.display = "none";
    seccionVerVenta.style.display = "block";
    seccionListaVentas.style.display = "none";
    seccionGraficas.style.display = "none";

    let fecha = formatearFecha(venta.fecha);

    verVentaFecha.innerText = fecha;
    verVentaNombre.innerText = venta.nombre;
    verVentaApellidos.innerText = venta.apellidos;
    verVentaEmail.innerText = venta.email;
    verVentaProducto.innerText = venta.nombre_producto;
    verVentaImporte.innerText = venta.precio;
}
//......................................................................................................................
//......................................................................................................................
//.......................................................
/*
         BOTÓN VOLVER A VENTAS:
*/
//.......................................................
botonVolverAVentas.addEventListener('click', function(){
    seccionVentasGnral.style.display = "block";
    seccionVerVenta.style.display = "none";
    seccionListaVentas.style.display = "block";
    seccionGraficas.style.display = "none";
})




