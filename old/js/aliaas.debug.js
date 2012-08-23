var house = null ;

$(function () {
    $('.carousel').carousel({
      interval: 122000
    }); 
    checkUpdate() ;
});


function checkUpdate() {

    $.noty.closeAll(); 
    $.post("observator.php", {
        house: house
    }).
    success(function (data) {
        if (data != '') house = eval('(' + data + ')');
        if (house.errno == 111) {
            var erreur = $.noty({
                text: 'Connexion au serveur impossible. Nouvelle tentative ?',
                buttons: [{
                    type: 'button green',
                    text: 'Ok',
                    click: checkUpdate
                }, {
                    type: 'button pink',
                    text: 'Cancel',
                    click: function () {}
                }],
                closable: true,
                timeout: false,
                layout: 'bottom',
                modal: true,
                closeOnSelfClick: false
            });
            return;
        }
        drawDebug();
    });
}

function drawDebug() {
   
    var ctx = $('#roomDebugCanvas')[0].getContext("2d");

    ctx.clearRect(0, 0, 600, 500);

    $.each(house.rooms, function (indiceRoom, room) {
        nb_device = room.devices.length ; 
        $.each(room.devices, function (indiceDevice, device) {
            var device_img = new Image ;
            device_img.src = "./domotique/" + device.filename ; 
            device_img.onload = (function(){ctx.drawImage(device_img, 0, 0);});
        });
    });


    $.each(house.rooms, function (indiceRoom, room) {
        $.each(room.devices, function (indiceDevice, device) {
            var light_bulb_on  = new Image ;
            light_bulb_on.src  = "images/light_on.png" ;
            light_bulb_on.onload = function(){ctx.drawImage(light_bulb_on, device.x - 16, device.y - 16);};    
        });
    });

    var heatmappng = new Image();
    heatmappng.src = "images/heatmap.png?timestamp=" + new Date().getTime();
    heatmappng.onload = function () {ctx.drawImage(heatmappng, 0, 0);};

    ctx.scale(0.95, 0.95);
}
