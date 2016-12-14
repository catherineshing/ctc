(function() {
    'use strict';

    angular.module('ctc.login-edit', [
        'ui.bootstrap',
        'smart-table',
        'ctc.ctc-service',
        'ctc.item-edit'
    ])

        .controller('LoginEditController', [
            '_',
            '$modal',
            '$rootScope',
            '$scope',
            '$state',
            'CtcService',
            function(_, $modal, $rootScope, $scope, $state, CtcService) {
                var that = this;

                $scope.login.state = $state.current.name;
                $scope.login.addCount = 0;

                this.items = [];
                this.displayedItems = [];

                CtcService.getItems()
                    .then(function(items) {
                        that.items = items;
                        that.displayedItems = [].concat(items);
                    });

                this.editItem = function(index, item) {
                    var modalInstance,
                        modalScope = $rootScope.$new();

                    modalScope.title = 'Edit Item';
                    modalScope.item = item;
                    modalScope.idEditDisabled = true;

                    modalInstance = $modal.open({
                        templateUrl: '/src/client/item/item-edit.tpl.html',
                        controller: 'ItemEditController as itemEdit',
                        size: 'lg',
                        windowClass: 'item-edit',
                        animate: false,
                        scope: modalScope
                    });

                    modalInstance.result
                        .then(function(result) {
                            if (result.deleted) {
                                that.items.splice(index, 1);
                                that.displayedItems.splice(index, 1);
                            } else {
                                _.merge(that.items[index], result);
                                _.merge(that.displayedItems[index], result);
                            }
                        });
                };

                this.shareItem = function(item) {
                    FB.ui({
                        method: 'share',
                        href: item.url
                        // quote: item.description
                    }, function(response) {

                    });
                };
            }
        ]);

})();
