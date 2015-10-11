module.exports = {

    initAdsModule: function (app, express, passport, mongoose) {

        console.log("facebook module");

        var User = mongoose.model("User"),
            currentUser;

        app.post('/ad', function (req, res) {
            console.log(req.body);
        });


    }

};