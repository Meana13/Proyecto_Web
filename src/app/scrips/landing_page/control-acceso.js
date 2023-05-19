(async () => {
    const respuesta = await fetch('../../../api/sesion/');
    if(respuesta.ok) {
        const data = await respuesta.json();
    } else {
        location.href = '../../../index.html';
    }
})()

async function logout() {
    const respuesta = await fetch('../../../api/sesion/', {
        method: 'delete'
    });
    if(respuesta.ok) {
        sessionStorage.clear();
        location.href = '../../../index.html';
    }
}