define([
    'footerSrv'
    
], function(footerSrv) {
    'use strict';
    function footerCtrl(Restangular, $location, $window, $state, $rootScope, $cookies) {

        var vm = this;

        angular.injector(['ngCookies']).invoke(['$cookies', function(_$cookies_) {
            $cookies = _$cookies_;
          }]);

        vm.gotoCart = function() {
            $state.go('home.cart', {}, { reload: true });
        };

        vm.gotoOrders = function() {
            $state.go('home.orders', {}, { reload: true });
        };

        vm.gotoStore = function() {
            $state.go('home.products', {}, { reload: true });
        };

        // vm.testcart =localStorage.getItem('cart');
        
    }

    footerCtrl.$inject = ['Restangular',  '$location','$window', '$state', '$rootScope', '$cookies'];

    return footerCtrl;
    
});