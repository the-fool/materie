(function () {
    'use strict';

    angular
        .module('pt.Admin')
        .controller('InstructorController', fnCtrl);


    function fnCtrl(breezeService,$scope, $state,$mdMedia,$mdDialog,$rootScope,$window,excelService) {
        var vm = this;
        vm.getDetail = getDetail;
        vm.Add_instructor=Add_instructor;

        vm.export = exportToExcel;

        function exportToExcel()
        {
            excelService.setRangeValues("A4:C5", "jay").then(function(data){
                console.log(data);
            }).catch(function (err) {
                console.log(err);
            }).finally(function () {
                console.log("done");
            });
        }

        function Add_instructor()
        {
            $state.go("triangular-no-scroll.admin-default-no-scroll.instructor.insAdd");
        }


        function getDetail(item)
        {
            vm.isViewMobile = $mdMedia('xs');
            $state.go("triangular-no-scroll.admin-default-no-scroll.instructorList.read",
                {
                id: item.Id
            });

        }
        //private
        function init() {
            vm.windowHeight = $window.innerHeight - 70 ;
            $rootScope.$emit('startProcess')
            breezeService.getEntities('instructors',"","Instructor").then(function (data) {
                if(data.results)
                {
                    vm.items = data.results;
                }
                else {
                    vm.items = data;
                }

                $rootScope.$emit('endProcess')
            });
        }

        init();
        $scope.$on('backbutton', openlist);
        function openlist()
        {
            vm.isViewMobile = false;
            $state.go("triangular-no-scroll.admin-default-no-scroll.instructorList");
        }

    }
})();
