<?php
	class Sensor extends Device{
		public function Sensor($address, $description, $xpos, $ypos){
			parent::__construct($address, $description, $xpos, $ypos);
		}
		
		public function getState(){

		}

	}


?>
