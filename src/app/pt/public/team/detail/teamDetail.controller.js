(function () {
    'use strict';

    angular
        .module('pt.team')
        .controller('teamDetailController', fn);

    /* @ngInject */
    function fn($stateParams)
    {
        var vm = this;


        function init()
        {
            vm.id = $stateParams.id;
        }

        init();
    }
})();
