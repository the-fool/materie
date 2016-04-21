(function() {
    'use strict';

    angular
        .module('pt.backTest')
        .service('qtServices', fn);

    /* @ngInject */
    function fn(breeze, $q)
    {
      this.rangeMaker = function(num){
        this.res = []
        for (let i = 0; i < num; i++) {
          this.res.push(i)
        }
        return this.res
      }

      this.Table = function(){
        let table = {};
        table.headers   = ["A", "B", "C", "D"],
        table.tableRows = 4,
        table.range     = new this.rangeMaker(table.tableRows)
        return table
      }
    }
})();
