
requirejs.config({
    baseUrl : '',

    paths : {
        // Bower Components
        'angular'            : 'bower_components/angular/angular.min',
        'angularAMD'         : 'bower_components/angularAMD/angularAMD.min',
        'ui-router'          : 'bower_components/angular-ui-router/release/angular-ui-router.min',
        'ui.bootstrap'		 : 'bower_components/angular-bootstrap/ui-bootstrap-tpls.min',
        'restangular'        : 'bower_components/restangular/dist/restangular.min',
        'lodash'             : 'bower_components/lodash/lodash',
        'angular-cookies'    : 'bower_components/angular-cookies/angular-cookies.min',
        
        // Main File and Router
        'app'                : 'app/main',
        'routes'             : 'app/routes',
        'staticRequire'      : 'app/static.require',

        // Factories
        'compFactory'        : 'app/components/component.factory',
        'moduleFactory'      : 'app/modules/module.factory' ,
        'restConfig'         : 'app/config/restConfig',
        'dirFactory'         : 'app/directives/directive.factory',

        // Controllers
        'loginCtrl'          : 'app/modules/login/login.ctrl', 
        'productsCtrl'       : 'app/modules/products/products.ctrl', 
        'headerCtrl'         : 'app/components/header/header.ctrl',
        'footerCtrl'         : 'app/components/footer/footer.ctrl',
        'openModalCtrl'      : 'app/modules/modals/openModal.ctrl',
        'cartCtrl'           : 'app/modules/cart/cart.ctrl',
        'ordersCtrl'         : 'app/modules/orders/orders.ctrl',

        //Modal controllers

        // Services
        'loginSrv'           : 'app/modules/login/login.srv',
        'productsSrv'        : 'app/modules/products/products.srv',
        'headerSrv'          : 'app/components/header/header.srv',
        'footerSrv'          : 'app/components/footer/footer.srv',
        'cartSrv'            : 'app/modules/cart/cart.srv',
        'ordersSrv'          : 'app/modules/orders/orders.srv',


        // Modules
        'loginModule'        : 'app/modules/login/login.md',
        'productsModule'     : 'app/modules/products/products.md',
        'cartModule'         : 'app/modules/cart/cart.md',
        'ordersModule'       : 'app/modules/orders/orders.md',

        //Components
        'headerComp'         : 'app/components/header/header.cp',
        'footerComp'         : 'app/components/footer/footer.cp',


        // Directives

    },

    shim : {
        'angular' : {
            exports : 'angular'
        },
        'restangular'   : ['angular', 'lodash'],
        'ui-router' : ['angular'],
        'angularAMD' : ['angular'],
        'ui.bootstrap'  : ['angular'],
        'angular-cookies' :['angular'],
        'ngCart' : ['angular'],
        'app' : ['angular', 'ui-router','restangular','angularAMD','ui.bootstrap', 'angular-cookies']
    },

    deps : ['app']
});
