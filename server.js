// set up
require('module').Module._initPaths();

var express = require('express'),
    consolidate = require('consolidate'),
    app = express(),
    api;

// configuration
app.use(express.static(__dirname + '/app'));

app.engine('html', consolidate.ejs);
app.set('view engine', 'html');
app.set('views', __dirname + '/app');

// api
api = require('./app/api')(app);

// application
app.get('*', function(req, res) {
    res.render('index.html');
});

// listen
app.listen(8888);
console.log('App listening on port 8888');
