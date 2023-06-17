<?php

if (!isset($peticion)) {
    http_response_code(500);
    die();
}

require_once 'includes/connexion.php';
if (!isset($connexion)) die();

$idCliente = $peticion->parametrosQuery()['idCliente'];

$sql = "SELECT * 
        FROM `citas`, `asuntos_citas`
        WHERE id_cliente = $idCliente
        AND `citas`.asunto = `asuntos_citas`.id_asunto";

$result = mysqli_query($connexion, $sql);
while ($row = mysqli_fetch_assoc($result)) {
    $salida[] = $row;
}
