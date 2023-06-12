<?php

if(!isset($peticion)) {
    http_response_code(500);
    die();
}

require_once 'includes/connexion.php';
if (!isset($connexion)) die();

$idHuerto = intval($peticion->parametrosBody()->idHuerto);
$imagenNueva = file_get_contents($_FILES['imagen']['tmp_name']);
/*$imagenError = $_FILES['imagen']['error'];


if ($imagenError !== UPLOAD_ERR_OK) {
    // Error durante la carga de la imagen
    http_response_code(400);
    echo "Error al cargar la imagen. Código de error: " . $imagenError;
    exit;
}*/

$sql = "UPDATE `huertos` 
SET `huertos`.`imagen` = $imagenNueva
WHERE `huertos`.`id_huerto` = $idHuerto";

try {
    mysqli_query($connexion, $sql);
    http_response_code(200);
} catch (Exception $exception) {
    http_response_code(500);
    die(mysqli_errno($connexion));
}

/*$stmt = $connexion->prepare("UPDATE huertos SET imagen = ? WHERE id_huerto = ?");
$stmt->bind_param("si", $imagen, $idHuerto);
$stmt->execute();*/

/*if ($stmt->errno) {
    // Error en la consulta de actualización
    http_response_code(500);
    echo "Error en la consulta de actualización: " . $stmt->error;
    exit;
}

$filasAfectadas = mysqli_affected_rows($connexion);

if ($filasAfectadas > 0) {
    // El dato ha cambiado y se ha insertado la imagen en el servidor
    http_response_code(200);
} else {
    // No se ha realizado ningún cambio en la base de datos
    http_response_code(400);
}*/
/*
if(!isset($peticion)) {
    http_response_code(500);
    die();
}

require_once 'includes/connexion.php';
if (!isset($connexion)) die();

$idHuerto = intval($peticion->parametrosBody()->idHuerto);
$imagenNueva = file_get_contents($_FILES['imagen']['tmp_name']);

$stmt = $connexion->prepare("UPDATE huertos SET imagen = ? WHERE id_huerto = ?");
$stmt->bind_param("si", $imagenNueva, $idHuerto);
$stmt->execute();

// Resto del código


$sql = "UPDATE `huertos` 
SET `huertos`.`imagen` = $imagenNueva
WHERE `huertos`.`id_huerto` = $idHuerto";

try {
    mysqli_query($connexion, $sql);
    http_response_code(200);
} catch (Exception $exception) {
    http_response_code(500);
    die(mysqli_errno($connexion));
}
*/