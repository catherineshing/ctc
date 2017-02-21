(function() {
    'use strict';

    angular.module('ctc.item-view', [
        'ngTouch',
        'ctc.ctc-service'
    ])

        .controller('ItemViewController', [
            '$scope',
            '$state',
            '$stateParams',
            '$window',
            'CtcService',
            function($scope, $state, $stateParams, $window, CtcService) {
                var that = this;

                angular.element($window).off('scroll');

                $scope.index.tab = $stateParams.parent;

                CtcService.getItem($stateParams.id, {onSale: $stateParams.parent === 'specials'})
                    .then(function(item) {
                        that.item = item;
                    });

                this.goToItem = function(itemId) {
                    if (itemId) {
                        $state.go('item', {id: itemId});
                    }
                };
            }
        ]);

})();
