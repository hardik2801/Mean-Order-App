define([
    'ordersCtrl',
    'staticRequire',    
], function(ordersCtrl, staticRequire){
    return {
        templateUrl : staticRequire.getHtml('orders'),
        controller : ordersCtrl,
        controllerAs : 'ordersCtrl'
    };
});