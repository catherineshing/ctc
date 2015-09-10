// set up
require('module').Module._initPaths();

var express = require('express'),
    consolidate = require('consolidate'),
    app = express(),
    api;

app.use(express.json());
app.use(express.multipart());

// configuration
app.use('/lib', express.static(__dirname + '/lib'));
app.use('/src', express.static(__dirname + '/src'));
app.use('/images', express.static(__dirname + '/src/server/images'));

app.engine('html', consolidate.ejs);
app.set('view engine', 'html');
app.set('views', __dirname + '/src/client');

// api
api = require('ctc-api')(app);

// application
app.get('*', function(req, res) {
    res.render('index.html');
});

// listen
app.listen(8888, function() {
    console.log('ctc running on port 8888');
});
