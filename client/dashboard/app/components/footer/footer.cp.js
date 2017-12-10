define([
    'footerCtrl',
    'staticRequire'
], function(footerCtrl, staticRequire){
    return {
        templateUrl : staticRequire.getHtml('footer'),
        controller : footerCtrl,
        controllerAs: 'footerCtrl'
    };
});