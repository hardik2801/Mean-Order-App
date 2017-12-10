define([
    'productsSrv',
], function (productsSrv){
    
    function ctrl(Restangular, $uibModalInstance, $window, product){        
        var vm = this;
        
        var productsHelper = productsSrv(Restangular);
        
        console.log(product, "product");

        vm.cancel = function (){
            $uibModalInstance.dismiss();
        };
    }

    return ctrl;
});