(function() {
    'use strict';

    angular.module('ctc.specials', [
        'ctc.item-thumbnail',
        'ctc.ctc-service'
    ])

        .controller('SpecialsController', [
            'CtcService',
            function(CtcService) {
                var that = this;

                CtcService.getItems({onSale: true})
                    .then(
                        function(items) {
                            that.items = items;
                        }
                    );
            }
        ]);

})();
