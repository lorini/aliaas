var  mongoose = require('mongoose')
   ,   Schema = mongoose.Schema ;

var protocolSchema = new Schema({
   	name 	 : String, 
   	wired 	 : Boolean, 
   	wireless : Boolean, 
   	tool 	 : String, 
   	command  : {
		on  : [String], 
		off : [String], 
		dim : [String],
		set : [String],
		get : [String]
	}, 
	brand : [String]
});

protocolSchema.methods.put = function(req, res){

}

protocolSchema.methods.get = function(req, res){

}

protocolSchema.methods.update = function(req, res){

}

protocolSchema.methods.delete = function(req, res){

}

module.exports = protocolSchema;