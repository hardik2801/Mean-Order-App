define([
    'restConfig',
], function (restConfig) {

    function productsSrv(Restangular) {
     Restangular = restConfig(Restangular);

     var productsHelper = Restangular.all('products');

    //  function authenticateUser(email, passwd) {
    //      return loginHelper.one('login').customGET('', {email: email, password: passwd});
    //  }
        function getAllProducts() {
            return productsHelper.one('getAll').get('');
        }


     return {
        getAllProducts : getAllProducts
     };
       
    }

    return productsSrv;
});