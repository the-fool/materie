(function () {
    'use strict';

    angular
        .module('pt.team')
        .controller('teamListController', fn);
    /* @ngInject */
    function fn(breezeService,$state,$rootScope) {
         var vm = this;
         //Controller Interface
         vm.getDetail = getDetail;
         //Implementation starts here
        function getDetail(id) {
            $state.go("triangular.admin-default.teamList.teamDetail", {
                id: id
            });
        }

        //private
        function init() {
            $rootScope.$emit('startProcess')
            breezeService.getEntities('instructors',"","Instructor").then(function (data) {
                if(data.results)
                {
                    vm.items = data.results;
                }
                else {
                    vm.items = data;
                }

                $rootScope.$emit('endProcess')
            });
        }


        init();
    }
})();
