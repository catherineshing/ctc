'use strict';

angular.module('ctc.about', [
    'ngRoute'
])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/about', {
            templateUrl: 'about/about.html',
            controller: 'AboutController'
        });
    }])

    .controller('AboutController', [function() {
        
    }]);
