var io = require('socket.io').listen(8080),
    fs = require('fs');   

var housePath = process.argv[2] ;

var house = fs.readFileSync(housePath, 'ascii'); 

io.sockets.on('connection', function (socket) { 
	
	/* A la connexion d'un navigateur on envoie le fichier JSON */
	socket.emit('house', house); 

	/* A chaque changement du contenu du fichier JSON, on envoie son contenu (intégral) sur la socket */
	fs.watchFile(housePath, function(curr,prev) {
	 	house = fs.readFileSync(housePath, 'ascii'); 
		socket.emit('house', house); 
	});

});                                            


