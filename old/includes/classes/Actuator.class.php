<?php
	abstract class Actuator extends Device{
		var $isDimable 	; 
		var $dimLevel 	;
		
		public function Actuator($address, $description, $xpos, $ypos, $minrange, $maxrange){
			parent::__construct($address, $description, $xpos, $ypos, $minrange, $maxrange); 
		}
	}
?>