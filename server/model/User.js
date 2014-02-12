'use strict';

/**
 * Module dependencies.
 */

/*
* The permitted SchemaTypes are

 String
 Number
 Date
 Buffer
 Boolean
 Mixed
 ObjectId
 Array

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
 * Methods
 */
UserSchema.methods = {

    createNewUser: function(user,provider,token){

        new User({
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
        }).save(function(err,doc){
                if(err) console.log("Error :",err);
                else    console.log('Successfully inserted!' ,doc)
            })
    },

    getUser : function(profile){

        this.findOne({"myId": profile.myId} ,"name username",function (err, user) {
            if (err){
                console.log("error fetching user "+err);
            }
            else {
                console.log("user fetched "+user.toString()); // Space Ghost is a talk show host.
            }

        });
    }

};

mongoose.model('User', UserSchema);