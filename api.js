var Device = require('./models/device.js');
var House  = require('./models/house.js');

exports.removeAll = function(req, res){
  Device.remove(function(err, num){
    console.log(num + " device(s) erased."); 
  });
}

exports.post = function(req, res) {
  new Device({ address : 1 , brand   : { name : "Chacon", protocol : "HomeEasy"}}).save() ; 
}

exports.get = function(req, res){
  Device.find(function(err, results){
    console.log(results);
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

  res.send("")

}