(function() {
    'use strict';

    angular.module('ctc.login', [
        'angularFileUpload'
    ])

        .controller('LoginController', [
            '$scope',
            '$http',
            '$upload',
            function($scope, $http, $upload) {
                $scope.isAuthenticated = false;
                $scope.password = '';

                $scope.authenticate = function(password) {
                    if (password == 'asdf') {
                        $scope.isAuthenticated = true;
                    }
                };

                $scope.addItem = function(item) {
                    console.log('adding item: ' + JSON.stringify(item));
                    $http.post('/api/items', item)
                        .then(function(data) {
                            console.log('add success: ' + JSON.stringify(data));
                        });
                };
            }
        ]);

})();
