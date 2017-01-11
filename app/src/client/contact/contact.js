(function() {
    'use strict';

    angular.module('ctc.contact', [
        'ctc.ctc-resource'
    ])

        .controller('ContactController', [
            '$sce',
            'CtcConstant',
            function($sce, CtcConstant) {
                this.info = CtcConstant.BusinessInfo;

                this.description = 'We are located in the San Francisco Jewelry Center, which is open to wholesale customers only. Please feel free to contact us with any questions or to schedule an appointment.';

                this.hours = [
                    {
                        day: 'Mon-Fri',
                        time: '10am - 5pm'
                    },
                    {
                        day: 'Sat-Sun',
                        time: 'By appointment only'
                    }
                ];

                this.mapUrl = $sce.trustAsResourceUrl('https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3153.946015018397!2d-122.406611!3d37.767864!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808f7e2dc2c6ae29%3A0x5bdb0112d7edab3a!2sCTC+Jewelers!5e0!3m2!1sen!2sus!4v1417765158826');
            }
        ]);

})();
