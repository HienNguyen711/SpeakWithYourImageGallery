//main controller
(function () {
    'use strict';

    angular.module('app')
        .controller('MainController', MainController);

    MainController.$inject = ['$scope'];

    function MainController($scope) {
        var vm = this;
        $scope.header = "Welcome to Image Gallery Speech";



    }
})();
