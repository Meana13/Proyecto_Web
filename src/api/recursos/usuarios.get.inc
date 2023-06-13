<?php

if (!isset($peticion)) {
    http_response_code(500);
    die();
}
require_once 'includes/connexion.php';
if (!isset($connexion)) die();

$limite= $peticion->parametrosQuery()['cantidad'];
$pagina = $peticion->parametrosQuery()['pagina'] * $limite;
$rol= $peticion->parametrosQuery()['rol'];
$filtro= $peticion->parametrosQuery()['filtro'];

$sql = "SELECT clientes.id_cliente, clientes.id_usuario, clientes.nombre, apellidos, email, direccion
        FROM clientes
        JOIN usuarios ON clientes.id_usuario = usuarios.id_usuario
        WHERE usuarios.rol=$rol
        LIMIT $limite";

if ($pagina>1){
    $sql = "SELECT clientes.id_cliente, clientes.id_usuario, clientes.nombre, apellidos, email, direccion
        FROM clientes
        JOIN usuarios ON clientes.id_usuario = usuarios.id_usuario
        WHERE usuarios.rol=$rol
        LIMIT $pagina,$limite";
}
if (isset($filtro)) {
    $sql = "SELECT clientes.id_cliente, clientes.id_usuario, clientes.nombre, apellidos, email, direccion
        FROM clientes
        JOIN usuarios ON clientes.id_usuario = usuarios.id_usuario
        WHERE usuarios.rol=$rol and CONCAT('clientes.id_cliente', 'clientes.id_usuario', 'clientes.nombre', 'apellidos', 'email', 'direccion') LIKE '%$filtro%'";
}

$result = mysqli_query($connexion, $sql);
while ($row = mysqli_fetch_assoc($result)) {
    $salida[] = $row;
}