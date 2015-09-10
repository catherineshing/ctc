(function() {
    'use strict';

    angular.module('ctc.upload', [
        'ngUpload'
    ])

        .controller('UploadController', [
            '$modalInstance',
            function($modalInstance) {
                this.upload = function(response) {
                    $modalInstance.close(response);
                };
            }
        ]);

})();
