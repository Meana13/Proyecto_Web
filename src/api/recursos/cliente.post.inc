<?php


if (!isset($peticion)) {
    http_response_code(500);
    die();
}
require_once 'includes/connexion.php';
if (!isset($connexion)) die();
$usuario = $peticion->parametrosQuery()['usuario'];
$rol= $peticion->parametrosQuery()['rol'];
$nombre = $peticion->parametrosQuery()['nombre'];
$apellidos = $peticion->parametrosQuery()['apellidos'];
$email = $peticion->parametrosQuery()['email'];
$direccion = $peticion->parametrosQuery()['direccion'];
$contrasenya=$peticion->parametrosQuery()['clave'];
$sql = "INSERT INTO usuarios (nombre, password, rol)
        VALUES ('$usuario', '$contrasenya', '$rol')";

// Ejecutar la consulta INSERT
$connexion->query($sql);

// Obtener el último id_usuario insertado
$id_usuario = $connexion->insert_id;

// Utilizar el valor de id_usuario en la inserción de clientes
$sql_cliente = "INSERT INTO clientes (id_usuario,nombre, apellidos, direccion, email)
               VALUES ('$id_usuario','Marcos', 'Martinez Yuste', 'Carrer Bernat Descoll', 'email@example.com')";

// Ejecutar la consulta INSERT para clientes
$connexion->query($sql_cliente);

// Para comprobar si se ha ejecutado correctamente la sentencia usamos try ... catch
try {
    mysqli_query($connexion, $sql_cliente);
    http_response_code(200);
} catch (Exception $exception) {
    http_response_code(500);
    // podemos usar mysqli_errno para concretar el código de respuesta
    die(mysqli_errno($connexion));
}