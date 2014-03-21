var fs = require("fs"),
	express = require("express"),
	https = require("https"),
	path=require('path'),
    mongoose = require('mongoose'),
    passport = require('passport'),
	vendorAuth =require('./auth'),
	model =require('./model/User.js'),
	config = JSON.parse(fs.readFileSync("server-config/config.json")),
	host=config.host,
	port = config.port,
	app = express();

    //defining root folders
    app.use(express.static(path.join(__dirname , "../app/view")));
    app.use(express.static(path.join(__dirname , "../app")));

    //initialize modules
    require('./server-config/config.js').configureDependencies(app, path ,express , passport);
    vendorAuth.vendorAuthentication(app,express,passport,mongoose);


app.get("/hello/:text" , function(request , response){
    response.send("hello! "+request.params.text);
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.send(500, 'Something broke!');
});

/********************MONGO DB ***************************/

console.log("IF YOU WANT TO USE DB - DONT FORGET TO RUN MONGODB");
mongoose.connect('mongodb://localhost/app');

/******************************************************/

console.log('starting server on '+host+':'+port);
app.listen(port,host);
