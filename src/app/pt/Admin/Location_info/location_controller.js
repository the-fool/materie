/**
 * Created by Admin on 3/7/2016.
 */
(function () {
    'use strict';

    angular
        .module('pt.Admin')
        .controller('LocationController', fnCtrl);

    /* @ngInject */
    function fnCtrl($scope,$mdMedia,$state, breezeService) {
        var vm = this;
        vm.getDetail = getDetail;
        vm.add_location=add_location;

        breezeService.getEntities('location').then(function (data)
        {
            vm.items = data.results;
        });
        function openlist()
        {
            vm.isViewMobile = false;
            $state.go("triangular-no-scroll.admin-default-no-scroll.location");
        }

        function add_location()
        {
            $state.go("triangular-no-scroll.admin-default-no-scroll.location.addDetails");
        }

        function getDetail(test)
        {


            vm.isViewMobile = $mdMedia('xs');
            $state.go("triangular-no-scroll.admin-default-no-scroll.location.locDetails",
                {
                    id: test.id
                });

        }

        $scope.$on('backbutton', openlist);

    }


})();
