<?php  
class ZwaveSensor extends Sensor{
	
	public function ZwaveSensor($address, $description, $xpos, $ypos){
			parent::__construct($address, $description, $xpos, $ypos)	; 		
			$this->getState() 							;
				
		}		
		
		function getState(){
			ob_start();		
				$fd = fopen("/tmp/zwave.out", "r") or die ("Failed to open zwave.out\n"); 
				$state = fgets($fd, 2) ; 
				fclose($fd);
			ob_end_clean();
			if($this->state != $state) {
				Application::log("Door ".($state == 0  ? "closed" : "opened")." on @".$this->address) ;
				$this->state = $state ;
			}
			return $this->state ;
		}
	}
	
	class DoorDetector extends ZwaveSensor {
	
		public function DoorDetector($address, $xpos, $ypos){
			parent::__construct($address, "ZWAVE Door Detector", $xpos, $ypos);
		}
	}


?>