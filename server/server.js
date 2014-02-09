var fs = require("fs"),
	express = require("express"),
	https = require("https"),
	path=require('path'),
	config = JSON.parse(fs.readFileSync("server-config/config.json")),
	host=config.host,
	port = config.port,
	app = express();

app.use(express.static(path.join(__dirname , "../app/view")));
app.use(express.static(path.join(__dirname , "../app")));

app.get("/hello/:text" , function(request , response){
    response.send("hello! "+request.params.text);
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.send(500, 'Something broke!');
});

/********************MONGO DB Test***************************/

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/app');

var Schema = new mongoose.Schema({
    _id:String,
    name:String,
    age:Number
});

//an object that gives you easy access to a named collection
//to perform action on the schema
var Test = mongoose.model("Test",Schema);

//app.post("/new" , function(req,res){
function createNewUser(){
    new Test({
        _id:Date.now(),
        name:"this is a test",
        age:"66"
    }).save(function(err,doc){
            if(err) console.log("Error :",err);
            else    console.log('Successfully inserted!' ,doc)
        })
}
//})


createNewUser();
/******************************************************/

console.log('starting server on '+host+':'+port);
app.listen(port,host);
