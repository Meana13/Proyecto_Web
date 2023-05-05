function validar() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (usuario === "" || contrasena === "") {
        alert("Por favor, ingrese el usuario y la contraseña");
        return false;
    }
    // Validación de usuarios y contraseñas
    if (username === "usuario" && password === "1234567890") {
        window.location = "../html/page_usuario/page_usuario.html"; // Redirige al usuario a la pagina de usuario
    } else if (username === "admin" && password === "1234567890") {
        window.location.href = "../html/page_admin/page_admin.html"; // Redirige al administrador a la pagina de administrador
    }else if (username === "tecnico" && password === "1234567890") {
        window.location.href = "../html/page_tecnico/page_tecnico.html"; // Redirige al tecnico a la página de tecnico
    }else if (username === "comercial" && password === "1234567890") {
        window.location.href = "../html/page_comercial/page_comercial.html"; // Redirige al comercial a la página  de comercial
    } else {
        alert("Usuario o contraseña incorrectos");
    }

}