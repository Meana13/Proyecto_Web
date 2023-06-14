<?php

if(!isset($peticion)) {
    http_response_code(500);
    die();
}

require_once 'includes/connexion.php';
if (!isset($connexion)) die();

$idHuerto = intval($peticion->parametrosPath()[0]);
$salinidadMinNueva = intval($peticion->parametrosBody()->salinidadMinNueva);
$salinidadMaxNueva = intval($peticion->parametrosBody()->salinidadMaxNueva);
$humedadMinNueva = intval($peticion->parametrosBody()->humedadMinNueva);
$humedadMaxNueva = intval($peticion->parametrosBody()->humedadMaxNueva);
$phMinNuevo = intval($peticion->parametrosBody()->phMinNuevo);
$phMaxNuevo = intval($peticion->parametrosBody()->phMaxNuevo);
$temperaturaMinNueva = intval($peticion->parametrosBody()->temperaturaMinNueva);
$temperaturaMaxNueva = intval($peticion->parametrosBody()->temperaturaMaxNueva);
$luzMinNueva = intval($peticion->parametrosBody()->luzMinNueva);
$luzMaxNueva = intval($peticion->parametrosBody()->luzMaxNueva);

$sql = "
UPDATE `notificaciones` 
SET  
    medicion_min_salinidad = $salinidadMinNueva, 
    medicion_max_salinidad = $salinidadMaxNueva,
    medicion_min_humedad = $humedadMinNueva,
    medicion_max_humedad = $humedadMaxNueva,
    medicion_min_ph = $phMinNuevo,
    medicion_max_ph = $phMaxNuevo,
    medicion_min_temperatura = $temperaturaMinNueva,
    medicion_max_temperatura = $temperaturaMaxNueva,
    medicion_min_luminosidad = $luzMinNueva,
    medicion_max_luminosidad = $luzMaxNueva
    
WHERE `notificaciones`.`id_huerto` = $idHuerto";

try {
    mysqli_query($connexion, $sql);
    http_response_code(200);
} catch (Exception $exception) {
    http_response_code(500);
    die(mysqli_errno($connexion));
}
