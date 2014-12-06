'use strict';

angular.module('ctc.login', [
    'ngRoute'
])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/login', {
            templateUrl: 'login/login.tpl.html',
            controller: 'LoginController'
        });
    }])

    .controller('LoginController', [
        '$scope',
        function($scope) {
            $scope.isAuthenticated = false;
            $scope.password = '';

            $scope.authenticate = function(password) {
                if (password == 'asdf') {
                    $scope.isAuthenticated = true;
                }
            };
        }
    ]);
