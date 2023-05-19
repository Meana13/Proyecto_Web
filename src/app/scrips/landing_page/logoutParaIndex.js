
async function logout() {
    const respuesta = await fetch('api/sesion/', {
        method: 'delete'
    });
    if(respuesta.ok) {
        // borramos cookies y enviar al usuario a la landing page
        sessionStorage.clear();
        location.href = 'index.html';
    }
}