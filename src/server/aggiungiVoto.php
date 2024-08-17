<?php 
    header("Access-Control-Allow-Origin: http://localhost:5173");
    header("Access-Control-Allow-Methods: GET, POST");
    header("Access-Control-Allow-Headers: Content-Type");
    header("Access-Control-Allow-Credentials: true");
    header("content-type:application/json; charset=utf-8");
    
    require("mySQLi.php");
    http_response_code(200);
    $conn = openConnection("registro");

    if(!isset($_POST["idMateria"]) || !isset($_POST["dataVoto"]) || !isset($_POST["numero"]) || !isset($_POST["matricola"])){
        die(json_encode(["errore" => "Dati mancanti."]));
    }
    $dataVoto = $conn->real_escape_string($_POST["dataVoto"]);
    $idMat = $conn->real_escape_string($_POST["idMateria"]);
    $voto = $conn->real_escape_string($_POST["numero"]);
    $matricola = $conn->real_escape_string($_POST["matricola"]);

    $query = "INSERT INTO voti (matricola, data, materia, voto) VALUES ('$matricola', '$dataVoto', '$idMat', '$voto')";
    $data = eseguiQuery($conn, $query);

    echo json_encode($data);
    
    $conn -> close();
?>