<?php

if (!isset($peticion)) {
    http_response_code(500);
    die();
}

require_once 'includes/connexion.php';
if (!isset($connexion)) {
    die();
}
$idcliente = intval($peticion->parametrosBody()->idcliente);
$idpersonal = intval($peticion->parametrosBody()->idpersonal);
$clasificacionopinion= intval($peticion->parametrosBody()->clasificacionopinion);
$mensajeopinion = $peticion->parametrosBody()->mensajeopinion;


$sql = "UPDATE opiniones
        SET idcliente=$idcliente,
            idpersonal=$idpersonal,
            clasificacionopinion=$clasificacionopinion,
            mensajeopinion=$mensajeopinion
            
         WHERE id_opinion =id_opinion";

try {
    mysqli_query($connexion, $sql);
    http_response_code(200);
} catch (Exception $exception) {
    http_response_code(500);
    die(mysqli_errno($connexion));
}

