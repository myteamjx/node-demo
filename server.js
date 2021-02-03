
var http = require('http');
var fileSystem = require('fs');

var server = http.createServer(function(req, resp){
	var fileName = './index.html';
	var contentType = 'text/html';
	var path = req.url;
	if (path) {
		if (path.endsWith(".svg")) {
			contentType = 'image/svg+xml';
		} else if (path.endsWith(".css")) {
			contentType = 'text/css';
		}
		if (path.endsWith(".svg") || path.endsWith(".css") || path.endsWith(".md") || path.endsWith(".ico")) {
			fileName = "." + path;
		}
	}
	console.log("request path:", path, " fileName:", fileName, " contentType:", contentType);	
	fileSystem.readFile(fileName, function(error, fileContent){
		if(error){
			resp.writeHead(500, {'Content-Type': 'text/plain'});
			resp.end('Error');
		}
		else{
			resp.writeHead(200, {'Content-Type': contentType});
			resp.write(fileContent);
			resp.end();
		}
	});
});
//const MongoClient = require('mongodb').MongoClient;
  //const uri = 'mongodb+srv://Anju:test@cluster0.ure2o.mongodb.net/mernproject?retryWrites=true&w=majority';
  // connect to the MongoDB database
  //MongoClient.connect(uri, { useNewUrlParser: true }, function(err, db) {
  //if (!err) {
    //console.log('Successfully connected to MongoDB!');
  //} else {
   // throw err;
  //}
  //});
const mongoose = require('mongoose');
// Connection URL
mongoose.Promise = global.Promise;
//const mongoUri = 'mongodb://preview-mongodb:27017';
const mongoUri = 'mongodb+srv://Anju:test@db.jx-staging.svc.cluster.local/mernproject?retryWrites=true&w=majority'
if(mongoose.connect(mongoUri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false }))
{
	console.log('successfully connected');
}
mongoose.connection.on('error', () => {
  throw new Error(`unable to connect to database: ${mongoUri}`)
})
console.log('Before server starts listening');
server.listen(8080);


