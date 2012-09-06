$(function(){

	var Device = Backbone.Model.extend({

		defaults : function(){
			return {
				address  : "1",
				protocol : "chacon", 
				state    : false 
			}; 
		}

		initialize : function(){
	      if (!this.get("address")) {
        	this.set({"address": this.defaults.address});
      		}
		}

		switchOn : function(){
			this.set({"state":true}) ; 
			// server request to switch On the device 
		}
		
		switchOff : function(){
			this.set({"state":false}) ; 
			// server request to switch Off the device 
		}

		clear : function(){
			this.destroy() ;
		}
	
	});

	var Room = Backbone.Collection.extend({

		model : Device, 

		switchedOn : function(){
			return this.filter(function(device){return  todo.get('state');});
		}

		switchedOff : function(){
			return this.filter(function(device){return !todo.get('state');});
		}

		switchOnAll : function(){}, 
		switchOffAll : function(){}

	});

	var Devices = new Room ; 

	var RoomView = Backbone.View.extend({

		events : {
			"click .device"   : "toggle", 
			"dbclick .device" : "edit", 
			"click .remove"	  : "remove"
		}, 

		initialize : function(){
			console.log("roomview initialize called")
			this.model.bind('change', this.render, this);
			this.model.bind('destroy', this.remove, this);
		};

		render : function(){
			console.log("roomview render called"); 
		}

		toggle : function(){
			console.log("roomview toggle called"); 
		}

		edit : function(){
			console.log("roomview edit called") ;
		}

		remove : function(){
			console.log("roomview remove called") ;
		}

	});

	var AppView = Backbone.view.extend({

		el: $("#aliaas-app"),

		events: {
	      "click #send-btn": "sendCommand",
	      "click #new-btn" : "newDevice" 
	    }, 

	    initialize : function(){
	    	console.log("appview initialize called")
	    }, 

	});

}); 