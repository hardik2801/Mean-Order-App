define([
    'moduleFactory',
    'compFactory',
    'staticRequire',
], function (moduleFactory, compFactory, staticRequire) {

    function routes($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');
        $stateProvider
            .state('home', {
                // abstract : true,
                url : '',
                views : {
                    'header' : {
                        templateUrl : compFactory.header.templateUrl,
                        controller : compFactory.header.controller,
                        controllerAs : compFactory.header.controllerAs,
                    },
                    'footer' : {
                        templateUrl : compFactory.footer.templateUrl,
                        controller : compFactory.footer.controller,
                        controllerAs : compFactory.footer.controllerAs,
                    },
                    'content' : {
                        template : '<div ui-view="layout" class="container content-container"></div>'
                    }
                }
            })
            .state('home.products', {
                url : '/products',
                views : {
                    'layout@home' : {
                        templateUrl : moduleFactory.products.templateUrl,
                        controller : moduleFactory.products.controller,
                        controllerAs : moduleFactory.products.controllerAs
                    }
                }
            })
            .state('login', {
                url : '/login',
                views : {
                    'content' : {
                        templateUrl : moduleFactory.login.templateUrl,
                        controller : moduleFactory.login.controller,
                        controllerAs : moduleFactory.login.controllerAs
                    }
                }
            })
            .state('home.cart', {
                url : '/cart',
                views : {
                    'layout@home' : {
                        templateUrl : moduleFactory.cart.templateUrl,
                        controller : moduleFactory.cart.controller,
                        controllerAs : moduleFactory.cart.controllerAs
                    }
                }
            })
            .state('home.orders', {
                url : '/orders',
                // abstract : true,
                views : {
                    'layout@home' : {
                        templateUrl : moduleFactory.orders.templateUrl,
                        controller : moduleFactory.orders.controller,
                        controllerAs : moduleFactory.orders.controllerAs
                    }
                }
            });
    }

    routes.$inject = ['$stateProvider', '$urlRouterProvider'];

    return routes;
});


