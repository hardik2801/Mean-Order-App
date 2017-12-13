define([
    'staticRequire',
    'cartSrv',
    'openModalCtrl'
], function (staticRequire, cartSrv, openModalCtrl) {

    function cartCtrl($state, $stateParams, $uibModal, Restangular, $scope, mainCart) {
        var vm = this;
        var cartHelper = cartSrv(Restangular);    
        
        var $cookies;
        angular.injector(['ngCookies']).invoke(['$cookies', function(_$cookies_) {
          $cookies = _$cookies_;
        }]);

        var user = $cookies.get("OrderAppUser");
        if(!user) {
            $state.go('login');    
        }
        vm.noCustomer = true;
        vm.customer= false;
        vm.addCustomer = false;

        vm.createOrder = function() {
            cartHelper.createOrder(vm.mainCart, vm.customer).then(function(response) {
                if(!response.status) {
                    console.log(response);
                    return;
                } else {
                    $state.go('home.orders');
                }
            });
        };

        vm.removeProduct = function(product) {
            productNo = vm.mainCart.findIndex(i => i._id == product._id);
            if(vm.mainCart[productNo].quantity > 1) {
                vm.mainCart[productNo].quantity--;
                vm.subtotal -= product.price +(product.price*5/100);
                vm.productsQuant--;
            }
            else {
                vm.mainCart.splice(productNo, 1);
                vm.subtotal -= product.price +(product.price*5/100);
                vm.productsQuant--;
            }
            if(vm.mainCart.length < 1) {
                vm.noProducts = true;
            }
        };


        vm.addCust = function() {
            vm.addCustomer= true;
        };

        vm.submitCustomer = function() {
            cartHelper.addCustomer(vm.customer).then(function(response) {
                if(!response.status) {
                    vm.saveCustErr = true;
                    console.log(response);
                    return false;
                }
                else {
                    vm.customer = response.data;
                    vm.noCustomer=  false;
                    vm.addCustomer = false;
                    console.log(vm.customer, "saved customer");
                }
            });
        };

        vm.mainCart = mainCart.val;
        if(!vm.mainCart || vm.mainCart == null) {
            vm.noProducts = true;
        } else {
            var subtotal = 0;
            var productsQuant = 0
            vm.mainCart.forEach(function(item) {
                subtotal += item.price * item.quantity;
                productsQuant += item.quantity;
            });
            vm.subtotal = subtotal + (subtotal*5/100);
            vm.productsQuant = productsQuant;
            vm.noProducts = false;
        }
   
    vm.currentState = $state.current.url.substring(1);
    
    }

    

    cartCtrl.$inject = ['$state', '$stateParams', '$uibModal', 'Restangular', '$scope', 'mainCart'];

    return cartCtrl;
});
