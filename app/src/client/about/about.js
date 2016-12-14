(function() {
    'use strict';

    angular.module('ctc.about', [
        'ctc.ctc-resource'
    ])

        .controller('AboutController', [
            'CtcConstant',
            function(CtcConstant) {
                this.shapes = CtcConstant.Shapes;
            }
        ]);

})();
