
//---------------------------------------
/*
Función login():
*/
//---------------------------------------

document.getElementById("login-form").addEventListener('submit', login);

/**
 * Se ejecutará cuando se envíe el formulario.
 * Puesto que se usa fetch, es una función asíncrona
 * @param event Objeto con información del evento.
 */
async function login(event) {
    // eliminamos el mensaje de error previo, si lo hay
    const output = document.getElementById("output");
    output.classList.remove("error");

    event.preventDefault();
    const formData = new FormData(event.target);

    const respuesta = await fetch('api/sesion/', {
        method: 'post',
        body: formData
    })

    // si el resultado de la petición es OK (i.e. código HTTP 200)
    if (respuesta.ok) {

        //obtenemos los datos que nos devuelve el servidor:
        const data = await respuesta.json();

        //según el rol del usuario que inicie sesión, se traslada a una página o a otra:
        if(data.rol === "usuario"){
            location.href = 'app/html/page_usuario/page_usuario.html';
        }

        if(data.rol === "administrador"){
            location.href = 'app/html/page_admin/page_admin.html';
        }

        if(data.rol === "comercial"){
            location.href = 'app/html/page_comercial/page_comercial.html';
        }

        if(data.rol === "tecnico"){
            location.href = 'app/html/page_tecnico/page_tecnico.html';
        }

    }
    // si el resultado de la petición no es ok, mostramos un mensaje de error
    else {
        output.innerText = "Credenciales no válidas";
        output.classList.add("error");
    }
}



