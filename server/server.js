var fs = require("fs");
var config = JSON.parse(fs.readFileSync("config/config.json"));
var host=config.host;
var port = config.port;
var express = require("express");

var app = express();

//root path
app.get("/" , function(request , response){
    response.send();
});
console.log(__dirname);
app.use(express.static("../app/view"))
    .set('views',express.static("../app"))
    .set('view engine', 'jade')
    .use(app.router)
app.listen(port,host);
