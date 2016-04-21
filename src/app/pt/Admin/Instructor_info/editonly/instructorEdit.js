/**
 * Created by jpathak2 on 3/7/16.
 */
(function () {
    'use strict';

    angular
        .module('pt.Admin')
        .controller('InstructorEditController', fnCtrl);

    /* @ngInject */
    function fnCtrl($state,breezeService,$stateParams) {
        var vm = this;
            vm.myfunc=myfunc;

        vm.backbutton=backbutton;


        breezeService.getElementById('Instructor',$stateParams.id,true).then(function (data){
            wizardController.data.instructor=data.results;
        });

        function myfunc(instructorinfo)
        {
            var changedata=breezeService.getChanges(instructorinfo);
            for(i=0;i<changedata.length;i++)
            {changedata.entityAspect.acceptChanges();}

        }



            function backbutton() {
            $state.go("triangular-no-scroll.admin-default-no-scroll.instructor.insDetails");

            }





    }
})();
