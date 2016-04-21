(function () {
    'use strict';

    angular
        .module('pt.home')
        .controller('homeController', fn);

    /* @ngInject */
    function fn(homemodel, $scope, $rootScope) {
        var vm = this;

        vm.addSlide = function addSlide(target, style, qty) {
            var i = target.length;
            target.push({
                id: (i + 1),
                label: 'slide #' + (i + 1),
                img: 'assets/images/backgrounds' + '/cr-' + qty + '.jpg',
                odd: (i % 2 === 0)
            });
        };

        vm.carouselIndex = 1;

        function addSlides(target, style, qty) {
            for (var i = 0; i < qty; i++) {
                vm.addSlide(target, style, i);
            }
        }


        vm.slides = [];
        addSlides(vm.slides, 'sports', 5);


    }
})();
