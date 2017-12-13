define([
    'restConfig',
], function (restConfig) {

    function productsSrv(Restangular) {
     Restangular = restConfig(Restangular);

     var productsHelper = Restangular.all('products');
        function getAllProducts() {
            return productsHelper.one('getAll').get('');
        }


     return {
        getAllProducts : getAllProducts
     };
       
    }

    return productsSrv;
});