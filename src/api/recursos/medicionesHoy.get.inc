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
        ROUND(`medicion_salinidad`,1) as `mediaSalinidad`, 
        ROUND(`medicion_humedad`,1) as `mediaHumedad`, 
        ROUND(`medicion_luminosidad`,1) as `mediaLuminosidad`, 
        ROUND(`medicion_ph`,1) as `mediapH`, 
        ROUND(`medicion_temperatura`,1) as `mediaTemperatura`,
       	SUBSTRING( `mediciones`.`hora_medicion`, 1, 2) AS hora, 
        SUBSTRING(`mediciones`.`hora_medicion`, 4, 2) AS minutos 

        FROM `huertos`, `mediciones`
        
        WHERE `huertos`.`id_huerto` = `mediciones`.`id_huerto`
        AND `huertos`.`id_huerto` = $idHuerto
        
        GROUP BY `mediciones`.`fecha_medicion`, `mediciones`.`hora_medicion`
        ORDER BY `mediciones`.`fecha_medicion` DESC, `mediciones`.`hora_medicion` DESC
        LIMIT 4";



$result = mysqli_query($connexion, $sql);
while ($row = mysqli_fetch_assoc($result)) {
    $salida[] = $row;
}