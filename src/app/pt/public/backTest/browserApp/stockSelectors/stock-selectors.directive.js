(function(){

  'use strict'

  angular
      .module('pt.backTest')
      .directive('stockSelectors', function(){
        return {
          scope: {
            legSet : "=",
          },
          templateUrl: 'app/pt/public/backTest/browserApp/stockSelectors/stock-selectors.html',
          link : function(scope, el, attrs){

              scope.reconfigureSymbols = function(e, i){
                  var indexArray = [];
                  scope.legSet.map(function(stock, index){
                    if(stock.checked){indexArray.push(index+1)}
                  })
                  scope.$emit('chartSymbolArrayChange', indexArray)
              }





          }
        }
      })
})()
