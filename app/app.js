// set up
require('module').Module._initPaths();

var express = require('express'),
    bodyParser = require('body-parser'),
    consolidate = require('consolidate'),
    multipart = require('connect-multiparty'),
    info = require(__dirname + '/src/server/info.json'),
    app = express(),
    api,
    ctc;

app.use(bodyParser.json());
app.use(multipart());

// configuration
app.use('/lib', express.static(__dirname + '/lib'));
app.use('/rsrc', express.static(__dirname + '/rsrc'));
app.use('/src', express.static(__dirname + '/src'));
app.use('/images', express.static(__dirname + '/src/server/images'));

app.engine('html', consolidate.ejs);
app.set('view engine', 'html');
app.set('views', __dirname + '/src/client');

// api
api = require(__dirname + '/src/server/ctc-api')(app);
ctc = require(__dirname + '/src/server/ctc');

function isCrawler(userAgent) {
    return userAgent.includes('facebookexternalhit') || userAgent.includes('Twitterbot');
}

// application
app.get('*', function(req, res) {
    var userAgent = req.headers['user-agent'],
        urlMatches = req.url.match(/\/item\/(.+)$/),
        itemId;

    if (isCrawler(userAgent) && urlMatches) {
        itemId = urlMatches[1];

        ctc.getItem(itemId)
            .then(function(result) {
                res.render(__dirname + '/src/client/item/item-crawler.html', {
                    // url: 'http://ctcjewelers.com',
                    url: 'http://ec2-35-167-223-11.us-west-2.compute.amazonaws.com:8888',
                    item: result
                });
            });
    } else {
        res.render('index.html', {
            info: info,
            infoStr: JSON.stringify(info)
        });
    }
});

// listen
app.listen(8888, function() {
    console.log('ctc running on port 8888');
});
