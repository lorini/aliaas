var  mongoose = require('mongoose')
   ,   Schema = mongoose.Schema
   , ObjectId = Schema.ObjectId
   , serviceSchema  = require("./service")
   , protocolSchema = require("./protocol");

var deviceSchema = new Schema({
	address  : String, 
	state    : { type: Boolean, default: false }, 
	protocol : [protocolSchema],
	position : {
		x : { type : Number, default : 0 } ,
		y : { type : Number, default : 0 } 
	} , 
	services : [serviceSchema], 
	positioned : Boolean 
  });
 
deviceSchema.methods.get = function(req, res){
	console.log("get"); 
}    

deviceSchema.methods.switchOn = function(){
	that = this ; 
	if(this.state == 0){

    	var   spawn  = require('child_process').spawn
    		, tdtool = spawn('tdtool', ['--on', this.address]); 
		
		tdtool.stdout.on('data', function (data) {});
		tdtool.stderr.on('data', function (data) {console.log('stderr: ' + data);});
		tdtool.on('exit', function (code) {
		  if(code != 0) console.log('child process exited with code ' + code);
		  else {
		  	this.state = 1 ;
		  	this.save();
		  	console.log("Switching on "+this.address) ; 
		  }
		}); 

    } else console.log("Device "+ this.address+" already switched on.")	
}
       
deviceSchema.methods.switchOff = function(){
	that = this ; 
	if(this.state == 1){

    	var   spawn  = require('child_process').spawn
    		, tdtool = spawn('tdtool', ['--off', this.address]); 
		
		tdtool.stdout.on('data', function (data) {});
		tdtool.stderr.on('data', function (data) {console.log('stderr: ' + data);});
		tdtool.on('exit', function (code) {
		  if(code != 0) console.log('child process exited with code ' + code);
		  else {
		  	this.state = 0 ;
		  	this.save();
		  	console.log("Switching off "+this.address) ; 
		  }
		}); 

    } else console.log("Device "+ this.address+" already switched off.")	
}

deviceSchema.methods.put = function(req, res){

}

deviceSchema.methods.get = function(req, res){

}

deviceSchema.methods.update = function(req, res){

}

deviceSchema.methods.delete = function(req, res){
	console.log("j'ai tout compris ! ");
}

module.exports = deviceSchema ;