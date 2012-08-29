var  mongoose = require('mongoose')   
   , Schema = mongoose.Schema
   , ObjectId = Schema.ObjectId ;

var serviceSchema =  new Schema({
	type   : Number , 
	circle : {
		x 		: Number, 
		y 		: Number,
		radius  : Number
	}, 
	imageUrl : String , 
	imageB64 : Buffer  
});

serviceSchema.methods.put = function(req, res){

}

serviceSchema.methods.get = function(req, res){

}

serviceSchema.methods.update = function(req, res){

}

serviceSchema.methods.delete = function(req, res){

}  

module.exports = serviceSchema;