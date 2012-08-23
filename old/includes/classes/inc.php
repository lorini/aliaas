<?php 

	/* Parameters ------------------------ */
	require_once 'parameters.php'  			; 
	
	
	
	
	/* Libraries ------------------------- */
	require_once 'XML/Serializer.php'		;	
	require_once 'XML/Unserializer.php'		;




	/* Static Class ---------------------- */
	require_once 'Misc.class.php' 			;
	require_once 'Application.class.php'	;
	
	
	
	
	/* Class ----------------------------- */
	require_once 'House.class.php'    		;
	require_once 'Room.class.php'     		;
	require_once 'Zone.class.php'     		;
	require_once 'Device.class.php'   		; 	
	require_once 'Actuator.class.php' 		;
	require_once 'Sensor.class.php'   		;
	require_once 'Notification.class.php' 	;
	
	
	
	
	/* X10 ------------------------------- */
	require_once 'X10Sensor.class.php'   	;
	require_once 'X10Actuator.class.php' 	;	
	
	
	/* Chacon ---------------------------- */
	require_once 'ChaconActuator.class.php' 	;
	
	
	/* Z-Wave ---------------------------- */
	require_once 'ZwaveSensor.class.php'   	;
	require_once 'ZwaveActuator.class.php' 	;
?>