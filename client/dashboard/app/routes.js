define([
    'moduleFactory',
    'compFactory',
    'staticRequire',
], function (moduleFactory, compFactory, staticRequire) {

    function routes($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');
        $stateProvider
            // .state('home', {
            //     // abstract: true,
            //     url: '',
            //     views: {
            //         'content' : {
            //             templateUrl : moduleFactory.login.templateUrl,
            //             controller : moduleFactory.login.controller,
            //             controllerAs : moduleFactory.login.controllerAs
            //         }
            //     }
            // });
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
                        // template : '<div ui-view="layout" class="container content-container"></div>'
                        // templateUrl : moduleFactory.login.templateUrl,
                        // controller : moduleFactory.login.controller,
                        // controllerAs : moduleFactory.login.controllerAs

                        templateUrl : moduleFactory.products.templateUrl,
                        controller : moduleFactory.products.controller,
                        controllerAs : moduleFactory.products.controllerAs
                    }
                }
            })
            .state('home.products', {
                url : '/products',
                // abstract : true,
                views : {
                    'content' : {
                        templateUrl : moduleFactory.products.templateUrl,
                        controller : moduleFactory.products.controller,
                        controllerAs : moduleFactory.products.controllerAs
                    }
                }
            })
            .state('home.login', {
                url : '/login',
                // abstract : true,
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
                // abstract : true,
                views : {
                    'content' : {
                        templateUrl : moduleFactory.login.templateUrl,
                        controller : moduleFactory.login.controller,
                        controllerAs : moduleFactory.login.controllerAs
                    }
                }
            })
            .state('home.orders', {
                url : '/orders',
                // abstract : true,
                views : {
                    'content' : {
                        templateUrl : moduleFactory.login.templateUrl,
                        controller : moduleFactory.login.controller,
                        controllerAs : moduleFactory.login.controllerAs
                    }
                }
            });
            // .state('home.orders', {
            //     url : '/influencers/:id', //:id
            //     abstract : true,
            //     views : {
            //         'layout@home' : {
            //             templateUrl : moduleFactory.deepdive.templateUrl,
            //             controller : moduleFactory.deepdive.controller,
            //             controllerAs : moduleFactory.deepdive.controllerAs,
            //         }
            //     }
            // })
            // .state('home.checkout', {
            //     url : '/influencers/:id', //:id
            //     abstract : true,
            //     views : {
            //         'layout@home' : {
            //             templateUrl : moduleFactory.deepdive.templateUrl,
            //             controller : moduleFactory.deepdive.controller,
            //             controllerAs : moduleFactory.deepdive.controllerAs,
            //         }
            //     }
            // });
            
    }

    routes.$inject = ['$stateProvider', '$urlRouterProvider'];

    return routes;
});


