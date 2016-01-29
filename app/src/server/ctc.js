'use strict';

var Q = require('q'),
    _ = require('lodash'),
    fs = require('fs'),
    request = require('request'),
    credentials = require('credentials'),
    items = require('items');


function login(password) {
    console.log('BEGIN login');

    var deferred = Q.defer();

    if (password === 'asdf') { // credentials.ctc
        deferred.resolve();
        console.log('END login RESOLVED');
    } else {
        deferred.reject('Invalid password');
        console.log('END login REJECTED');
    }

    return deferred.promise;
}

function getItems(special) {
    console.log('BEGIN getItems');

    var deferred = Q.defer(),
        result = _.filter(items, function(item) {
            return special === item.special;
        });

    deferred.resolve(result);
    console.log('END getItems RESOLVED');

    return deferred.promise;
}

function addItem(item) {
    console.log('BEGIN addItem');

    var deferred = Q.defer(),
        promises = [];

    items.push({
        id: new Date().getTime().toString(),
        title: item.title,
        description: item.description,
        filename: item.filename,
        special: Boolean(item.special)
    });
    fs.writeFileSync(__dirname + '/items.json', JSON.stringify(items, null, 4));

    if (item.facebook) {
        promises.push(publishToFacebook(item));
        // publishToFacebook(item);
    }

    if (item.twitter) {
        // publishToTwitter(item);
    }

    if (item.google) {
        // publishToGoogle(item);
    }

    Q.all(promises)
        .then(function(result) {
            deferred.resolve(result);
            console.log('END addItem RESOLVED');
        })
        .fail(function(error) {
            deferred.reject(error);
            console.log('END addItem REJECTED');
        });

    return deferred.promise;
}

function publishToFacebook(item) {
    console.log('BEGIN publishToFacebook');

    var deferred = Q.defer();

    request.post({
        method: 'post',
        uri: 'https://graph.facebook.com/' + credentials.facebook.pageId + '/photos',
        form: {
            source: __dirname + '/images/items/' + item.filename,
            message: item.description,
            access_token: credentials.facebook.pageToken
        }
    }, function(error, response) {

    });

    // request.post('https://graph.facebook.com/' + credentials.facebook.pageId + '/photos', {
    //         form: {
    //             source: item.filename,
    //             message: item.description,
    //             access_token: credentials.facebook.pageToken
    //         }
    //     }, function(error, response, body) {
    //         console.log('>>> ' + JSON.stringify(response));
    //         deferred.resolve();
    //     });

    return deferred.promise;
}

function publishToTwitter(item) {
    console.log('BEGIN publishToTwitter');

    var deferred = Q.defer();

    request.post({
        method: 'post',
        uri: 'https://api.twitter.com/1.1/media/upload.json',
        form: {
            file: __dirname + '/images/items/' + item.filename,
            status: item.description,
            access_token: credentials.facebook.pageToken
        }
    }, function(error, response) {

    });

    return deferred.promise;
}

function deleteItem(itemId) {
    console.log('BEGIN deleteItem');
}


module.exports = {

    login: login,
    getItems: getItems,
    addItem: addItem,
    deleteItem: deleteItem

};
