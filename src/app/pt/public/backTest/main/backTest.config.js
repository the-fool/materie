(function() {
    'use strict';

    angular
        .module('pt.backTest')
        .config(moduleConfig);

    /* @ngInject */
    function moduleConfig($translatePartialLoaderProvider, $stateProvider, triMenuProvider)
    {

        $stateProvider
        .state('triangular.admin-default.backTest', {
            url: '/backTest/',
            templateUrl: 'app/pt/public/backTest/main/backTest.tmpl.html',
            controller: 'backTestController',
            controllerAs: 'vm',
            css: 'app/pt/public/backTest/main/backTest.tmpl.scss'
            })








        triMenuProvider.addMenu({
            name: 'Back-testing Demo',
            icon: 'zmdi zmdi-home',
            priority: 1.1,
                state: 'triangular.admin-default.backTest',
                type: 'link'
        });
    }


})();
