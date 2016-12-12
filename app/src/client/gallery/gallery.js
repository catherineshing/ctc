(function() {
    'use strict';

    angular.module('ctc.gallery', [
        'ctc.item-thumbnail',
        'ctc.ctc-service'
    ])

        .controller('GalleryController', [
            'CtcService',
            function(CtcService) {
                var that = this;

                CtcService.getItems()
                    .then(
                        function(items) {
                            that.items = items;
                        }
                    );
            }
        ]);

})();
