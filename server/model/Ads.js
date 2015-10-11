/**
 * Created by royischwartz on 6/14/14.
 */
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
var AdSchema = new mongoose.Schema({

    name:String,
    title:String,
    campaignId:String,
    description:String,
    image:String,
    link:String
});


/**
 *
 * statics
 */
AdSchema.statics.createAd = function(data,token,callback){
    if(data){
        this.create({
            name:data.name,
            title:data.title,
            campaignId:"",
            description:data.description,
            image:data.image,
            link:data.link
        }, function (err, user) {
            if (err) {
                console.log("Error :",err);
                return;
            }
            // saved!
            callback(err,user);
        });
    }

};


mongoose.model('Ad', AdSchema);