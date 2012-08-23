<?php
	abstract class Device {
		var $address ; 
		var $state   ;
		var $moduleName ;
		var $description ;
		var $xpos ;
		var $ypos ;
		var $minrange ; 
		var $maxrange ;
		var $zone ;
		var $toBeSwitchedOn ;
		function Device($address, $description, $xpos, $ypos, $minrange, $maxrange){
			$this->address 			= $address ;
			$this->description 		= $description;
			$this->moduleName 		= get_class($this);
			$this->xpos 			= $xpos ;
			$this->ypos 			= $ypos ; 
			$this->minrange 		= $minrange; 
			$this->maxrange			= $maxrange;
			$this->toBeSwitchedOn 	= 0 ; 
			Application::log("New ".$this->moduleName." [".$this->description."] - [@".$this->address."]") ;
		}
	
		function getAddress(){
			return $this->address ;
		}
		
		function setAddress($address){
			$this->address = $address;
		}
		
		function getModuleName(){
			return $this->moduleName; 
		}
		
		function setModuleName($moduleName){
			$this->moduleName = $moduleName ; 
		}
		
		function getXPos(){
			return $this->xpos ;
		}
		
		function getYPos(){
			return $this->ypos ;
		}
		
		function setZone($zone){
			$this->zone = $zone ;
		}
		
		abstract function getState();
	}
?>