(function(){
  'use strict'
  angular
      .module('pt.backTest')
      .directive('dailyPlChart', function(chartService, $rootScope){
            return {
              scope: {
                data: "=",
                isDisplaying: "=",
                tag: "="
              },
              templateUrl: 'app/pt/public/backTest/browserApp/dailyPLChart/dailyPLChart.html',
              link: function(scope, el, attrs){


                  scope.$watch('data', function(n,o){
                    if(n) {
                       var parent = angular.element(el).parent().attr('id');
                        chartService.renderLegChart( n, parent, scope.isDisplaying )
                    }
                  })








              }
          }
      })
})()
