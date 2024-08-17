<?php 
    header("Access-Control-Allow-Origin: http://localhost:5173");
    header("Access-Control-Allow-Methods: GET, POST");
    header("Access-Control-Allow-Headers: Content-Type");
    header("Access-Control-Allow-Credentials: true");
    header("content-type:application/json; charset=utf-8");
    
    require("mySQLi.php");
    http_response_code(200);
    $conn = openConnection("registro");

    if(!isset($_GET["stringa"]) && !isset($_GET["data"]) && !isset($_GET["id"])){
        die(json_encode(["errore" => "Dati mancanti."]));
    }
    if(isset($_GET["id"])){
        $id = $conn->real_escape_string($_GET["id"]);
        $query = "SELECT * FROM comunicazioni WHERE id = '$id' ORDER BY data ASC";
    }
    else if(isset($_GET["stringa"])){
        $stringa = $conn->real_escape_string($_GET["stringa"]);
        if($stringa == "*")
        {
            $query = "SELECT * FROM comunicazioni ORDER BY data ASC";
        }
        else$query = "SELECT * FROM comunicazioni WHERE titolo LIKE '%$stringa%' ORDER BY data ASC";
    }
    else{
        $data = $conn->real_escape_string($_GET["data"]);
        $query = "SELECT * FROM comunicazioni WHERE data = '$data' ORDER BY data ASC";
    }
    $data = eseguiQuery($conn, $query);

    echo json_encode($data);
    
    $conn -> close();
?>