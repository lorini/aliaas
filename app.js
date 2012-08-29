var express       = require('express')
  , http          = require('http')
  , path          = require('path')
  , fs            = require('fs')
  , aliaasdSocket = require('net') 
  , api           = require('./api')
  , routes        = require('./routes')
  , app           = express(); 

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
  app.use(express.errorHandler());
});

app.get( '/'                        , routes.index );
app.get( '/get'                     , api.get      );
app.get( '/youpi'                   , api.get      ); // Ok avec get mais pas avec postExample
app.get( '/switch/:state/:address?' , api.switch   );
app.post('/algorithm/:version?'     , api.algorithm);

var server = http.createServer(app).listen(app.get('port'), function(){
  console.log("ALiaaSd server listening on port " + app.get('port'));
});

var io = require('socket.io').listen(server)
var house = fs.readFileSync("house.json", 'ascii'); 

io.sockets.on('connection', function (socket) { 
  socket.emit('house', house); 
  fs.watchFile("house.json", function(curr,prev) {
    house = fs.readFileSync("house.json", 'ascii'); 
    socket.emit('house', house); 
  });
});   

api.removeAll();
