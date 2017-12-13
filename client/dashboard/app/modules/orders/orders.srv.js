define([
    'restConfig',
], function (restConfig) {

    function ordersSrv(Restangular) {
     Restangular = restConfig(Restangular);

     var ordersHelper = Restangular.all('orders');

        function getAllOrders() {
            return ordersHelper.one('getAll').get('');
        }
     return {
        getAllOrders : getAllOrders
     };      
    }
    return ordersSrv;
});