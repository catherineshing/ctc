'use strict';

angular.module('ctc', [
    'ngRoute',
    'ctc.about',
    'ctc.gallery',
    'ctc.home'
])

    .config([
        '$routeProvider', 
        '$locationProvider', 
        function($routeProvider, $locationProvider) {
            // Default view
            $routeProvider.otherwise({
                redirectTo: '/home'
            });

            $locationProvider.html5Mode(true);
        }
    ]);
