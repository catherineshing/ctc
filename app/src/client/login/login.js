(function() {
    'use strict';

    angular.module('ctc.login', [
        'ngCookies',
        'smart-table',
        'ui.bootstrap',
        'ctc.ctc-service',
        'ctc.item-edit'
    ])

        .controller('LoginController', [
            '_',
            '$cookieStore',
            '$modal',
            '$q',
            '$rootScope',
            '$scope',
            '$window',
            'CtcService',
            function(_, $cookieStore, $modal, $q, $rootScope, $scope, $window, CtcService) {
                var that = this,
                    session = 60 * 60 * 1000; // 1 hour session

                this.isAuthenticated = new Date().getTime() - $cookieStore.get('ctc') < session;

                this.login = function() {
                    CtcService.login(that.password)
                        .then(
                            function(result) {
                                that.isAuthenticated = true;

                                $cookieStore.put('ctc', new Date().getTime());                                
                            },
                            function(error) {
                                that.loginError = true;
                                console.error('Authentication failed');
                            }
                        );
                };

                this.addItem = function() {
                    var modalInstance,
                        modalScope = $rootScope.$new();

                    modalScope.title = 'Add Item';
                    modalScope.isNew = true;
                    modalScope.item = {
                        images: []
                    };

                    modalInstance = $modal.open({
                        templateUrl: '/src/client/item/item-edit.tpl.html',
                        controller: 'ItemEditController as itemEdit',
                        size: 'lg',
                        windowClass: 'item edit',
                        animate: false,
                        scope: modalScope
                    });

                    modalInstance.result
                        .then(function(result) {
                            that.items.push(result);
                            that.displayedItems.push(result);
                        });
                };

                this.editItem = function(index, item) {
                    var modalInstance,
                        modalScope = $rootScope.$new();

                    modalScope.title = 'Edit Item';
                    modalScope.isNew = false;
                    modalScope.item = _.clone(item, true);

                    modalInstance = $modal.open({
                        templateUrl: '/src/client/item/item-edit.tpl.html',
                        controller: 'ItemEditController as itemEdit',
                        size: 'lg',
                        windowClass: 'item edit',
                        animate: false,
                        scope: modalScope
                    });

                    modalInstance.result
                        .then(function(result) {
                            _.merge(that.displayedItems[index], result);

                            _.forEach(that.items, function(i, index) {
                                if (item.id === i.id) {
                                    _.merge(that.items[index], result);
                                }
                            });
                        });
                };

                this.shareItem = function(item) {
                    var deferred = $q.defer();

                    FB.ui({
                        method: 'share',
                        href: item.url
                    }, function(response) {
                        if (!response || response.error) {
                            deferred.reject('Facebook share failed');
                        } else {
                            deferred.resolve(response);
                        }
                    });

                    return deferred.promise;
                };

                this.tweetItem = function(item) {
                    var windowOptions = 'scrollbars=yes,resizable=yes,toolbar=no,location=yes',
                        width = 550,
                        height = 253,
                        winHeight = $window.screen.height,
                        winWidth = $window.screen.width,
                        left = Math.round((winWidth / 2) - (width / 2)),
                        top = 0,
                        url;

                    if (winHeight > height) {
                        top = Math.round((winHeight / 2) - (height / 2));
                    }

                    url = 'https://twitter.com/intent/tweet?url=' + item.encodedUrl;

                    $window.open(url, 'intent', windowOptions + ',width=' + width + ',height=' + height + ',left=' + left + ',top=' + top);
                };

                this.deleteItem = function(index, item) {
                    var modalInstance,
                        modalScope = $rootScope.$new();

                    modalInstance = $modal.open({
                        templateUrl: '/src/client/item/item-delete.tpl.html',
                        size: 'sm',
                        animate: false,
                        scope: modalScope
                    });

                    modalInstance.result
                        .then(function() {
                             CtcService.deleteItem(item)
                                .then(function() {
                                    that.displayedItems.splice(index, 1);

                                    _.remove(that.items, function(i) {
                                        return item.id === i.id;
                                    });
                                });
                        });
                };

                $scope.$watch(function() { return that.isAuthenticated; }, function(newValue, oldValue) {
                    if (newValue) {
                        that.items = [];
                        that.displayedItems = [];

                        CtcService.getItems()
                            .then(function(items) {
                                that.items = items;
                                that.displayedItems = [].concat(items);
                            });
                    }
                }, true);
            }
        ]);

})();
