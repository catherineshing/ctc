(function() {
    'use strict';

    angular.module('ctc.item-thumbnail', [])

        .directive('itemThumbnail', [
            function() {
                return {
                    restrict: 'A',
                    scope: {
                        item: '=ngModel'
                    },
                    templateUrl: '/src/client/item/item-thumbnail.tpl.html',
                    replace: true,
                    link: function(scope, element, attributes) {
                        scope.parent = attributes.parent;
                    }
                };
            }
        ]);

})();
