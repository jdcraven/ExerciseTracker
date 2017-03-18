var express = require('express');
var router = express.Router();
var ctrlExercise = require('../controllers/exercise');

// exercises
router.get('/exercise', ctrlExercise.exercisesReadAll);
router.get('/exercise/:exerciseid', ctrlExercise.exerciseReadOne);
router.post('/exercise', ctrlExercise.exerciseCreate);
router.put('/exercise/:exerciseid', ctrlExercise.exerciseUpdateOne);
router.delete('/exercise/:exerciseid', ctrlExercise.exerciseDeleteOne);

module.exports = router;
