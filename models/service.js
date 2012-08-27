var  mongoose = require('mongoose')
   ,   Schema = mongoose.Schema
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
  
module.exports = mongoose.model('Service', serviceSchema);