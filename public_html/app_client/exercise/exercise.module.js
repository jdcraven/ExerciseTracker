(function() {
    
    'use strict';
    angular.module('app.exercise', []);
    
    /* This will allow us to add a new module feature to the main app module */
    angular.module('app').requires.push('app.exercise');
    
})();