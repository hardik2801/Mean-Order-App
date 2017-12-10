define([
    'productsCtrl',
    'staticRequire',    
], function(productsCtrl, staticRequire){
    return {
        templateUrl : staticRequire.getHtml('products'),
        controller : productsCtrl,
        controllerAs : 'productsCtrl'
    };
});