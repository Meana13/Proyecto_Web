<?php

if (!isset($peticion)) {
    http_response_code(500);
    die();
}

require_once 'includes/connexion.php';
if (!isset($connexion)) die();

$sql = "SELECT * 
        FROM `ventas`, `productos`, `clientes`
        WHERE ventas.id_cliente = clientes.id_cliente
        AND `ventas`.productos = `productos`.id_producto
        ORDER BY `ventas`.fecha DESC";

$result = mysqli_query($connexion, $sql);
while ($row = mysqli_fetch_assoc($result)) {
    $salida[] = $row;
}
