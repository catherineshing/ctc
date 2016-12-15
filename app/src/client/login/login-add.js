(function() {
    'use strict';

    angular.module('ctc.login-add', [
        'ngFileUpload',
        'ui.bootstrap',
        'ctc.ctc-service',
        'ctc.item-edit'
    ])

        .controller('LoginAddController', [
            '_',
            '$modal',
            '$rootScope',
            '$scope',
            '$state',
            'CtcService',
            'Upload',
            function(_, $modal, $rootScope, $scope, $state, CtcService, Upload) {
                var that = this;

                $scope.login.state = $state.current.name;

                this.newItems = [];

                this.options = {
                    accept: 'image/*',
                    maxFiles: 20,
                    maxSize: '20MB',
                    multiple: true,
                    allowDir: true,
                    resize: {
                        width: 500,
                        height: 500
                    }
                };

                CtcService.getItems({tmp: true})
                    .then(function(items) {
                        that.items = items || [];
                    });

                this.uploadFiles = function(files, invalidFiles) {
                    delete that.uploadError;

                    if (!_.isEmpty(files)) {
                        _.forEach(files, function(file) {
                            file.progress = 0;
                            that.items.push(file);

                            Upload.upload({
                                url: '/api/items/image',
                                method: 'POST',
                                file: file
                            })
                            .then(
                                function(response) {
                                    file.image = response.data;
                                },
                                function(error) {
                                    file.error = error;
                                },
                                function(event) {
                                    file.progress = Math.min(100, parseInt(100.0 * event.loaded / event.total, 10));
                                });
                        });
                    } else if (!_.isEmpty(invalidFiles)) {
                        that.uploadError = 'Invalid file(s): ' + _.pluck(invalidFiles, 'name').join(', ');
                    }
                };

                this.editItem = function(index, item) {
                    var modalInstance,
                        modalScope = $rootScope.$new();

                    modalScope.title = 'Add Item';
                    modalScope.item = item;
                    modalScope.isNew = true;

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
                            if (!result.deleted) {
                                that.newItems.push(result);
                            }

                            that.items.splice(index, 1);
                        });
                };
            }
        ]);

})();
