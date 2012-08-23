<?php
	ob_start();
		$fp = fsockopen("tcp://127.0.0.1", 2001, $errno, $errstr);
	ob_end_clean();	
	
	if($errno != 0 ){
		$error["errno"] = $errno ;
		echo json_encode($error) ;
	}
	
	if ($fp) {
		// stream_set_timeout($fp, 2);
		$json = json_encode($_POST['house']);
		fwrite($fp,$json) ;
		echo fread($fp,65536);
		fclose($fp);
	}
?>
