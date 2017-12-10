define([
    'loginCtrl',
    'staticRequire',    
], function(loginCtrl, staticRequire){
    return {
        templateUrl : staticRequire.getHtml('login'),
        controller : loginCtrl,
        controllerAs : 'loginCtrl'
    };
});