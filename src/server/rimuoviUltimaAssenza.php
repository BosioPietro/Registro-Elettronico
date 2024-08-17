<?php 
    header("Access-Control-Allow-Origin: http://localhost:5173");
    header("Access-Control-Allow-Methods: GET, POST");
    header("Access-Control-Allow-Headers: Content-Type");
    header("Access-Control-Allow-Credentials: true");
    header("content-type:application/json; charset=utf-8");
    
    require("mySQLi.php");
    http_response_code(200);
    $conn = openConnection("registro");

    if(!isset($_POST["data"]) || !isset($_POST["matricola"])){
        die(json_encode(["errore" => "Dati mancanti."]));
    }
    $dataAssenza = $conn->real_escape_string($_POST["data"]);
    $matricola = $conn->real_escape_string($_POST["matricola"]);

    $query = "DELETE FROM assenze WHERE matricola = '$matricola' AND data = '$dataAssenza'";
    $data = eseguiQuery($conn, $query);

    echo json_encode($data);
    
    $conn -> close();
?>