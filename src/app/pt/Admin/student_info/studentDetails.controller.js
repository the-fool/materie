(function() {
    'use strict';

    angular
        .module('pt.Admin')
        .controller('studentDetailsController', fnCtrl);

    function fnCtrl( $stateParams,$scope, studentService,$state,breezeService) {
        var vm = this;

        vm.deleteEmail = deleteEmail;
        vm.backbutton=backbutton;
        vm.Edit_student = Edit_student;

        function Edit_student()
        {
            $state.go("triangular-no-scroll.admin-default-no-scroll.student.studentEdit",{id:23});
        }

        vm.item = studentService.getDetail($stateParams.id)[0];



        function backbutton() {
            $scope.$emit('backbutton');
        }

        function deleteEmail() {
            $scope.$emit('deleteEmail');
        }



        breezeService.getEntities('students').then(function (data) {
            vm.students = data.results;
        });
    }

})();
