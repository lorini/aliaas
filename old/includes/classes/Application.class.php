<?php
	class Application{

		static function init(){
			Application::log("Application is starting");
			/* ZWAVE */
			if(ZWAVE_IS_ENABLED == 1){
				Application::log("Zwave initialization");
				system("sudo touch ".OPENZWAVE_OUTPUT_FILE);
				system("sudo killall ".ZWAVE_COMMAND." 2> /dev/null" );
				system("sudo ".APPLICATION_PATH.ZWAVE_COMMAND." >> /dev/null  &");
			}

			/* X10 */
			if(X10_IS_ENABLED == 1){
				Application::log("X10 initialization");
				system("sudo heyu engine starts 2> /dev/null ") ;
				if( !file_exists(LOG_FILE) ) {
					$log_file = fopen(LOG_FILE, 'w') or die("can't open file");
					fclose($log_file);
				}
			}
		}

		static function log($action){
			$log_file = fopen(LOG_FILE, "a+");
			fwrite($log_file, "[INFO ]".date('[j/m/y - H:i:s]')." -- [".$action."] \n") ;
			fclose($log_file);
		}

		static function error($action){
			$log_file = fopen(LOG_FILE, "a+");
			fwrite($log_file, "[ERROR]".date('[j/m/y - H:i:s]')." -- [Error while '".$action."'] \n") ;
			fclose($log_file);
		}

		static function command($command){
			ob_start();
				system($command, $code);
				if($code != 0) Application::error($command) ;
				$return = ob_get_contents();
			ob_end_clean();
			return $return  ;
		}
		
		static function saveHouse($house){
			$options = array(
				XML_SERIALIZER_OPTION_XML_DECL_ENABLED 	=> TRUE,
  				XML_SERIALIZER_OPTION_RETURN_RESULT 	=> TRUE, 
  				XML_SERIALIZER_OPTION_TYPEHINTS			=> TRUE,
				XML_SERIALIZER_OPTION_INDENT        	=> '  '
  			);

			$serializer = &new XML_Serializer($options);
			$xml = $serializer->serialize($house);
			$xml_file = fopen(XML_FILE, "w+");
			fwrite($xml_file, $xml);
			fclose($xml_file);
		}
		
		static function loadHouse(){
			$options = array(
				XML_UNSERIALIZER_OPTION_COMPLEXTYPE => 'object'
			);
			
			$unserializer = &new XML_Unserializer($options);
			$xml = ""; 
			$xml_file = fopen(XML_FILE, "r"); 
							
			while(!feof($xml_file)) {
				$buffer = fgets($xml_file,1024);
				$xml   .= $buffer;
			}
			fclose($xml_file);
			$unserializer->unserialize($xml);
		 	return $unserializer->getUnserializedData();
		}
	}
?>
