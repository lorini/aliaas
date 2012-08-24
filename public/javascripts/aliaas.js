/**
* Classe de la page principale d'ALiaaS 
* 
* @class AliaasBase 
* @constructor
**/
function AliaasBase() {
  
    /**
    * Descripteur de la maison. Ce JSON est mis à jour à chaque fois 
    * que le fichier "house.json" est modifié sur le serveur. Cette 
    * mise à jour est faite par Node.JS côté serveur. 
    *
    * @attribute house
    * @type array 
    * @default null
    */ 
    this.house = null ; 
    
    /**
    * Websocket de SocketIO qui va permettre de se connecter au 
    * serveur Node.JS pour mettre à jour l'attribut 'house'.
    *
    * @attribute socket
    * @type socket
    * @default null
    */
    this.socket = null ;
    
    
    /**
    * Valeur de la dispersion de la lumière pour le dessin du 
    * cercle d'incidence des lampes. 
    *
    * @attribute lampGradientValues
    * @type array
    * @default {  0.00 : 1,0.12 : 0.87, 0.25 : 0.48,0.37 : 0.19,0.50 : 0.13, 0.62 : 0.10,0.75 : 0.09,0.87 : 0.07, 0.99 : 0.06, 1 : 0.01 }
    */
    this.lampGradientValues = {  0.00 : 1,0.12 : 0.87, 0.25 : 0.48,0.37 : 0.19,0.50 : 0.13, 
                                 0.62 : 0.10,0.75 : 0.09,0.87 : 0.07, 0.99 : 0.06, 1 : 0.01 };

    /**
    * Connect to Node.JS for updating the house. 
    *
    * @method connect
    * @param {string} host Adresse du serveur ou NodeJs est en execution
    * @param {integer} port Port du serveur sur lequel NodeJs est en execution
    * @chainable
    **/
    this.connect = function(host, port, updateCallback){
        that = this ; 
        this.socket = io.connect(host, {port:port}); 
        
        this.socket.on('house', function (data) { 
            if(data != "") that.house = JSON.parse(data) ; 
            if( updateCallback != undefined ) updateCallback() ;
        }); 
        return this ; 
    }

    /**
    * Envoi une commande au proxy.
    * 
    * @method command
    * @chainable
    **/
    this.command = function() {
        var device = { address: $("#address").val()};
        this.socket.emit('command', device); 
        //$.post("command.php?action=" + $("#action").val(), {device: device});
        return this ;
    }

    /**
    * Dessin l'état du système sur le canvas $('#roomCanvas') à partir de
    * la variable 'house'.
    * 
    * @method draw
    * @chainable
    **/
    this.draw = function () {
        that = this ;
        var ctx = $('#roomCanvas')[0].getContext("2d");
        ctx.clearRect(0, 0, 600, 500);
        $.each(this.house.rooms, function (indiceRoom, room) {
            nb_device = room.devices.length ; 
            $.each(room.devices, function (indiceDevice, device) {
                if (device.state == 1) {  
                    //var device_img = new Image ;
                    //device_img.src = "./domotique/" + device.filename ; 
                    //device_img.onload = (function(){ctx.drawImage(device_img, 0, 0);});
                    var gradient = ctx.createRadialGradient(device.x, device.y, 0, device.x, device.y, 100);
                    $.each(that.lampGradientValues, function(i, j){   gradient.addColorStop(i, 'rgba(255,185,15, '+j+')'); });
                    ctx.fillStyle = gradient;    
                    ctx.arc(device.x, device.y, 200, Math.PI * 2, false);
                    ctx.fill();
                }
            });
        });

        $.each(this.house.rooms, function (indiceRoom, room) {
            $.each(room.devices, function (indiceDevice, device) {
                if (device.state == 1) {
                    var light_bulb_on  = new Image ;
                    light_bulb_on.src  = "img/light_on.png" ;
                    light_bulb_on.onload = function(){ctx.drawImage(light_bulb_on, device.x - 16, device.y - 16)};   
                } else { 
                    var light_bulb_off  = new Image ;
                    light_bulb_off.src  = "img/light_off.png" ;
                    light_bulb_off.onload = function(){ctx.drawImage(light_bulb_off, device.x - 16, device.y - 16)};       
                }
            });
        });
        return this;
    }
}