(function () {
    'use strict';

    angular
        .module('pt.student')
        .controller('Controller', fn);

    /* @ngInject */
    function fn( $scope,  $mdToast,  breezeService,Upload,$rootScope) {
        var vm = this;
        vm.data = {};

        vm.submit = submit;




        function submit(studentInfo) {

            $rootScope.$emit('startProcess')
            var formData = studentInfo.data;

            var data = {
                firstName: formData.student.firstName,
                lastName: formData.student.lastName,
                gender: formData.student.Gender,
                email: formData.student.email,
                dob: formData.student.dob,
                ContactNo: formData.student.phno,
                address: formData.address.line1,
                City: formData.address.town,
                zip: parseInt(formData.address.zip),
                state: formData.address.State,
                country: formData.address.country,
                InstructorId: parseInt(formData.confirm.instuctor),
                locationId: parseInt(formData.confirm.location),
                TimeslotId: parseInt(formData.confirm.timeslot)
            }
            breezeService.createEntity('Student_Registration', data).then(function (data) {
                var entityId = data.entities[0].Id;
                uploadFiles(formData.student.file, entityId);
            });
        }

        function init()
        {
            $rootScope.$emit('startProcess')
            breezeService.getEntities('TimeSlot',"","TimeSlot").then(function (data) {
                if(data.results)
                {
                    vm.data.timeslot = data.results;
                }
                else {
                    vm.data.timeslot = data;
                }

                $rootScope.$emit('endProcess')
            });
            $rootScope.$emit('startProcess')
            breezeService.getEntities('instructors',"","Instructor").then(function (data) {
                if(data.results)
                {
                    vm.data.instructor = data.results;
                }
                else {
                    vm.data.instructor = data;
                }

                $rootScope.$emit('endProcess')
            });
            $rootScope.$emit('startProcess')
            breezeService.getEntities('location',"","location").then(function (data) {
                if(data.results)
                {
                    vm.data.location = data.results;
                }
                else {
                    vm.data.location = data;
                }

                $rootScope.$emit('endProcess')
            });
        }

        function uploadFiles(files, entityId) {
            Upload.upload({
                url: 'http://w2idemo.azurewebsites.net/breeze/home/Upload',
                data: {
                    file: files,
                    entityId: entityId
                }
            })
                .then(function (response) {
                    $rootScope.$emit('endProcess')


                }, function (err) {
                    $rootScope.$emit('endProcess')
                });
        }

        //todo:put it on vm
        $scope.myDate = new Date();
        $scope.minDate = new Date(
            $scope.myDate.getFullYear(),
            $scope.myDate.getMonth() - 2,
            $scope.myDate.getDate());
        $scope.maxDate = new Date(
            $scope.myDate.getFullYear(),
            $scope.myDate.getMonth() + 2,
            $scope.myDate.getDate());
        $scope.onlyWeekendsPredicate = function (date) {
            var day = date.getDay();
            return day === 0 || day === 6;
        }

        init();
    }
})();
