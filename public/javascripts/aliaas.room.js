/**
* Classe de la page principale d'ALiaaS 
* 
@class AliaasRoom
@constructor
@extends AliaasBase
**/
function AliaasRoom() {
   
    AliaasBase.call(this); 

    /**
    * Déformation de horizontale de l'elipse lors d'un dessin guidé 
    *
    * @attribute scalex
    * @type integer
    * @default 1
    */
    this.scalex = 1 ; 
 
    /**
    * Déformation de verticale de l'elipse lors d'un dessin guidé 
    *
    * @attribute scaley
    * @type integer
    * @default 1
    */   
    this.scaley = 1 ; 

    /**
    * Lors d'un dessin guidé et d'une deformation horizontale, le centre de
    * l'eclipse se deplace sur l'axe x pour créer un effet de lampe orienté 
    *
    * @attribute centrex
    * @type integer
    * @default 0
    */
    this.centrex = 0 ; 

    /**
    * Angle de rotation de l'ellipse lors d'un dessin guidé. 
    *
    * @attribute rotation
    * @type integer
    * @default 0
    */
    this.rotation = 0 ; 

    /**
    * Taille de l'ellipse lors d'un dessin guidé. 
    *
    * @attribute diffusion
    * @type integer
    * @default 200
    */
    this.diffusion = 200 ; 
    
    /**
    * Taille du pinceau lors d'un dessin libre. 
    *
    * @attribute pencilsize
    * @type integer
    * @default 25
    */ 
    this.pencilsize = 25 ;
   
    /**
    * Intensité du pinceau lors d'un dessin libre. 
    *
    * @attribute intensity
    * @type integer
    * @default 10
    */
    this.intensity = 10 ; 

    /**
    * Objet globale qui sera envoyé pour l'ajout d'une nouvelle lampe
    * et remis à zéro après chaque ajout. 
    *
    * @attribute newDevice
    * @type Object
    * @default Object() 
    */ 
    this.newDevice = Object() ; 

    /**
    * Flag qui indique que l'on est en train d'utiliser le dessin guidé. 
    *
    * @attribute diffusion
    * @type integer
    * @default 1
    */ 
    this.guidedRoa  = 1 ;

    /**
    * Flag qui indique que l'on est en train d'utiliser le dessin libre.   
    *
    * @attribute diffusion
    * @type integer
    * @default 0
    */ 
    this.freeRoa    = 0 ; 
   
    /**
    * Annule le dessin courant et l'ajout d'une nouvelle lampe.
    *
    * @method cancelRoa
    * @chainable
    **/
    this.cancelRoa = function (){
        newDevice = Object() ;
        $("#roaControls").hide() ;
        $("#newLamp, #oldLamps").show(); 
        $("#roa").remove() ; 
        return this ; 
    }

    /**
    * Envoi la variable this.newDevice au proxy pour l'ajouter.
    *
    * @method sendNewLamp
    * @chainable
    **/
    this.sendNewLamp = function (){
        that = this ;
        this.newDevice.address  = $("#newDeviceAddress").val() ;
        this.newDevice.minrange =  0 ; 

        if(this.guidedRoa ==1)  
            this.newDevice.maxrange = $("#diffusion").slider("value");
        else 
            this.newDevice.maxrange = 0 ; 

        $.post("command.php?action=add", { image: $("#roa")[0].toDataURL("image/png") , device: that.newDevice }).success(function(){that.cancelRoa();});
      
        return this;
    }

    /**
    * Initialise les sliders qui permettent de régler les paramètres de dessin.
    *
    * @method initSlider
    * @chainable
    **/
    this.initSlider = function (){
        that= this ; 
        $("#rotation").slider({
            value   :       that.rotation,
            min     :              0,
            max     :            360,
            change  :        function(){that.drawROA()},
            slide   :        function(){that.drawROA()} });

        $("#diffusion").slider({
            value   :      that.diffusion,
            min     :              0,
            max     :            300,
            change  :        function(){that.drawROA()},
            slide   :        function(){that.drawROA()}});

        $("#scalex").slider({
            value   :            100,
            min     :              1,
            max     :            200,
            change  :        function(){that.drawROA()},
            slide   :        function(){that.drawROA()}});

        $("#scaley").slider({
            value   :            100,
            min     :              1,
            max     :            200,
            change  :        function(){that.drawROA()},
            slide   :        function(){that.drawROA()}});

        $("#pencilsize").slider({
            value   :     that.pencilsize,
            min     :              0,
            max     :            150,
            slide   : function (event, ui) { that.pencilsize = $(this).slider("value"); }
        });

        $("#intensity").slider({
            value   :      that.intensity,
            min     :              0,
            max     :             40,
            slide   : function (event, ui) { that.intensity = $(this).slider("value"); }
        });

        return this;
    }

    /**
    * Cette méthode permet de dessiner une ROA (Region of action) guidé.
    * Les valeurs utilisées sont celles des sliders. Cette méthode est 
    * appelée à chaque changement de valeurs dans les sliders. 
    *
    * @method drawROA
    * @chainable
    **/
    this.drawROA = function () {
        
        this.diffusion   = $("#diffusion").slider("value");
        this.rotation    = $("#rotation").slider("value")     ; 
        this.scalex      = $("#scalex").slider("value") / 100 ;
        this.scaley      = $("#scaley").slider("value") / 100 ;
        this.centrex     = (200 - that.scaley * 200);
        this.centrey     = (200 - that.scalex * 200);
       
        var roaContext = $('#roa')[0].getContext("2d");
        roaContext.save();
        roaContext.clearRect(0, 0, 600, 500);
        roaContext.beginPath();
        roaContext.translate(this.newDevice.x, this.newDevice.y);
        roaContext.rotate(that.rotation * Math.PI / 180);
        roaContext.scale(that.scalex, that.scaley);
        roaContext.arc(0, 0, that.diffusion, Math.PI * 2 , 0, false);

        var gradient = roaContext.createRadialGradient(this.centrex, 0, 0, this.centrex, 0, this.diffusion);
        $.each(that.lampGradientValues, function(i, j){gradient.addColorStop(i, 'rgba(255,185,15, '+j+')'); });
        roaContext.fillStyle = gradient ;
        roaContext.fill() ;
        roaContext.restore() ;
    }

    this.initDrawSpace = function (options){
        that = this ;
        function storeRoaPoint(event){

            var roaPoint = { x          : event.offsetX , 
                             y          : event.offsetY , 
                             intensity  : that.intensity     , 
                             pencilsize : that.pencilsize    } ;

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
                var gradient = context.createRadialGradient(roaPoint.x, 0, 0, roaPoint.x, 0, that.intensity);
                $.each(that.lampGradientValues, function(i, j){gradient.addColorStop(i, 'rgba(255,185,15, '+j+')'); });
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

        var roaPoints  = Array(); 
        var context    = $canvas[0].getContext("2d");   
    }

    this.initDragNDrop = function (){
        that = this ; 
        $(".draggable").draggable({
            cursorAt: {left: 16, top: 16},
            revert  : true 
        });

        $("#roomCanvas").droppable({
            drop: function (event, ui) {
                that.newDevice.x = Math.floor(event.pageX - $(this).offset().left) ; 
                that.newDevice.y = Math.floor(event.pageY - $(this).offset().top) ; 
                that.newDevice.moduleName = $(ui.draggable).attr("id") ;

                var modalHeader = "Ajout d'une nouvelle lampe de type "+that.newDevice.moduleName+" aux coordonnées x="+that.newDevice.x+" y="+that.newDevice.y ;

                $("#RoaTypeChoiceModal .modal-header").find("h5").html(modalHeader);

                $("#RoaTypeChoiceModal").modal();
            }
        });
    }

    this.initUI = function(){
        that = this ; 
        $("#RoaTypeChoiceModal").find('.nextBtn').click(function(){
            var drawType ; 

            if(that.guidedRoa == 1) {
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

            if(that.guidedRoa == 1){
                var $roa = $("<canvas></canvas>").attr({ id : "roa", width : 600 , height : 500 });
                $roa.css({
                    top      : $heatmapArea.position()["top"], 
                    left     : $heatmapArea.position()["left"], 
                    position : "absolute"
                });
                $("body").append($roa); 
                that.drawROA() ;
            } else {
                that.initDrawSpace({ id : "roa",  width : 600, height: 500, 
                                top   : $heatmapArea.position()["top"] +1 , 
                                left  : $heatmapArea.position()["left"] +1});
            }
        });

        $("#roaControls").hide();
        $("#guidedRoaButton").click(function(){ that.guidedRoa  = 1 ; that.freeRoa    = 0 ;});
        $("#freeRoaButton").click(function(){ that.guidedRoa  = 0 ; that.freeRoa    = 1 ; });
        $("#cancelRoaButton").click(function(){that.cancelRoa()}); 
        $("#validRoaButton").click(function(){that.sendNewLamp()}); 
        this.initSlider() ;
        this.initDragNDrop() ;
    }
}