<?php 
    header("Access-Control-Allow-Origin: http://localhost:5173");
    header("Access-Control-Allow-Methods: GET, POST");
    header("Access-Control-Allow-Headers: Content-Type");
    header("Access-Control-Allow-Credentials: true");
    header("content-type:application/json; charset=utf-8");
    
    require("mySQLi.php");
    http_response_code(200);
    $conn = openConnection("registro");

    if(!isset($_POST["id"]) || !isset($_POST["data"]) || !isset($_POST["titolo"]) || !isset($_POST["testo"]) || !isset($_POST["classi"])){
        die(json_encode(["errore" => "Dati mancanti."]));
    }
    $data = $conn->real_escape_string($_POST["data"]);
    $id = $conn->real_escape_string($_POST["id"]);
    $titolo = $conn->real_escape_string($_POST["titolo"]);
    $classi = $conn->real_escape_string($_POST["classi"]);
    $testo = $conn->real_escape_string($_POST["testo"]);

    $query = "UPDATE comunicazioni SET classi = '$classi', data = '$data', titolo = '$titolo', testo = '$testo' WHERE id = $id";
    $data = eseguiQuery($conn, $query);

    echo json_encode($data);
    
    $conn -> close();
?>