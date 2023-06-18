<?php
if (!isset($peticion)) {
    http_response_code(500);
    die();
}
require_once 'includes/connexion.php';
if (!isset($connexion)) die();
$filtro = $peticion->parametrosQuery()['filtro'];
$limite= $peticion->parametrosQuery()['cantidad'];
$pagina = $peticion->parametrosQuery()['pagina'] * $limite;
$rol= $peticion->parametrosQuery()['rol'];


    $sql = "SELECT clientes.id_cliente, clientes.id_usuario, clientes.nombre, clientes.apellidos, clientes.email, clientes.direccion 
            FROM clientes JOIN usuarios ON clientes.id_usuario = usuarios.id_usuario 
            WHERE usuarios.rol = '$rol' 
            AND CONCAT(clientes.id_cliente, clientes.id_usuario, clientes.nombre, clientes.apellidos, clientes.email, clientes.direccion) 
            LIKE '%$filtro%'";


$result = mysqli_query($connexion, $sql);
while ($row = mysqli_fetch_assoc($result)) {
    $salida[] = $row;
}