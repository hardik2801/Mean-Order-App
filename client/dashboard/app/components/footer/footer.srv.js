define([
    'restConfig',    
], function(restConfig){
    
    function footerSrv(Restangular){
        Restangular = restConfig(Restangular);
        
        // function getUser(){
        //     return Restangular.one('/account/user').customGET();
        // }
        
        return {
        //    getUser : getUser
        };              
    }    
    
    return footerSrv;
});
