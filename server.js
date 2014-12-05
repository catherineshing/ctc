// set up
var express = require('express'),
    app = express();

// configuration
app.use(express.static(__dirname + '/app'));

// application
app.get('*', function(req, res) {
    res.sendfile('./app/index.html');
});

app.get('/about*', function(req, res) {
    res.render('about/about.html');
});

app.get('/home*', function(req, res) {
    res.render('gallery/gallery.html');
});

app.get('/home*', function(req, res) {
    res.render('home/home.html');
});

// listen
app.listen(8080);
console.log("App listening on port 8080");
