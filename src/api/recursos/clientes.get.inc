<?php

if (!isset($peticion)) {
    http_response_code(500);
    die();
}

require_once 'includes/connexion.php';
if (!isset($connexion)) die();

$idUsuario = $peticion->parametrosQuery()['idUsuario'];

$sql = "SELECT * 
        FROM `clientes`
        WHERE id_usuario = $idUsuario";

$result = mysqli_query($connexion, $sql);
while ($row = mysqli_fetch_assoc($result)) {
    $salida[] = $row;
}