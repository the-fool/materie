(function () {
    'use strict';

    angular
        .module('pt.Admin')
        .controller('studentController', fnCtrl);


    function fnCtrl(breezeService,$scope, $state,$mdMedia,$mdDialog,$rootScope) {
        var vm = this;
        vm.images = [];
        vm.getDetail = getDetail;
        vm.getImage = getImage;

        function getDetail(test)
        {
            vm.isViewMobile = $mdMedia('xs');
            $state.go("triangular-no-scroll.admin-default-no-scroll.student.studentDetails",
                {
                    id: test.Id
                });

        }

        function getImage(studentId)
        {
            var obj = vm.images.filter(function ( image ) {
                return image.studentId === studentId;
            })[0];

            return  "data:image/jpeg;base64," + obj.Image;
        }





        function init()
        {
            $rootScope.$emit('startProcess')
            breezeService.getEntities('students',"","Student_Registration").then(function (data) {
                if(data.results)
                {
                    vm.items = data.results;
                }
                else {
                    vm.items = data;
                }


                breezeService.getEntities('Images',"","ImageTable").then(function (data) {
                    if(data.results)
                    {
                        vm.images = data.results;
                    }
                    else {
                        vm.images = data;
                    }

                    $rootScope.$emit('endProcess')
                });

            });


        }

        init();

        function openlist()
        {
            vm.isViewMobile = false;
            $state.go("triangular-no-scroll.admin-default-no-scroll.student");
        }

        $scope.$on('closeItem', openlist);





    }
})();
