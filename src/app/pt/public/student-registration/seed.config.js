(function() {
    'use strict';

    angular
        .module('pt.student')
        .config(moduleConfig);

    /* @ngInject */
    function moduleConfig($translatePartialLoaderProvider, $stateProvider, triMenuProvider) {
        $translatePartialLoaderProvider.addPart('app/student');

        $stateProvider
        .state('triangular.admin-default.student', {
            url: '/student',
            templateUrl: 'app/pt/public/student-registration/student.tmpl.html',
            // set the controller to load for this page
            controller: 'Controller',
            controllerAs: 'vm'
        });

        triMenuProvider.addMenu({
            name: 'Student Registration',
            icon: 'zmdi zmdi-account-box',
            priority: 1.3,
                state: 'triangular.admin-default.student',
                type: 'link'
        });
    }
})();
