 (function() {

    'use strict'; 
    angular
        .module('app.exercise')
        .config(config);
  
    config.$inject = ['$routeProvider'];

    function config($routeProvider) {
      $routeProvider.
          when('/', {
              templateUrl: '/exercise/exercise-home.view.html',
              controller: 'ExerciseHomeController',
              controllerAs: 'vm'
          }).
          when('/add', {
              templateUrl: '/exercise/exercise-form.view.html',
              controller: 'ExerciseCreateController',
              controllerAs: 'vm'
          }).
          when('/update/:id', {
              templateUrl: '/exercise/exercise-form.view.html',
              controller: 'ExerciseUpdateController',
              controllerAs: 'vm'
          }).
          otherwise({
            redirectTo: '/'
          });
    }

})();