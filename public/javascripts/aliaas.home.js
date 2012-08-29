/**
* Classe de la page principale d'ALiaaS 
* 
@class AliaasHome 
@constructor
@extends AliaasBase
**/
function AliaasHome() {
   
    AliaasBase.call(this); 

    /**
    * Canvas de l'heatmap 
    *
    * @attribute heatmap
    * @type object
    * @default null
    */
    this.heatmap = null ;
    
    /**
    * Reset all heatmap and canvas except the #roomCanvas one.
    *
    @method eraseHeatmap
    @chainable
    **/
    this.eraseHeatmap = function () {
        that = this ;
        delete heatmap;
        delete timeout;
        $heatmapCanvas = $('canvas').not("#roomCanvas") ; 
        $heatmapCanvas.fadeOut(1000,function () { $heatmapCanvas.remove(); that.initHeatmap('heatmapArea') ;});
        return this; 
    }

    /**
    * Envoi les points de l'heatmap au proxy pour executer une commande
    *
    @method sendHeatmap
    @chainable
    **/
    this.sendHeatmap = function(){
        that = this ; 
        var points = this.heatmap.store.exportDataSet().data;
        var json_text = JSON.stringify(points, null, 2);

        $.post("algorythm/v0/", {
            image: $("canvas").not("#roomCanvas")[0].toDataURL("image/png"),
            action: "heatpoints",
            heatmap: points
        }).success( function(){ 
            that.eraseHeatmap() ;
            //noty({"text":"Aliaas s'est occupé de votre éclairage !","layout":"topRight","theme":"noty_theme_twitter","speed":0});
        });
        return this;
    }

    /**
    * Initialise le canvas pour le dessin de l'heatmap.
    * Cette portion de code est dépendante de la librairie heatmap.js
    * (http://www.patrick-wied.at/static/heatmapjs/).
    *
    @method initHeatmap
    @chainable
    **/
    this.initHeatmap  = function (id){
            that=this;
            this.heatmap = h337.create({
                "element": document.getElementById(id),
                "radius": 150,
                "visible": true
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
                        that.heatmap.store.addDataPoint(pos[0], pos[1]);
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
            return this;
        }

    this.initUI = function(){

          this.initHeatmap("heatmapArea") ; 

          $("#send").click(function(){aliaas.sendHeatmap();});
          $("#erase").click(function(){aliaas.eraseHeatmap();});
          $("#command").click(function(){aliaas.command();});
    }
}