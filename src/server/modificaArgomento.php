<?php 
    header("Access-Control-Allow-Origin: http://localhost:5173");
    header("Access-Control-Allow-Methods: GET, POST");
    header("Access-Control-Allow-Headers: Content-Type");
    header("Access-Control-Allow-Credentials: true");
    header("content-type:application/json; charset=utf-8");
    
    require("mySQLi.php");
    http_response_code(200);
    $conn = openConnection("registro");

    if(!isset($_POST["id"]) || !isset($_POST["data"]) || !isset($_POST["desc"]) || !isset($_POST["classe"]) || !isset($_POST["materia"])){
        die(json_encode(["errore" => "Dati mancanti."]));
    }
    $data = $conn->real_escape_string($_POST["data"]);
    $id = $conn->real_escape_string($_POST["id"]);
    $desc = $conn->real_escape_string($_POST["desc"]);
    $classe = $conn->real_escape_string($_POST["classe"]);
    $materia = $conn->real_escape_string($_POST["materia"]);

    $query = "UPDATE argomenti SET classe = '$classe', data = '$data', materia = $materia, argomento = '$desc' WHERE id = $id";
    $data = eseguiQuery($conn, $query);

    echo json_encode($data);
    
    $conn -> close();
?>