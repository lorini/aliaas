<?php

	/* APPLICATION PARAMETERS */
	define("APPLICATION_PATH"			, "/var/www/");
	define("LOG_FILE"					, APPLICATION_PATH."log/domo.log");
	define("XML_FILE"					, APPLICATION_PATH."save/house.xml");

	/* ACTIVES PROTOCOLS */
	define("X10_IS_ENABLED"				, true );
	define("ZWAVE_IS_ENABLED"			, false);

	/* X10 PROTOCOL */
	define("X10_PREFIX"					, "sudo ");
	define("X10_COMMAND"				, " heyu ");
	define("X10_GET_STATE_COMMAND"		, " onstate ");
	define("X10_GET_DIMLEVEL_COMMAND"	, " dimlevel ");
	define("X10_SWITCH_ON_COMMAND"		, " on ");
	define("X10_SWITCH_OFF_COMMAND"		, " off ");
	define("X10_SET_DIMLEVEL_COMMAND"	, " dim ");
	define("X10_SUFFIX"					, " 2> /dev/null");

	/* ZWAVE PROTOCOL */
	define("ZWAVE_COMMAND"				, "openzwave.bin");
	define("OPENZWAVE_OUTPUT_FILE"		, "/tmp/zwave.out");
	
	
	/* CHACON PROTOCOL */
	define("CHACON_PREFIX"					, "sudo ");
	define("CHACON_COMMAND"					, " tdtool ");
	//define("CHACON_GET_STATE_COMMAND"		, " onstate ");
	//define("CHACON_GET_DIMLEVEL_COMMAND"	, " dimlevel ");
	define("CHACON_SWITCH_ON_COMMAND"		, " --on ");
	define("CHACON_SWITCH_OFF_COMMAND"		, " --off ");
	define("CHACON_SET_DIMLEVEL_COMMAND"	, " --dimlevel ");
	define("CHACON_SUFFIX"					, " 2> /dev/null");

	
	

?>
