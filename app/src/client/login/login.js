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
            '$state',
            'CtcService',
            function($cookieStore, $state, CtcService) {
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
            }
        ]);

})();
