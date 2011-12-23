var io,
	express = require('express'),
	app = express.createServer(),
	parseURL = require('url').parse,
	
	clients = {},
	
	init = function(){
		app.configure(function(){
			app.set('views',__dirname + '/views');
			app.set('view engine','jade');
			app.use(express.bodyParser());
			app.use(app.router);
			app.use(express.static(__dirname + '/ink'));
		});
		
		app.listen(+(process.argv[2] || 80));
		
		/*	SOCKET.IO
				io = require('socket.io').listen(app);
				io.set('log level',1);
		*/
		
		console.log('http://localhost:%d | %s',+(process.argv[2] || 80),app.settings.env);
	},
	serve = function(){
		init();
		
		/*	SOCKET.IO
				io.sockets.on('connection',function(socket){});
		*/
		
		app.get('/',function(request,response){
			response.render('index');
		});
		
		app.get('/GET',function(request,response){
			var data = '',
				url = parseURL(request.url,true);
			response.contentType('application/json');
			
			switch(url.query.on){
				case 'debug':
					data = 'debug';
					break;
				default:
					data = 'default';
			}
			
			response.end(JSON.stringify(data));
		});
	};
exports.serve = serve;