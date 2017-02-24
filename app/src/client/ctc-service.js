(function() {
    'use strict';

    angular.module('ctc.ctc-service', [
        'ctc.ctc-resource'
    ])

        .factory('CtcService', [
            '$http',
            'CtcResource',
            function($http, CtcResource) {
                function login(password) {
                    var params = {
                        password: password
                    };

                    return CtcResource.login(params).$promise;
                }

                function getItems(args) {
                    var params = {
                            args: args
                        };

                    return CtcResource.query(params).$promise;
                }

                function getItem(itemId, args) {
                    var params = {
                        itemId: itemId,
                        args: args
                    };

                    return CtcResource.get(params).$promise;
                }

                function saveItem(item) {
                    var params = {
                        id: item.id,
                        images: item.images,
                        category: item.category,
                        color: item.color,
                        clarity: item.clarity,
                        certification: item.certification,
                        shape: item.shape,
                        weight: parseFloat(item.weight),
                        price: parseFloat(item.price).toFixed(2),
                        onSale: item.onSale
                    };

                    if (item.onSale) {
                        params.salePrice = parseFloat(item.salePrice).toFixed(2);
                    }

                    return CtcResource.save(params).$promise;
                }

                function deleteItem(item) {
                    return $http({
                        method: 'DELETE',
                        url: '/api/items',
                        data: {
                            id: item.id,
                            images: item.images
                        },
                        headers: {
                            'Content-Type': 'application/json;charset=utf-8'
                        }
                    });
                }

                function deleteImage(image) {
                    return $http({
                        method: 'DELETE',
                        url: '/api/items/image',
                        data: {
                            file: image
                        },
                        headers: {
                            'Content-Type': 'application/json;charset=utf-8'
                        }
                    });
                }

                return {
                    login: login,
                    getItems: getItems,
                    getItem: getItem,
                    saveItem: saveItem,
                    deleteItem: deleteItem,
                    deleteImage: deleteImage
                };
            }
        ]);

})();
