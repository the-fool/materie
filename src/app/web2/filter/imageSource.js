/**
 * Created by Jayant on 3/17/2016.
 */

var app = angular.module("web2");
app.filter('imageFilter', function() {
    return function( item) {

        return "data:image/jpeg;base64," +   item;
    };
});
