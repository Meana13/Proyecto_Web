// Obtener todos los elementos del acordeón
const itemsAcordeon = document.querySelectorAll('.item-acordeon');

// Agregar el evento 'click' a cada elemento del acordeón
itemsAcordeon.forEach(item => {
    const pregunta = item.querySelector('.pregunta');
    const respuesta = item.querySelector('.respuesta');

    // Mostrar la primera respuesta inicialmente
    if (itemsAcordeon.length > 0) {
        const primeraRespuesta = itemsAcordeon[0].querySelector('.respuesta');
        primeraRespuesta.style.display = 'block';
    }


    pregunta.addEventListener('click', () => {
        // Verificar si la respuesta ya está mostrada
        const estaMostrado = respuesta.style.display === 'block';

        // Ocultar todas las respuestas
        itemsAcordeon.forEach(item => {
            const respuestaItem = item.querySelector('.respuesta');
            respuestaItem.style.display = 'none';
        });

        // Mostrar la respuesta solo si no estaba mostrada previamente
        if (!estaMostrado) {
            respuesta.style.display = 'block';
        }
    });
});