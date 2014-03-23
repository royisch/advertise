function configureDependencies(app,path,express,passport) {
    // Define configurations
    console.log("starting initializing server configuration "+__dirname);
    app.set('views', __dirname + '/views');
    app.use(express.logger());
    app.use(express.static('public'));
    var MemoryStore = express.session.MemoryStore,
        sessionStore = new MemoryStore();
    //for production this is not good - we should use redis.io
    app.use(express.cookieParser());
    app.use(express.bodyParser());
    app.use(express.session({
        cookie:{ expires:  1000 * 60 * 100 },
        store: sessionStore,
        secret: 'secret',
        key: 'express.sid'}));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(app.router);
    console.log("FINISH initializing server configuration");
}

module.exports.configureDependencies = configureDependencies;