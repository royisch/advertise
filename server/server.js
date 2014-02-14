var fs = require("fs"),
	express = require("express"),
	https = require("https"),
	path=require('path'),
    mongoose = require('mongoose'),
    passport = require('passport'),
	facebook =require('./auth'),
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
    facebook.initFacebookModule(app,express,passport,mongoose);


app.get("/hello/:text" , function(request , response){
    response.send("hello! "+request.params.text);
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.send(500, 'Something broke!');
});

/********************MONGO DB Example***************************/

console.log("IF YOU WANT TO USE DB - DONT FORGET TO RUN MONGODB");
mongoose.connect('mongodb://localhost/app');

var User = mongoose.model("User");
var fbUser =    {
                id:"650067818",
                name:"Royi Schwartz",
                username: "royi.schwartz",
                first_name:"royi",
                last_name:"schwartz",
                link:"http://www.ynet.co.il",
                timezone:2,
                locale:"en_US"
            };

function test(accessToken, refreshToken, profile, done) {

    var callback = function(err,user){
        console.log(user);
    };

    if(accessToken && profile){
        profile.myId = "FB-"+profile.id;
        User.setAccessToken(profile.myId,accessToken);
        var userProfile = User.getUser(profile ,callback);
        done(null,userProfile,accessToken);
    }
    else{
        User.createNewUser(profile,"FB",accessToken,callback);
    }
    console.log("accessToken :" + accessToken);
}

/*test(undefined , undefined , fbUser , function(a,b,c){
    console.log("1111"+b)
});*/

/*
test("aaaaa" , undefined , fbUser , function(a,b,c){
    console.log("2222"+b)
});
*/




/******************************************************/

console.log('starting server on '+host+':'+port);
app.listen(port,host);
