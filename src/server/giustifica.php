<?php 
    header("Access-Control-Allow-Origin: http://localhost:5173");
    header("Access-Control-Allow-Methods: GET, POST");
    header("Access-Control-Allow-Headers: Content-Type");
    header("Access-Control-Allow-Credentials: true");
    header("content-type:application/json; charset=utf-8");
    
    require("mySQLi.php");
    http_response_code(200);
    $conn = openConnection("registro");

    if(!isset($_POST["matricola"]) || !isset($_POST["password"]) || !isset($_POST["id"])){
        die(json_encode(["errore" => "Dati mancanti."]));
    }
    $matricola = $conn->real_escape_string($_POST["matricola"]);
    $password = $conn->real_escape_string($_POST["password"]);
    $id = $conn->real_escape_string($_POST["id"]);

    $query = "SELECT * FROM studenti WHERE matricola = $matricola AND pass = '$password'";
    $data = eseguiQuery($conn, $query);
    if(count($data) == 0){
        die(json_encode(["errore" => "Password errata"]));
    }

    $query = "UPDATE assenze SET giustificato = 1 WHERE id = $id AND matricola = $matricola";
    $data = eseguiQuery($conn, $query);

    echo json_encode(["risultato" => $data]);
    
    $conn -> close();
?>