/**
 * Created by Jayant on 3/20/2016.
 */
/**
 * Created by akj on 2/24/2016.
 */

(function () {
    'use strict';
    angular
        .module('web2')
        .service('excelService', Service);
    Service.$inject = ['$q', '$rootScope', '$timeout']
    /* @ngInject */
    function Service( $q, $rootScope, $timeout,Upload) {
        this.getRangeValues       = getRangeValues;
        this.setRangeValues  = setRangeValues
        function getRangeValues(selector)
        {
            var deferred = $q.defer();
            var data = null;
            Excel.run(function (ctx) {
                var range = ctx.workbook.worksheets.getActiveWorksheet().getRange(selector);
                range.load("address, values, range/format");
                return ctx.sync().then(function () {
                    data = range.values;
                });
            }).then(function () {
                deferred.resolve(data);
            }).catch(function (error) {
                deferrred.reject(error.message);
            });
            return deferred.promise
        }

        function setRangeValues(selector, data)
        {
            var deferred = $q.defer();
            Excel.run(function (ctx) {
                var range = ctx.workbook.worksheets.getActiveWorksheet().getRange(selector);
                range.load("address, values, range/format");
                return ctx.sync().then(function () {
                    range.values = data;
                });
            }).then(function () {
                deferred.resolve(data);
            }).catch(function (error) {
                deferrred.reject(error.message);
            });
            return deferred.promise
        }

    }


})();
