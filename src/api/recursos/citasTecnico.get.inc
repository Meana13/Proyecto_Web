<?php

if (!isset($peticion)) {
    http_response_code(500);
    die();
}

require_once 'includes/connexion.php';
if (!isset($connexion)) die();

$sql = "SELECT *
        FROM `clientes`
        JOIN `citas` ON `clientes`.id_cliente = `citas`.id_cliente 
        JOIN `asuntos_citas` ON `citas`.asunto = `asuntos_citas`.id_asunto";

$result = mysqli_query($connexion, $sql);
while ($row = mysqli_fetch_assoc($result)) {
    $salida[] = $row;
}