(function() {
    'use strict';

    angular.module('ctc.item', [
        'ctc.ctc-service'
    ])

        .controller('ItemController', [
            '$stateParams',
            'CtcService',
            function($stateParams, CtcService) {
                var that = this;

                this.parentState = $stateParams.parent;

                CtcService.getItem($stateParams.id, {onSale: $stateParams.parent === 'specials'})
                    .then(function(item) {
                        that.item = item;
                    });
            }
        ]);

})();
