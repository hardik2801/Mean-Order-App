define([
    'loginModule',
    'productsModule',
    'cartModule',
    'ordersModule'
], function(loginModule, productsModule, cartModule, ordersModule) {
    return {
        login : loginModule,
        products : productsModule,
        cart : cartModule,
        orders : ordersModule
    };
});