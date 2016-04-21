/**
 * Created by Admin on 3/7/2016.
 */
(function () {
    'use strict';

    angular
        .module('pt.Admin')
        .controller('TimeslotController', fnCtrl);

    /* @ngInject */
    function fnCtrl($mdMedia,$state, breezeService,$scope)
    {
        var vm = this;
        vm.getDetail = getDetail;
        vm.add_timeslot=add_timeslot;


        function openlist()
        {
            vm.isViewMobile = false;
            $state.go("triangular-no-scroll.admin-default-no-scroll.timeslot");
        }
        function add_timeslot()
        {
            $state.go("triangular-no-scroll.admin-default-no-scroll.timeslot.addDetails");
        }

        function getDetail(test)
        {
            vm.isViewMobile = $mdMedia('xs');
            $state.go("triangular-no-scroll.admin-default-no-scroll.timeslot.timeDetails",
                {
                    id: test.id
                });

        }

        breezeService.getEntities('timeslot').then(function (data)
        {
            vm.items = data.results;
        });

        $scope.$on('backbutton', openlist);
    }



})();
