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
    }
});


/**
 *
 * statics
 */
UserSchema.statics.createNewUser = function(user,provider,token , callback){

    this.create({
        myId:provider+"-"+user.id,
        name:user.name,
        username:{
            nickname : user.username
        },
        first_name:user.first_name,
        last_name:user.last_name,
        link:user.link,
        timezone:user.timezone,
        locale:user.locale,
        facebook:{
            token:token
        }
    }, function (err, small) {
        if (err) console.log("Error :",err);
        // saved!
    }).exec(callback);

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