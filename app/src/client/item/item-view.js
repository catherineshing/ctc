(function() {
    'use strict';

    angular.module('ctc.item-view', [
        'ctc.ctc-service'
    ])

        .controller('ItemViewController', [
            '$anchorScroll',
            '$scope',
            '$state',
            '$stateParams',
            'CtcService',
            function($anchorScroll, $scope, $state, $stateParams, CtcService) {
                var that = this;

                $anchorScroll();

                $scope.index.tab = $stateParams.parent;

                CtcService.getItem($stateParams.id, {onSale: $stateParams.parent === 'specials'})
                    .then(function(item) {
                        that.item = item;
                        that.image = item.images[0];
                    });
            }
        ]);

})();
