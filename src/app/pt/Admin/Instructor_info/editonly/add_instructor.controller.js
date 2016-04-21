/**
 * Created by jpathak2 on 3/7/16.
 */
(function () {
    'use strict';

    angular
        .module('pt.Admin')
        .controller('InstructorAddController', fnCtrl);

    /* @ngInject */
    function fnCtrl($state,breezeService,instructorService) {
        var vm = this;

        vm.backbutton=backbutton;

        vm.myfunc = function myfunc(instructorInfo) {
            var formData = instructorInfo.data;

            var data = {
                Name: formData.instructor.Name,
                Style: formData.instructor.style,
                isopen:false,
                students:null
                        }


            breezeService.createEntity('Instructor', data);
            //uploadFiles(formData.instructor.file)
            instructorService.a.push(data);
        }



        function uploadFiles(files) {
            Upload.upload({
                    url: 'http://localhost:60305/breeze/home/',
                    data: { file: files }
                })
                .then(function(response) {
                    console.log(response)


                }, function(err) {
                    console.log(err)
                });


        }



        function backbutton() {
            $state.go("triangular-no-scroll.admin-default-no-scroll.instructor.insDetails");
        }



    }
})();
