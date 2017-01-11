(function() {
    'use strict';

    angular.module('ctc.ctc-resource', [
        'ngResource'
    ])

        .constant('CtcConstant', {
            BusinessInfo: {
                name: 'CTC Jewelers',
                phone: '(415) 255-1839',
                address: {
                    line1: '101 Utah St., Suite 108',
                    line2: '(between Alameda St. and 15th St.)',
                    city: 'San Francisco',
                    state: 'CA',
                    zip: '94103'
                },
                email: 'ctc94103@yahoo.com',
                logo: '/rsrc/images/ctc.png',
                links: [
                    {
                        source: 'facebook',
                        url: 'http://www.facebook.com/CtcJewelers'
                    },
                    {
                        source: 'twitter',
                        url: 'http://twitter.com/CTCJewelers'
                    },
                    {
                        source: 'yelp',
                        url: 'http://www.yelp.com/biz/ctc-jewelers-san-francisco'
                    }
                ]
            },
            Certifications: {
                GIA: 'Gemological Institute of America',
                AGS: 'American Gem Society Laboratories',
                EGL: 'European Gemological Laboratory',
                GCAL: 'Gem Certification & Assurance Lab'
            },
            Clarities: [
                'FL',
                'IF',
                'VVS1',
                'VVS2',
                'VS1',
                'VS2',
                'SI1',
                'SI2',
                'I1',
                'I2',
                'I3'
            ],
            Colors: [
                'D',
                'E',
                'F',
                'G',
                'H',
                'I',
                'J',
                'K'
            ],
            Shapes: [
                'Asscher',
                'Cushion',
                'Emerald',
                'Heart',
                'Marquise',
                'Oval',
                'Pear',
                'Princess',
                'Radiant',
                'Round',
                'Trillion'
            ]
        })

        .factory('CtcResource', [
            '$resource',
            function($resource) {
                var url = '/api/items/:itemId',
                    params = {
                        itemId: '@itemId'
                    },
                    methods = {
                        login: {
                            method: 'POST',
                            url: '/api/login',
                            params: params
                        }
                    };

                return $resource(url, params, methods);
            }
        ]);

})();
