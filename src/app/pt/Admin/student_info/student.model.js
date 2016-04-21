/**
 * Created by Admin on 2/15/2016.
 */
(function() {
    'use strict';

    angular
        .module('pt.Admin')
        .service('studentService', fn);

    /* @ngInject */
    function fn(breezeService)
    {

        var a=[];
        this.getDetail = getDetail;

        breezeService.getEntities('students').then(function (data) {
            a = data.results;
        });


        function getDetail(id)
        {
            var result;

            result =  a.filter(function(data){
                if(data.Id === parseInt(id))
                {
                    return data;
                };
            })

            return result;

        }

    }
})();
