/**
 * Created by jpathak2 on 3/7/16.
 */
(function () {
    'use strict';

    angular
        .module('pt.Admin')
        .controller('studentEditController', fnCtrl);

    /* @ngInject */
    function fnCtrl($state) {
        var vm = this;


        vm.backbutton=backbutton;





        function backbutton() {
            $state.go("triangular-no-scroll.admin-default-no-scroll.student.studentDetails",{id:23});
        }





    }
})();
