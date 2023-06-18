<?php
if (!isset($peticion)) {
    http_response_code(500);
    die();
}
require_once 'includes/connexion.php';
if (!isset($connexion)) die();

$filtro="";
$limite= $peticion->parametrosQuery()['cantidad'];
$rol= $peticion->parametrosQuery()['rol'];

if(isset($peticion->parametrosPath()['filtro'])) {
    $filtro = $peticion->parametrosQuery()['filtro'];
}

$sql="SELECT COUNT(`id_usuario`) 
      FROM `usuarios`
      WHERE usuario.rol=$rol";
if ($filtro!="") {
    $sql = "SELECT COUNT(`id_usuario`)
        FROM usuarios
        WHERE usuarios.rol=$rol and CONCAT('clientes.id_cliente', 'clientes.id_usuario', 'clientes.nombre', 'apellidos', 'email', 'direccion') LIKE '%$filtro%'";
}

$result = mysqli_query($connexion, $sql);
while ($row = mysqli_fetch_assoc($result)) {
    $salida[] = $row;
}