module.exports = {

    vendorAuthentication:function(app,express,passport,mongoose){
        console.log("vendor authentication initialization");
        var facebook =require('./lib/facebook.js'),
        google =require('./lib/google.js');
        facebook.initFacebookModule(app,express,passport,mongoose);
        google.initGoogleModule(app,express,passport,mongoose);
    }
};