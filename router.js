var path = require('path'),
	route = function(url){
		var mime;
		if(url === '/'){
			url = '/views/index.html';
		}
		switch(path.extname(url)){
			case '.js':
				mime = 'application/javascript';
				break;
			case '.css':
				mime = 'text/css';
				break;
			case '.json':
				mime = 'application/json';
				break;
			case '.png':
				mime = 'image/png';
				break;
			default:
				mime = 'text/html';
		}
		return {
			path:	__dirname + url,
			mime:	mime
		};
	};
exports.route = route;