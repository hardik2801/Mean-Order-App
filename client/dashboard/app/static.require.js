define([
    
    ], function() {
    
        var baseUrl = '/app/';
    
        var html = {
            //modules
            'login'     :   'modules/login/login.html',
            'products'  :   'modules/products/products.html',
            'openModal' :   'modules/modals/openModal.html',
    
            //components
            'header'    : 'components/header/header.html',
            'footer'    : 'components/footer/footer.html',
            
    
        };
    
        function getHtml(alias) {
            if(html[alias]) {
                return baseUrl + html[alias];
            } else {
                return null;
            }
        }
    
        return {
            getHtml : getHtml
        };
    });