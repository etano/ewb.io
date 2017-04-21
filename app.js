
/**
 * Module dependencies.
 */

var express = require('express')
  , fs = require('fs');

var app = module.exports = express.createServer();
var logFile = fs.createWriteStream('./log/express.log',{flags:'a'});

// Configuration

app.configure(function(){
  app.set('port', process.env.PORT || 1985);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.logger({stream: logFile}));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(function(req, res, next){
    res.status(404);

    // respond with html page
    if (req.accepts('html')) {
      res.render('404', {
        title: '404',
        url: req.url
      });
      return;
    }

    // respond with json
    if (req.accepts('json')) {
      res.send({ error: 'Not found' });
      return;
    }

    // default to plain-text. send()
    res.set('Content-Type', 'text/plain').send('Not found');
    return;
  });
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes

app.get('/', function(req, res){
  res.render('index', {
    title: 'Ethan W. Brown : ewb.io',
  });
});

app.listen(1985);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
