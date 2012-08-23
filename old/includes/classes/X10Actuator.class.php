<?php	
	abstract class X10Actuator extends Actuator{
	
		function X10Actuator($address, $description, $xpos, $ypos, $minrange, $maxrange){
			parent::__construct($address, $description, $xpos, $ypos, $minrange, $maxrange)	; 
			$this->update(); 
		}
		
		function switchOn(){
			Application::log("Switching on ".$this->address);
			Application::command(X10_PREFIX.X10_COMMAND.X10_SWITCH_ON_COMMAND.$this->address.X10_SUFFIX);	
			$this->update(); 
		}
		
		function switchOff(){
			Application::log("Switching off ".$this->address);
			Application::command(X10_PREFIX.X10_COMMAND.X10_SWITCH_OFF_COMMAND.$this->address.X10_SUFFIX);
			$this->update();
		}
		
		function getState(){
			$this->state = Application::command(X10_PREFIX.X10_COMMAND.X10_GET_STATE_COMMAND.$this->address);
			return $this->state ;
		}	
			
		function getDimLevel(){
			if($this->isDimable)
				$this->dimLevel = Application::command(X10_PREFIX.X10_COMMAND.X10_GET_DIMLEVEL_COMMAND.$this->address );
			return $this->dimLevel ;
		}
		
		function setDimLevel($dimLevel){
			if($this->isDimable){
				Application::log("Setting dim to ".$this->address);
				Application::command(X10_PREFIX.X10_COMMAND.X10_SET_DIMLEVEL_COMMAND.$this->address.$dimLevel.X10_SUFFIX);
				$this->update();
			}
		}
		
		function update(){
			$this->getState(); 
			if($this->isDimable) $this->getDimLevel();
		}
		
		
	}
	
	class Lm12 extends X10Actuator{
	
		function Lm12($address=0, $xpos=0, $ypos=0, $minrange=0, $maxrange=0){
			$this->isDimable 		= true 				; 		
			parent::__construct($address, "X10 Lamp Module", $xpos, $ypos, $minrange, $maxrange); 
		}
	
	}	
	
	class Am12 extends X10Actuator{
	
		function Am12($address=0, $xpos=0, $ypos=0, $minrange=0, $maxrange=0){
			$this->isDimable 		= false 				; 		
			parent::__construct($address, "X10 Appliance Module", $xpos, $ypos, $minrange, $maxrange); 
		}
	
	}
	
?>