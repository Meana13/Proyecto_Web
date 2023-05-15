(async () => {
    const respuesta = await fetch('../../../api/sesion/');
    if(respuesta.ok) {
        const data = await respuesta.json();
        document.getElementById('user-name').innerText = data.nombre;
        document.body.classList.remove("loading");
    } else {
        location.href = '../../../index.html';
    }
})()

async function logout() {
    const respuesta = await fetch('../../../api/sesion/', {
        method: 'delete'
    });
    if(respuesta.ok) {
        location.href = '../../../index.html';
    }
}