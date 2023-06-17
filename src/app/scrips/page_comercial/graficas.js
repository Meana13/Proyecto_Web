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
        let datosCorrectos = generarDatosQueFaltan(datos);
        return datosCorrectos;
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
            legend: false,
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

    graficaBase.options = opcionesSemana;
    graficaBase.data = datosSemana;
    graficaBase.update();
}//()
//......................................................................................................................
//......................................................................................................................
//.......................................................
/*
               crearGraficaMes()
*/
//.......................................................
async function crearGraficaMes(){
    let datos = await getVentasParaGrafica();

    let datosMes = {
        labels: [],
        datasets: [
            {
                label: "Importe",
                data: [],
                backgroundColor: ' #790050',
            }
        ]
    } //datos

    let opcionesMes = {
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
            legend: false,
            title: {
                display: true,
                text: 'Ventas del mes',
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

    for (let i = 29; i >= 0; i--) {
        datosMes.labels.push(fechasParaGrafica[i]);
        datosMes.datasets[0].data.push(datos[i].total);
    }

    graficaBase.options = opcionesMes;
    graficaBase.data = datosMes;
    graficaBase.update();
}//()
//......................................................................................................................
//......................................................................................................................
//.......................................................
/*
               crearGraficaMeses()
*/
//.......................................................
async function crearGraficaMeses(){
    let datos = await getVentasParaGrafica();

    let arrayImporte = [0,0,0,0,0,0,0,0,0,0,0,0];

    datos.forEach(function(venta){
        if (venta.fecha[5] == 0 && venta.fecha[6] == 1) {
            arrayImporte[0] = arrayImporte[0] + parseInt(venta.total);
        }
        if (venta.fecha[5] == 0 && venta.fecha[6] == 2) {
            arrayImporte[1] = arrayImporte[1] + parseInt(venta.total);
        }
        if (venta.fecha[5] == 0 && venta.fecha[6] == 3) {
            arrayImporte[2] = arrayImporte[2] + parseInt(venta.total);
        }
        if (venta.fecha[5] == 0 && venta.fecha[6] == 4) {
            arrayImporte[3] = arrayImporte[3] + parseInt(venta.total);
        }
        if (venta.fecha[5] == 0 && venta.fecha[6] == 5) {
            arrayImporte[4] = arrayImporte[4] + parseInt(venta.total);
        }
        if (venta.fecha[5] == 0 && venta.fecha[6] == 6) {
            arrayImporte[5] = arrayImporte[5] + parseInt(venta.total);
        }
        if (venta.fecha[5] == 0 && venta.fecha[6] == 7) {
            arrayImporte[6] = arrayImporte[6] + parseInt(venta.total);
        }
        if (venta.fecha[5] == 0 && venta.fecha[6] == 8) {
            arrayImporte[7] = arrayImporte[7] + parseInt(venta.total);
        }
        if (venta.fecha[5] == 0 && venta.fecha[6] == 9) {
            arrayImporte[8] = arrayImporte[8] + parseInt(venta.total);
        }
        if (venta.fecha[5] == 1 && venta.fecha[6] == 0) {
            arrayImporte[9] = arrayImporte[9] + parseInt(venta.total);
        }
        if (venta.fecha[5] == 1 && venta.fecha[6] == 1) {
            arrayImporte[10] = arrayImporte[10] + parseInt(venta.total);
        }
        if (venta.fecha[5] == 1 && venta.fecha[6] == 2) {
            arrayImporte[11] = arrayImporte[11] + parseInt(venta.total);
        }
    })

    let datosMes = {
        labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
        datasets: [
            {
                label: "Importe",
                data: arrayImporte,
                backgroundColor: ' #790050',
            }
        ]
    } //datos

    let opcionesMes = {
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
            legend: false,
            title: {
                display: true,
                text: 'Ventas del año',
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

    graficaBase.options = opcionesMes;
    graficaBase.data = datosMes;
    graficaBase.update();
}//()
//......................................................................................................................
//......................................................................................................................
//.......................................................
/*
               crearGraficaAnios()
*/
//.......................................................
async function crearGraficaAnios(){
    let datos = await getVentasParaGrafica();

    let arrayImporte = [0, 0, 0, 0, 0];

    datos.forEach(function(venta){

        if (venta.fecha[3] == 0) {
            arrayImporte[0] = arrayImporte[0] + parseInt(venta.total);
        }
        if (venta.fecha[3] == 1) {
            arrayImporte[1] = arrayImporte[1] + parseInt(venta.total);
        }
        if (venta.fecha[3] == 2) {
            arrayImporte[2] = arrayImporte[2] + parseInt(venta.total);
        }
        if (venta.fecha[3] == 3) {
            arrayImporte[3] = arrayImporte[3] + parseInt(venta.total);
        }
        if (venta.fecha[3] == 4) {
            arrayImporte[4] = arrayImporte[4] + parseInt(venta.total);
        }
    })

    let datosAnios = {
        labels: ["2020", "2021", "2022", "2023", "2024"],
        datasets: [
            {
                label: "Importe",
                data: arrayImporte,
                backgroundColor: ' #790050',
            }
        ]
    } //datos

    let opcionesAnios = {
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
            legend: false,
            title: {
                display: true,
                text: 'Ventas anuales',
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

    graficaBase.options = opcionesAnios;
    graficaBase.data = datosAnios;
    graficaBase.update();
}//()
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
         datos --> generarDatosQueFaltan() --> datos

queremos que en las fechas donde no haya registro de ventas, es decir, que las ventas de ese día son 0,
se representen en la gráfica. Por ello hemos de coger los datos y mirar si faltan fechas, si faltan, hemos
de mostrar el importe de ese día como 0.
*/
//.......................................................
function generarDatosQueFaltan(datos) {
    let fechasGeneradas = [];

    let fechaInicial = new Date(datos[datos.length - 1].fecha);
    let fechaFinal = new Date(datos[0].fecha);
    let fechaActual = new Date(fechaInicial);
    fechaActual.setDate(fechaActual.getDate() + 1);

    fechasGeneradas.push(new Date(fechaInicial), new Date(fechaActual));

    while (fechaActual < fechaFinal) {
        fechaActual.setDate(fechaActual.getDate() + 1);
        if(fechaActual < fechaFinal){
            fechasGeneradas.push(new Date(fechaActual));
        }
    }

    let fechasDeDatos = datos.map(function(dato){
        return dato.fecha;
    })

    for(let i = 0; i<fechasGeneradas.length; i++){

        if(!fechasDeDatos.includes(convertirFechaAFormatoString(fechasGeneradas[i]))){
            datos.push({
                fecha: convertirFechaAFormatoString(fechasGeneradas[i]),
                total: 0
            })
        }
    }

    let datosOrdenados = ordenarPorFechaDescendente(datos);
    return datosOrdenados;
}
//......................................................................................................................
//......................................................................................................................
//.......................................................
/*
         fecha: Date --> convertirFechaAFormatoString() --> txt
*/
//.......................................................

function convertirFechaAFormatoString(fecha) {
    const anio = fecha.getFullYear();
    const mes = String(fecha.getMonth() + 1).padStart(2, '0'); // Agrega un cero al mes si es necesario
    const dia = String(fecha.getDate()).padStart(2, '0'); // Agrega un cero al día si es necesario

    const fechaString = `${anio}-${mes}-${dia}`;

    return fechaString;
}
//......................................................................................................................
//......................................................................................................................
//.......................................................
/*
         datos --> ordenarPorFechaDescendente() --> datos
*/
//.......................................................
function ordenarPorFechaDescendente(datos) {
    return datos.sort((a, b) => {
        const fechaA = new Date(a.fecha);
        const fechaB = new Date(b.fecha);

        return fechaB - fechaA;
    });
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
//.......................................................
/*
                    SELECTOR: MES
*/
//.......................................................
selector.addEventListener('change', function(){
    if(selector.value === "mes"){
        crearGraficaMes();
    }
})
//......................................................................................................................
//......................................................................................................................
//.......................................................
/*
                    SELECTOR: AÑO
*/
//.......................................................
selector.addEventListener('change', function(){
    if(selector.value === "anio"){
        crearGraficaMeses();
    }
})
//......................................................................................................................
//......................................................................................................................
//.......................................................
/*
                    SELECTOR: AÑOS
*/
//.......................................................
selector.addEventListener('change', function(){
    if(selector.value === "anios"){
        crearGraficaAnios();
    }
})
//......................................................................................................................
//......................................................................................................................
//LLAMADA DE FUNCIONES:
crearGraficaSemana();


