<?php

if (!isset($peticion)) {
    http_response_code(500);
    die();
}

require_once 'includes/connexion.php';
if (!isset($connexion)) die();

$estado = $peticion->parametrosQuery()['estado'];

$sql = "SELECT * 
        FROM `consultas`, `asuntos_formulario_contacto`
        WHERE estado_consulta = $estado
        AND `consultas`.asunto = `asuntos_formulario_contacto`.id_asunto_formulario_contacto";


$result = mysqli_query($connexion, $sql);
while ($row = mysqli_fetch_assoc($result)) {
    $salida[] = $row;
}

