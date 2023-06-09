<?php
require_once 'conexion.php';

// Obtener los datos de la cita del formulario
$fecha = $_POST['fecha'];
$hora = $_POST['hora'];
$tecnico = $_POST['tecnico'];
$motivo = $_POST['motivo'];

// Insertar la nueva cita en la tabla de citas
$sql = "INSERT INTO citas (fecha, hora, tecnico, motivo) VALUES ('$fecha', '$hora', '$tecnico', '$motivo')";
if ($conn->query($sql) === TRUE) {
    header("Location: index.php");
    exit();
} else {
    echo "Error al agregar la cita: " . $conn->error;
}

$conn->close();
?>