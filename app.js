var express = require('express');
var path = require('path');
var app = express();
app.use(express.static(path.join(__dirname, '/public')));
app.get('/', (req, res) => res.render('index.html'));
if(!module.parent) {
  var port = 1985; // Year of the Ox!
  app.listen(port, () => console.log('Running on port '+port));
}
