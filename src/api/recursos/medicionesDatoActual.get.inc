<?php

if (!isset($peticion)) {
    http_response_code(500);
    die();
}

require_once 'includes/connexion.php';
if (!isset($connexion)) die();

$idHuerto = $peticion->parametrosQuery()['idHuerto'];

$sql = "SELECT 
        `mediciones`.`id_medicion`, 
        `mediciones`.`fecha_medicion`, 
        `mediciones`.`hora_medicion`, 
        ROUND(AVG(`medicion_salinidad`),1) as `mediaSalinidad`, 
        ROUND(AVG(`medicion_humedad`),1) as `mediaHumedad`, 
        ROUND(AVG(`medicion_luminosidad`),1) as `mediaLuminosidad`, 
        ROUND(AVG(`medicion_ph`),1) as `mediapH`, 
        ROUND(AVG(`medicion_temperatura`),1) as `mediaTemperatura`

        FROM `huertos`, `mediciones`
        
        WHERE `huertos`.`id_huerto` = `mediciones`.`id_huerto`
        AND `huertos`.`id_huerto` = $idHuerto
        
        GROUP BY `mediciones`.`fecha_medicion`, `mediciones`.`hora_medicion`
        ORDER BY `mediciones`.`fecha_medicion` DESC, `mediciones`.`hora_medicion` DESC
        LIMIT 1";

$result = mysqli_query($connexion, $sql);
while ($row = mysqli_fetch_assoc($result)) {
    $salida[] = $row;
}
