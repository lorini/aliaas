<?php
	abstract class X10Sensor extends Sensor{
		
		public function X10Sensor($address, $description, $xpos, $ypos){
			parent::__construct($address, $description, $xpos, $ypos)	; 		
			$this->getState() 							;
				
		}		
		
		function getState(){
			$state = Application::command(X10_PREFIX.X10_COMMAND.X10_GET_STATE_COMMAND.$this->address.X10_SUFFIX);
			if($this->state != $state){
				Application::log("Activity on @".$this->address);
				$this->state = $state ;
			}
			return $this->state ;
		}
	}
	
	class Ms13e extends X10Sensor {
	
		public function Ms13e($address=0, $xpos=0, $ypos=0){
			parent::__construct($address, "X10 Occupancy Sensor / Motion Detector", $xpos, $ypos);
		}
	}
?>