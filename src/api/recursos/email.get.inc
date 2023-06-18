<?php


if (!isset($peticion)) {
    http_response_code(500);
    die();
}
require_once 'includes/connexion.php';
if (!isset($connexion)) die();
$email = $peticion->parametrosQuery()['cantidad'];
$sql = "SELECT clientes.email
        FROM clientes  
        WHERE clientes.email='%$email'";

$result = mysqli_query($connexion, $sql);
while ($row = mysqli_fetch_assoc($result)) {
    $salida[] = $row;
}

