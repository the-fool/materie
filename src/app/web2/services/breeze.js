/**
 * Created by akj on 2/24/2016.
 */

(function () {
    'use strict';
    angular
        .module('web2')
        .service('breezeService', Service);
    Service.$inject = ['breeze', '$q', '$rootScope', '$timeout']
    /* @ngInject */
    function Service(breeze, $q, $rootScope, $timeout,Upload) {
        //private variables

       // var serviceName = 'http://localhost:60305/breeze/home/';
        var serviceName = 'http://w2idemo.azurewebsites.net/breeze/home/';
        var manager = new breeze.EntityManager(serviceName);
        //interface
        this.isBreezeReady     = false;
        this.getMetadata       = getMetadata;
        this.getEntities       = getEntities;
        this.createEntity      = createEntity;
        this.getEntityById     = getEntityById;

        var breezeQueryTracker =function(){

            var queries =[];

            function addQuery(queryToAdd)
            {
                queries.push(queryToAdd);
            }

            function removeQuery(queryToRemove)
            {
                //TODO: Implementation
                returnfalse;
            }

            function queryExists(query)
            {

                //check for existing query based on target entity and predicate
                var matchedQueries =new Array();
                matchedQueries = _.filter(queries,function(savedQuery){
                    return savedQuery.resultEntityType == query.resultEntityType &&
                        savedQuery.wherePredicate.toString()== query.wherePredicate.toString();});

                return matchedQueries.length >0;
            }


            return{
                queries: queries,
                add: addQuery,
                //remove: removeQuery,
                exists: queryExists
            };
        }



        //
        function getMetadata() {
            var self = this;
            $rootScope.$emit('loadingActivity',{message:'configuring application please wait'});
            manager.metadataStore.fetchMetadata(serviceName).then(function () {
                self.isBreezeReady = true;
                $rootScope.$emit('loadedActivity');
            }).catch(_queryFailed);
        }
        //
        function createEntity(entityName,paramObj)
        {
            if(angular.isDefined(paramObj.Id))
            {
                return manager.saveChanges().catch(_queryFailed);
            }
            else
            {
                manager.createEntity(entityName,paramObj);
                return manager.saveChanges().catch(_queryFailed);
            }
        }
        //
        function getEntityById(entityName, id, forceRemote) {
            if (!forceRemote) {
                // check cache first
                var entity = manager.getEntityByKey(entityName, id);
                if (entity) {
                    if (entity.entityAspect.entityState.isDeleted()) {
                        entity = null; // hide session marked-for-delete
                    }
                    return $q.when(entity);
                }
            }
            // Hit the server
            // It was not found in cache, so let's query for it.
            return manager.fetchEntityByKey(entityName, id).catch(_queryFailed);
        }
        //
        function getEntities(entityName,expandEntity,entityType){
            var promise;
            var query;
           // var entityType = breeze.metadataStore.getEntityType(entityName);
            if(expandEntity)
            {
                query = breeze.EntityQuery.from(entityName).expand(expandEntity).toType(entityType);
            }
            else{
                query = breeze.EntityQuery.from(entityName).toType(entityType);
            }




            var deferred = $q.defer();
            promise = deferred.promise
            var list = null;
            try {
                list = manager.executeQueryLocally(query);
            }
            catch (e)
            {
                list = null;
            }
            if(list && list.length > 0)
            {
                deferred.resolve(list);
            }
            else {
                query = breeze.EntityQuery.from(entityName);
                manager.executeQuery(query).
                    then(function(result){
                        deferred.resolve(result);
                    })
                    .catch(function(error){
                        deferred.reject(error);
                    } );
            }
            return promise;
        }


        function _queryFailed(error) {
            $rootScope.$emit('loadedActivity');
            $rootScope.$emit('service-error', error);
        }

        function deleteinfo(entityName,deletedata)
        {
            deletedata.entityAspect.setDeleted();
            //entityName.remove(deletedata);
            manager.saveChanges();

        }
    }


})();
