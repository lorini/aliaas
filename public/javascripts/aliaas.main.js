var heatmap_enabled=    0,
    heatmap        = null,
    points         = null,
    house          = null,
    elipsePosX     =    0, 
    elipsePosY     =    0,
    scalex         =    1, 
    scaley         =    1,
    centrex        =    0, 
    centrey        =    0,
    centreimagex   =    0, 
    centreimagey   =    0,
    diffusion      =  200,
    rotation       =    0,
    intensity      =    10,
    default_values = {
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

    
    $.ajaxSetup({timeout: 40000});

    $("#ROA-elipse-control,#Roa-elipse, #ROA-circle-control, #ROA-free-control,#Roa-circle").hide() ;

    contextMenuInit(); 
    
    $("body").bind("ajaxSuccess", function (e, xhr, settings) {
        if (xhr.responseText != "") {
            var message = eval('(' + xhr.responseText + ')').message;
            if (message != null) 
             noty({"text":message,"layout":"topRight","type":"alert","theme":"noty_theme_twitter","animateOpen":{"height":"toggle"},"animateClose":{"height":"toggle"},"speed":500,"timeout":355000,"closeButton":false,"closeOnSelfClick":true,"closeOnSelfOver":false,"modal":false});
        }
    });

    $(".draggable").draggable({
        cursorAt: {left: 16, top: 16},
        revert  : true });

    $("#roomCanvas").droppable({
        drop: function (event, ui) {
            $("#form-posx").val(Math.floor(event.pageX - $(this).offset().left));
            $("#form-posy").val(Math.floor(event.pageY - $(this).offset().top));
            $("#add-lamp-form").dialog("open");
            $("#protocol").val($(ui.draggable).attr("id"));}
    });

    $("#modalsnap").dialog({
        autoOpen : false,
        height   :   290,
        width    :   355,
        modal    :  true 
    });

    $("#ROA-choice").dialog({
        autoOpen : false,
        height   :   250,
        width    :   450
    });

    $("#add-lamp-form").dialog({
        autoOpen : false,
        height   :   250,
        width    :   450,
        modal    :  true,
        close: function () {
            //$("#form-address").val("");
            //$("#form-posx").val("");
            //$("#form-posy").val("");
        }
    });

    $(".button").button();
    checkUpdate();
});

function showRoaCircle () {

    $heatmapArea = $("#heatmapArea") ;

     $("#Roa-circle").css({
        top      : $heatmapArea.position()["top"], 
        left     : $heatmapArea.position()["left"], 
        position : "absolute"
    }).show();

    $("#minrange").slider({
        create  : customUiSlider,
        value   :            100,
        min     :              0,
        max     :            200,
        slide   : function (event, ui) {
                    $("#minrangevalue").html(ui.value);
                    if (ui.value >= $("#maxrange").slider("value")) {
                        $("#maxrange").slider("value", ui.value);
                        $("#maxrangevalue").html(ui.value);
                    }
                    drawRoaCircle(); 
                  }
    });

    $("#maxrange").slider({
        create  : customUiSlider,
        value   :            150,
        min     :              0,
        max     :            200,
        slide   : function (event, ui) {
                    $("#maxrangevalue").html(ui.value);
                    if(ui.value <= $("#minrange").slider("value")) {
                        $("#minrange").slider("value", ui.value);
                        $("#minrangevalue").html(ui.value);
                    }
                    drawRoaCircle(); 
                  }
    });

    $("#ROA-choice, #add-lamp-form").dialog("close");

    $dheatmapArea = $("#dheatmapArea") ;

    $("#ROA-circle-control").show()
                            .css({
                                height      : $dheatmapArea.height() - 41 ,
                                width       : $dheatmapArea.width()  - 41 ,
                                background  : "white",
                                padding     : "20px"})
                            .offset({
                                top         : $dheatmapArea.position()["top"]  + 2,
                                left        : $dheatmapArea.position()["left"] + 2});

}

function validCircleRoa(){
    var circle_roa_canvas = $("#Roa-circle")[0].toDataURL("image/png") ; 
    var device = {  address: $("#form-address").val(),
                    x: $("#form-posx").val(),
                    y: $("#form-posy").val(),
                    minrange: $("#minrange").slider("value"),
                    maxrange: $("#maxrange").slider("value"),
                    moduleName: $("#protocol").val()
                };

    $.post("command.php?action=addcircle", {
        image: circle_roa_canvas, 
        device: device 
    }).success(cancelAllRoa);
}

function showRoaElipse () {
    elipsePosX = $("#form-posx").val(); 
    elipsePosY = $("#form-posy").val();

    $heatmapArea = $("#heatmapArea") ;

    $("#Roa-elipse").css({
        top      : $heatmapArea.position()["top"], 
        left     : $heatmapArea.position()["left"], 
        position : "absolute"
    }).show();

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
        max     :           2000,
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
    
    $("#ROA-choice, #add-lamp-form").dialog("close");

    $dheatmapArea = $("#dheatmapArea") ;

    $("#ROA-elipse-control").show()
                            .css({
                                height      : $dheatmapArea.height() - 41 ,
                                width       : $dheatmapArea.width()  - 41 ,
                                background  : "white",
                                padding     : "20px"})
                            .offset({
                                top         : $dheatmapArea.position()["top"]  + 2,
                                left        : $dheatmapArea.position()["left"] + 2});
    drawROA();  
}

function validElipseRoa(){
    var elipse_roa_canvas = $("#Roa-elipse")[0].toDataURL("image/png") ; 
    var device = {  address: $("#form-address").val(),
                    x: $("#form-posx").val(),
                    y: $("#form-posy").val(),
                    minrange: 0,
                    maxrange: 0,
                    moduleName: $("#protocol").val()
                };

    $.post("command.php?action=addelipse", {
        image: elipse_roa_canvas, 
        device: device 
    }).success(cancelAllRoa);
}

function showRoaFree () {

    pencilsize = 25 ;

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

    $("#ROA-choice, #add-lamp-form").dialog("close");

    
    $dheatmapArea = $("#dheatmapArea") ;
    $heatmapArea  = $("#heatmapArea")  ;

    $("#ROA-free-control")  .show()
                            .css({ 
                                width       : $dheatmapArea.width()  - 41 ,
                                background  : "white",
                                padding     : "20px"})
                            .offset({
                                top         : $dheatmapArea.position()["top"]  + 2,
                                left        : $dheatmapArea.position()["left"] + 2});
     
    $("#Roa-free").show()   .offset({
                                top         : $heatmapArea.position()["top"] +1,
                                left        : $heatmapArea.position()["left"]+1})   
                            .css({
                                height      : $heatmapArea.height(),
                                width       : $heatmapArea.width()
                            });

    // TODO : 
    $("body").height("-=1000px") ;

    initDrawSpace({
        id : "roa-free", 
        width : 600, 
        height: 500, 
        top   : $heatmapArea.position()["top"] +1 , 
        left  : $heatmapArea.position()["left"] +1});
}

function validFreeRoa(){
    var free_roa_canvas = $("canvas#roa-free")[0].toDataURL("image/png") ; 
    var device = {  address: $("#form-address").val(),
                    x: $("#form-posx").val(),
                    y: $("#form-posy").val(),
                    minrange: 0,
                    maxrange: 0,
                    moduleName: $("#protocol").val()
                };

    $.post("command.php?action=addfree", {
        image: free_roa_canvas, 
        device: device 
    }).success(cancelAllRoa);
}


function cancelAllRoa(){

    $("#ROA-elipse-control,#Roa-elipse, #ROA-circle-control, #ROA-free-control,#Roa-circle").hide() ;
    erase_heatmap();
}

function erase_heatmap() {
    delete heatmap;
    delete timeout;
    $('canvas').not("#roomCanvas, #roomDebugCanvas, #Roa-elipse, #Roa-free ")
               .fadeOut(1000,function () {$('canvas')
               .not("#roomCanvas, #roomDebugCanvas, #Roa-elipse, #Roa-free")
               .remove();});
}

function send_heatmap() {
    points = heatmap.store.exportDataSet().data;
    var json_text = JSON.stringify(points, null, 2);

    $.post("command.php?action=algov0", {
        image: $("canvas").not("#roomCanvas, #roomDebugCanvas, #Roa-elipse")[0].toDataURL("image/png"),
        action: "heatpoints",
        heatmap: points
    }).success(erase_heatmap);
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

function init_heatmap(id) {
    heatmap = h337.create({
        "element": document.getElementById(id),
        "radius": 150,
        "visible": true,
        "gradient": {
            0.01: "rgb(255,185,15)",
            0.12: "rgb(255,185,15)",
            0.25: "rgb(255,185,15)",
            0.37: "rgb(255,185,15)",
            0.50: "rgb(255,185,15)",
            0.62: "rgb(255,185,15)",
            0.75: "rgb(255,185,15)",
            0.87: "rgb(255,185,15)",
            0.99: "rgb(255,185,15)"
        }
    });

    (function () {
        var active      = false,
            mouseMove   = false,
            mouseOver   = false,
            activate    = function(){active = true;},
            $           = function(id){return document.getElementById(id);},
            timer       = null;

        var tmp = $(id);

        tmp.onmouseout = function () {
            mouseOver = false;
            if (timer) {
                clearInterval(timer)
                timer = null;
            }
        };

        tmp.onmousemove = tmp.onclick = function (ev) {
            mouseMove = true;
            mouseOver = true;
            if (active) {
                if (timer) {
                    clearInterval(timer);
                    timer = null;
                }
                var pos = h337.util.mousePosition(ev);
                heatmap.store.addDataPoint(pos[0], pos[1]);
                active = false;
            }
            mouseMove = false;
        };

        tmp["ontouchmove"] = function (ev) {
            var touch = ev.touches[0],
                simulatedEvent = document.createEvent("MouseEvent");
            simulatedEvent.initMouseEvent("mousemove", true, true, window, 1, touch.screenX, touch.screenY, touch.clientX, touch.clientY, false, false, false, false, 0, null);
            touch.target.dispatchEvent(simulatedEvent);
            ev.preventDefault();
        };

        (function (fn) { setInterval(fn, 10);}(activate));
    })();
}

function command() {
    var device = {
        address: $("#address").val()
    };
    $.post("command.php?action=" + $("#action").val(), {
        device: device
    });
}

function flushMap() {
    $.ajax({
        url: "command.php?action=deleteall"
    }).success(function (data) {});
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

function drawDebug() {
    var light_bulb = new Image();
    var heatmappng = new Image();
    light_bulb.src = "images/light_on.png";
    heatmappng.src = "images/heatmap.png?timestamp=" + new Date().getTime();

    var ctx = $('#roomDebugCanvas')[0].getContext("2d");

    ctx.clearRect(0, 0, 600, 500);

    $.each(house.rooms, function (indiceRoom, room) {
        $.each(room.devices, function (indiceDevice, device) {
            if (device.state == 1) {
                ctx.fillStyle = "rgba(150,150,150, 0.6)";
                ctx.beginPath();
                ctx.arc(device.x, device.y, device.maxrange, 0, Math.PI * 2, true);
                ctx.closePath();
                ctx.fill();

                ctx.fillStyle = "rgba(150,150,150, 0.75)"
                ctx.beginPath();
                ctx.arc(device.x, device.y, device.minrange, 0, Math.PI * 2, true);
                ctx.closePath();
                ctx.fill();
            }
            ctx.drawImage(light_bulb, device.x - 16, device.y - 16);
        });
    });

    $.each(house.rooms, function (indiceRoom, room) {
        $.each(room.devices, function (indiceDevice, device) {
            ctx.drawImage(light_bulb, device.x - 16, device.y - 16);
            if (points != null) {
                $.each(points, function (i, point) {
                    var distance = Math.sqrt((device.x - point.x) * (device.x - point.x) + (device.y - point.y) * (device.y - point.y));

                    if (distance <= device.maxrange) {
                        ctx.fillStyle = "rgba(255,0,0,0.85)";
                        ctx.strokeStyle = "rgba(255,0,0,0.85)";
                    } else {
                        ctx.fillStyle = "rgba(0,0,0,0.2)";
                        ctx.strokeStyle = "rgba(0,0,0,0.2)";
                    }

                    ctx.beginPath();
                    ctx.moveTo(device.x, device.y);
                    ctx.lineTo(point.x, point.y);
                    ctx.closePath();
                    ctx.stroke();

                    ctx.beginPath();
                    ctx.arc(point.x, point.y, 3, 0, Math.PI * 2, true);
                    ctx.closePath();
                    ctx.fill();
                });
            }
        });
    });

    heatmappng.onload = function () {
        ctx.drawImage(heatmappng, 0, 0);
    };
}

function drawRoaCircle(){
    var ctx = $('#Roa-circle')[0].getContext("2d");
    ctx.clearRect(0, 0, 600, 500);

    ctx.fillStyle = "rgba(150,150,150, 0.6)";
    ctx.beginPath();
    ctx.arc($("#form-posx").val(),$("#form-posy").val(), $("#maxrange").slider("value"), 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = "rgba(150,150,150, 0.75)"
    ctx.beginPath();
    ctx.arc($("#form-posx").val(),$("#form-posy").val(), $("#minrange").slider("value"), 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();
}

function drawROA() {
    diffusion   = $("#diffusion").slider("value");
    rotation    = $("#rotation").slider("value")     ; 
    scalex      = $("#scalex").slider("value") / 100 ;
    scaley      = $("#scaley").slider("value") / 100 ;
    centrex     = centreimagex + (200 - scaley * 200);
    centrey     = centreimagey + (200 - scalex * 200);

    var roaContext = $('#Roa-elipse')[0].getContext("2d");
    roaContext.save();
    roaContext.clearRect(0, 0, 600, 500);
    roaContext.beginPath();
    roaContext.translate(elipsePosX, elipsePosY);
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

    $(".slider").css({
        //width : "85%" ,
        margin: "35px 0 35px 0"
    });
}
