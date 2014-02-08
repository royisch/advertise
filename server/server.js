var fs = require("fs");
var express = require("express");
var https = require("https");
var config = JSON.parse(fs.readFileSync("server-config/config.json"));
var host=config.host;
var port = config.port;

var app = express();

//root path
app.get("/" , function(request , response){
    response.send("hello!");
});

app.use(express.static(__dirname + "/app/view"));

app.get("/hello/:text" , function(request , response){
    response.send("hello! "+request.params.text);
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.send(500, 'Something broke!');
});

console.log('starting server on '+host+':'+port);
app.listen(port,host);
