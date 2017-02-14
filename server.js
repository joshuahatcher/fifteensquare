var http = require('http'),
	express = require('express'),
	server = express(),
	PORT = 8080;

server.use(express.static(__dirname));

server.listen(PORT, function() {
  console.log('Server listening on port ' + PORT);
});
