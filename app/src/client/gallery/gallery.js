(function() {
    'use strict';

    angular.module('ctc.gallery', [
        'ctc.item-thumbnail',
        'ctc.ctc-resource',
        'ctc.ctc-service'
    ])

        .controller('GalleryController', [
            '$anchorScroll',
            '$state',
            'CtcConstant',
            'CtcService',
            function($anchorScroll, $state, CtcConstant, CtcService) {
                var that = this,
                    count = 24,
                    args = {
                        start: 0,
                        count: count + 1
                    };

                this.hasPrev = false;
                this.hasNext = true;

                switch ($state.current.name) {
                    case 'gallery':
                        that.parent = 'gallery';
                        break;

                    case 'specials':
                        that.parent = 'specials';
                        args.onSale = true;
                        break;
                }

                this.categories = CtcConstant.Categories;

                function getItems() {
                    CtcService.getItems(args)
                        .then(
                            function(items) {
                                that.hasPrev = args.start > 0;
                                that.hasNext = items.length > count;

                                if (that.hasNext) {
                                    items.pop();
                                }

                                that.items = items;

                                $anchorScroll();
                            }
                        );
                }

                getItems();

                this.getCategory = function(category) {
                    that.category = category;
                    args.category = category;

                    getItems();
                };

                this.getPrevPage = function() {
                    args.start -= count;
                    getItems();
                };

                this.getNextPage = function() {
                    args.start += count;
                    getItems();
                };
            }
        ]);

})();
