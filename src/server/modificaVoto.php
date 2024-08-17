<?php 
    header("Access-Control-Allow-Origin: http://localhost:5173");
    header("Access-Control-Allow-Methods: GET, POST");
    header("Access-Control-Allow-Headers: Content-Type");
    header("Access-Control-Allow-Credentials: true");
    header("content-type:application/json; charset=utf-8");
    
    require("mySQLi.php");
    http_response_code(200);
    $conn = openConnection("registro");

    if(!isset($_POST["id"]) || !isset($_POST["data"]) || !isset($_POST["numero"])){
        die(json_encode(["errore" => "Dati mancanti."]));
    }
    $data = $conn->real_escape_string($_POST["data"]);
    $id = $conn->real_escape_string($_POST["id"]);
    $voto = $conn->real_escape_string($_POST["numero"]);

    $query = "UPDATE voti SET voto = $voto, data = '$data' WHERE id = $id";
    $data = eseguiQuery($conn, $query);

    echo json_encode($data);
    
    $conn -> close();
?>