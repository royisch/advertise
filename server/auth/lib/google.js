module.exports = {

    initGoogleModule:function (app, express, passport, mongoose) {

        console.log("google module");

        var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy,
            GOOGLE_APP_ID = "613107833479-9ugoahut85ch3gg7q4ahfj4r16628urk.apps.googleusercontent.com",
            GOOGLE_APP_SECRET = "QIJ45eRMtH4IlltHiznkCajZ", //? todo validate that this is the app secret
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
                callbackURL:"http://localhost:1337/auth/google/callback"/*,
                passReqToCallback : true*/
            },
            function(accessToken, refreshToken, profile, done) {
                if(!profile){
                    done(null, null);
                }
                User.findOne({myId : "GL-"+profile.id}, function(err, oldUser){
                    if(oldUser){
                        console.log("google");
                        currentUser = oldUser;
                    }else{
                        var email = profile.emails && profile.emails[0].value;
                        User.findOne({email : email},function(err,oldUserEmail){
                            if(oldUserEmail){
                                console.log("email");
                                currentUser = oldUserEmail;
                            }
                            else{
                                User.createNewUser(profile,"GL",accessToken , function(err,newUser){
                                    console.log("create new user");
                                    if(err) throw err;
                                    currentUser = newUser;
                                });
                            }
                        });
                    }
                });
                done(null,{token: accessToken, profile: currentUser});
            })

    );



// GET /auth/facebook
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in Facebook authentication will involve
//   redirecting the user to facebook.com.  After authorization, Facebook will
//   redirect the user back to this application at /auth/facebook/callback
        app.get('/auth/google',passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email'] })
        );

// GET /auth/facebook/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
        app.get('/auth/google/callback',
        passport.authenticate('google', { failureRedirect: '/' }),
            function(req, res) {
                res.redirect('/#inside');
            }
            );


        app.get('/service/user',function(req,res){
            console.log('took google api');
            res.send(currentUser);
        });

        /*app.get('/logout', function(req, res){
            req.logout();
            res.redirect('/');
        });*/
    }

};