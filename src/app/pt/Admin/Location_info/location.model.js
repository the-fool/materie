/**
 * Created by Admin on 2/15/2016.
 */
(function() {
    'use strict';

    angular
        .module('pt.Admin')
        .service('locationService', fn);

    /* @ngInject */
    function fn(breezeService)
    {

        var a=[];

        breezeService.getEntities('location').then(function (data) {

            a = data.results;
        });


        this.getDetail = getDetail;



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
