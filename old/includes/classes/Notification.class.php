<?php 

define("INFO"	, 0);
define("ERROR"	, 1);
define("ALERT"	, 2);

class Notification{
	
	var $message 	; 
	var $priority 	;
	var $type 		;
	
	public function Notification($message, $type=INFO, $priority=0){
		$this->message 	= $message 	; 
		$this->type 	= $type 	;
		$this->priority = $priority ; 
	}
	
}

?>