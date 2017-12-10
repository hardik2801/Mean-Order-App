define([
    'loginModule',
    'productsModule'
], function(loginModule, productsModule) {
    return {
        login : loginModule,
        products : productsModule
    };
});