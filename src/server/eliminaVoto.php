<?php 
    header("Access-Control-Allow-Origin: http://localhost:5173");
    header("Access-Control-Allow-Methods: GET, POST");
    header("Access-Control-Allow-Headers: Content-Type");
    header("Access-Control-Allow-Credentials: true");
    header("content-type:application/json; charset=utf-8");
    
    require("mySQLi.php");
    http_response_code(200);
    $conn = openConnection("registro");

    if(!isset($_POST["id"])){
        die(json_encode(["errore" => "Dati mancanti."]));
    }
    $idVoto = $conn->real_escape_string($_POST["id"]);

    $query = "DELETE FROM voti WHERE id = '$idVoto'";
    $data = eseguiQuery($conn, $query);

    echo json_encode($data);
    
    $conn -> close();
?>