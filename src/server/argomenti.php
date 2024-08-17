<?php 
    header("Access-Control-Allow-Origin: http://localhost:5173");
    header("Access-Control-Allow-Methods: GET, POST");
    header("Access-Control-Allow-Headers: Content-Type");
    header("Access-Control-Allow-Credentials: true");
    header("content-type:application/json; charset=utf-8");
    
    require("mySQLi.php");
    $conn = openConnection("registro");
    if(isset($_GET["range"]) && isset($_GET["classe"])){
        $inizio = $conn->real_escape_string($_GET["range"]["dataInizio"]);
        $fine = $conn->real_escape_string($_GET["range"]["dataFine"]);
        $classe = $conn->real_escape_string($_GET["classe"]);
    }
    else die("Parametro range non trovato");

    // Formato data: YYYY-MM-DD
    $query = "SELECT * FROM argomenti WHERE classe='$classe' AND data BETWEEN '$inizio' AND '$fine'";

    $data = eseguiQuery($conn, $query);

    http_response_code(200);

    echo json_encode($data);
    $conn -> close();
?>