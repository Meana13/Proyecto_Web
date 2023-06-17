<?php

if (!isset($peticion)) {
    http_response_code(500);
    die();
}

require_once 'includes/connexion.php';
if (!isset($connexion)) die();


if(isset($peticion->parametrosQuery()['senyal'])){
    $senyal = $peticion->parametrosQuery()['senyal'];

    if($senyal === "1"){
        $sql = "SELECT 
                        `ventas`.`id_venta`, 
                        `ventas`.`fecha`, 
                        `productos`.`precio`, 
                        productos.nombre_producto, 
                        SUM(`productos`.`precio`) as total
                FROM `ventas`, `productos`
                GROUP BY `fecha`
                ORDER BY fecha DESC
                LIMIT 7";

        $result = mysqli_query($connexion, $sql);
        while ($row = mysqli_fetch_assoc($result)) {
            $salida[] = $row;
        }
    }
}
else if(count($peticion->parametrosPath()) == 0){
    $sql = "SELECT * 
        FROM `ventas`, `productos`, `clientes`
        WHERE ventas.id_cliente = clientes.id_cliente
        AND `ventas`.productos = `productos`.id_producto
        ORDER BY `ventas`.fecha DESC";

    $result = mysqli_query($connexion, $sql);
    while ($row = mysqli_fetch_assoc($result)) {
        $salida[] = $row;
    }
}

