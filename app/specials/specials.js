'use strict';

angular.module('ctc.specials', [
    'ngRoute'
])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/specials', {
            templateUrl: 'specials/specials.html',
            controller: 'SpecialsController'
        });
    }])

    .controller('SpecialsController', [function() {
        
    }]);
