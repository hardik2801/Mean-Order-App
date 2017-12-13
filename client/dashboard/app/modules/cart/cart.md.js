define([
    'cartCtrl',
    'staticRequire',    
], function(cartCtrl, staticRequire){
    return {
        templateUrl : staticRequire.getHtml('cart'),
        controller : cartCtrl,
        controllerAs : 'cartCtrl'
    };
});