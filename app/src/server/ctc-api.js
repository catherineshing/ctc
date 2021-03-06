'use strict';

var ctc = require(__dirname + '/ctc');


function invoke(res, func, errorMessage) {
    var promise = func();

    promise
        .then(function(result) {
            res.status(200).json(result);
        })
        .fail(function(error) {
            res.status(400).json({
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
    var args = req.query.args;

    return invoke(res, function() {
            return ctc.getItems(args);
        }, 'Failed to get items');
}

function getItem(req, res) {
    var itemId = req.params.itemId,
        args = req.query.args;

    return invoke(res, function() {
            return ctc.getItem(itemId, args);
        }, 'Failed to get item');
}

function saveItem(req, res) {
    var item = req.body;

    return invoke(res, function() {
            return ctc.saveItem(item);
        }, 'Failed to save item');
}

function deleteItem(req, res) {
    var item = req.body;

    return invoke(res, function() {
            return ctc.deleteItem(item);
        }, 'Failed to delete item');
}

function saveImage(req, res) {
    var file = req.files.file;

    return invoke(res, function() {
            return ctc.saveImage(file);
        }, 'Failed to save image');
}

function deleteImage(req, res) {
    var file = req.body.file;

    return invoke(res, function() {
            return ctc.deleteImage(file);
        }, 'Failed to delete image');
}


module.exports = function(app) {

    app.post('/api/login', login);
    app.get('/api/items', getItems);
    app.get('/api/items/:itemId', getItem);
    app.post('/api/items', saveItem);
    app.delete('/api/items', deleteItem);
    app.post('/api/items/image', saveImage);
    app.delete('/api/items/image', deleteImage);

};
