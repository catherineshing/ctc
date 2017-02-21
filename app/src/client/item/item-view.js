(function() {
    'use strict';

    angular.module('ctc.item-view', [
        'ngTouch',
        'ctc.ctc-service'
    ])

        .controller('ItemViewController', [
            '$location',
            '$scope',
            '$stateParams',
            '$window',
            'CtcService',
            function($location, $scope, $stateParams, $window, CtcService) {
                var that = this;

                angular.element($window).off('scroll');

                $scope.index.tab = $stateParams.parent;
                this.parentState = $stateParams.parent;

                CtcService.getItem($stateParams.id, {onSale: $stateParams.parent === 'specials'})
                    .then(function(item) {
                        that.item = item;
                    });

                this.goToItem = function(itemId) {
                    if (itemId) {
                        $location.path('/' + that.parentState + '/item/' + itemId);
                    }
                };
            }
        ]);

})();
