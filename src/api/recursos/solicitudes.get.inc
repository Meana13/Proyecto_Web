<?php

if (!isset($peticion)) {
    http_response_code(500);
    die();
}

require_once 'includes/connexion.php';
if (!isset($connexion)) die();

$estado = $peticion->parametrosQuery()['estado'];
$senyal = $peticion->parametrosQuery()['senyal'];

if($senyal === "1"){
    $sql = "SELECT *
            FROM `consultas`, `asuntos_formulario_contacto`
            WHERE estado_consulta = $estado
            AND `consultas`.asunto = `asuntos_formulario_contacto`.id_asunto_formulario_contacto";

    $result = mysqli_query($connexion, $sql);
    while ($row = mysqli_fetch_assoc($result)) {
        $salida[] = $row;
    }
}
elseif($senyal === "2") {
    $cantidad = $peticion->parametrosQuery()['cantidad'];

        $sql = "SELECT COUNT(`id_consulta`) AS `total`
                FROM `consultas`";

        $result = mysqli_query($connexion, $sql);

        $total = mysqli_fetch_assoc($result)['total'];
        $paginas =ceil($total/$cantidad);
        $salida['paginas'] = $paginas;
    }
    elseif ($senyal === "3"){
        $cantidad = intval($peticion->parametrosQuery()['cantidad']);
        $auxiliar = intval($peticion->parametrosQuery()['pagina']);
        $pagina = $auxiliar * $cantidad;

        $sql = "SELECT *
                FROM `consultas`, `asuntos_formulario_contacto`
                WHERE estado_consulta = $estado
                AND `consultas`.asunto = `asuntos_formulario_contacto`.id_asunto_formulario_contacto
                LIMIT $pagina, $cantidad";

        $result = mysqli_query($connexion, $sql);
        while ($row = mysqli_fetch_assoc($result)) {
            $salida[] = $row;
        }
    }

