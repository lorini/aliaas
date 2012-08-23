<?php
	class Misc {
		static function takePicture($fileName = "snapshot.png"){
			Application::command("sudo uvccapture 2> /dev/null"); 
		}
	}
?>