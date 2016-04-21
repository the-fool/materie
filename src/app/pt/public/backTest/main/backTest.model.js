/**
* Created by Jayant on 1/28/2016.
*/
(function() {
  'use strict';

  angular
  .module('pt.backTest')
  .service('backTestModel', fn);

  /* @ngInject */
  function fn(breeze, $q, $http)
  {
            this.getData = function (queryObject)
            {
              console.log(queryObject);
              return   $http.post('https://dry-eyrie-73440.herokuapp.com/', queryObject)
            }

  }
  })();
