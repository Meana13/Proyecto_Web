//......................................................................................................................
//......................................................................................................................
/*
    ===========================================
    CAMBIO DE MENÚ A MENÚ DE USUARIO REGISTRADO
    ===========================================
                                                */
let nombreUsuarioAdmin = document.getElementById('nombreUsuarioAdministrador');
let nombreUsuarioRegistrado = document.getElementById('nombreUsuarioRegistrado');
let nombreUsuarioTecnico = document.getElementById('nombreUsuarioTecnico');
let nombreUsuarioComercial = document.getElementById('nombreUsuarioComercial');

document.addEventListener('DOMContentLoaded', async function() {
    const sesionIniciada = sessionStorage.getItem('sesionIniciada');
    const rolUsuario = sessionStorage.getItem('rolUsuario');
    const rolAdministrador = sessionStorage.getItem('rolAdmin');
    const rolComercial = sessionStorage.getItem('rolComercial');
    const rolTecnico = sessionStorage.getItem('rolTecnico')

    // Verificar si la sesión está iniciada y si se encuentra en la página correcta
    if (sesionIniciada && rolUsuario) {
        // Mostrar el menú para usuarios
        document.getElementById('header-no-registrado').style.display = 'none';
        document.getElementById('menu-usuario-registrado').style.display = 'flex';
        nombreUsuarioRegistrado.innerText = "";
        let datos = await getSesionIniciada()
        nombreUsuarioRegistrado.innerText = datos.nombre;

    } else if(sesionIniciada && rolAdministrador) {
        document.getElementById('header-no-registrado').style.display = 'none';
        document.getElementById('header-admin').style.display = 'flex';
        nombreUsuarioAdmin.innerText = "";
        let datos = await getSesionIniciada()
        nombreUsuarioAdmin.innerText = datos.nombre;

    }else if(sesionIniciada && rolTecnico) {
        document.getElementById('header-no-registrado').style.display = 'none';
        document.getElementById('header-tecnico').style.display = 'flex';
        nombreUsuarioTecnico.innerText = "";
        let datos = await getSesionIniciada()
        nombreUsuarioTecnico.innerText = datos.nombre;

    }else if(sesionIniciada && rolComercial){
        document.getElementById('header-no-registrado').style.display='none';
        document.getElementById('header-comercial').style.display= 'flex';
        nombreUsuarioComercial.innerText = "";
        let datos = await getSesionIniciada()
        nombreUsuarioComercial.innerText = datos.nombre;
    }

});
//......................................................................................................................
//......................................................................................................................
//......................................................................................................................
/*
            getSesionIniciada()
*/
//......................................................................................................................
async function getSesionIniciada(){
        const respuesta = await fetch('./api/sesion/');
        if(respuesta.ok){
            const datos = await respuesta.json();
            console.log(datos);
            return datos;
        }
}

getSesionIniciada();


