(function() {
    'use strict';

    angular
        .module('app.exercise')
        .constant('REQUEST', {
            'Exercises' : '/api/v1/exercise'
        });
})();