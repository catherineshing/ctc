(function() {
    'use strict';

    angular.module('ctc', [
        'ngRoute',
        'ui.bootstrap',
        'ctc.about',
        'ctc.contact',
        'ctc.gallery',
        'ctc.home',
        'ctc.login',
        'ctc.specials'
    ])

        .config([
            '$routeProvider',
            '$locationProvider', 
            function($routeProvider, $locationProvider) {
                // Routes
                $routeProvider
                    .when('/about', {
                        templateUrl: '/src/client/about/about.tpl.html',
                        controller: 'AboutController'
                    })
                    .when('/contact', {
                        templateUrl: '/src/client/contact/contact.tpl.html',
                        controller: 'ContactController'
                    })
                    .when('/gallery', {
                        templateUrl: '/src/client/gallery/gallery.tpl.html',
                        controller: 'GalleryController'
                    })
                    .when('/login', {
                        templateUrl: '/src/client/login/login.tpl.html',
                        controller: 'LoginController'
                    })
                    .when('/specials', {
                        templateUrl: '/src/client/specials/specials.tpl.html',
                        controller: 'SpecialsController'
                    })
                    .when('/home', {
                        templateUrl: '/src/client/home/home.tpl.html',
                        controller: 'HomeController'
                    });

                // Default view
                $routeProvider
                    .otherwise({
                        redirectTo: '/home'
                    });

                $locationProvider.html5Mode(true);
            }
        ]);

})();
