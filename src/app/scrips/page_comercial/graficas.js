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
                getVentasParaGrafica() --> datos
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
async function getVentasParaGrafica(){
    const respuesta = await fetch('../../../api/ventas/' + '?senyal=' + 1);
    if(respuesta.ok){
        const datos = await respuesta.json();
        return datos;
    }
}
//......................................................................................................................
//......................................................................................................................
//.......................................................
/*
               Grafica base
*/
//.......................................................
let graficaBase = new Chart (grafica, {
    type: 'bar'
})
//......................................................................................................................
//......................................................................................................................
//.......................................................
/*
               crearGraficaSemana()
*/
//.......................................................
async function crearGraficaSemana(){
    let datos = await getVentasParaGrafica();
    console.log(datos);

    let datosSemana = {
        labels: [],
        datasets: [
            {
                label: "Importe",
                data: [],
                backgroundColor: ' #790050',
            }
        ]
    } //datos

    let opcionesSemana = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                grid: {
                    drawOnChartArea: false
                },
                ticks: {
                    font: {
                        size: 15
                    }
                }
            },
            y: {
                ticks: {
                    font: {
                        size: 15
                    }
                }
            },
        },
        plugins: {
            legend: {
                position: 'bottom',
                align: 'end',
                labels: {
                    font: {
                        size: 15
                    }
                }
            },
            title: {
                display: true,
                text: 'Ventas semanales',
                position: 'top',
                align: 'center',
                font: {
                    size: 15
                }
            },
            tooltip: {
                backgroundColor: '#fff',
                titleColor: '#000',
                titleAlign: 'center',
                bodyColor: '#333',
                borderColor: '#666',
                borderWidth: 1,
            }


        }//plugins
    }//opciones



    let fechasParaGrafica = datos.map(function(dato){
        return formatearFecha(dato.fecha);
    });

    for (let i = 6; i >= 0; i--) {
        datosSemana.labels.push(fechasParaGrafica[i]);
        datosSemana.datasets[0].data.push(datos[i].total);
    }

    console.log(datosSemana.labels);
    console.log(datosSemana.datasets[0].data);

    graficaBase.options = opcionesSemana;
    graficaBase.data = datosSemana;
    graficaBase.update();



}//()

   /*
        for (let i = 3; i >= 0; i--) {
            datosSalinidadHoy.labels.push(horas[i]);
            datosSalinidadHoy.datasets[0].data.push(mediciones[i].mediaSalinidad);
        }

        miGraficaSal.options = opcionesSalinidadHoy;
        miGraficaSal.data = datosSalinidadHoy;
        miGraficaSal.update();*/
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
                    SELECTOR: SEMANA
*/
//.......................................................
selector.addEventListener('change', function(){
    if(selector.value === "semana"){
        crearGraficaSemana();
    }
})

//......................................................................................................................
//......................................................................................................................
//LLAMADA DE FUNCIONES:
crearGraficaSemana();


