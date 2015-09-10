'use strict';

var fs = require('fs'),
    ctc = require('ctc'),
    items = require('items');


function invoke(res, func, errorMessage) {
    var promise = func();

    promise
        .then(function(result) {
            res.json(200, result);
        })
        .fail(function(error) {
            res.json(400, {
                error: {
                    message: errorMessage,
                    detail: error
                }
            });
        });

    return promise;
}


function login(req, res) {
    var password = req.body.password;

    return invoke(res, function() {
            return ctc.login(password);
        }, 'Failed to login');
}

function getItems(req, res) {
    return invoke(res, function() {
            return ctc.getItems();
        }, 'Failed to get items');
}

function addItem(req, res) {
    var item = req.body;

    return invoke(res, function() {
            return ctc.addItem(item);
        }, 'Failed to add item');
}

function addImage(req, res) {
    var file = req.files.file,
        data = fs.readFileSync(file.path);

    fs.writeFileSync(__dirname + '/images/items/' + file.name, data);
    fs.unlinkSync(file.path);

    res.json(200, file.name);
    return;
}


module.exports = function(app) {

    app.post('/api/login', login);
    app.get('/api/items', getItems);
    app.post('/api/items', addItem);
    app.post('/api/items/image', addImage);

};
