(function(){

  angular
      .module('pt.backTest')
      .directive('mainChart', function(chartService){
        return {
          scope: {
            contentData: "="
          },
          link: function(scope, el, attrs){


            scope.$watch('contentData', function(n,o){
              if(n && !o){
                chartService.renderMainChart(n)
              }else{
                chartService.updateMainChart(n)
              }






            })










          }
        }
      })
})()
