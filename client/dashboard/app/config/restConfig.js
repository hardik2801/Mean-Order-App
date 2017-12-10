define([], function(){
    
        var config = {
            baseUrl : '/api'
        };
    
        var injectConfig = function(Restangular) {
            if(config.hasOwnProperty('baseUrl')) {
                Restangular.setBaseUrl(config.baseUrl);
            }
            Restangular.addResponseInterceptor(function (data, operation, what, url, response, deferred){
                if(!data.status && data.message.toLowerCase().indexOf('unauthenticated') > -1){
                    return window.location.reload();
                }
                return data;
            });
            return Restangular;
        };
        
        return injectConfig;
    });