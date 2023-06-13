<?php

if(!isset($peticion)) {
    http_response_code(500);
    die();
}

require_once 'includes/connexion.php';
if (!isset($connexion)) die();

$notificaciones = intval($peticion->parametrosBody()->notif);
$idHuerto = intval($peticion->parametrosPath()[0]);

$sql = "
UPDATE `huertos` 
SET  `huertos`.`notificaciones` = $notificaciones
WHERE `huertos`.`id_huerto` = $idHuerto";

try {
    mysqli_query($connexion, $sql);
    http_response_code(200);
} catch (Exception $exception) {
    http_response_code(500);
    die(mysqli_errno($connexion));
}
