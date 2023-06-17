<?php

if(!isset($peticion)) {
    http_response_code(500);
    die();
}

require_once 'includes/connexion.php';
if (!isset($connexion)) die();

$idCliente = intval($peticion->parametrosPath()[0]);
$nombre = $peticion->parametrosBody()->nombre;
$apellidos = $peticion->parametrosBody()->apellidos;
$email = $peticion->parametrosBody()->email;

$sql = "UPDATE `clientes`
        SET 
            nombre = '$nombre',
            apellidos = '$apellidos',
            email = '$email'
        WHERE id_cliente = $idCliente";

try {
    mysqli_query($connexion, $sql);
    http_response_code(200);
} catch (Exception $exception) {
    http_response_code(500);
    die(mysqli_errno($connexion));
}
