
async function logout() {
    const respuesta = await fetch('api/sesion/', {
        method: 'delete'
    });
    if(respuesta.ok) {
        sessionStorage.clear();
        location.href = 'index.html';
    }
}