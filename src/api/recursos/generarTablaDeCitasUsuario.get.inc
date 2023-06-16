<?php

if (!isset($peticion)) {
    http_response_code(500);
    die();
}

require_once 'includes/connexion.php';
if (!isset($connexion)) die();


// Obtener el número total de citas
$sqlCount = "SELECT COUNT(*) as total FROM citas";


$resultCount = $connexion->query($sqlCount);
$rowCount = $resultCount->fetch_assoc();
$totalCitas = $rowCount['total'];

// Definir el número de citas por página
$citasPorPagina = 5;

// Calcular el número total de páginas
$totalPaginas = ceil($totalCitas / $citasPorPagina);

// Obtener la página actual
$paginaActual = isset($_GET['pagina']) ? $_GET['pagina'] : 1;

// Calcular el índice de inicio y fin de las citas para la página actual
$indiceInicio = ($paginaActual - 1) * $citasPorPagina;
$indiceFin = $indiceInicio + $citasPorPagina - 1;

// Obtener las citas de la página actual
$sql = "SELECT * FROM (SELECT *, ROW_NUMBER() OVER (ORDER BY id_cita) as fila FROM citas) AS sub WHERE fila BETWEEN $indiceInicio AND $indiceFin";
$result = $connexion->query($sql);

// Generar las filas de la tabla de citas
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        echo "<tr class='fila-cita' data-motivo='" . $row['motivo'] . "'>";
        echo "<td>" . $row['fecha'] . "</td>";
        echo "<td>" . $row['hora'] . "</td>";
        echo "<td>" . $row['tecnico'] . "</td>";
        echo "<td>" . $row['motivo'] . "</td>";
        echo "<td>";
        echo "<button class='boton-aceptar' data-id='" . $row['id'] . "'>Aceptar</button>";
        echo "<button class='boton-eliminar' data-motivo='" . $row['motivo'] . "'>Eliminar</button>";
        echo "</td>";
    }
} else {
    echo "<tr><td colspan='5'>No se encontraron citas</td></tr>";
}