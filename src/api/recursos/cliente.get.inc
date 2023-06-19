<?php


if (!isset($peticion)) {
    http_response_code(500);
    die();
}
require_once 'includes/connexion.php';
if (!isset($connexion)) die();
$id = $peticion->parametrosQuery()['id'];

$sql = "SELECT *
        FROM clientes
        WHERE id_usuario=$id";

$result = mysqli_query($connexion, $sql);
while ($row = mysqli_fetch_assoc($result)) {
    $salida[] = $row;
}