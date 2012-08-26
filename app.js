
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'hjs');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(require('less-middleware')({ src: __dirname + '/public' }));
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);

var server = http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

var io = require('socket.io').listen(server),
    fs = require('fs'), 
    aliaasdSocket = require('net') ;   

var housePath = "./aliaasd/house.json" ;

var house = fs.readFileSync(housePath, 'ascii'); 

io.sockets.on('connection', function (socket) { 
  
  /* A la connexion d'un navigateur on envoie le fichier JSON */
  socket.emit('house', house); 

  socket.on('command', function(command){
    /* Connexion au serveur ALiaaSd */
    var aliaasd = aliaasdSocket.connect(2000, function(){
      aliaasd.write(command);
      console.log("commande envoyée");
    }); 
  });

  /* A chaque changement du contenu du fichier JSON, on envoie son contenu (intégral) sur la socket */
  fs.watchFile(housePath, function(curr,prev) {
    house = fs.readFileSync(housePath, 'ascii'); 
    socket.emit('house', house); 
  });

});                                            

var api = require('./api');
var mongoose = require('mongoose'); 

mongoose.connect('mongodb://localhost/aliaas', function(err){if(err) console.log(err);});

api.removeAll();
api.post() ;
api.post() ;
api.post() ;
api.get() ;

app.get('/switch/:state/:address?', api.switch);
