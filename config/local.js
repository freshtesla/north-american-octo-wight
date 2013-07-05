// Local configuration
// 
// Included in the .gitignore by default,
// this is where you include configuration overrides for your local system
// or for a production deployment.


// For example, to use port 80 on the local machine, override the `port` config
// module.exports.port = 80;

// or to keep your db credentials out of the repo, but to use them on the local machine
// override the `modelDefaults` config
// module.exports.modelDefaults = { database: 'foo', user: 'bar', password: 'baZ'}

module.exports.auth = {

    // Create an application here: https://github.com/settings/applications/new
    // Define the application Name, URL (http://localhost:1337) and
    // Callback URL (http://localhost:1337/auth/github/callback).
    // Rename config/local.ex.js to local.js and replace YOUR-CLIENT-ID and
    // YOUR-CLIENT-SECRET with the generated keys.

    github: {
        clientID: "a3646fa342d5324ecd35",
        clientSecret: "c0a8632293e1bc0a263cb295f708ace4147530c8",
        callbackURL:"http://pulldash.herokuapp.com/auth/github/callback"
    }
}

module.exports.repo = {
  url: "http://github.com/ifixit/ifixit/",
  owner: 'freshvolk',
  repo: 'north-american-octo-wight'
}
