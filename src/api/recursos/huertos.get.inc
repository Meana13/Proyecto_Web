<?php

if (!isset($peticion)) {
    http_response_code(500);
    die();
}

require_once 'includes/connexion.php';
if (!isset($connexion)) die();

$idUsuario = $peticion->parametrosQuery()['idUsuario'];

$sql = "SELECT `huertos`.`id_huerto`, `huertos`.`nombre_huerto`, `huertos`.`imagen` 
FROM `huertos`, `usuarios`, `clientes` 
WHERE `usuarios`.`id_usuario`=`clientes`.`id_usuario` 
AND `clientes`.`id_cliente`=`huertos`.`id_cliente` 
AND `usuarios`.`id_usuario`= $idUsuario";

$result = mysqli_query($connexion, $sql);
while ($row = mysqli_fetch_assoc($result)) {
    $salida[] = $row;
}


