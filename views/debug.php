<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="utf-8">
    <title>Aliaas - A Light as a service</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="">
    <meta name="author" content="">

    <link rel="stylesheet" type="text/css" href="css/aliaas.home.css"/>
    <link rel="stylesheet" type="text/css" href="css/jquery.noty.css"/>
    <link rel="stylesheet" type="text/css" href="css/noty_theme_twitter.css"/>

    <script type="text/javascript" src="js/jquery-1.7.1.min.js"             ></script>
    <script type="text/javascript" src="js/aliaas.debug.js"                  ></script>
    <script type="text/javascript" src="js/heatmap.js"                      ></script>
    <script type="text/javascript" src="js/json.js"                         ></script>
    <script type="text/javascript" src="js/jquery.noty.js"                  ></script>

    <script src="js/bootstrap-tooltip.js"></script>
    <script src="js/bootstrap-button.js"></script>
    <script src="js/bootstrap-transition.js"></script>
    <script src="js/bootstrap-carousel.js"></script>

    <link href="css/bootstrap.css" rel="stylesheet">
    <style>

      body {
        padding-top: 60px; 
      }

      .carousel{
        width : 540px;
      }
      #debug, #myCarousel{
        margin: -7px 7px ;
        padding: 7px;
      }
    </style>
 
    <link href="css/bootstrap-responsive.css" rel="stylesheet">

    <!-- Le HTML5 shim, for IE6-8 support of HTML5 elements -->
    <!--[if lt IE 9]>
      <script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
    <![endif]-->

  </head>

  <body>

    <?php include("top_bar.php") ;?>

    <div class="container">

      <div class="row">

        <div id="debug" class="span6 well">
          <canvas id="roomDebugCanvas" width="600" height="470" ></canvas>
        </div>

        <div id="myCarousel" class="carousel span6 slide well">
          <!-- Carousel items -->

          <div class="carousel-inner">
            <?php 
              $dirname = './domotique/need_debug_img/';
              $dir = opendir($dirname); 
              $i= 1 ;
              while($file = readdir($dir)) {
                if($file != '.' && $file != '..' && !is_dir($dirname.$file))
                {
                    if($i == 1) echo '<div class="active item">';
                    else echo '<div class="item">';
                    echo '<img src="'.$dirname.$file.'" />';
                    echo '<div class="carousel-caption">';
                    echo '<h4>'.$file.'</h4>' ;
                    echo '<pre>cvAnd(img_device, img_need, img_sum);</pre>' ;
                    echo '</div>' ;
                    echo '</div>';
                    $i-- ;
                }
              }

              closedir($dir);
            ?>
          </div>
          <!-- Carousel nav -->
          <a class="carousel-control left" href="#myCarousel" data-slide="prev">&lsaquo;</a>
          <a class="carousel-control right" href="#myCarousel" data-slide="next">&rsaquo;</a>
        </div>

      </div>

    </div>  
  </body>
</html>
