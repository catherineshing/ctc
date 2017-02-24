(function() {
    'use strict';

    angular.module('ctc.item-edit', [
        'ngFileUpload',
        'ui.sortable',
        'ctc.ctc-resource',
        'ctc.ctc-service'
    ])

        .controller('ItemEditController', [
            '_',
            '$modalInstance',
            '$scope',
            '$timeout',
            'CtcConstant',
            'CtcService',
            'Upload',
            function(_, $modalInstance, $scope, $timeout, CtcConstant, CtcService, Upload) {
                var that = this,
                    uploadedImages = [],
                    deletedImages = [];

                this.item = $scope.item;

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
                this.uploader = {
                    $invalid: false
                };

                this.categories = CtcConstant.Categories;
                this.certifications = CtcConstant.Certifications;
                this.clarities = CtcConstant.Clarities;
                this.colors = CtcConstant.Colors;
                this.shapes = CtcConstant.Shapes;

                this.priceRegex = '\\d+(\\.\\d{2})?';

                this.uploadFiles = function(files, invalidFiles) {
                    delete that.uploadError;

                    if (!_.isEmpty(files)) {
                        _.forEach(files, function(file) {
                            file.progress = 0;

                            Upload.upload({
                                url: '/api/items/image',
                                method: 'POST',
                                file: file
                            })
                            .then(
                                function(response) {
                                    uploadedImages.push(response.data);
                                    that.item.images.push(response.data);

                                    that.uploader.$invalid = false;
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

                this.deleteImage = function(index, image) {
                    deletedImages.push(image);
                    that.item.images.splice(index, 1);

                    that.uploader.$invalid = _.isEmpty(that.item.images);
                };

                this.cancel = function() {
                    _.forEach(uploadedImages, function(uploadedImage) {
                        CtcService.deleteImage(uploadedImage);
                    });

                    $modalInstance.dismiss();
                };

                this.saveItem = function(item) {
                    if ($scope.form.$invalid) {
                        _.forEach($scope.form.$error, function(controls) {
                            _.forEach(controls, function(control) {
                                control.$pristine = false;
                            });
                        });
                        that.uploader.$invalid = _.isEmpty(that.item.images);

                        $timeout(function() {
                            $scope.$apply();
                        });
                    } else {
                        _.forEach(deletedImages, function(deletedImage) {
                            CtcService.deleteImage(deletedImage);
                        });

                        CtcService.saveItem(item)
                            .then(function(result) {
                                $modalInstance.close(result);
                            });
                    }
                };
            }
        ]);

})();
