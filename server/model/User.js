'use strict';

/**
 * Module dependencies.
 */


var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    crypto = require('crypto');

/**
 * User Schema
 */
var UserSchema = new mongoose.Schema({

    myId:String,
    name:String,
    username:{
        nickname : String
    },
    first_name:String,
    last_name:String,
    link:String,
    timezone:String,
    locale:String,
    facebook:{
        token:String
    },
    profilePic:String
});


/**
 *
 * statics
 */
UserSchema.statics.createNewUser = function(user,provider,token,callback){

    this.create({
        myId:provider+"-"+user.id,
        name:user.displayName,
        username:{
            nickname : user.username
        },
        first_name:user.name.givenName,
        last_name:user.name.familyName,
        profilePic:user.photos && user.photos[0] && user.photos[0].value,
        facebook:{
            token:token
        }
    }, function (err, user) {
        if (err) {
            console.log("Error :",err);
            return;
        }
        // saved!
        callback(err,user);
    });

};


UserSchema.statics.getUser = function(profile , callback){

    this.findOne({"myId": profile.myId} ,function (err, user) {
        if (err){
            console.log("error fetching user "+err);
        }
    }).exec(callback);
};

UserSchema.statics.setAccessToken = function(myId,accessToken){
    this.findOne({"myId": myId} ,function (err, user) {
        if (err){
            console.log("error fetching user "+err);
        }
        else {
            user.facebook.token = accessToken;
            console.log("access token fetched "+accessToken); // Space Ghost is a talk show host.
        }

    });
};


mongoose.model('User', UserSchema);