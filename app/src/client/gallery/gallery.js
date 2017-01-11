(function() {
    'use strict';

    angular.module('ctc.gallery', [
        'ctc.item-thumbnail',
        'ctc.ctc-service'
    ])

        .controller('GalleryController', [
            '$state',
            '$window',
            'CtcService',
            function($state, $window, CtcService) {
                var that = this,
                    args = {
                        start: 0,
                        count: 18
                    };

                this.items = [];

                switch ($state.current.name) {
                    case 'gallery':
                        that.parent = 'gallery';
                        break;

                    case 'specials':
                        that.parent = 'specials';
                        args.onSale = true;
                        break;
                }

                function getItems(args) {
                    CtcService.getItems(args)
                        .then(
                            function(items) {
                                that.items = that.items.concat(items);

                                if (items.length < args.count) {
                                    angular.element($window).off('scroll');
                                }
                            }
                        );
                }

                getItems(args);

                angular.element($window).on('scroll', function() {
                    if (this.pageYOffset >= 100) {
                        args.start += args.count;
                        getItems(args);
                    }
                });
            }
        ]);

})();
