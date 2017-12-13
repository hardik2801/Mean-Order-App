define([
    'productsSrv',
], function (productsSrv){
    
    function ctrl(Restangular, $uibModalInstance, $window, product, mainCart){        
        var vm = this;
        
        var productsHelper = productsSrv(Restangular);

        var $cookies;
        angular.injector(['ngCookies']).invoke(['$cookies', function(_$cookies_) {
          $cookies = _$cookies_;
        }]);

        var user = $cookies.get("OrderAppUser");
        if(!user) {
            $state.go('login');    
        }
        vm.product = product;
        vm.selectSize = function(size) {
            $uibModalInstance.dismiss();
        };



        vm.cancel = function (){
            $uibModalInstance.dismiss();
        };
    }

    return ctrl;
});