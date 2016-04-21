(function() {
    'use strict';

    angular
        .module('triangular.components')
        .directive('triLoader', TriLoader);

    /* @ngInject */
    function TriLoader ($rootScope) {
        var directive = {
            bindToController: true,
            controller: TriLoaderController,
            controllerAs: 'vm',
            template: '<div flex class="loader" ng-show="vm.status.active || vm.process.active"  layout="column" layout-fill layout-align="center center"><div class="loader-inner"><md-progress-circular md-mode="indeterminate"></md-progress-circular></div><h3 class="md-headline">{{vm.appName}}</h3></div>',
            link: link,
            restrict: 'E',
            replace: true,
            scope: {
            }
        };
        return directive;

        function link($scope) {
            var loadingListener = $rootScope.$on('$viewContentLoading', function() {
                $scope.vm.setLoaderActive(true);
            });

            var loadedListener = $rootScope.$on('$viewContentLoaded', function() {
                $scope.vm.setLoaderActive(false);
            });

            var loadingStartListener = $rootScope.$on('startProcess', function() {
                $scope.vm.setProcessActive(true);
            });

            var loadedStartListener = $rootScope.$on('endProcess', function() {
                $scope.vm.setProcessActive(false);
            });

            $scope.$on('$destroy', removeListeners);

            function removeListeners() {
                loadingListener();
                loadedListener();

                loadingStartListener();
                loadedStartListener();
            }
        }
    }

    /* @ngInject */
    function TriLoaderController (triLoaderService, triSettings) {
        var vm = this;
        vm.appName         = "Loading....";
        vm.status          = triLoaderService.status;
        vm.process         = triLoaderService.process;
        vm.setLoaderActive = triLoaderService.setLoaderActive;
        vm.setProcessActive = triLoaderService.setProcessActive;
    }
})();
