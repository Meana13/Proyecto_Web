<?php
if(!isset($peticion)) {
    http_response_code(500);
    die();
}

require_once 'includes/connexion.php';
if (!isset($connexion)) die();

$id =$peticion->parametrosBody()->id;
$nombre = $peticion->parametrosBody()->nombre;
$apellidos =$peticion->parametrosBody()->apellidos;
$email =$peticion->parametrosBody()->email;
$direccion =$peticion->parametrosBody()->direccion;
 $sql = "UPDATE clientes
             SET nombre = '$nombre', apellidos = '$apellidos', email = '$email', direccion = '$direccion'
             WHERE id_usuario = $id";
try {
    mysqli_query($connexion, $sql);
    http_response_code(200);
} catch (Exception $exception) {
    http_response_code(500);
    die(mysqli_errno($connexion));
}



