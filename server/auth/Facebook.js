module.exports = {

    initFacebookModule:function (app, express, passport, mongoose) {

        console.log("facebook module");

        var FacebookStrategy = require('passport-facebook').Strategy,
            FACEBOOK_APP_ID = "280718695414345",
            FACEBOOK_APP_SECRET = "6745ed57168c6ed093f20c6bc6f3008f",
            User = mongoose.model("User");


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
                callbackURL:"http://localhost:1337/auth/facebook/callback"//,
            },
            function test(accessToken, refreshToken, profile, done) {
                if(accessToken && profile){
                    profile.myId = "FB-"+profile.id;
                    User.setAccessToken(profile.myId,accessToken);
                    var userProfile = User.getUser(profile); //dont forget to add a callback to exec when DB fetches
                    done(null,userProfile,accessToken);
                }
                else{
                    User.createNewUser(profile,"FB",accessToken); //dont forget to add a callback to exec when DB creates
                }
            }
        ));


// GET /auth/facebook
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in Facebook authentication will involve
//   redirecting the user to facebook.com.  After authorization, Facebook will
//   redirect the user back to this application at /auth/facebook/callback
        app.get('/auth/facebook', passport.authenticate('facebook'));

// GET /auth/facebook/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
        app.get('/auth/facebook/callback',
            passport.authenticate('facebook', { successRedirect:'/',
                failureRedirect:'/login' })
        );


    }
}