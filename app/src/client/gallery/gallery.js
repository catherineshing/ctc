(function() {
    'use strict';

    angular.module('ctc.gallery', [])

        .controller('GalleryController', [
            '$scope',
            'GalleryService',
            function($scope, GalleryService) {

                GalleryService.getItems()
                    .then(
                        function(result) {
                            $scope.images = result;
                        }
                    );
            }
        ])

        .factory('GalleryService', [
            '$http',
            '$q',
            function($http, $q) {
                function getItems() {
                    var deferred = $q.defer();

                    $http.get('/api/items')
                        .then(
                            function(response) {
                                deferred.resolve(response.data);
                            },
                            function(error) {
                                deferred.reject(error);
                            }
                        );

                    return deferred.promise;
                }

                return {
                    getItems: getItems
                };
            }
        ]);

})();
