<?php
	header("Access-Control-Allow-Origin: http://localhost:5173");
	header("Access-Control-Allow-Methods: GET, POST");
	header("Access-Control-Allow-Headers: Content-Type");
	header("Access-Control-Allow-Credentials: true");
	header("content-type:application/json; charset=utf-8");

	require("MySQLi.php");
    http_response_code(200);
    $connection = openConnection("registro");
    if(isset($_GET["matricola"]))
    {
        $matr = $connection->real_escape_string($_REQUEST["matricola"]);
    }else die(json_encode(['errore' => "Parametro mancante matricola"]));

    $query = "SELECT data, materia, voto";
    if(isset($_GET["id"]))
    {
        $query .= ", id";
    }
    $query .= " FROM voti WHERE matricola = '$matr' ORDER BY data DESC";
    $data = eseguiQuery($connection, $query);

    echo json_encode($data);

    $connection->close();
?>