define([
    'restConfig',    
], function(restConfig){
    
    function headerSrv(Restangular){
        Restangular = restConfig(Restangular);
        
        function getUser(){
            return Restangular.one('/account/user').customGET();
        }
        
        return {
           getUser : getUser
        };              
    }    
    
    return headerSrv;
});
