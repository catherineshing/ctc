// set up
var express = require('express'),
    app = express();

// configuration
app.use(express.static(__dirname + '/app'));

// application
app.get('*', function(req, res) {
    res.render('index.html');
});

app.get('/about*', function(req, res) {
    res.render('about/about.html');
});

app.get('/gallery*', function(req, res) {
    res.render('gallery/gallery.html');
});

app.get('/home*', function(req, res) {
    res.render('home/home.html');
});

app.get('/login*', function(req, res) {
    res.render('login/login.html');
});

app.get('/specials*', function(req, res) {
    res.render('specials/specials.html');
});

// listen
app.listen(8080);
console.log("App listening on port 8080");
