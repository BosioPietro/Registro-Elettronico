<?php
	header("Access-Control-Allow-Origin: http://localhost:5173");
	header("Access-Control-Allow-Methods: GET, POST");
	header("Access-Control-Allow-Headers: Content-Type");
	header("Access-Control-Allow-Credentials: true");
	header("content-type:application/json; charset=utf-8");

	require("MySQLi.php");

	$connection = openConnection("registro");
	http_response_code(200);
	//Parametri
	if(isset($_POST["matricola"]))
	{
		$matricola = $connection->real_escape_string($_REQUEST["matricola"]);
	}
	else
	{
		http_response_code(400);
		die("Parametro mancante user.");
	}
	if(isset($_POST["password"]))
	{
		$pass = $connection->real_escape_string($_REQUEST["password"]);
	}
	else
	{
		http_response_code(400);
		die("Parametro mancante pass.");
	}

	$sql = "SELECT * FROM studenti WHERE matricola = '$matricola'";

	$data = eseguiQuery($connection, $sql);

	if(count($data) > 0)
	{
		$data = $data[0];
		if($data["pass"] == $pass)
		{
			http_response_code(200);
			unset($data["pass"]);
			echo json_encode(['ok' => json_encode($data)]);
		}
		else
		{
			http_response_code(200);
			die(json_encode(['errore' => 'password']));
		}
	}
	else
	{
		http_response_code(200);
		die(json_encode(['errore' => 'user']));

	}

	$connection->close();
?>