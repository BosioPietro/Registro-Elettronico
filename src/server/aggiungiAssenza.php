<?php 
    header("Access-Control-Allow-Origin: http://localhost:5173");
    header("Access-Control-Allow-Methods: GET, POST");
    header("Access-Control-Allow-Headers: Content-Type");
    header("Access-Control-Allow-Credentials: true");
    header("content-type:application/json; charset=utf-8");
    
    require("mySQLi.php");
    http_response_code(200);
    $conn = openConnection("registro");

    if(!isset($_POST["data"]) || !isset($_POST["matricola"]) || !isset($_POST["giustificato"])){
        die(json_encode(["errore" => "Dati mancanti."]));
    }
    $dataAssenza = $conn->real_escape_string($_POST["data"]);
    $matricola = $conn->real_escape_string($_POST["matricola"]);
    $giustificato = $conn->real_escape_string($_POST["giustificato"]);

    $query = "SELECT * FROM assenze WHERE matricola = '$matricola' AND data = '$dataAssenza'";
    $data = eseguiQuery($conn, $query);
    if(count($data) > 0){
        die(json_encode(["errore" => "Assenza già presente"]));
    }

    $query = "INSERT INTO assenze (matricola, data, giustificato) VALUES ('$matricola', '$dataAssenza', $giustificato)";
    $data = eseguiQuery($conn, $query);

    echo json_encode($data);
    
    $conn -> close();
?>