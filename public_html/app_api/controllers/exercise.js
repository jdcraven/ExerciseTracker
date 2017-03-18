var mongoose = require('mongoose');
var Exercise = mongoose.model('Exercise');
//var WeightLifting = mongoose.model('WeightLifting');
var exerciseDAO = require('../service/exercisesDAO');

function sendJSONresponse(res, status, content) {
    res.status(status);
    res.json(content);
};


module.exports.exercisesReadAll = function(req, res) {
        
     exerciseDAO.exercisesReadAll().then(function(results) {
         sendJSONresponse(res, 200, results);
     }, function(err){
        sendJSONresponse(res, 404, err);
     });
        
    console.log('Getting all exercises');
        
};



module.exports.exerciseReadOne = function(req, res) {
    
    
    exerciseDAO.exercisesReadOne(req.params.exerciseid).then(function(results) {
         sendJSONresponse(res, 200, results);
     }, function(err){
        sendJSONresponse(res, 404, {
            "message": "exercise id not found"
        });
     });
    
    
   
};




/*   POST a new exercise
 *   /api/v1/exercise 
 */
module.exports.exerciseCreate = function(req, res) {
    
    console.log('Creating a Exercise with data ', req.body);
    
    Exercise.create({
          UserID: '1',          
          exerciseName: req.body.name,
          exerciseType: req.body.type,
          exerciseWeight: req.body.weight,
          numberSets: req.body.sets,
          machineSettings: req.body.settings
          
    }, function(err, dataSaved) {
        if (err) {
          console.log(err);
          sendJSONresponse(res, 400, err);
        } else {
          console.log(dataSaved);
          sendJSONresponse(res, 201, dataSaved);
        }
    });
    
//    if(req.body.exerciseType === "WeightLifting") {
//        WeightLifting.create({
//            ExerciseID: req.body.exerciseID,
//            Weight: req.body.Weight,
//            Set: req.body.Set   
//        }, function(err, dataSaved) {
//        if (err) {
//          console.log(err);
//          sendJSONresponse(res, 400, err);
//        } else {
//          console.log(dataSaved);
//          sendJSONresponse(res, 201, dataSaved);
//        }
//    });
//    }
  
  
};



module.exports.exerciseUpdateOne = function(req, res) {
    
  if ( !req.params.exerciseid ) {
    sendJSONresponse(res, 404, {
      "message": "Not found, exercise id is required"
    });
    return;
  }
  Exercise
    .findById(req.params.exerciseid)
    .exec( function(err, exerciseData) {
        if (!exerciseData) {
          sendJSONresponse(res, 404, {
            "message": "exercise id not found"
          });
          return;
        } else if (err) {
            sendJSONresponse(res, 400, err);
            return;
        }
        exerciseData.exerciseName = req.body.name;
        exerciseData.exerciseType = req.body.type;
        exerciseData.exerciseWeight = req.body.weight;
        exerciseData.numberSets = req.body.sets;
        exerciseData.machineSettings = req.body.settings;
       
        exerciseData.save(function(err, data) {
          if (err) {
            sendJSONresponse(res, 404, err);
          } else {
            sendJSONresponse(res, 200, data);
          }
        });
    });
    
};


module.exports.exerciseDeleteOne = function(req, res) {
  if ( !req.params.exerciseid ) {
    sendJSONresponse(res, 404, {
      "message": "Not found, exercise id is required"
    });
    return;
  }
  Exercise
    .findByIdAndRemove(req.params.exerciseid)
    .exec( function(err, exerciseData) {
        if (err) {
            console.log(err);
            sendJSONresponse(res, 404, err);
            return;
        }
          console.log("Exercise id " + req.params.exerciseid + " deleted");
          sendJSONresponse(res, 204, null);
                
    });
};
