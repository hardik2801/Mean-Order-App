define([
    'restConfig',
], function (restConfig) {

    function cartSrv(Restangular) {
     Restangular = restConfig(Restangular);

     var cartHelper = Restangular.all('cart');
        function createOrder(cartval, customer) {
            return cartHelper.one('createOrder').customPUT({cartObj : cartval, customer : customer});
        }

        function addCustomer(customer) {
            return cartHelper.one('addCustomer').customPUT({customer : customer});
        }
     return {
        createOrder : createOrder,
        addCustomer : addCustomer
     };
       
    }

    return cartSrv;
});