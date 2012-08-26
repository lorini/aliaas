var  mongoose = require('mongoose')
   ,   Schema = mongoose.Schema
   , ObjectId = Schema.ObjectId;

var deviceSchema = new Schema({
      address : String, 
      state : { type: Boolean, default: false}, 
      brand : {
        name : String, 
        protocol : String 
      }
  });
     
deviceSchema.methods.switchOn = function(){
	if(this.state == 0){
	    this.state = 1 ; 
	    this.save(); 
	    console.log("Switching on "+this.address) ;
	} else console.log("Device "+ this.address+" already switched on.")
}
       
deviceSchema.methods.switchOff = function(){
	that = this ; 
	if(this.state == 1){

    	var   spawn  = require('child_process').spawn
    		, tdtool = spawn('tdtool', ['--off', this.address]); 
		
		tdtool.stdout.on('data', function (data) {
		  //console.log('stdout: ' + data);
		});

		tdtool.stderr.on('data', function (data) {
		  console.log('stderr: ' + data);
		});

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
  
module.exports = mongoose.model('Device', deviceSchema);