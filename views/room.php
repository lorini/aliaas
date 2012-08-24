<!DOCTYPE html>
<html lang="fr">
  <head>

    <meta charset="utf-8">
    <title>Aliaas - A Light as a service</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <link rel="stylesheet" href="css/bootstrap.css" >
    <link rel="stylesheet" href="css/bootstrap-responsive.css" >

    <link rel="stylesheet" href="css/aliaas.base.css">
    <link rel="stylesheet" href="css/ui-lightness/jquery-ui-1.8.17.custom.css">  

    <script src="js/jquery-1.7.1.min.js"></script>
    <script src="js/jquery-ui-1.8.17.custom.min.js"></script>
    <script src="js/json.js"></script>
    <script src="js/bootstrap-button.js"></script>
    <script src="js/bootstrap-modal.js"></script>

    <script src="js/aliaas.js"></script>
    <script src="js/aliaas.room.js"></script>
  
    <script src="http://banane.cpe.fr:8080/socket.io/socket.io.js"></script>

    <script type="text/javascript">
        var aliaas ;
        $(function () {
            aliaas = new AliaasRoom() ;
            aliaas.connect("banane.cpe.fr", 8080, function(){aliaas.draw();}); 
            aliaas.initUI() ;
        });
    </script>

    <!--[if lt IE 9]>
      <script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
    <![endif]-->

  </head>

  <body>

    <?php include("top_bar.php") ;?>

    <div class="container">
      <div class="row">
        <div id="maps" class="well span6" style="padding-right : 50px ;">
          <div id="heatmapArea" ><canvas id="roomCanvas"     width="600" height="500" ></canvas>
          </div>
        </div>
        <div class="span4" id="sidebar">
            <div id="roaControls" class="well">
            
            <h3></h3><br>

            <label>Adresse</label><input id="newDeviceAddress" type="text" value="NewDevice"></input>

            <br>

            <div id="guidedRoaControls">
              <label>Scale X   :</label>
              <div id="scalex"  class="slider"></div>
              <label>Scale Y   :</label>
              <div id="scaley"  class="slider"></div>
              <label>Rotation  :</label>
              <div id="rotation"  class="slider"></div>
              <label>Diffusion :</label>
              <div id="diffusion" class="slider"></div>
            </div>
            
            <div id="freeRoaControls">
              <label>Taille :</label>
              <div class="slider" id="pencilsize"></div>
              <label>Puissance/Intensité : <div id="indicationGomme"></div></label>
              <div class="slider" id="intensity"></div> 
            </div>

            <button id="cancelRoaButton" class="btn btn-danger ">Annuler</button>
            <button id="validRoaButton" class="btn btn-success ">Valider</button>

          </div>  

          <div id="newLamp" class="toolbox well">
            <h2>Nouvelles lampes</h2>
            <br>
            <img id="x10lamp" src="images/x10.jpg" class="draggable" alt="x10lamp"/>
            <img id="chaconled" src="images/chacon.jpg" class="draggable" alt="chaconled"/>
          </div>   

          <div id="oldLamps" class="toolbox well">
            <h2>Lampes non positionées</h2>
            <br>
            <img id="x10lamp" src="images/x10.jpg" class="draggable" alt="x10lamp"/>
            <img id="chaconled" src="images/chacon.jpg" class="draggable" alt="chaconled"/>
            <img id="x10lamp" src="images/x10.jpg" class="draggable" alt="x10lamp"/>
            <img id="chaconled" src="images/chacon.jpg" class="draggable" alt="chaconled"/>
          </div>       
        </div>  
      </div>
    </div>
    <div class="modal fade" id="RoaTypeChoiceModal">
      <div class="modal-header">
        <button class="close" data-dismiss="modal">×</button>
        <h5></h5>
      </div>
      <div class="modal-body">
        <h2>Choix du type de dessin</h2>
        <br><br>
        <div class="btn-group centered" data-toggle="buttons-radio">
          <button id="guidedRoaButton" class="btn btn-inverse active bigradio">Guidé</button>
          <button id="freeRoaButton"   class="btn btn-inverse bigradio">Libre</button>
        </div>
        <br><br>
      </div>
      <div class="modal-footer">
        <a href="#" class="btn btn-primary nextBtn" data-dismiss="modal" >Suivant</a>
      </div>
    </div>
  </body>
</html>
