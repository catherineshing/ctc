(function() {
    'use strict';

    angular.module('ctc.gallery', [])

        .controller('GalleryController', [
            '$scope',
            '$http',
            function($scope, $http) {
                $scope.images = [];

                $http.get('/api/items')
                    .success(function(data) {
                        $scope.images = data.items;
                    });
            }
        ]);

})();
