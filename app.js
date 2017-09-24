var express = require('express');
var path = require('path');
var app = module.exports = express();

app.set('view engine', 'jade');
app.set('views', path.join(__dirname, '/views'));

app.use(express.static(path.join(__dirname, '/public')));

app.get('/', function(req, res) {
  res.render('index', {
    title: 'Ethan W. Brown : ewb.io',
  });
});

var node_env = process.env.NODE_ENV || 'development';

if(!module.parent){
  var port = process.env.PORT || 1985;
  app.listen(port, function(){
    console.log('Running on port '+port);
  });
}
