(function() {
    'use strict';

    angular.module('ctc.login', [
        'ctc.upload'
    ])

        .controller('LoginController', [
            '$modal',
            '$rootScope',
            '$scope',
            '$timeout',
            'LoginService',
            function($modal, $rootScope, $scope, $timeout, LoginService) {
                $scope.isAuthenticated = false;
                $scope.item = {
                    special: false
                };

                $scope.authenticate = function(password) {
                    LoginService.login(password)
                        .then(
                            function(result) {
                                $scope.isAuthenticated = true;
                            },
                            function(error) {
                                $scope.loginError = true;
                                console.log('Authentication failed');
                            }
                        );
                };

                $scope.addImage = function() {
                    var modalInstance,
                        modalScope = $rootScope.$new();

                    modalInstance = $modal.open({
                        templateUrl: '/src/client/login/upload/upload.tpl.html',
                        controller: 'UploadController as upload',
                        size: 'lg',
                        windowClass: 'upload-modal',
                        animate: false,
                        scope: modalScope
                    });

                    modalInstance.result
                        .then(function(filename) {
                            $scope.item.filename = filename;
                        });
                };

                $scope.addItem = function(item) {
                    LoginService.addItem(item)
                        .then(
                            function(result) {
                                $scope.alert = {
                                    type: 'success',
                                    message: 'Item Added'
                                };

                                $scope.item = {
                                    special: false
                                };
                            },
                            function(error) {
                                $scope.alert = {
                                    type: 'danger',
                                    message: 'Failed to add item'
                                };
                            }
                        )
                        .finally(function() {
                            $timeout(function() {
                                $scope.alert = null;
                            }, 10000);
                        });
                };
            }
        ])

        .factory('LoginService', [
            '$http',
            '$q',
            function($http, $q) {
                function login(password) {
                    var deferred = $q.defer();

                    $http.post('/api/login', {password: password})
                        .then(
                            function(response) {
                                deferred.resolve(response);
                            },
                            function(error) {
                                deferred.reject(error);
                            }
                        );

                    return deferred.promise;
                }

                function addItem(item) {
                    var deferred = $q.defer();

                    $http.post('/api/items', item)
                        .then(
                            function(response) {
                                deferred.resolve(response);
                            },
                            function(error) {
                                deferred.reject(error);
                            }
                        );

                    return deferred.promise;
                }

                return {
                    login: login,
                    addItem: addItem
                };
            }
        ]);

})();
