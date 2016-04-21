(function() {
    'use strict';

    angular
        .module('triangular.components')
        .service('triLoaderService', LoaderService);

    /* @ngInject */
    function LoaderService() {
        var vm = this;

        vm.status = {
            active: true
        };
        vm.process = {
            active: false
        };

        vm.setLoaderActive  = setLoaderActive;
        vm.setProcessActive = setProcessActive;

        ////////////////

        function setLoaderActive(active) {
            vm.status.active = active;
        }

        function setProcessActive(active) {
            vm.process.active = active;
        }
    }
})();
