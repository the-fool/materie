(function () {
    'use strict';

    angular
        .module('pt.backTest')
        .controller('backTestController', fn);

    /* @ngInject */
    function fn(homemodel, $scope, $rootScope, $timeout, backTestModel) {

       $('md-sidenav').remove()

        var vm = this;
        vm.requestObject = {};
        vm.firstQuery = true;

        $scope.$on('makeQuery', function(obj){
            backTestModel.getData(vm.requestObject).then(function(data, err){
                if ( err || data.data == "no match" ) {
                  swal( 'Sorry, this is just a demo! Until the backtesting engine is built, please input a recognized query!' )
                }
                else{
                  vm.firstQuery = false;
                  vm.data = data.data

                }
            })
        })

        $scope.$on('makeNewQuery', function(e){
          backTestModel.getData(vm.requestObject).then(function(data, err){
                if ( err || data.data == "no match" ) {
                  swal( 'Sorry, this is just a demo! Until the backtesting engine is built, please input a recognized query!' )
                }
                else{
                  vm.firstQuery = false;
                  vm.data = data.data
                }
          })
        })





    }
})();
