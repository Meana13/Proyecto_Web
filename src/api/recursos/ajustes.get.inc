<?php
if (!isset($peticion)) {
    http_response_code(500);
    die();
}

require_once 'includes/connexion.php';
if (!isset($connexion)) die();

$id = intval($peticion->parametrosPath()[0]);

//Hacemos una busqueda de todos los datos que coincidan con los del cliente
if (count($peticion->parametrosPath()) == 1) {
    $sql= "SELECT * 
          FROM `clientes`
          WHERE clientes.id_cliente =$id";

    $result = mysqli_query($connexion, $sql);
    while ($row = mysqli_fetch_assoc($result)) {
    $salida[] = $row;
}
}
//Si hay algún parámetro extra en el path buscamos todos los datos de los huertos del cliente
else {
    $sql =
        "SELECT *
        FROM `huertos`
        WHERE huertos.id_cliente = $id";

    $result = mysqli_query($connexion, $sql);
    while ($row = mysqli_fetch_assoc($result)) {
        $salida[] = $row;

    }
}
