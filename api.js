var mongoose = require("mongoose") ; 
    mongoose.connect('mongodb://localhost/aliaas', function(err){if(err) console.log(err);});

var Device   = mongoose.model('Device'  , require('./models/device.js'  ));
var Service  = mongoose.model('Service' , require('./models/service.js' ));
var Protocol = mongoose.model('Protocol', require('./models/protocol.js'));

exports.device = Device ; 

exports.removeAll = function(req, res){
  Device.remove(function(err, num){
    console.log(num + " device(s) erased."); 
  });
}



exports.get = function(req, res){
  new Device({address:1}).save() ; 
  Device.find(function(err, results){
    res.send(results); 
  })
}

exports.switch = function(req, res){
  Device.find({ address : req.params.address }, function(err, devices){
    devices.forEach(function(device) { 
      switch(req.params.state){
        case "on"  : device.switchOn() ; break ;
        case "off" : device.switchOff(); break ; 
      }  
    });
  });
  res.send({message:"Command executed."})
}