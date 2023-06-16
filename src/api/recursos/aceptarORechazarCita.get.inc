<?php
// Obtener el id de la cita aceptada o rechazada
$idCita = $_POST['id_cita'];

// Obtener el estado (aceptada o rechazada)
$estado = $_POST['estado'];

// Conexión a la base de datos
$servername = "localhost";
$username = "usuario";
$password = "contraseña";
$dbname = "nombre_base_datos";

$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar la conexión
if ($conn->connect_error) {
    die("Error de conexión a la base de datos: " . $conn->connect_error);
}

// Obtener el motivo de la cita aceptada o rechazada
$sql = "SELECT asunto FROM citas WHERE id_cita = $idCita";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $motivo = $row["asunto"];

    // Eliminar las citas con el mismo motivo
    if ($estado === "aceptada") {
        $sql = "DELETE FROM citas WHERE asunto = (
                    SELECT id_asunto FROM asuntos_citas WHERE asunto = '$motivo'
                ) AND id_cita != $idCita";
        if ($conn->query($sql) === TRUE) {
            echo "Las citas con el motivo '$motivo' han sido eliminadas correctamente.";
        } else {
            echo "Error al eliminar las citas: " . $conn->error;
        }
    } elseif ($estado === "rechazada") {
        $sql = "DELETE FROM citas WHERE asunto = (
                    SELECT id_asunto FROM asuntos_citas WHERE asunto = '$motivo'
                )";
        if ($conn->query($sql) === TRUE) {
            echo "Las citas con el motivo '$motivo' han sido eliminadas correctamente.";
        } else {
            echo "Error al eliminar las citas: " . $conn->error;
        }
    }
} else {
    echo "No se encontró la cita especificada.";
}

// Cerrar la conexión
$conn->close();
?>