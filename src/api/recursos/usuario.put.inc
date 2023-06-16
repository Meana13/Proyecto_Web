<?php

if(!isset($peticion)) {
    http_response_code(500);
    die();
}

require_once 'includes/connexion.php';
if (!isset($connexion)) die();

$idUsuario = intval($peticion->parametrosPath()[0]);


if(isset($peticion->parametrosBody()->password)){

    $password = $peticion->parametrosBody()->password;

    $sql = "UPDATE `usuarios`
        SET password = '$password'
        WHERE id_usuario = $idUsuario";

    try {
        mysqli_query($connexion, $sql);
        http_response_code(200);
    } catch (Exception $exception) {
        http_response_code(500);
        die(mysqli_errno($connexion));
    }
}

else if(isset($peticion->parametrosBody()->nombre)) {

    $nombre = $peticion->parametrosBody()->nombre;

    $sql = "UPDATE `usuarios`
        SET nombre = '$nombre'
        WHERE id_usuario = $idUsuario";

    try {
        mysqli_query($connexion, $sql);
        http_response_code(200);
    } catch (Exception $exception) {
        http_response_code(500);
        die(mysqli_errno($connexion));
    }

}
