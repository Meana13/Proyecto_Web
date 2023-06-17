<?php

if (!isset($peticion)) {
    http_response_code(500);
    die();
}

require_once 'includes/connexion.php';
if (!isset($connexion)) {
    die();
}

$nombre = $peticion->parametrosBody()->nombre;
$fecha = $peticion->parametrosBody()->fecha;
$motivo = $peticion->parametrosBody()->motivo;
$idCita = intval($peticion->parametrosBody()->idCita);

$sql = "UPDATE `citas`
        SET nombre = $nombre, fecha_cita = $fecha, asunto = $motivo
        WHERE id_cita = $idCita";

try {
    mysqli_query($connexion, $sql);
    http_response_code(200);
} catch (Exception $exception) {
    http_response_code(500);
    die(mysqli_errno($connexion));
}

