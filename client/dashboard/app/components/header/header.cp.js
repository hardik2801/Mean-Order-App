define([
    'headerCtrl',
    'staticRequire'
], function(headerCtrl, staticRequire){
    return {
        templateUrl : staticRequire.getHtml('header'),
        controller : headerCtrl,
        controllerAs: 'headerCtrl'
    };
});