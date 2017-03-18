(function() {

    'use strict';
    angular
        .module('app.exercise')
        .controller('ExerciseCreateController', ExerciseCreateController);

    ExerciseCreateController.$inject = ['ExerciseService'];
    
    function ExerciseCreateController(ExerciseService) {
        var vm = this;

        vm.data = {
            'name' : '',
            'type' : '',
            'weight': '',
            'sets': '',
            'settings': ''
        };
        vm.submit = submit;
        vm.message = '';
        vm.title = 'Add Exercise';
        
        activate();
        
        vm.workTypes = ['Weight Lift', 'Machine'];
        
//         vm.workTypes = [{
//           id: 1,
//           type: 'Weight Lift'
//        },
//        {
//           id: 2,
//           type: 'Machine'
//            
//        }];

        ////////////
        
        function activate() {}   
        
        function submit() {
            ExerciseService.addExercise(vm.data)
                .then(function(data) {
                    vm.message = data;
                });
        }
        
       
    }

})();