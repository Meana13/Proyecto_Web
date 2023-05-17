let
    datos = {labels: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes','Sábado','Domingo'],
        datasets: [
            {
                label: 'ventas',
                data: [100, 234, 45, 210, 430],
                fill: true,
                backgroundColor: 'rgba(255,69,34,.5)',
                borderColor: 'rgb(255,110,86)',
                borderDash: [2,3],
                tension: 0,
                pointStyle: 'rectRot',
                pointRadius: 10,
            }
        ]};
let
    opciones = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {stacked: true
            }
        },
        plugins: {
            legend: false,
            title: {
                display: false,
                text: 'Ventas de la semana'
            },
            tooltip: {
                backgroundColor: '#fff',
                titleColor: '#000',
                titleAlign: 'center',
                bodyColor: '#333',
                borderColor: '#666',
                borderWidth: 1,
            }
        },

    };
let
    ctx = document.getElementById('chart_sal');
    ctx2 =document.getElementById('chart_humedad');
    ctx3 = document.getElementById('chart_pH');
    ctx4 =document.getElementById('chart_temperatura');
    ctx5 = document.getElementById('chart_luz');

let sal = new Chart(
        ctx, {
            type: 'line',
            data:
            datos,
            options:
            opciones
        });

let humedad = new Chart(
    ctx2, {
        type: 'line',
        data:
        datos,
        options:
        opciones
    });
let  pH= new Chart(
    ctx3, {
        type: 'line',
        data:
        datos,
        options:
        opciones
    });
let  temperatura = new Chart(
    ctx4, {
        type: 'line',
        data:
        datos,
        options:
        opciones
    });
let luz = new Chart(
    ctx5, {
        type: 'line',
        data:
        datos,
        options:
        opciones
    });
hey