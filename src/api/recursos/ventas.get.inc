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
                ORDER BY fecha DESC";

        $result = mysqli_query($connexion, $sql);
        while ($row = mysqli_fetch_assoc($result)) {
            $salida[] = $row;
        }
    }
    elseif($senyal === "2") {
        $cantidad = $peticion->parametrosQuery()['cantidad'];

        $sql = "SELECT COUNT(`id_venta`) AS `total` 
                FROM `ventas`";

        $result = mysqli_query($connexion, $sql);

        $total = mysqli_fetch_assoc($result)['total'];
        $paginas =ceil($total/$cantidad);
        $salida['paginas'] = $paginas;
    }
    elseif ($senyal === "3"){
        $cantidad = $peticion->parametrosQuery()['cantidad'];
        $pagina = $peticion->parametrosQuery()['pagina'] * $cantidad;

        $sql = "SELECT * 
                FROM `ventas` 
                ORDER BY `fecha`, `id_venta` 
                LIMIT $pagina, $cantidad";

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

