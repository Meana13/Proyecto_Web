const btnRegresarInicio = document.getElementById('btn-regresar-inicio');

btnRegresarInicio.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});