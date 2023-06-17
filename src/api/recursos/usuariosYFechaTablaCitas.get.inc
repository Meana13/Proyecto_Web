<?php
if (!isset($peticion)) {
    http_response_code(500);
    die();
}

require_once 'includes/connexion.php';
if (!isset($connexion)) die();
require_once 'includes/connexion.php';
if (!isset($connexion)) die();
$limite = $peticion->parametrosQuery()['cantidad'];
$pagina = $peticion->parametrosQuery()['pagina'] * $limite;
$nombre = $peticion->parametrosQuery()['nombre'];
$fecha = $peticion->parametrosQuery()['fecha'];
$filtro = $peticion->parametrosQuery()['filtro'];

if ($pagina == 1) {
    $sql = "SELECT clientes.nombre, citas.fecha_cita
            FROM clientes
            JOIN citas ON clientes.id_cliente = citas.id_cliente
            WHERE citas.fecha_cita = '$fecha'
            LIMIT $limite";
}
if ($pagina>1){
    $sql = "SELECT clientes.nombre, citas.fecha_cita
            FROM clientes
            JOIN citas ON clientes.id_cliente = citas.id_cliente
            WHERE citas.fecha_cita = '$fecha'
        LIMIT $pagina,$limite";
};

/**  if ($filtro != "") {
    $sql = "SELECT clientes.id_cliente, clientes.id_usuario, clientes.nombre, apellidos, email, direccion
            FROM clientes
            JOIN usuarios ON clientes.id_usuario = usuarios.id_usuario
            WHERE usuarios.rol = $rol
            AND CONCAT(clientes.id_cliente, clientes.id_usuario, clientes.nombre, apellidos, email, direccion) LIKE '%$filtro%'
            LIMIT $limite";
}*/

$result = mysqli_query($connexion, $sql);
$salida = array();
while ($row = mysqli_fetch_assoc($result)) {
    $salida[] = $row;
}


