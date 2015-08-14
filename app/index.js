'use strict';

angular.module('ctc', [
    'ngRoute',
    'ctc.about',
    'ctc.contact',
    'ctc.gallery',
    'ctc.home',
    'ctc.login',
    'ctc.specials'
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
