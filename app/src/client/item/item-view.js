(function() {
    'use strict';

    angular.module('ctc.item-view', [
        'ctc.ctc-service'
    ])

        .controller('ItemViewController', [
            '$scope',
            '$stateParams',
            '$window',
            'CtcService',
            function($scope, $stateParams, $window, CtcService) {
                var that = this;

                angular.element($window).off('scroll');

                $scope.index.tab = $stateParams.parent;
                this.parentState = $stateParams.parent;

                CtcService.getItem($stateParams.id, {onSale: $stateParams.parent === 'specials'})
                    .then(function(item) {
                        that.item = item;
                    });
            }
        ]);

})();
