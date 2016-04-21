(function() {
    'use strict';

    angular
        .module('pt.Admin')
        .config(moduleConfig);

    /* @ngInject */
    function moduleConfig($translatePartialLoaderProvider, $stateProvider, triMenuProvider,$authProvider) {
        $translatePartialLoaderProvider.addPart('app/pt/Admin');

        $stateProvider

            .state('triangular-no-scroll.admin-default-no-scroll.instructorList', {
                url: '/Admin/instructor/',
                templateUrl: 'app/pt/Admin/instructor_info/list/instructorList.tmpl.html',
                controller: 'InstructorController',
                controllerAs: 'vm'
            })
            .state('triangular-no-scroll.admin-default-no-scroll.instructorList.read', {
                url: 'readOnly/:id',
                templateUrl: 'app/pt/Admin/instructor_info/readonly/instructorRead.tmpl.html',
                controller: 'InstructorReadController',
                controllerAs: 'vm'
            })
            .state('triangular-no-scroll.admin-default-no-scroll.instructor.insEdit', {
                url: 'edit/:id',
                templateUrl: 'app/pt/Admin/instructor_info/instructorEdit.tmpl.html',
                controller: 'InstructorEditController',
                controllerAs: 'vm'
            })
            .state('triangular-no-scroll.admin-default-no-scroll.instructor.insAdd', {
                url: 'add/',
                templateUrl: 'app/pt/Admin/instructor_info/add_instructor.tmpl.html',
                controller: 'InstructorAddController',
                controllerAs: 'vm'
            })



            .state('triangular-no-scroll.admin-default-no-scroll.student', {
                url: '/Admin/student',
                templateUrl: 'app/pt/Admin/student_info/student.tmpl.html',
                controller: 'studentController',
                controllerAs: 'vm'
            })
            .state('triangular-no-scroll.admin-default-no-scroll.student.studentDetails', {
                url: 'readOnly/:id',
                templateUrl: 'app/pt/Admin/student_info/studentDetails.tmpl.html',
                controller: 'studentDetailsController',
                controllerAs: 'vm'
            })
            .state('triangular-no-scroll.admin-default-no-scroll.student.studentEdit', {
                url: 'edit/:id',
                templateUrl: 'app/pt/Admin/student_info/studentEdit.tmpl.html',
                controller: 'studentEditController',
                controllerAs: 'vm'
            })



            .state('triangular-no-scroll.admin-default-no-scroll.timeslot', {
                url: '/Admin/timeslot/',
                templateUrl: 'app/pt/Admin/Timeslot_info/timeslot.tmpl.html',
                controller: 'TimeslotController',
                controllerAs: 'vm'
            })
            .state('triangular-no-scroll.admin-default-no-scroll.timeslot.timeDetails', {
                url: '/Details/:id/',
                templateUrl: 'app/pt/Admin/Timeslot_info/timeslot_Details.tmpl.html',
                controller: 'TimeslotDetailsController',
                controllerAs: 'vm'
            })
            .state('triangular-no-scroll.admin-default-no-scroll.timeslot.addDetails',
                {
                    url: 'add/:id',
                    templateUrl: 'app/pt/Admin/Timeslot_info/add_timeslot.tmpl.html',
                    controller: 'timeslotAddController',
                    controllerAs: 'vm'
                })



            .state('triangular-no-scroll.admin-default-no-scroll.location', {
                url: '/Admin/location/',
                templateUrl: 'app/pt/Admin/Location_info/location.tmpl.html',
                controller: 'LocationController',
                controllerAs: 'vm'
            })
            .state('triangular-no-scroll.admin-default-no-scroll.location.locDetails',
                {
                    url: 'Details/:id',
                    templateUrl: 'app/pt/Admin/Location_info/location_Details.tmpl.html',
                    controller: 'LocationDetailsController',
                    controllerAs: 'vm'
                })
            .state('triangular-no-scroll.admin-default-no-scroll.location.addDetails',
                {
                    url: 'add/:id',
                    templateUrl: 'app/pt/Admin/Location_info/add_location.tmpl.html',
                    controller: 'locationAddController',
                    controllerAs: 'vm'
                })


        triMenuProvider.addMenu({
            name: 'Admin',
            icon: 'zmdi zmdi-view-list-alt',
            type: 'dropdown',
            priority: 1.5,
            children: [{
                name: 'Instructor',
                state: 'triangular-no-scroll.admin-default-no-scroll.instructorList',
                icon: 'zmdi zmdi-account-box',
                type: 'link'
            },{
                name: 'student_information',
                state: 'triangular-no-scroll.admin-default-no-scroll.student',
                icon: 'zmdi zmdi-library',
                type: 'link'
            },{
                name: 'Location',
                state: 'triangular-no-scroll.admin-default-no-scroll.location',
                icon: 'zmdi zmdi-globe-alt',
                type: 'link'
            },{
                name: 'Timeslot',
                state: 'triangular-no-scroll.admin-default-no-scroll.timeslot',
                icon: 'zmdi zmdi-time',
                type: 'link'
            }]
        });

        //triMenuProvider.addMenu({
        //    name: 'Admin',
        //    icon: 'zmdi zmdi-view-list-alt',
        //    type: 'dropdown',
        //    priority: 1.5,
        //    children: [{
        //        name: 'Instructor',
        //        state: 'triangular-no-scroll.admin-default-no-scroll.instructor',
        //        icon: 'zmdi zmdi-account-box',
        //        type: 'link'
        //    },{
        //        name: 'student_information',
        //        state: 'triangular.admin-default.student_information',
        //        icon: 'zmdi zmdi-library',
        //        type: 'link'
        //    },{
        //        name: 'blank-3',
        //        state: 'triangular.admin-default.extra-blank',
        //        icon: 'zmdi zmdi-view-list-alt',
        //        type: 'link'
        //    }]
        //});

        $authProvider.facebook({
            clientId: '255268371341858'

        });

    }
})();
