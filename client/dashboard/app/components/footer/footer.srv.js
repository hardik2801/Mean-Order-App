define([
    'restConfig',    
], function(restConfig){
    
    function footerSrv(Restangular){
        Restangular = restConfig(Restangular);
        
        return {
        
        };              
    }    
    
    return footerSrv;
});
