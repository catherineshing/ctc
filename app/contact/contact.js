'use strict';

angular.module('ctc.contact', [
    'ngRoute'
])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/contact', {
            templateUrl: 'contact/contact.tpl.html',
            controller: 'ContactController'
        });
    }])

    .controller('ContactController', [function() {
        
    }]);
