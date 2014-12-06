// set up
var express = require('express'),
    consolidate = require('consolidate'),
    app = express();

// configuration
app.use(express.static(__dirname + '/app'));

app.engine('html', consolidate.ejs);
app.set('view engine', 'html');
app.set('views', __dirname + '/app');

// application
app.get('*', function(req, res) {
    res.render('index.html');
});

// listen
app.listen(8080);
console.log("App listening on port 8080");
