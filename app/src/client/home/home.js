(function() {
    'use strict';

    angular.module('ctc.home', [
        'ctc.ctc-service'
    ])

        .controller('HomeController', [
            '$scope',
            '$state',
            'CtcService',
            function($scope, $state, CtcService) {
                var that = this;

                CtcService.getItems({start: 0, count: 10})
                    .then(
                        function(items) {
                            that.items = items;
                        }
                    );

                this.viewItem = function(id) {
                    $scope.index.tab = 'gallery';
                    $state.go('item', {parent: 'gallery', id: id});
                };
            }
        ]);

})();
