(function () {
    'use strict';
    angular
        .module('pt.backTest')
        .directive('excel', fn);

    /* @ngInject */
    function fn(qtServices, $rootScope) {



        return {
          restrict: "EA",
          templateUrl: "app/pt/public/backTest/queryTable/backTest.excel.html",
          scope: {
            queryObj: "=",
            data: "="
          },
          link: function(scope, el, attrs){

            scope.table = qtServices.Table()


            scope.sendNewQuery = function(){
              scope.$emit('makeNewQuery')
            }


            $(document).keypress(function(e){
              if(e.which == 13){
                scope.sendNewQuery(scope.queryObj);
              }
            })



            $rootScope.$on('enteringLeg', function(e,d){
              $('.highlighted').removeClass()
              $("." + d).addClass('.highlighted')
              console.log($('.highlighted'));
            })
            $rootScope.$on('leavingLeg', function(e,d){
              $("." + d).removeClass('.highlighted')
              console.log($('.highlighted'));

            })

           ;
          }
        }
    }

})();
