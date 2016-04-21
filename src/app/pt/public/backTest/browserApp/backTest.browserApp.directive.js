(function(){
  'use strict'
  angular

  .module('pt.backTest')
  .directive('browserApp', browserApp)


  function browserApp(d3Service, browserService, $rootScope){
    return {
      templateUrl: 'app/pt/public/backTest/browserApp/backtest.browserApp.html',
      restrict: "E",
      scope: {
        firstQuery: "=",
        queryObj: "=",
        data: "="
      },
      link: function(scope, el ,attrs){
            //hooks landing button up to controller,
            //when user clicks btuton, fires event to controller to fire API call
              scope.makeQuery = function(requestObject){
                scope.$emit('makeQuery', requestObject)
              }
              //so i dont have to refill the query form every time
              scope.fillForm = function(){
                  scope.queryObj = browserService.queries.coveredCall;
              }

              /// any time new data comes in, make new "mainContent" object,
              //so that main content can show totals
             scope.$watch(function(){return scope.data}, function(n,o){

                       if(n){
                           scope.isDisplaying = {};
                           scope.showingInMainContent = [];
                           scope.stockList = []
                           var i = 0;
                           for(var key in n){
                               scope.showingInMainContent.push(++i)
                               scope.stockList.push({symbol:n[key].symbol, checked: true})
                           }

                           configureAndPassData(n, scope.showingInMainContent)
                           for(var key in scope.mainContent.chartData){
                              scope.isDisplaying[key] = "changePL"
                           }
                       }
                     })
          /////////private function
             function configureAndPassData(data, arr){
               scope.mainContent = browserService.configureTotal(data, arr)
               console.log(scope.mainContent);
               d3.select('main-chart')
                  .attr('content-data', scope.mainContent )
             }

            //when user checks or unchecks a leg, readjust all the data and pass it on down
             scope.$on('chartSymbolArrayChange', function(e, data){
                configureAndPassData(scope.data, data)
             })


             scope.legOptions = ['openPL', 'price', 'netValue']

             scope.highlightLeg = function(id){
               $rootScope.$broadcast('enteringLeg', id)
             }

      }
    }
  }
})()
