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
    name: String,
    email: String,
    username: {
        type: String,
        unique: true
    },
    hashed_password: String,
    provider: String,
    salt: String,
    facebook: {},
    google: {} //for later :)
});

/**
 * Virtuals -
 * Virtual attributes are attributes that are convenient to have around
 * but that do not get persisted to mongodb.
 */
UserSchema.virtual('password').set(function(password) {
    this._password = password;
    //this is taken from mean.io- related
    // the purpose of the salt is to defeat rainbow table attacks
    // http://en.wikipedia.org/wiki/Rainbow_table
    this.salt = this.makeSalt();
    this.hashed_password = this.encryptPassword(password);
}).get(function() {
        return this._password;
    });


/**
 * Methods
 */
UserSchema.methods = {
    /**
     * Authenticate - check if the passwords are the same
     *
     * @param {String} plainText
     * @return {Boolean}
     * @api public
     */
    authenticate: function(plainText) {
        return this.encryptPassword(plainText) === this.hashed_password;
    },

    /**
     * Make salt
     *
     * @return {String}
     * @api public
     */
    makeSalt: function() {
        return crypto.randomBytes(16).toString('base64');
    },

    /**
     * Encrypt password
     *
     * @param {String} password
     * @return {String}
     * @api public
     */
    encryptPassword: function(password) {
        if (!password || !this.salt) return '';
        var salt = new Buffer(this.salt, 'base64');
        return crypto.pbkdf2Sync(password, salt, 10000, 64).toString('base64');
    },

    /**
     *
     * @param userInfo - user info to save
     */
    saveUserInfo : function(userInfo){

            new User({
                name: userInfo.name,
                email: userInfo.email,
                username: userInfo.userName
            }).save(function(err,doc){
                    if(err) console.log("Error :",err);
                    else    console.log('Successfully inserted!')
                })
    }
};

mongoose.model('User', UserSchema);