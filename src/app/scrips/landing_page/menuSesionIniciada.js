/*
    ===========================================
    CAMBIO DE MENÚ A MENÚ DE USUARIO REGISTRADO
    ===========================================
                                                */

document.addEventListener('DOMContentLoaded', function() {
    const sesionIniciada = sessionStorage.getItem('sesionIniciada');
    const rolUsuario = sessionStorage.getItem('rolUsuario');
    const rolAdministrador = sessionStorage.getItem('rolAdmin');
    const rolComercial = sessionStorage.getItem('rolComercial');
    const rolTecnico = sessionStorage.getItem('rolTecnico')

    // Verificar si la sesión está iniciada y si se encuentra en la página correcta
    if (sesionIniciada && rolUsuario) {
        // Mostrar el menú para usuarios
        document.getElementById('header-no-registrado').style.display = 'none';
        document.getElementById('menu-usuario-registrado').style.display = 'block';

    } else if(sesionIniciada && rolAdministrador) {
        document.getElementById('header-no-registrado').style.display = 'none';
        document.getElementById('header-admin').style.display = 'block';

    }else if(sesionIniciada && rolTecnico) {
        document.getElementById('header-no-registrado').style.display = 'none';
        document.getElementById('header-tecnico').style.display = 'block';

    }else if(sesionIniciada && rolComercial){
        document.getElementById('header-no-registrado').style.display='none';
        document.getElementById('header-comercial').style.display= 'block';
    }

});


