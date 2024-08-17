<?php 
    header("Access-Control-Allow-Origin: http://localhost:5173");
    header("Access-Control-Allow-Methods: GET, POST");
    header("Access-Control-Allow-Headers: Content-Type");
    header("Access-Control-Allow-Credentials: true");
    header("content-type:application/json; charset=utf-8");
    
    require("mySQLi.php");
    http_response_code(200);
    $conn = openConnection("registro");

    if(!isset($_POST["classe"]) || !isset($_POST["dataArg"]) || !isset($_POST["idMateria"]) || !isset($_POST["descrizione"])){
        die(json_encode(["errore" => "Dati mancanti."]));
    }
    $classe = $conn->real_escape_string($_POST["classe"]);
    $dataArg = $conn->real_escape_string($_POST["dataArg"]);
    $idMat = $conn->real_escape_string($_POST["idMateria"]);
    $descrizione = $conn->real_escape_string($_POST["descrizione"]);

    $query = "INSERT INTO argomenti (classe, data, materia, argomento) VALUES ('$classe', '$dataArg', '$idMat', '$descrizione')";
    $data = eseguiQuery($conn, $query);

    echo json_encode($data);
    
    $conn -> close();
?>