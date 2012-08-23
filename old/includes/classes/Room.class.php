<?php 

	define("MAP_FILE_FORMAT" 		, 'png'								);
	define("MAP_FILE_NAME"	 		, 'images/map.'.MAP_FILE_FORMAT	);
	define("MAP_FONT"		 		, 'AvantGarde-Book'					);
	define("MAP_FONT_COLOR"  		, 'black'							);
	define("MAP_FONT_SIZE"	 		, '16'								);
	define("MAP_BACKGROUND_COLOR"	, 'WhiteSmoke'						);
	define("MAP_BORDER_COLOR"		, 'Grey'							);
	define("LIGHT_COLOR"	  		, 'Orange'							);
	define("LIGHT_ON_IMAGE"  		, 'images/light_on.png'				);
	define("LIGHT_OFF_IMAGE" 		, 'images/light_off.png'			);
	
	class Room{
		var $name; 
		var $devices = array(); 
		var $xmax ; 
		var $ymax ;
		var $lastHeatMap; 
		var $debugTraced; 
		
		public function Room($name=0 , $xmax=0, $ymax=0){
			$this->name = $name ; 
			$this->xmax = $xmax ; 
			$this->ymax = $ymax ; 
		}
	
		public function addDevice($device){
			if( $device->xpos <= $this->xmax && $device->ypos <= $this->ymax) {
				$this->devices[] = $device ;
				Application::log($device->moduleName." added to the room ".$this->name) ;
			} else { 
				Application::error("Adding ".$device->moduleName." to the room ".$this->name." : Out of bounds") ;
				return 1 ; 
			}
		}
		
		public function generateImage(){	
		
			$imageBank[LIGHT_OFF_IMAGE] = new Imagick();
			$imageBank[LIGHT_OFF_IMAGE]	->readImage(LIGHT_OFF_IMAGE);
			
			$imageBank[LIGHT_ON_IMAGE] 	= new Imagick();
			$imageBank[LIGHT_ON_IMAGE]	->readImage(LIGHT_ON_IMAGE);
			
		  	$room = new Imagick();
		  	$room->newImage($this->xmax-2,$this->ymax-2,MAP_BACKGROUND_COLOR);

			$draw = new ImagickDraw();
			$draw->setFont(MAP_FONT);
			$draw->setFontSize(MAP_FONT_SIZE);
			
	
			$draw->setFillColor(new ImagickPixel(LIGHT_COLOR));	
	
			foreach($this->devices as $device){
				$draw->setFillOpacity(0.3); 
				$xoffset = -2 ; 
				$yoffset = 0 ;
				if($device->state == 1) $draw->ellipse( $device->xpos + $xoffset, 	
														$device->ypos + $yoffset, 	
														$device->minrange,
														$device->minrange,  0, 360 );
				
				$draw->setFillOpacity(0.5); 				
				$xoffset = -2 ; 
				$yoffset = 0 ;	
				if($device->state == 1) $draw->ellipse( $device->xpos + $xoffset, 	
														$device->ypos + $yoffset, 
														$device->maxrange, 
														$device->maxrange,  0, 360 );
			}
	 		
			foreach($this->devices as $device){
				$xoffset = $device->xpos < $this->xmax * 0.75 ? -17  : -17 ; 
				$yoffset = $device->ypos < $this->ymax * 0.75 ? -17  : -16 ;				
				$draw->composite(imagick::COMPOSITE_DEFAULT, $device->xpos + $xoffset , 
															 $device->ypos + $yoffset , 
															 32 , 32 , 
															 $device->state == 1 ? $imageBank[LIGHT_ON_IMAGE]  : 
															 					   $imageBank[LIGHT_OFF_IMAGE]);
			}
			
			$room->drawImage($draw);			
			$draw->setFillColor(new ImagickPixel(MAP_FONT_COLOR));	 				
			
			foreach($this->devices as $device){
				$xoffset = -11 ;
				$yoffset = $device->ypos < $this->ymax * 0.75 ? +36 : -24 ;				
				$room->annotateImage($draw, $device->xpos+$xoffset, $device->ypos+$yoffset, 0, $device->address);
			}
		
			$room->borderImage(MAP_BORDER_COLOR, 1, 1);	
  			$room->setImageFormat(MAP_FILE_FORMAT);
			$room->writeImage(MAP_FILE_NAME);
		}		
		
		public function lightWithHeatmap(){
			$this->debugTraced = 0 ; 
			
			$sTime = microtime();
			foreach($this->devices as $device){
				foreach($this->lastHeatMap as $id=>$point){
					$xa = $point->x ;
					$ya = $point->y ;
					$xb = $device->xpos; 
					$yb = $device->ypos;
					
					$distance = sqrt(($xb-$xa)*($xb-$xa) + ($yb-$ya)*($yb-$ya)) ;				
					
					if($distance <= $device->maxrange){
						$device->toBeSwitchedOn = 1 ;
						break;	
					} 
				}
			}
			$eTime = microtime();
			
			
			foreach($this->devices as $device){
				if($device->toBeSwitchedOn == 1){
					$device->switchOn(); 
					$device->toBeSwitchedOn = 0 ;
				} else {
					$device->switchOff(); 
				}
			}
			
			return ($eTime-$sTime);
		}
		
		
		
		public function generateDebugImage(){	
			if($this->debugTraced == 1) return ; 
			$imageBank[LIGHT_OFF_IMAGE] = new Imagick();
			$imageBank[LIGHT_OFF_IMAGE]	->readImage(LIGHT_OFF_IMAGE);
			
			$imageBank[LIGHT_ON_IMAGE] 	= new Imagick();
			$imageBank[LIGHT_ON_IMAGE]	->readImage(LIGHT_ON_IMAGE);
			
		  	$room = new Imagick();
		  	$room->newImage($this->xmax-2,$this->ymax-2,MAP_BACKGROUND_COLOR);

			$draw = new ImagickDraw();
			$draw->setFont(MAP_FONT);
			$draw->setFontSize(MAP_FONT_SIZE);
	
			$draw->setFillColor(new ImagickPixel("gray"));	
	
			foreach($this->devices as $device){
				$draw->setFillOpacity(0.2); 				
				$xoffset = -2 ; 
				$yoffset = 0 ;	
				$draw->ellipse( $device->xpos + $xoffset, 	
								$device->ypos + $yoffset, 
								$device->maxrange, 
								$device->maxrange,  0, 360 );
			}
	 		
			foreach($this->devices as $device){
				$xoffset = $device->xpos < $this->xmax * 0.75 ? -17  : -17 ; 
				$yoffset = $device->ypos < $this->ymax * 0.75 ? -17  : -16 ;				
				$draw->composite(imagick::COMPOSITE_DEFAULT, $device->xpos + $xoffset , 
															 $device->ypos + $yoffset , 
															 32 , 32 , 
															 $device->state == 1 ? $imageBank[LIGHT_ON_IMAGE]  : 
															 					   $imageBank[LIGHT_OFF_IMAGE]);
			}
			
			$draw->setFillOpacity(1); 				
			$draw->setFillColor(new ImagickPixel("black"));	
			
			$inRangePoints = array() ; 
			
			foreach($this->lastHeatMap as $point){
				foreach($this->devices as $device){
					$xa = $point->x ;
					$ya = $point->y ;
					$xb = $device->xpos; 
					$yb = $device->ypos;
					
					$distance = sqrt(($xb-$xa)*($xb-$xa) + ($yb-$ya)*($yb-$ya)) ;
					
					if($distance <= $device->maxrange){
						$draw->setFillColor(new ImagickPixel("red"));
						$inRangePoints[] = $point ;	
					} else {
						$draw->setFillColor(new ImagickPixel("black"));			
					}
					
					$draw->line($point->x, $point->y, $device->xpos, $device->ypos);
					$draw->ellipse( $point->x , $point->y  , 2  , 2,  0, 360 );
					
					//$room->annotateImage($draw, $point->x, $point->y, 0, "x");
				}	
			}
			
						$draw->setFillColor(new ImagickPixel("red"));
			foreach($inRangePoints as $point){
					$draw->ellipse( $point->x , $point->y  , 2  , 2,  0, 360 );
			}
			
			$room->drawImage($draw);			
			$draw->setFillColor(new ImagickPixel(MAP_FONT_COLOR));	 				
			
			foreach($this->devices as $device){
				$xoffset = -11 ;
				$yoffset = $device->ypos < $this->ymax * 0.75 ? +36 : -24 ;				
				$room->annotateImage($draw, $device->xpos+$xoffset, $device->ypos+$yoffset, 0, $device->address);
			}
		

			
			$draw->setFillOpacity(1); 	
			
			$room->borderImage(MAP_BORDER_COLOR, 1, 1);	
  			$room->setImageFormat(MAP_FILE_FORMAT);
			$room->writeImage(MAP_FILE_NAME.".debug");	
			$this->debugTraced=1 ;
		}
	}
?>