<?php 
    header("Access-Control-Allow-Origin: http://localhost:5173");
    header("Access-Control-Allow-Methods: GET, POST");
    header("Access-Control-Allow-Headers: Content-Type");
    header("Access-Control-Allow-Credentials: true");
    header("content-type:application/json; charset=utf-8");
    
    require("mySQLi.php");

    $conn = openConnection("registro");
    $query = "SELECT * FROM classi ORDER BY nome ASC";
    $data = eseguiQuery($conn, $query);

    http_response_code(200);
    echo json_encode($data);
    
    $conn -> close();
?>