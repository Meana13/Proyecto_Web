<?php
if (!isset($peticion)) {
    http_response_code(500);
    die();
}

require_once 'includes/connexion.php';
if (!isset($connexion)) die();
$limite= $peticion->parametrosQuery()['cantidad'];
$pagina = $peticion->parametrosQuery()['pagina'] * $limite;
$sql = "SELECT clientes.id_cliente, clientes.id_usuario, clientes.nombre, apellidos, email, direccion
        FROM clientes
        JOIN usuarios ON clientes.id_usuario = usuarios.id_usuario
        LIMIT $pagina,$limite";

$result = mysqli_query($connexion, $sql);
$salida = array();
while ($row = mysqli_fetch_assoc($result)) {
    $salida[] = $row;
}


