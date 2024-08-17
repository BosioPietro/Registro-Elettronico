<?php 
    header("Access-Control-Allow-Origin: http://localhost:5173");
    header("Access-Control-Allow-Methods: GET, POST");
    header("Access-Control-Allow-Headers: Content-Type");
    header("Access-Control-Allow-Credentials: true");
    header("content-type:application/json; charset=utf-8");
    
    require("mySQLi.php");
    $conn = openConnection("registro");
    
    if(isset($_GET["classe"]) && isset($_GET["materia"])){
        $classe = $conn->real_escape_string($_GET["classe"]);
        $materia = $conn->real_escape_string($_GET["materia"]);
    }
    else die("Parametro range non trovato");

    // Formato data: YYYY-MM-DD
    $query = "SELECT * FROM argomenti WHERE classe='$classe' AND materia='$materia' ORDER BY data DESC";

    $data = eseguiQuery($conn, $query);

    http_response_code(200);

    echo json_encode($data);
    $conn -> close();
?>