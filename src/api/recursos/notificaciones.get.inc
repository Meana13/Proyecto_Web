<?php

if (!isset($peticion)) {
    http_response_code(500);
    die();
}

require_once 'includes/connexion.php';
if (!isset($connexion)) die();

$idHuerto = $peticion->parametrosQuery()['idHuerto'];

$sql = "SELECT * 
        FROM `sondas`
        WHERE `sondas`.`id_huerto` = $idHuerto";

$result = mysqli_query($connexion, $sql);
while ($row = mysqli_fetch_assoc($result)) {
    $salida[] = $row;
}

