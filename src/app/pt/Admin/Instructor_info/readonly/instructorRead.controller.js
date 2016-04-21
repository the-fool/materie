(function () {
    'use strict';

    angular
        .module('pt.Admin')
        .controller('InstructorReadController', fnCtrl);

    function fnCtrl($stateParams, $scope, $state, breezeService) {
        var vm = this;
        vm.delete_instructor = delete_instructor;
        vm.Edit_instructor = Edit_instructor;
        vm.backbutton = backbutton;

        function delete_instructor(data) {
            breezeService.deleteinfo('Instructor', data);
            $state.go("triangular-no-scroll.admin-default-no-scroll.instructor");
        }

        function Edit_instructor() {
            $state.go("triangular-no-scroll.admin-default-no-scroll.instructor.insEdit", {id: $stateParams.id});
        }

        function backbutton() {
            $scope.$emit('backbutton');
        }
    }


})();
