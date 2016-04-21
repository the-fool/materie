(function () {
    'use strict';

    angular
        .module('pt.team')
        .config(moduleConfig);

    /* @ngInject */
    function moduleConfig($translatePartialLoaderProvider, $stateProvider, triMenuProvider) {


        $stateProvider
            .state('triangular.admin-default.teamList', {
                url: '/team',
                templateUrl: 'app/pt/public/team/list/teamList.tmpl.html',
                controller: 'teamListController',
                controllerAs: 'vm'
            })
            .state('triangular.admin-default.teamList.teamDetail', {
                url: '/:id',
                templateUrl: 'app/pt/public/team/detail/teamDetail.tmpl.html',
                controller: 'teamDetailController',
                controllerAs: 'vm'
            });

        triMenuProvider.addMenu({
            name: 'Team',
            icon: 'zmdi zmdi-accounts',
            priority: 1.2,
            state: 'triangular.admin-default.teamList',
            type: 'link'

        });
    }
})();
