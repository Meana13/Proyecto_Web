// Obtiene las opiniones desde la base de datos
async function getOpiniones() {
    const respuesta = await fetch('../../../api/opiniones/');
    if (respuesta.ok) {
        const datos = await respuesta.json();
        console.log('Prueba' + datos);
        return datos;
    }
}

// Genera el HTML para mostrar las opiniones con las estrellas correspondientes
async function mostrarOpiniones() {
    let opiniones = await getOpiniones();
    let contenedorOpiniones = document.getElementById('opiniones');
    contenedorOpiniones.innerHTML = '';

    opiniones.forEach(function(opinion, index) {
        let estrellas = '';
        for (let i = 0; i < opinion.num_estrellas; i++) {
            estrellas += `<img src="../../../images/estrella.svg" alt="Estrella">`;
        }
        let mediaEstrella = opinion.num_estrellas % 1 === 0.5 ? '<img src="../../../images/media-estrella.svg" alt="Media estrella" id="media-estrella">' : '';

        let opinionHTML = `
        <div class="caja-opinion" id="opinion${index + 1}">
            <img src="../../../images/icono-opinion-usuario.svg" alt="Opinion de usuario" class="icono-opinion">
            <div class="datos-opinion">
                <label class="fecha-instalacion">Instalación: ${opinion.fecha_instalacion}</label>
                <br>
                <label class="n-instalacion">#${index + 1}</label>
                <div class="estrellas">
                    ${estrellas}
                    ${mediaEstrella}
                </div>
            </div>
            <textarea readonly class="opinion">${opinion.texto}</textarea>
        </div>
        `;

        contenedorOpiniones.innerHTML += opinionHTML;
    });
}

// Llama a la función para mostrar las opiniones
mostrarOpiniones();