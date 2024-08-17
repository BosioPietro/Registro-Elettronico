<?php 
    header("Access-Control-Allow-Origin: http://localhost:5173");
    header("Access-Control-Allow-Methods: GET, POST");
    header("Access-Control-Allow-Headers: Content-Type");
    header("Access-Control-Allow-Credentials: true");
    header("content-type:application/json; charset=utf-8");
    
    require("mySQLi.php");
    http_response_code(200);
    $conn = openConnection("registro");

    if(!isset($_POST["titolo"]) || !isset($_POST["testo"]) || !isset($_POST["classi"]) || !isset($_POST["data"])){
        die(json_encode(["errore" => "Dati mancanti."]));
    }
    $titolo = $conn->real_escape_string($_POST["titolo"]);
    $testo = $conn->real_escape_string($_POST["testo"]);
    $classi = $conn->real_escape_string($_POST["classi"]);
    $dataC = $conn->real_escape_string($_POST["data"]);

    $query = "INSERT INTO comunicazioni (classi, titolo, testo, data) VALUES ('$classi', '$titolo', '$testo', '$dataC')";
    $data = eseguiQuery($conn, $query);

    echo json_encode($data);
    
    $conn -> close();
?>