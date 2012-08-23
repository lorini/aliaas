<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="utf-8">
    <title>Aliaas - A Light as a service</title> 
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <link rel="stylesheet" href="css/bootstrap.css" >
    <link rel="stylesheet" href="css/bootstrap-responsive.css" >
    <link rel="stylesheet" href="css/aliaas.base.css">

    <script type="text/javascript" src="js/jquery-1.7.1.min.js"></script>
    <script type="text/javascript" src="js/aliaas.js"></script>
    <script type="text/javascript" src="js/aliaas.device.js"></script>
    <script type="text/javascript" src="js/json.js"></script>
    
    <script src="http://banane.cpe.fr:8080/socket.io/socket.io.js"></script>

    <script src="js/bootstrap-button.js"></script>

    <script src="js/bootstrap-dropdown.js"></script>

    <script src="js/bootstrap-modal.js"></script>
    <script src="js/bootstrap-transition.js"></script>

    <script type="text/javascript">
      var aliaas; 
      $(function () {
          aliaas = new AliaasDevice();
          aliaas.connect("banane.cpe.fr", 8080, function(){aliaas.displayDevicesThumbnails();} ); 
          aliaas.initUI(); 
      });
    </script>

    <!--[if lt IE 9]>
      <script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
    <![endif]-->

  </head>

  <body>

    <?php include("top_bar.php") ;?>

    <div class="container"><ul class="thumbnails" id="thumbnails"></ul></div>

    <div class="modal fade" id="myModal">
      <div class="modal-header">
        <button class="close" data-dismiss="modal">×</button>
        <h3></h3>
      </div>
      <div class="modal-body">
      </div>
      <div class="modal-footer">
        <a href="#" class="btn btn-primary">Sauvegarder</a>
      </div>
    </div>

  </body>
</html>
