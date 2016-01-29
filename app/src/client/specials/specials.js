(function() {
    'use strict';

    angular.module('ctc.specials', [])

        .controller('SpecialsController', [
            '$scope',
            'SpecialsService',
            function($scope, SpecialsService) {

                SpecialsService.getSpecials()
                    .then(
                        function(result) {
                            $scope.specials = result;
                        }
                    );
            }
        ])

        .factory('SpecialsService', [
            '$http',
            '$q',
            function($http, $q) {
                function getSpecials() {
                    var deferred = $q.defer();

                    $http({
                            method: 'GET',
                            url: '/api/items',
                            params: {
                                special: true
                            }
                        })
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
                    getSpecials: getSpecials
                };
            }
        ]);

})();
