'use strict';

angular.module('ctc.gallery', [
    'ngRoute'
])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/gallery', {
            templateUrl: 'gallery/gallery.tpl.html',
            controller: 'GalleryController'
        });
    }])

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
