'use strict';

angular.module('ctc.gallery', [
    'ngRoute'
])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/gallery', {
            templateUrl: 'gallery/gallery.html',
            controller: 'GalleryController'
        });
    }])

    .controller('GalleryController', [
        '$scope',
        function($scope) {
            $scope.images = [
                {
                    id: 'id1',
                    title: 'title1',
                    description: 'description1',
                    filename: '1.jpg'
                },
                {
                    id: 'id2',
                    title: 'title2',
                    description: 'description2',
                    filename: '2.jpg'
                }
            ];
        }
    ]);
