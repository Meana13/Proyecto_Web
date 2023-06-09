<?php
require_once 'conexion.php';

// Obtener el ID de la cita a eliminar
$citaId = $_POST['id'];

// Eliminar la cita de la tabla de citas
$sql = "DELETE FROM citas WHERE id = $citaId";
if ($conn->query($sql) === TRUE) {
    header("Location: index.php");
    exit();
} else {
    echo "Error al eliminar la cita: " . $conn->error;
}

$conn->close();
?>