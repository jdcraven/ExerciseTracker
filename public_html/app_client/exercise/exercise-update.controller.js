(function() {

    'use strict';
    angular
        .module('app.exercise')
        .controller('ExerciseUpdateController', ExerciseUpdateController);

    ExerciseUpdateController.$inject = ['ExerciseService', '$routeParams'];
    
    function ExerciseUpdateController(ExerciseService, $routeParams) {
        var vm = this;

        vm.data = {
            'name' : '',
            'type' : '',
            'weight' : '',
            'sets' : ''
        };
        vm.submit = submit;
        vm.message = '';
        vm.title = 'Update Exercise';
        
        vm.workTypes = ['Weight Lift', 'Machine'];
        
        var _id = $routeParams.id;
        
        activate();

        ////////////
        
        function activate() {
            getExercise();
        }   
        /* we can use the same form as the add-controller by updating the data model
         * so it will display on the form as an update form
         */
        function getExercise() {
            ExerciseService.getExercise(_id)
                .then(function(data) {
                    vm.data.name = data.exerciseName;
                    vm.data.type = data.exerciseType;
                    vm.data.weight = data.exerciseWeight;
                    vm.data.sets = data.numberSets;
                    vm.data.settings = data.machineSettings;
                });
        }
        
        function submit() {
            ExerciseService.updateExercise(_id, vm.data)
                .then(function(data) {
                    vm.message = data;
                });
        }
        
       
    }

})();

