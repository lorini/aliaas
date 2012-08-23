<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="utf-8">
    <title>Aliaas - A Light as a service</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="">
    <meta name="author" content="">

    <link rel="stylesheet" type="text/css" href="css/aliaas.base.css"/>
    <link href="css/bootstrap.css" rel="stylesheet">
    <link href="css/bootstrap-responsive.css" rel="stylesheet">

    <script src="js/jquery-1.7.1.min.js"></script>
    <script src="js/aliaas.js"></script>
    <script src="js/aliaas.home.js"></script>
    <script src="js/heatmap.js"></script>
    <script src="js/json.js"></script>
    <script src="http://banane.cpe.fr:8080/socket.io/socket.io.js"></script>
    <script src="js/bootstrap-tooltip.js"></script>
    <script src="js/bootstrap-button.js"></script>

    <script type="text/javascript">

      var aliaas; 
      $(function () {
          aliaas = new AliaasHome();
          aliaas.connect("banane.cpe.fr", 8080, function(){aliaas.draw();}); 
          aliaas.initUI(); 
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

      <div class="span4">

        <div class="well"> 
            <input id="send"  type="button"   class="btn btn-large btn-success span2"  value="Valider" />
            <input id="erase" type="button"   class="btn btn-large btn-danger span2"   value="Annuler" />
        </div>

        <div class="well">
          <h3>Dessin</h3>
          <div class="btn-group" data-toggle="buttons-radio">
            <button class="btn btn-large btn-warning" name="drawing" id="drawingluxmin" type=radio checked>Lux Min</button>
            <button class="btn btn-large btn-inverse" name="drawing" id="drawingluxmax" type=radio >Lux Max</button>
          </div>
        </div>

        <div class="well">
          <h3>Priorité</h3>
          <div class="btn-group" data-toggle="buttons-radio">
            <button class="btn btn-large btn-info" name="priority" id="prioritymin" type=radio checked>Lux Min</button>
            <button class="btn btn-large btn-info" name="priority" id="prioritymax" type=radio >Lux Max</button>
          </div>
        </div>

        <div class="well">
          <h3>Action personalisée</h3>
          <input id="address" type="text"   class="input-xlarge" placeholder="Address">
          <input id="action"  type="text"   class="input-xlarge" placeholder="Action (on, off, state, snapshot)">
          <input id="command" type="submit" class="btn btn-large btn-info" value="Envoyer la commande"/>
        </div>

      </div>  
    </div>
  </body>
</html>
