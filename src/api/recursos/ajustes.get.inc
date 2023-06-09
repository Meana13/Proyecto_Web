<?php
if (!isset($peticion)) {
    http_response_code(500);
    die();
}

//verificar rol de usuario

if($_SESSION['user']['idRol'] !== "2") {
    http_response_code(401);
    die();
}

require_once 'includes/connexion.php';
if (!isset($connexion)) die();

$id = intval($peticion->parametrosPath()[0]);

//Hacemos una busqueda de todos los datos que coincidan con los del cliente
if (count($peticion->parametrosPath()) = 1) {
    $salida=
        SELECT *
        FROM `clientes`
    WHERE clientes.id=$id;

    console.log($salida);
}
//Si hay algún parámetro extra en el path buscamos todos los datos de los huertos del cliente
else{
    $salida=
        SELECT *
        FROM `huertos`
        WHERE huertos.id_cliente = $id;
    console.log($salida);
}
