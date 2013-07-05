/*---------------------
  :: Home 
  -> controller
---------------------*/
var querystring = require('querystring')
  , https = require('https')
  , async = require('async');


function githubAPI(endpoint, method, params, token, fn, shouldJSON) {

  var post_data = querystring.stringify(params);
  var post_options = {
    host: 'api.github.com',
    post: '80',
    path: endpoint,
    "method": method,
    headers: {
      'User-Agent': 'freshvolk-test-dashboard',
      'Authorization': 'token ' + token,
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': post_data.length
    }
  };

  var shouldJSON = (typeof shouldJSON === 'undefined') ? true : shouldJSON;

  var post_req = https.request(post_options, function(res) {
    res.setEncoding('utf8');
    var data = '';
    res.on('data', function (chunk) {
      data += chunk;
    });
    res.on('end', function () {
      if (shouldJSON) { 
      return fn(null, JSON.parse(data));
      } else { 
      return fn(null, data);
      }
    });
  });
  post_req.write(post_data);
  post_req.end();

};

 function getPulls(repo, token, fn) {
  githubAPI('/repos/' + repo.owner + '/' + repo.repo + '/pulls', 'GET', {} ,
    token, fn);
};

function getComments(pull, repo, token, fn) {
  githubAPI('/repos/' + repo.owner + '/' + repo.repo + '/issues/' + pull.number + '/comments',
    'GET' , {} , token, fn);
};

function parsePullComments(repo, token, fn) {
  getPulls(repo, token, function(err, data) {
    pulls = [];

    for (var i=0; i<data.length; i++) {
      var pull = {
        repo: repo,
        token: token,
        pull: data[i]
      };
      pulls.push(pull);
    }
    async.map(pulls, getComs, function(err, pulls) {
      fn(pulls, repo);
    });
  });
}

function getComs(data, fn) {
  var pull = data.pull;
  getComments(pull, data.repo, data.token, function(err, data) {
    var qa = data.map(function(com) {
      if (com.body.indexOf('QA :koala:') !== -1) {
        return { time: com.created_at, user: com.user };
      }
    });
    var cr = data.map(function(com) {
      if (com.body.indexOf('CR :+1:') !== -1) {
        return { time: com.created_at, user: com.user };
      }
    });

    cr = cr.filter(function(n){return n});
    qa = qa.filter(function(n){return n});

    var result = {
      name: pull.title,
      number: pull.number,
      st: { qa: qa.length, cr: cr.length },
      allConfirms: { qa: qa, cr: cr}
    };
    Pull.findOrCreate({number: result.number}, result, function(err, pull) {

      // Error handling
      if (err) {
        return console.log(err);

      // The Pull was created successfully!
      }else {
        if (pull.allConfirms !== result.allConfirms) {
          Pull.update({number: pull.number}, result, function(err, pull) {

            // Error handling
            if (err) {
              return console.log(err);

            // The Pull was created successfully!
            }else {
              console.log("Pull updated", pull.number);
            }
          });
        }
      }
    });
    fn(null, result);
  });
}

var HomeController = {

  refresh: function (req, res) {
   parsePullComments(sails.config.repo, req.user.token, function(pulls, repo) {
     res.render('home/index', { pull: pulls, repo : repo.url } );
   });
 },

  index: function (req, res) {
    Pull.findAll().done(function(err, pulls) {

      // error handling
      if (err) {
        return console.log(err);
      // found multiple users!
      } else {
        res.view( { pull: pulls, repo: sails.config.repo.url } );
      }
    });
  }
};
module.exports = HomeController;
