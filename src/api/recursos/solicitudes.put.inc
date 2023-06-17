<?php

if(!isset($peticion)) {
    http_response_code(500);
    die();
}

require_once 'includes/connexion.php';
if (!isset($connexion)) die();

$idConsulta = intval($peticion->parametrosPath()[0]);
$estado = $peticion->parametrosBody()->estado;

$sql = "UPDATE `consultas`
        SET `estado_consulta` = $estado
        WHERE `id_consulta` = $idConsulta ";

try {
        mysqli_query($connexion, $sql);
        http_response_code(200);
} catch (Exception $exception) {
        http_response_code(500);
        die(mysqli_errno($connexion));
}




