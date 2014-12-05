'use strict';

angular.module('ctc.gallery', [
    'ngRoute'
])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/gallery', {
            templateUrl: 'gallery/gallery.html',
            controller: 'GalleryController'
        });
    }])

    .controller('GalleryController', [function() {
        
    }]);
