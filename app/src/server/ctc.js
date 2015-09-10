'use strict';

var Q = require('q'),
    fs = require('fs'),
    credentials = require('credentials'),
    items = require('items');


function login(password) {
    console.log('BEGIN login');

    var deferred = Q.defer();

    if (password === credentials.ctc) {
        deferred.resolve();
        console.log('END login RESOLVED');
    } else {
        deferred.reject('Invalid password');
        console.log('END login REJECTED');
    }

    return deferred.promise;
}

function getItems() {
    console.log('BEGIN getItems');

    var deferred = Q.defer();

    deferred.resolve(items);
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
        filename: item.filename
    });
    fs.writeFileSync(__dirname + '/items.json', JSON.stringify(items, null, 4));

    if (item.facebook) {
        // promises.push(publishToFacebook(item));
        publishToFacebook(item);
    }

    if (item.twitter) {
        publishToTwitter(item);
    }

    if (item.google) {
        publishToGoogle(item);
    }

    deferred.resolve(item);
    console.log('END addItem RESOLVED');

    return deferred.promise;
}

function publishToFacebook(item) {
    console.log('BEGIN publishToFacebook');
}

function publishToTwitter(item) {
    console.log('BEGIN publishToTwitter');
}

function publishToGoogle(item) {
    console.log('BEGIN publishToGoogle');
}


module.exports = {

    login: login,
    getItems: getItems,
    addItem: addItem

};
