var http = require('http'),
	fs = require('fs'),
	util = require('util'),
	router = require('./router'),
	io = require('socket.io'),
	
	clients = [],
	
	start = function(){
		var server = http.createServer(function(request,response){
				var route = router.route(request.url),
					rs = fs.createReadStream(route.path,response);
				response.writeHead(200,{
					'Content-Type':	route.mime
				});
				util.pump(rs,response);
			}),
			socket = io.listen(server);
		socket.set('log level',1);
		server.listen(+(process.argv[2] || 80));
		socket.sockets.on('connection',function(client){
		});
	};
exports.start = start;