<?php
    header("Access-Control-Allow-Origin: http://localhost:5173");
    header("Access-Control-Allow-Methods: GET, POST");
    header("Access-Control-Allow-Headers: Content-Type");
    header("Access-Control-Allow-Credentials: true");
    header("content-type:application/json; charset=utf-8");
              
    if(!isset($_POST["matricola"])) {
        http_response_code(400);
        die ("Parametro mancante (matricola)");
    }

    $user = $_POST["matricola"];

    $folderPath = './fotoProfilo';
    $files = scandir($folderPath);
    foreach ($files as $file) {
        if (in_array(pathinfo($file, PATHINFO_EXTENSION), ['jpg', 'jpeg', 'png', 'gif', 'webp', 'jfif'])) {
            $filename = pathinfo($file, PATHINFO_FILENAME);
            if ($filename == $user) {
                unlink($folderPath . '/' . $file);
                echo "Deleted: $file\n";
            }
        }
    }
?>