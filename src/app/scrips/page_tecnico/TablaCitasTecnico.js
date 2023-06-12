/**
 * URL a la que se hacen las peticiones
 */
const urlClientes = "../../../api/clientes/";
const urlCitas = "../../../api/citas/";

/**
 * Variables vacías
 */
let limite = 15;

/**
 * Carga los datos del ajuste del usuario
 * @returns ajustesusuario
 */
async function getSesionUsuario() {
    const respuesta = await fetch("../../../api/sesion/");
    if (respuesta.ok) {
        const datosUsuario = await respuesta.json();
        console.log(datosUsuario);
        return datosUsuario;
    }
}

/**
 * Cargar Clientes (limitados a 15 por página)
 */
async function getClientes(npag, limite, filtro) {
    const respuesta = await fetch(urlClientes + "?cantidad=" + limite + "&pagina=" + npag + "&filtro=" + filtro);
    if (respuesta.ok) {
        const datosClientes = await respuesta.json();
        console.log(datosClientes);
        return datosClientes;
    }
}

/**
 * Recibe el filtro introducido en el campo de búsqueda
 */
async function conseguirFiltro() {
    let campoBusqueda = document.getElementById('//');
    let filtro = campoBusqueda.value;
    console.log(filtro);
    return filtro;
};

/**
 * Recibe la página seleccionada en el paginador
 */
async function conseguirPagina() {
    let paginador = document.getElementById('//');
    let pagina = paginador.value;
    console.log(pagina);
    return pagina;
};

/**
 * Genera la tabla de citas basada en la página, límite y filtro
 */
async function generarTablaClientes() {
    let filtro = await conseguirFiltro();
    let pag = await conseguirPagina();
    const datos = await getClientes(pag, limite, filtro);
    console.log(datos);
    let tabla = document.getElementById("//");
    tabla.innerHTML = "";
    datos.forEach((cliente) => {
        tabla.innerHTML += `<tr>
            <td>${cliente.nombre}</td>
            <td>${cliente.fecha_cita}</td>
        </tr>`;
    });
}

/**
 * Filtra la tabla de citas  y la muestra
 */
async function generarTablaClientesFiltrada() {
    let filtro = await conseguirFiltro();
    let pag = await conseguirPagina();
    const datos = await getClientes(pag, limite, filtro);
    console.log(datos);
    let tabla = document.getElementById("//");
    tabla.innerHTML = "";
    datos.forEach((cliente) => {
        tabla.innerHTML += `<tr>
            <td>${cliente.nombre}</td>
            <td>${cliente.fecha_cita}</td>
        </tr>`;
    });
}

/**
 * Función para ver la cita de un cliente
 * @param {number} idCliente - ID del cliente
 */
async function verCita(idCliente) {
    // Aquí puedes implementar la lógica para ver la cita del cliente
}

window.addEventListener("DOMContentLoaded", () => {
    generarTablaClientes();
});