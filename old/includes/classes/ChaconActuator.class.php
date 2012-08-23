<?php	
	abstract class ChaconActuator extends Actuator{
	
		function ChaconActuator($address, $description, $xpos, $ypos, $minrange, $maxrange){
			parent::__construct($address, $description, $xpos, $ypos, $minrange, $maxrange)	; 
			$this->update(); 
		}
		
		function switchOn(){
			$this->state = 1 ; 
			Application::log("Switching on ".$this->address);
			Application::command(CHACON_PREFIX.CHACON_COMMAND.CHACON_SWITCH_ON_COMMAND.$this->address.CHACON_SUFFIX);	
			$this->update(); 
		}
		
		function switchOff(){
			$this->state = 0 ; 
			Application::log("Switching off ".$this->address);
			Application::command(CHACON_PREFIX.CHACON_COMMAND.CHACON_SWITCH_OFF_COMMAND.$this->address.CHACON_SUFFIX);
			$this->update();
		}
		
		function getState(){
			//$this->state = Application::command(CHACON_PREFIX.CHACON_COMMAND.CHACON_GET_STATE_COMMAND.$this->address);
			return $this->state ;
		}	
			
		function getDimLevel(){
			if($this->isDimable)
				//$this->dimLevel = Application::command(CHACON_PREFIX.CHACON_COMMAND.CHACON_GET_DIMLEVEL_COMMAND.$this->address );
			return $this->dimLevel ;
		}
		
		function setDimLevel($dimLevel){
			if($this->isDimable){
				//Application::log("Setting dim to ".$this->address);
				//Application::command(CHACON_PREFIX.CHACON_COMMAND.CHACON_SET_DIMLEVEL_COMMAND.$this->address.$dimLevel.CHACON_SUFFIX);
				$this->update();
			}
		}
		
		function update(){
			//$this->getState(); 
			//if($this->isDimable) $this->getDimLevel();
		}
		
		
	}
	
	class LED extends ChaconActuator{
	
		function LED($address=0, $xpos=0, $ypos=0, $minrange=0, $maxrange=0){
			$this->isDimable 		= false 				; 		
			parent::__construct($address, "DI-O LED", $xpos, $ypos, $minrange, $maxrange); 
		}
	
	}	
	
	
	
?>