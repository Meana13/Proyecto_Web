function validarFormulario(event) {
    event.preventDefault(); // previene el envío del formulario por defecto
    const usuario = document.getElementById("usuario").value;
    const contrasenya = document.getElementById("contrasenya").value;
    const usuariosGuardados = {
        // aquí se añadirían los usuarios y contraseñas guardados en la carpeta "usuarios"
        admin: "1234567890",
        tecnico: "1234567890",
        usuario: "1234567890",
        comercial:"1234567890",
    };
    if (usuario === "usuario" && usuariosGuardados[usuario] === contrasenya) {
        window.location.href = "../../app/html/page_usuario/page_usuario.html"; // redirecciona a la página de carga si el usuario y contraseña son correctos
    } else if (usuario === "admin" && contrasenya === usuariosGuardados[usuario]) {
        window.location.href = "../../app/html/page_admin/page_admin.html";
    } else if (usuario === "tecnico" && contrasenya === usuariosGuardados[usuario]) {
        window.location.href = "../../app/html/page_tecnico/page_tecnico.html";
    } else if (usuario == "comercial" && contrasenya === usuariosGuardados[usuario]) {
        window.location.href = "../../app/html/page_comercial/page_comercial.html";
    } else {
        const popup = document.getElementById("popup");
        popup.style.display = "block"; // muestra el popup si el usuario y contraseña son incorrectos
        const cerrarPopup = document.getElementById("cerrar-popup");
        cerrarPopup.addEventListener("click", () => {
            popup.style.display = "none"; // cierra el popup cuando se clica en el botón de cerrar
        });
    }
}