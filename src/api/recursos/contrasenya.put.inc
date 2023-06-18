<?php
if (!isset($peticion)) {
    http_response_code(500);
    die();
}
require_once 'includes/connexion.php';
if (!isset($connexion)) die();
$contrasenya=$peticion->parametrosQuery()['clave'];
$email=$peticion->parametrosQuery()['email'];

$sql = "UPDATE usuarios
        SET password = '$contrasenya'
        WHERE id_usuario= (
            SELECT clientes.id_usuario
            FROM clientes
            WHERE email = '$email'
        )";


try {
    mysqli_query($connexion, $sql);
    http_response_code(200);
} catch (Exception $exception) {
    http_response_code(500);
    die(mysqli_errno($connexion));
}