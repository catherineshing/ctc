'use strict';

angular.module('ctc.home', [
    'ngRoute'
])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/home', {
            templateUrl: 'home/home.tpl.html',
            controller: 'HomeController'
        });
    }])

    .controller('HomeController', [function() {
        
    }]);
