var passport = require('passport')
    , GitHubStrategy = require('passport-github').Strategy
    , express = require('express');

var verifyHandler = function (token, tokenSecret, profile, done) {
  console.log(token);
  console.log(tokenSecret);
  console.log(profile);
  return done(null, profile);
};

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (obj, done) {
  done(null, obj);
});

module.exports = {
	
	// Name of the application (used as default <title>)
	appName: "Pulls",

	// Port this Sails application will live on
	port: 1337,

	// The environment the app is deployed in 
	// (`development` or `production`)
	//
	// In `production` mode, all css and js are bundled up and minified
	// And your views and templates are cached in-memory.  Gzip is also used.
	// The downside?  Harder to debug, and the server takes longer to start.
	environment: 'development',

	// Logger
	// Valid `level` configs:
	// 
	// - error
	// - warn
	// - debug
	// - info
	// - verbose
	//
	log: {
		level: 'verbose'
	},

  express: {
    customMiddleware: function(app)
    {
        passport.use(new GitHubStrategy({
                clientID: sails.config.auth.github.clientID,
                clientSecret: sails.config.auth.github.clientSecret,
                callbackURL: sails.config.auth.github.callbackURL
            },
            verifyHandler
        ));

        app.use(passport.initialize());
        app.use(passport.session());
    }
  }
  

};
