(function() {
    'use strict';

    angular.module('ctc.item-edit', [
        'ngFileUpload',
        'ctc.ctc-resource',
        'ctc.ctc-service'
    ])

        .controller('ItemEditController', [
            '$modalInstance',
            '$scope',
            'CtcConstant',
            'CtcService',
            'Upload',
            function($modalInstance, $scope, CtcConstant, CtcService, Upload) {
                var that = this;

                this.item = {};
                angular.copy($scope.item, this.item);

                this.options = {
                    accept: 'image/*',
                    maxFiles: 1,
                    maxSize: '20MB',
                    multiple: false,
                    resize: {
                        width: 500,
                        height: 500
                    }
                };

                this.certifications = CtcConstant.Certifications;
                this.clarities = CtcConstant.Clarities;
                this.colors = CtcConstant.Colors;
                this.shapes = CtcConstant.Shapes;

                this.priceRegex = '\\d+(\\.\\d{2})?';

                this.changeImage = function(file, item) {
                    file.progress = 0;

                    Upload.upload({
                        url: '/api/items/image',
                        method: 'POST',
                        file: file
                    })
                    .then(
                        function(response) {
                            that.item.image = response.data;
                        },
                        function(error) {
                            file.error = error;
                        },
                        function(event) {
                            file.progress = Math.min(100, parseInt(100.0 * event.loaded / event.total, 10));
                        });
                };

                this.deleteItem = function(item) {
                    CtcService.deleteItem(item)
                        .then(function() {
                            $modalInstance.close({deleted: true});
                        });
                };

                this.saveItem = function(item) {
                    CtcService.saveItem(item)
                        .then(function() {
                            $modalInstance.close(item);
                        });
                };
            }
        ]);

})();
