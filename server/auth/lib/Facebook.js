module.exports = {

    initFacebookModule:function (app, express, passport, mongoose) {

        console.log("facebook module");

        var FacebookStrategy = require('passport-facebook').Strategy,
            FACEBOOK_APP_ID = "280718695414345",
            FACEBOOK_APP_SECRET = "6745ed57168c6ed093f20c6bc6f3008f",
            graphAPI = require('fbgraph'),
            User = mongoose.model("User"),
            currentUser;


// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.  However, since this example does not
//   have a database of user records, the complete Facebook profile is serialized
//   and deserialized.
        passport.serializeUser(function (user, done) {
            done(null, user);
        });

        passport.deserializeUser(function (obj, done) {
            done(null, obj);
        });


// Use the FacebookStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Facebook
//   profile), and invoke a callback with a user object.
        passport.use(new FacebookStrategy({
                clientID:FACEBOOK_APP_ID,
                clientSecret:FACEBOOK_APP_SECRET,
                profileFields: ['id','name','username','first_name','last_name','link','timezone' ,'locale', 'displayName', 'link', 'about_me', 'photos', 'emails'],
                callbackURL:"http://localhost:1337/auth/facebook/callback"/*,
                passReqToCallback : true*/
            },
            function(accessToken, refreshToken, profile, done) {
                if(!profile){
                    done(null, null);
                }
                User.findOne({myId : "FB-"+profile.id}, function(err, oldUser){
                    if(oldUser){
                        console.log("facebook");
                        currentUser = oldUser;
                    }else{
                        var email = profile.emails && profile.emails[0].value;
                            User.findOne({email : email},function(err,oldUserEmail){
                                if(oldUserEmail){
                                    console.log("email");
                                    currentUser = oldUserEmail;
                                }
                                else{
                                    User.createNewUser(profile,"FB",accessToken , function(err,newUser){
                                        console.log("create new user");
                                        if(err) throw err;
                                        currentUser = newUser;
                                    });
                                }
                            });
                    }
                });

                graphAPI.extendAccessToken({
                        "access_token":    accessToken,
                        "client_id":      FACEBOOK_APP_ID,
                        "client_secret":  FACEBOOK_APP_SECRET
                    }, function (err, facebookRes) {
                        graphAPI.setAccessToken(facebookRes.access_token);
                        //pass along to the next requests the object - it will be on req.myVar
                        //only after calling done function, the authentication continues ands facebook
                        //calls the /auth/facebook/callback function to continue the flow
                        //why do we want to do it? lets say we want to do all sorts of things before
                        //we return to the client, like extend the token , before rendering the new page
                        //we can do some manipulation
                        done(null,{token: facebookRes.access_token, profile: currentUser});
                    }
                );
            })
        );



// GET /auth/facebook
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in Facebook authentication will involve
//   redirecting the user to facebook.com.  After authorization, Facebook will
//   redirect the user back to this application at /auth/facebook/callback
        app.get('/auth/facebook', passport.authenticate('facebook',{ scope: 'email' }));

// GET /auth/facebook/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
        app.get('/auth/facebook/callback',
            passport.authenticate('facebook', { successRedirect:'/#inside/fb',
                failureRedirect:'/' }
            ));


        app.get('/service/userfb',function(req,res){
            console.log("took facebook api");
            res.send(currentUser);
        });

        /*app.get('/logout', function(req, res){
            req.logout();
            res.redirect('/');
        });*/
    }

};