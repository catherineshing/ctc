(function() {
    'use strict';

    angular.module('ctc', [
        'ui.bootstrap',
        'ui.router',
        'ctc.about',
        'ctc.contact',
        'ctc.gallery',
        'ctc.home',
        'ctc.item-view',
        'ctc.login',
        'ctc.ctc-resource',
        'ctc.ctc-service'
    ])

        .config([
            '$locationProvider',
            '$stateProvider',
            '$urlRouterProvider',
            function($locationProvider, $stateProvider, $urlRouterProvider) {
                // States
                $stateProvider
                    .state('about', {
                        url: '/about',
                        templateUrl: '/src/client/about/about.tpl.html'
                    })
                    .state('contact', {
                        url: '/contact',
                        templateUrl: '/src/client/contact/contact.tpl.html'
                    })
                    .state('gallery', {
                        url: '/gallery',
                        templateUrl: '/src/client/gallery/gallery.tpl.html'
                    })
                    .state('home', {
                        url: '/home',
                        templateUrl: '/src/client/home/home.tpl.html'
                    })
                    .state('item', {
                        url: '/:parent/item/:id',
                        templateUrl: '/src/client/item/item-view.tpl.html'
                    })
                    .state('login', {
                        url: '/login',
                        templateUrl: '/src/client/login/login.tpl.html'
                    })
                    .state('login.add', {
                        url: '/add',
                        views: {
                            'login': {
                                templateUrl: '/src/client/login/login-add.tpl.html'
                            }
                        }
                    })
                    .state('login.edit', {
                        url: '/edit',
                        views: {
                            'login': {
                                templateUrl: '/src/client/login/login-edit.tpl.html'
                            }
                        }
                    })
                    .state('specials', {
                        url: '/specials',
                        templateUrl: '/src/client/gallery/gallery.tpl.html'
                    });

                // Default to home
                $urlRouterProvider.otherwise(function($injector) {
                    var $state = $injector.get('$state');
                    $state.go('home');
                });

                $locationProvider.html5Mode(true);
            }
        ])

        .constant('_', window._)

        .filter('capitalize', function() {
            return function(input) {
                if (input && input.length) {
                    return input.charAt(0).toUpperCase() + input.substr(1);
                }
                return '';
            };
        })

        .controller('IndexController', [
            '$anchorScroll',
            '$location',
            'CtcConstant',
            function($anchorScroll, $location, CtcConstant) {
                var that = this,
                    path = $location.path().substr(1);

                this.tabs = [
                    {
                        name: 'Home',
                        path: 'home',
                        icon: 'glyphicon glyphicon-home'
                    },
                    {
                        name: 'Specials',
                        path: 'specials',
                        icon: 'glyphicon glyphicon-tag'
                    },
                    {
                        name: 'Gallery',
                        path: 'gallery',
                        icon: 'glyphicon glyphicon-picture'
                    },
                    {
                        name: 'About',
                        path: 'about',
                        icon: 'glyphicon glyphicon-info-sign'
                    },
                    {
                        name: 'Contact',
                        path: 'contact',
                        icon: 'glyphicon glyphicon-earphone'
                    }
                ];

                this.tab = path.length ? path : 'home';

                this.info = CtcConstant.BusinessInfo;

                this.loadTab = function(tab) {
                    that.tab = tab.path;
                    $anchorScroll();
                };
            }
        ]);

})();
