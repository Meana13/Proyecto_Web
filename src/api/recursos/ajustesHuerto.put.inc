<?php
if(!isset($peticion)) {
    http_response_code(500);
    die();
}

require_once 'includes/connexion.php';
if (!isset($connexion)) die();

$nombreNuevo = $peticion->parametrosBody()->nombreNuevo;
$idHuerto = intval($peticion->parametrosBody()->idHuerto);
$notasNuevas = $peticion->parametrosBody()->notasNuevas;

$sql = "
UPDATE `huertos` 
SET `huertos`.`nombre_huerto` = '$nombreNuevo', `huertos`.`notas` = '$notasNuevas'
WHERE `huertos`.`id_huerto` = $idHuerto";

try {
    mysqli_query($connexion, $sql);
    http_response_code(200);
} catch (Exception $exception) {
    http_response_code(500);
    die(mysqli_errno($connexion));
}
