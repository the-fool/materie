/**
 * Created by jpathak2 on 3/7/16.
 */
(function () {
    'use strict';

    angular
        .module('pt.Admin')
        .controller('locationAddController', fnCtrl);

    /* @ngInject */
    function fnCtrl($state,breezeService,locationService,$mdDialog) {
        var vm = this;
        vm.backbutton=backbutton;
        vm.cancel=cancel;
        function cancel()
        {
            $mdDialog.cancel();
        }
        vm.myfunc = function myfunc(LocationInfo) {
            var formData = LocationInfo.data;

            var data = {
                title: formData.location.title
            }


            breezeService.createEntity('location', data);
            //uploadFiles(formData.instructor.file)
            locationService.a.push(data);
        }



        function backbutton() {
            $state.go("triangular-no-scroll.admin-default-no-scroll.instructor.locDetails",{id:23});
        }





    }
})();
