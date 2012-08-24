var house          = null,
    scalex         =    1, 
    scaley         =    1,
    centrex        =    0, 
    centrey        =    0,
    centreimagex   =    0, 
    centreimagey   =    0,
    diffusion      =  200,
    rotation       =    0,
    intensity      =    10 ;

var newDevice = Object(); 
var guidedRoa  = 1 ;
var freeRoa    = 0 ; 
var pencilsize = 25 ;

var     default_values = {
                    0.00 : "rgba(255,185,15, 1.00)",
                    0.12 : "rgba(255,185,15, 0.87)",
                    0.25 : "rgba(255,185,15, 0.48)",
                    0.37 : "rgba(255,185,15, 0.19)",
                    0.50 : "rgba(255,185,15, 0.13)",
                    0.62 : "rgba(255,185,15, 0.10)",
                    0.75 : "rgba(255,185,15, 0.09)",
                    0.87 : "rgba(255,185,15, 0.07)",
                    0.99 : "rgba(255,185,15, 0.06)",
                    1.00 : "rgba(255,185,15, 0.01)"
                };

$(function () {

    contextMenuInit(); 
    initSlider() ;

    $("#roaControls").hide();

    $("#guidedRoaButton").click(function(){ guidedRoa  = 1 ; freeRoa    = 0 ;});
    $("#freeRoaButton").click(function(){ guidedRoa  = 0 ; freeRoa    = 1 ; });
    
    $("body").bind("ajaxSuccess", function (e, xhr, settings) {
        if (xhr.responseText != "") {
            var message = eval('(' + xhr.responseText + ')').message;
            if (message != null) 
             noty({"text":message,"layout":"topRight","type":"alert","theme":"noty_theme_twitter","animateOpen":{"height":"toggle"},"animateClose":{"height":"toggle"},"speed":500,"timeout":355000,"closeButton":false,"closeOnSelfClick":true,"closeOnSelfOver":false,"modal":false});
        }
    });

    $(".draggable").draggable({
        cursorAt: {left: 16, top: 16},
        revert  : true 
    });

    $("#roomCanvas").droppable({
        drop: function (event, ui) {
            newDevice.x = Math.floor(event.pageX - $(this).offset().left) ; 
            newDevice.y = Math.floor(event.pageY - $(this).offset().top) ; 
            newDevice.moduleName = $(ui.draggable).attr("id") ;

            var modalHeader = "Ajout d'une nouvelle lampe de type "+newDevice.moduleName+" aux coordonnées x="+newDevice.x+" y="+newDevice.y ;

            $("#RoaTypeChoiceModal .modal-header").find("h5").html(modalHeader);

            $("#RoaTypeChoiceModal").modal();
        }
    });

    $("#RoaTypeChoiceModal").find('.nextBtn').click(function(){
        var drawType ; 

        if(guidedRoa == 1) {
            drawType = "guidé" ;
            $("#freeRoaControls").hide() ; 
            $("#guidedRoaControls").show() ; 
        } else {
            drawType = "libre" ;
            $("#freeRoaControls").show() ; 
            $("#guidedRoaControls").hide() ;
        }

        $("#roaControls").find("h3").html("Outils de dessin "+ drawType) ;

        $("#newLamp, #oldLamps").hide(); 

        $("#roaControls").show();


            $heatmapArea = $("#heatmapArea") ;

        if(guidedRoa == 1){
            var $roa = $("<canvas></canvas>").attr({ id : "roa", width : 600 , height : 500 });
            $roa.css({
                top      : $heatmapArea.position()["top"], 
                left     : $heatmapArea.position()["left"], 
                position : "absolute"
            });
            $("body").append($roa); 
            drawROA() ;
        } else {
            initDrawSpace({ id : "roa", 
                            width : 600, 
                            height: 500, 
                            top   : $heatmapArea.position()["top"] +1 , 
                            left  : $heatmapArea.position()["left"] +1});
        }

    });

    $("#cancelRoaButton").click(cancelRoa); 
    $("#validRoaButton").click(sendNewLamp); 

    socket = io.connect('banane.cpe.fr', {port:8080}); 
    socket.on('house', function (data) { 
        if(data != "") house = JSON.parse(data) ;
        draw() ;
    }); 
});

function cancelRoa(){
    newDevice = Object() ;

    $("#roaControls").hide() ;
    $("#newLamp, #oldLamps").show(); 
    $("#roa").remove() ; 
}

function sendNewLamp(){
    var roaCanvas = $("#roa")[0].toDataURL("image/png") ; 
    newDevice.address  = $("#newDeviceAddress").val() ;
    newDevice.minrange =  0 ; 

    if(guidedRoa ==1) 
        newDevice.maxrange = $("#diffusion").slider("value");
    else 
        newDevice.maxrange = 0 ; 
    
    $.post("command.php?action=add", {
        image: roaCanvas, 
        device: newDevice 
    }).success(cancelRoa);
}

function initSlider(){
    $("#rotation").slider({
        create  : customUiSlider,
        value   :       rotation,
        min     :              0,
        max     :            360,
        change  :        drawROA,
        slide   :        drawROA });

    $("#diffusion").slider({
        create  : customUiSlider,
        value   :      diffusion,
        min     :              0,
        max     :            300,
        change  :        drawROA,
        slide   :        drawROA });

    $("#scalex").slider({
        create  : customUiSlider,
        value   :            100,
        min     :              1,
        max     :            200,
        change  :        drawROA,
        slide   :        drawROA });

    $("#scaley").slider({
        create  : customUiSlider,
        value   :            100,
        min     :              1,
        max     :            200,
        change  :        drawROA,
        slide   :        drawROA });

    $("#pencilsize").slider({
        create  : customUiSlider,
        value   :     pencilsize,
        min     :              0,
        max     :            150,
        slide   : function (event, ui) { pencilsize = $(this).slider("value"); }
    });

    $("#intensity").slider({
        create  : customUiSlider,
        value   :      intensity,
        min     :              0,
        max     :             40,
        slide   : function (event, ui) { intensity = $(this).slider("value"); }
    });
}


function initDrawSpace(options){

    function storeRoaPoint(event){

        var roaPoint = { x          : event.offsetX , 
                         y          : event.offsetY , 
                         intensity  : intensity     , 
                         pencilsize : pencilsize    } ;

        if (roaPoint.intensity > 1)
            roaPoints.push(roaPoint); 
        
        drawRoaPoints(roaPoint); 
    }

    function drawRoaPoints(roaPoint){   
        context.beginPath();
        context.fillStyle = "rgb(255,"+(255- roaPoint.intensity)+","+(255-5*roaPoint.intensity)+")";
        // 0 a 50k
        if (roaPoint.intensity <= 1)
            context.globalCompositeOperation = 'destination-out' ;
        else 
            context.globalCompositeOperation = 'source-over'     ;

        context.arc(roaPoint.x, roaPoint.y, roaPoint.pencilsize, 0, Math.PI * 2, true);

         if (roaPoint.intensity > 1){
            $("#indicationGomme").html("");
            var gradient = context.createRadialGradient(roaPoint.x, 0, 0, roaPoint.x, 0, intensity);
            for (var x in default_values) gradient.addColorStop(x, default_values[x]);
            context.fillStyle = gradient ;
        } else 
            $("#indicationGomme").html("MODE GOMME") ;

        context.closePath();
        context.fill();    
    }
 
    var $canvas    = $("<canvas/>").attr(options)
                                   .bind("mousemove mouseclick mouseenter vclick touch", storeRoaPoint)
                                   .css("position", "absolute")
                                   .appendTo($("body"))
                                   .offset(options);

    
    $canvas[0]["ontouchmove"] = function (ev) {
        var touch = ev.touches[0],
            simulatedEvent = document.createEvent("MouseEvent");
        simulatedEvent.initMouseEvent("mousemove", true, true, window, 1, touch.screenX, touch.screenY, touch.clientX, touch.clientY, false, false, false, false, 0, null);
        touch.target.dispatchEvent(simulatedEvent);
        ev.preventDefault();
    };

    var roaPoints  = Array(); 
    var context    = $canvas[0].getContext("2d");   
}

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
                "theme":"noty_theme_twitter",
                buttons: [{
                    type: 'btn btn-warning',
                    text: 'Ok',
                    click: checkUpdate
                }],
                closable: true,
                timeout: false,
                layout: 'bottom',
                modal: true,
                closeOnSelfClick: false
            });
            return;
        }
        draw();
        checkUpdate();
    }).error(function () {
        checkUpdate();
    });
}

function draw() {
    var ctx = $('#roomCanvas')[0].getContext("2d");
    ctx.clearRect(0, 0, 600, 500);

    $.each(house.rooms, function (indiceRoom, room) {
        nb_device = room.devices.length ; 
        $.each(room.devices, function (indiceDevice, device) {
            if (device.state == 1) {  
                var device_img = new Image ;
                device_img.src = "./domotique/" + device.filename ; 
                device_img.onload = (function(){ctx.drawImage(device_img, 0, 0);});
            }
        });
    });

    $.each(house.rooms, function (indiceRoom, room) {
        $.each(room.devices, function (indiceDevice, device) {
            if (device.state == 1) {
                var light_bulb_on  = new Image ;
                light_bulb_on.src  = "images/light_on.png" ;
                light_bulb_on.onload = function(){ctx.drawImage(light_bulb_on, device.x - 16, device.y - 16)};   
            } else { 
                var light_bulb_off  = new Image ;
                light_bulb_off.src  = "images/light_off.png" ;
                light_bulb_off.onload = function(){ctx.drawImage(light_bulb_off, device.x - 16, device.y - 16)};       
            }
        });
    });
}


function drawROA() {
    diffusion   = $("#diffusion").slider("value");
    rotation    = $("#rotation").slider("value")     ; 
    scalex      = $("#scalex").slider("value") / 100 ;
    scaley      = $("#scaley").slider("value") / 100 ;
    centrex     = centreimagex + (200 - scaley * 200);
    centrey     = centreimagey + (200 - scalex * 200);

    var roaContext = $('#roa')[0].getContext("2d");
    roaContext.save();
    roaContext.clearRect(0, 0, 600, 500);
    roaContext.beginPath();
    roaContext.translate(newDevice.x, newDevice.y);
    roaContext.rotate(rotation * Math.PI / 180);
    roaContext.scale(scalex, scaley);
    roaContext.arc(0, 0, diffusion, Math.PI * 2 , 0, false);

    var gradient = roaContext.createRadialGradient(centrex, 0, 0, centrex, 0, diffusion);
    for (var x in default_values) gradient.addColorStop(x, default_values[x]);
    roaContext.fillStyle = gradient ;
    roaContext.fill() ;
    roaContext.restore() ;
}

function contextMenuInit(){
    $.contextMenu({
        selector        : '#roomCanvas',
        trigger         :        'left',
        ignoreRightClick:          true,
        build: function ($trigger, e) {
            lex = Math.floor(e.pageX - $('#roomCanvas').offset().left);
            ley = Math.floor(e.pageY - $('#roomCanvas').offset().top);
            var clickedDevice = null;
            $.each(house.rooms, function (indiceRoom, room) {
                $.each(room.devices, function (indiceDevice, device) {
                    if ((parseInt(lex) <= (parseInt(device.x) + parseInt(16))) && (parseInt(lex) >= (parseInt(device.x) - parseInt(16)))) {
                        if ((parseInt(ley) <= (parseInt(device.y) + parseInt(16))) && (parseInt(ley) >= (parseInt(device.y) - parseInt(16)))) {
                            clickedDevice = device;
                            return;
                        } 
                    }
                });
            });
            if (clickedDevice == null) return {
                    callback: function (key, options) { 
                                    $("#form-posx").val(lex); 
                                    $("#form-posy").val(ley);
                                    $("#add-lamp-form").dialog("open");
                                    $("#protocol").val(key);},
                    items: { "add": {
                                name: "Add Device", icon: "add",
                                items: {
                                    "x10"       : { name: "New X10 Lamp"    , icon: "x10"    },
                                    "chaconled" : { name: "New Chacon Lamp" , icon: "chacon" }}}}
            };
            
            return {
                callback : function (key, options) { $.post("command.php?action=" + key, { device: clickedDevice  });},
                items    : {    "on"    : { name: "Switch On "  + clickedDevice.address,icon: "lighton" },
                                "off"   : { name: "Switch Off " + clickedDevice.address,icon: "lightoff"},
                                "edit"  : { name: "Edit "       + clickedDevice.address,icon: "edit"    },
                                "delete": { name: "Delete "     + clickedDevice.address,icon: "delete"  }}};
        }
    });

    $('#roomCanvas').click(function (event, ui) {
        lex = Math.floor(event.pageX - $(this).offset().left);
        ley = Math.floor(event.pageY - $(this).offset().top);
    });
}

function customUiSlider(){
    $(".ui-slider-handle").css({
        height: "50px" ,
        width : "50px" ,
        top   : "-20px",
    });

    $(".slider").css({margin: "30px 0"});
}
