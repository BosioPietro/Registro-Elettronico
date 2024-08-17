<?php
	header("Access-Control-Allow-Origin: http://localhost:5173");
	header("Access-Control-Allow-Methods: GET, POST");
	header("Access-Control-Allow-Headers: Content-Type");
	header("Access-Control-Allow-Credentials: true");
	header("content-type:application/json; charset=utf-8");

	if(!isset($_POST["matricola"])) {
		http_response_code(400);
		die (json_encode(["errore"=>"Parametro mancante (matricola)"]));		
	}

	$user = $_POST["matricola"];					
		
	if(!isset($_FILES["txtFiles"])) {
		http_response_code(400);
		die ("Parametro mancante (txtFiles)");
	}

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


	$filesRicevuti=$_FILES["txtFiles"];		

	echo json_encode("sus");

	$response = array();
	for ($i = 0; $i<count($filesRicevuti["name"]); $i++){	
		$item = array(); 

		$filename=basename($filesRicevuti["name"][$i]);
		$size=$filesRicevuti["size"][$i];
		if($size>2000000) {  // max 2MB
			$item["ris"] = "NOK";
			$item["msg"] = "Il file $filename eccede i 2MB per cui NON viene salvato";
			array_push($response, $item); 
			continue;
		}
		$mimeType=$filesRicevuti["type"][$i];
		$ext = pathinfo($filename,PATHINFO_EXTENSION);
		
		$source_file = $filesRicevuti["tmp_name"][$i];
		$target_file = "fotoProfilo/$filename";
		
		if (move_uploaded_file($source_file, $target_file)) {
				$item["ris"] = "ok";
				$item["msg"] = "Il file $filename è stato caricato correttamente : SIZE: $size, MIME TYPE: $mimeType";
		}					
		else  {
			$item["ris"] = "NOK";
			$item["msg"] = "Il file $filename ha generato un errore";
		}
		array_push($response, $item); 
	}	

	echo json_encode($response);  					
?>