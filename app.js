var ua = require("universal-analytics");
var express = require('express');
var path = require('path');

var app = module.exports = express();
var visitor = ua("UA-97838688-1");

app.use(express.static(path.join(__dirname, '/public')));
app.get('/', (req, res) => {
   visitor.pageview(req.url).send();
   res.render('index.html');
});
if(!module.parent) {
  var port = 1985; // Year of the Ox!
  app.listen(port, () => console.log('Running on port '+port));
}
