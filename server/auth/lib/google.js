module.exports = {

    initGoogleModule:function (app, express, passport, mongoose) {

        console.log("google module");

        var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy,
            GOOGLE_APP_ID = "613107833479.apps.googleusercontent.com",
            GOOGLE_APP_SECRET = "613107833479@developer.gserviceaccount.com", //? todo validate that this is the app secret
            User = mongoose.model("User"),
            currentUser;


// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.  However, since this example does not
//   have a database of user records, the complete GOOGLE profile is serialized
//   and deserialized.
        passport.serializeUser(function (user, done) {
            done(null, user);
        });

        passport.deserializeUser(function (obj, done) {
            done(null, obj);
        });


// Use the GOOGLEStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and GOOGLE
//   profile), and invoke a callback with a user object.
        passport.use(new GoogleStrategy({
                clientID:GOOGLE_APP_ID,
                clientSecret:GOOGLE_APP_SECRET,
                profileFields: ['id','name','username','first_name','last_name','link','timezone' ,'locale', 'displayName', 'link', 'about_me', 'photos', 'emails'],
                callbackURL:"http://localhost:1337/auth/google/callback"/*,
                passReqToCallback : true*/
            },
            function(accessToken, refreshToken, profile, done) {
                if(!profile){
                    done(null, null);
                }
                User.findOne({myId : "FB-"+profile.id}, function(err, oldUser){
                    if(oldUser){
                        currentUser = oldUser;
                        done(null,oldUser);
                    }else{
                        User.createNewUser(profile,"FB",accessToken , function(err,newUser){
                            if(err) throw err;
                            currentUser = newUser;
                            done(null, newUser);
                        });
                    }
                });
                //pass along to the next requests the object - it will be on req.myVar
                //only after calling done function, the authentication continues ands facebook
                //calls the /auth/facebook/callback function to continue the flow
                //why do we want to do it? lets say we want to do all sorts of things before
                //we return to the client, like extend the token , before rendering the new page
                //we can do some manipulation
            })
        );



// GET /auth/facebook
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in Facebook authentication will involve
//   redirecting the user to facebook.com.  After authorization, Facebook will
//   redirect the user back to this application at /auth/facebook/callback
        passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email'] });

// GET /auth/facebook/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
        app.get('/auth/facebook/callback',
        passport.authenticate('google', { failureRedirect: '/' }),
            function(req, res) {
                res.redirect('/inside');
            }
            );


        app.get('/service/user',function(req,res){
            res.send(currentUser);
        });

        /*app.get('/logout', function(req, res){
            req.logout();
            res.redirect('/');
        });*/
    }

};