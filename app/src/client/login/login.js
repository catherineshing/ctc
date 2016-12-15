(function() {
    'use strict';

    angular.module('ctc.login', [
        'ngCookies',
        'ctc.ctc-service',
        'ctc.login-add',
        'ctc.login-edit'
    ])

        .controller('LoginController', [
            '$cookieStore',
            '$q',
            '$scope',
            '$state',
            '$window',
            'CtcService',
            function($cookieStore, $q, $scope, $state, $window, CtcService) {
                var that = this,
                    session = 60 * 60 * 1000, // 1 hour session
                    state = $state.current.name;

                // Default to Add state
                if (state.indexOf('login.') === -1) {
                    state = 'login.add';
                }

                this.isAuthenticated = new Date().getTime() - $cookieStore.get('ctc') < session;
                if (this.isAuthenticated) {
                    $state.go(state);
                }

                this.login = function() {
                    CtcService.login(that.password)
                        .then(
                            function(result) {
                                that.isAuthenticated = true;

                                $cookieStore.put('ctc', new Date().getTime());                                

                                $state.go(state);
                            },
                            function(error) {
                                that.loginError = true;
                                console.error('Authentication failed');
                            }
                        );
                };

                $scope.shareItem = function(item) {
                    var deferred = $q.defer();

                    FB.ui({
                        method: 'share',
                        href: item.url
                        // quote: item.description
                    }, function(response) {
                        if (!response || response.error) {
                            deferred.reject('Facebook share failed');
                        } else {
                            deferred.resolve(response);
                        }
                    });

                    return deferred.promise;
                };

                $scope.tweetItem = function(item) {
                    var windowOptions = 'scrollbars=yes,resizable=yes,toolbar=no,location=yes',
                        width = 550,
                        height = 253,
                        winHeight = $window.screen.height,
                        winWidth = $window.screen.width,
                        left = Math.round((winWidth / 2) - (width / 2)),
                        top = 0,
                        url;

                    if (winHeight > height) {
                        top = Math.round((winHeight / 2) - (height / 2));
                    }

                    url = 'https://twitter.com/intent/tweet?text=' + item.description + '&url=' + item.encodedUrl + '&via=CTCJewelers';

                    $window.open(url, 'intent', windowOptions + ',width=' + width + ',height=' + height + ',left=' + left + ',top=' + top);
                };
            }
        ]);

})();
