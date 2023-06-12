<?php

if (!isset($peticion)) {
    http_response_code(500);
    die();
}

require_once 'includes/connexion.php';
if (!isset($connexion)) die();

if(isset($peticion->parametrosQuery()['idUsuario'])){
    $idUsuario = $peticion->parametrosQuery()['idUsuario'];

    $sql = "SELECT 
            `huertos`.`id_huerto`, 
            `huertos`.`nombre_huerto`, 
            `huertos`.`imagen`, 
            `huertos`.notas, 
            `huertos`.notificaciones
            
            FROM `huertos`, `usuarios`, `clientes` 
            
            WHERE `usuarios`.`id_usuario`=`clientes`.`id_usuario` 
            AND `clientes`.`id_cliente`=`huertos`.`id_cliente` 
            AND `usuarios`.`id_usuario`= $idUsuario";

    $result = mysqli_query($connexion, $sql);
    while ($row = mysqli_fetch_assoc($result)) {
        $salida[] = $row;
    }
}

else if(isset($peticion->parametrosQuery()['idHuerto'])){
    $idHuerto = $peticion->parametrosQuery()['idHuerto'];

    $sql = "SELECT *
            FROM `huertos`
            WHERE `huertos`.`id_huerto` = $idHuerto";

    $result = mysqli_query($connexion, $sql);
    while ($row = mysqli_fetch_assoc($result)) {
        $salida[] = $row;
    }
}



