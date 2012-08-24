<?php
	$json = $_POST ;
	
	$json["room"]["name"]	= "C322";
	$json["action"] 		= $_GET["action"];

	if(substr($json["action"], 0, 3) == "add") 
		$json["device"]["filename"] = "./devices_img/".substr(str_shuffle(str_repeat('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',10)),0,10).".png" ;
 
	
	if(isset($json["image"])){
		$json["image"] = substr($json["image"], strpos($json["image"], ",")+1);
		file_put_contents('images/lastimage.png', base64_decode($json["image"]));
	}
	
	if($json["action"]=="exportcanvas" || $json["action"]=="algov0")	{
			file_put_contents('images/heatmap.png', base64_decode($json["image"]));
	}
	
	$json = json_encode($json);
	
	$socket = fsockopen("tcp://127.0.0.1", 2000, $errno, $errstr);
	
	if($socket) {
	    fwrite($socket, $json);
	    fclose($socket);
	}	
	
	$return["message"] = $_GET["action"]." done" ;
	echo json_encode($return) ;
?>