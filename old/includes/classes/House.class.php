<?php 
	class House{

		var $rooms = array(); 
	
		
		public function House(){
		}
		
		public function generateImage(){
			foreach($this->rooms as $room){
				return $room->generateImage(); 
			}
		}
		
		public function addRoom($room){
			if( get_class($room) == "Room")
				$this->rooms[] = $room ;
			else 
				return 1 ; 
		}
	}
?>