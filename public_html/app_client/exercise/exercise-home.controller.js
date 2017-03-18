(function() {

    'use strict';
    angular
        .module('app.exercise')
        .controller('ExerciseHomeController', ExerciseHomeController);

    ExerciseHomeController.$inject = ['ExerciseService', '$window'];
    
    function ExerciseHomeController(ExerciseService, $window) {
        var vm = this;

        vm.exercises = [];
        vm.deleteExercise = deleteExercise;
        vm.message = '';
        
        activate();

        ////////////
        
        function activate() {
            
            getExercises();
            
        }   
        
        function getExercises() {
            ExerciseService.getExercises()
                .then(function(data) {
                    vm.exercises = data;
                });
        }
        
        /* This is a simple way but the popup can be disabled so be aware */
        function deleteExercise(_id) {
            var confirm = $window.confirm('are you sure?');
            if ( confirm ) {
                ExerciseService.deleteExercise(_id)
                    .then(function(msg) {
                         vm.message = msg;
                         getExercises();
                    });
            }
        }
        
        
       
    }

})();